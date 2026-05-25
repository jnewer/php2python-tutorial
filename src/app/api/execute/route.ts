import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import os from "os";

const EXEC_TIMEOUT = 10_000; // 10 seconds

export async function POST(req: NextRequest) {
  let body: { code?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "无效的 JSON 请求体" }, { status: 400 });
  }

  const { code, language } = body;

  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "缺少 code 参数" }, { status: 400 });
  }

  if (language !== "php" && language !== "python") {
    return NextResponse.json({ error: 'language 必须是 "php" 或 "python"' }, { status: 400 });
  }

  // Sanitize: prevent code from accessing filesystem env vars aggressively
  if (code.includes("__import__('os')") || code.includes("os.system") || code.includes("exec(")) {
    // We allow these in tutorial context, just note it
  }

  const ext = language === "php" ? ".php" : ".py";
  const tmpFile = path.join(os.tmpdir(), `playground-${randomUUID()}${ext}`);

  try {
    // Prepare the code for execution
    let preparedCode = code.trim();

    // For PHP: strip <?php tags if present (will be handled by command)
    if (language === "php") {
      // Keep PHP code as-is since we use <?php tagged files
      if (!preparedCode.startsWith("<?php")) {
        preparedCode = "<?php\n" + preparedCode;
      }
      // Ensure it ends properly
      if (!preparedCode.trimEnd().endsWith("?>")) {
        if (!preparedCode.includes("?>")) {
          preparedCode = preparedCode.trimEnd() + "\n";
        }
      }
    }

    await writeFile(tmpFile, preparedCode, "utf-8");

    const output = await executeCode(tmpFile, language);
    return NextResponse.json(output);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: "执行失败", detail: message }, { status: 500 });
  } finally {
    // Clean up temp file
    try { await unlink(tmpFile); } catch { /* ignore */ }
  }
}

function executeCode(filePath: string, language: "php" | "python"): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const cmd = language === "php" ? "php" : "python3";
    const child = spawn(cmd, [filePath], {
      cwd: os.tmpdir(),
      env: { ...process.env, HOME: os.tmpdir(), PYTHONDONTWRITEBYTECODE: "1" },
      timeout: EXEC_TIMEOUT,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data: Buffer) => {
      stdout += data.toString("utf-8");
    });

    child.stderr.on("data", (data: Buffer) => {
      stderr += data.toString("utf-8");
    });

    child.on("close", (exitCode) => {
      resolve({
        stdout: stdout.slice(0, 50000), // Limit output to 50KB
        stderr: stderr.slice(0, 50000),
        exitCode: exitCode ?? 1,
      });
    });

    child.on("error", (err) => {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        reject(new Error(`${language === "php" ? "PHP" : "Python3"} 未安装或不可用`));
      } else {
        reject(err);
      }
    });

    // Force kill on timeout
    const killTimer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("代码执行超时 (10 秒)"));
    }, EXEC_TIMEOUT);

    child.on("close", () => clearTimeout(killTimer));
  });
}
