import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";
import { writeFile, unlink } from "fs/promises";
import { randomUUID } from "crypto";
import path from "path";
import os from "os";

const EXEC_TIMEOUT = 10_000; // 10 seconds
const MAX_CODE_LENGTH = 10_000; // 10KB max code
const MAX_OUTPUT_SIZE = 50_000; // 50KB max output
const RATE_LIMIT_WINDOW = 60_000; // 1 minute window
const MAX_REQUESTS_PER_WINDOW = 30; // 30 requests per minute

// Simple in-memory rate limiter (per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  entry.count++;
  return true;
}

// Clean up old rate limit entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  }
}, 300_000).unref();

// More comprehensive blocking for dangerous patterns
const BLOCKED_PATTERNS = [
  // System access
  /os\.system\s*\(/,
  /subprocess\.(call|Popen|run|check_output)\s*\(/,
  /__import__\s*\(\s*['"]os['"]\s*\)/,
  /__import__\s*\(\s*['"]subprocess['"]\s*\)/,
  /__import__\s*\(\s*['"]shutil['"]\s*\)/,
  /eval\s*\(/,
  /exec\s*\(/,
  /compile\s*\(/,
  // File system abuse
  /open\s*\([^)]*['"]\/etc\//,
  /open\s*\([^)]*['"][\/]?(passwd|shadow)/,
  // Network abuse
  /socket\./,
  /requests\.(get|post|put|delete)\s*\(/,
  /urllib\.request\./,
] as const;

function isSafeCode(code: string): { safe: boolean; reason?: string } {
  for (const pattern of BLOCKED_PATTERNS) {
    if (pattern.test(code)) {
      return { safe: false, reason: `代码包含不安全操作` };
    }
  }
  return { safe: true };
}

export async function POST(req: NextRequest) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || req.headers.get("x-real-ip")
    || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "请求过于频繁，请稍后再试" },
      { status: 429 }
    );
  }

  // Parse body
  let body: { code?: string; language?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "无效的 JSON 请求体" }, { status: 400 });
  }

  const { code, language } = body;

  // Validate code
  if (!code || typeof code !== "string") {
    return NextResponse.json({ error: "缺少 code 参数" }, { status: 400 });
  }
  if (code.length > MAX_CODE_LENGTH) {
    return NextResponse.json(
      { error: `代码长度不能超过 ${MAX_CODE_LENGTH} 字符` },
      { status: 400 }
    );
  }

  // Validate language
  if (language !== "php" && language !== "python") {
    return NextResponse.json(
      { error: 'language 必须是 "php" 或 "python"' },
      { status: 400 }
    );
  }

  // Security check
  const safetyCheck = isSafeCode(code);
  if (!safetyCheck.safe) {
    return NextResponse.json(
      { error: safetyCheck.reason },
      { status: 403 }
    );
  }

  const ext = language === "php" ? ".php" : ".py";
  const tmpFile = path.join(os.tmpdir(), `playground-${randomUUID()}${ext}`);

  try {
    let preparedCode = code.trim();

    if (language === "php") {
      if (!preparedCode.startsWith("<?php")) {
        preparedCode = "<?php\n" + preparedCode;
      }
      if (!preparedCode.includes("?>")) {
        preparedCode = preparedCode.trimEnd() + "\n";
      }
    }

    await writeFile(tmpFile, preparedCode, "utf-8");

    const output = await executeCode(tmpFile, language);
    return NextResponse.json(output);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { error: "执行失败", detail: message },
      { status: 500 }
    );
  } finally {
    try {
      await unlink(tmpFile);
    } catch {
      /* ignore cleanup errors */
    }
  }
}

function executeCode(
  filePath: string,
  language: "php" | "python"
): Promise<{ stdout: string; stderr: string; exitCode: number }> {
  return new Promise((resolve, reject) => {
    const cmd = language === "php" ? "php" : "python3";
    const child = spawn(cmd, [filePath], {
      cwd: os.tmpdir(),
      env: {
        ...process.env,
        HOME: os.tmpdir(),
        PYTHONDONTWRITEBYTECODE: "1",
        PYTHONPATH: "",
      },
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data: string | Buffer) => {
      stdout += data.toString("utf-8");
      if (stdout.length > MAX_OUTPUT_SIZE) {
        child.kill("SIGKILL");
      }
    });

    child.stderr.on("data", (data: string | Buffer) => {
      stderr += data.toString("utf-8");
      if (stderr.length > MAX_OUTPUT_SIZE) {
        child.kill("SIGKILL");
      }
    });

    const killTimer = setTimeout(() => {
      child.kill("SIGKILL");
      reject(new Error("代码执行超时 (10 秒)"));
    }, EXEC_TIMEOUT);

    child.on("close", (exitCode) => {
      clearTimeout(killTimer);
      resolve({
        stdout: stdout.slice(0, MAX_OUTPUT_SIZE),
        stderr: stderr.slice(0, MAX_OUTPUT_SIZE),
        exitCode: exitCode ?? 1,
      });
    });

    child.on("error", (err) => {
      clearTimeout(killTimer);
      if ((err as NodeJS.ErrnoException).code === "ENOENT") {
        reject(
          new Error(
            `${
              language === "php" ? "PHP" : "Python3"
            } 未安装或不可用`
          )
        );
      } else {
        reject(err);
      }
    });
  });
}
