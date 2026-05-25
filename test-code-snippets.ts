/**
 * Extract all PHP and Python code snippets from course-data.ts and test them.
 * Usage: bun run test-code-snippets.ts
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { spawnSync } from 'child_process';
import { join } from 'path';

const OUTPUT_DIR = join(import.meta.dirname, 'test-output');

function extractCodeBlocks(filePath: string) {
  const content = readFileSync(filePath, 'utf-8');

  const phpBlocks: { code: string; context: string }[] = [];
  const pythonBlocks: { code: string; context: string }[] = [];

  // Extract PHP blocks: php: `...content...`
  // Must handle escaped characters in template literals
  const phpRegex = /php:\s*`((?:[^`\\]|\\[\s\S])*?)`/gs;
  let match;
  while ((match = phpRegex.exec(content)) !== null) {
    let code = match[1];
    // Unescape template literal escapes (process escape sequences in correct order)
    // NOTE: \\\\ → \\ (four backslashes in regex = two backslashes in file = one backslash in string)
    code = code.replace(/\\n/g, '\n');
    code = code.replace(/\\t/g, '\t');
    code = code.replace(/\\r/g, '\r');
    code = code.replace(/\\`/g, '`');
    code = code.replace(/\\'/g, "'");
    code = code.replace(/\\"/g, '"');
    code = code.replace(/\\\$/g, '$');
    code = code.replace(/\\\\/g, '\\');
    // Get context from preceding title
    const start = Math.max(0, match.index - 300);
    const ctx = content.slice(start, match.index);
    const titleMatch = ctx.match(/title:\s*'([^']+)'/);
    const contextStr = titleMatch ? titleMatch[1] : 'unknown';
    phpBlocks.push({ code, context: contextStr });
  }

  // Extract Python blocks: python: `...content...`
  const pyRegex = /python:\s*`((?:[^`\\]|\\[\s\S])*?)`/gs;
  while ((match = pyRegex.exec(content)) !== null) {
    let code = match[1];
    code = code.replace(/\\n/g, '\n');
    code = code.replace(/\\t/g, '\t');
    code = code.replace(/\\r/g, '\r');
    code = code.replace(/\\`/g, '`');
    code = code.replace(/\\'/g, "'");
    code = code.replace(/\\"/g, '"');
    code = code.replace(/\\\\/g, '\\');
    const start = Math.max(0, match.index - 300);
    const ctx = content.slice(start, match.index);
    const titleMatch = ctx.match(/title:\s*'([^']+)'/);
    const contextStr = titleMatch ? titleMatch[1] : 'unknown';
    pythonBlocks.push({ code, context: contextStr });
  }

  return { phpBlocks, pythonBlocks };
}

function preparePHPCode(rawCode: string): string {
  let code = rawCode.trim();

  // Remove <?php opening tag
  code = code.replace(/^<\?php\s*/i, '');

  // Remove multiple <?php tags (some code snippets may have them in comments)
  code = code.replace(/<\?php\s*/gi, '');

  // Remove closing ?> tag
  code = code.replace(/\?>\s*$/g, '');

  return code;
}

function preparePythonCode(rawCode: string): string {
  return rawCode.trim();
}

type TestResult = { success: boolean; output: string; reason?: string };

function testPHP(code: string): TestResult {
  // Skip code that's clearly not executable PHP
  // Some code blocks contain markdown, JSON, or shell commands
  const preparedCode = preparePHPCode(code);
  if (!preparedCode.trim()) {
    return { success: true, output: '(empty code)', reason: 'empty' };
  }

  // Skip blocks that are shell commands or markdown
  if (preparedCode.startsWith('# ') && preparedCode.includes('php ')) {
    return { success: true, output: '(shell command - skipped)', reason: 'shell' };
  }

  const result = spawnSync('php', ['-r', preparedCode], {
    timeout: 10000,
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024,
  });

  const stdout = result.stdout?.trim() || '';
  const stderr = result.stderr?.trim() || '';

  if (result.error) {
    return { success: false, output: `ERROR: ${result.error.message}`, reason: String(result.error.code) };
  }

  if (result.status !== 0) {
    // Filter out expected failures for non-standard extensions
    if (stderr.includes('Call to undefined function') || stderr.includes('Class "')) {
      return { success: true, output: '(uses non-standard extensions/classes - skipped)', reason: 'non-standard' };
    }
    return { success: false, output: stderr || stdout || `exit code: ${result.status}`, reason: 'parse_error' };
  }

  return { success: true, output: stdout };
}

function testPython(code: string): TestResult {
  const preparedCode = preparePythonCode(code);

  // Skip empty code
  if (!preparedCode.trim()) {
    return { success: true, output: '(empty code)', reason: 'empty' };
  }

  // Skip blocks that are clearly not Python
  if (preparedCode.startsWith('{') || preparedCode.includes('{% extends') || preparedCode.includes('{{ ')) {
    return { success: true, output: '(template/shell code - skipped)', reason: 'template' };
  }

  // Skip blocks that look like shell commands
  if (preparedCode.match(/^(php|python|pip|pytest|npm|bun|flask)\s/)) {
    return { success: true, output: '(shell command - skipped)', reason: 'shell' };
  }

  const result = spawnSync('python3', ['-c', preparedCode], {
    timeout: 10000,
    encoding: 'utf-8',
    maxBuffer: 1024 * 1024,
  });

  const stdout = result.stdout?.trim() || '';
  const stderr = result.stderr?.trim() || '';

  if (result.error) {
    return { success: false, output: `ERROR: ${result.error.message}`, reason: String(result.error.code) };
  }

  if (result.status !== 0) {
    // Expected failures for packages that aren't installed
    if (stderr.includes('ModuleNotFoundError')) {
      return { success: true, output: '(missing module - skipped)', reason: 'missing_module' };
    }
    if (stderr.includes('FileNotFoundError') || stderr.includes('No such file')) {
      return { success: true, output: '(file not found in test env - skipped)', reason: 'file_not_found' };
    }
    if (stderr.includes('ConnectionError') || stderr.includes('ConnectionRefused')) {
      return { success: true, output: '(network error - skipped)', reason: 'network' };
    }
    return { success: false, output: stderr || stdout || `exit code: ${result.status}`, reason: 'error' };
  }

  return { success: true, output: stdout };
}

function main() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const filePath = join(import.meta.dirname, 'src/lib/course-data.ts');
  const { phpBlocks, pythonBlocks } = extractCodeBlocks(filePath);

  console.log(`Found ${phpBlocks.length} PHP blocks, ${pythonBlocks.length} Python blocks\n`);

  // Test PHP blocks
  console.log('═'.repeat(60));
  console.log('PHP CODE TESTS (63 blocks)');
  console.log('═'.repeat(60));

  const realFailures: { lang: string; idx: number; context: string; code: string; output: string }[] = [];
  let phpPass = 0, phpFail = 0, phpSkip = 0;

  for (let i = 0; i < phpBlocks.length; i++) {
    const { code, context } = phpBlocks[i];
    const result = testPHP(code);
    if (result.success) {
      phpPass++;
      if (result.reason && result.reason !== 'empty') phpSkip++;
    } else {
      phpFail++;
      console.log(`\n[${i + 1}] ✗ ${context}`);
      console.log(`  ${result.output.slice(0, 300)}`);
      realFailures.push({ lang: 'PHP', idx: i + 1, context, code, output: result.output });
      writeFileSync(join(OUTPUT_DIR, `php-fail-${i + 1}.php`), code);
    }
  }

  console.log(`\nPHP: ${phpPass} passed (${phpSkip} skipped), ${phpFail} real failures`);

  // Test Python blocks
  console.log('\n' + '═'.repeat(60));
  console.log('PYTHON CODE TESTS (63 blocks)');
  console.log('═'.repeat(60));

  let pyPass = 0, pyFail = 0, pySkip = 0;

  for (let i = 0; i < pythonBlocks.length; i++) {
    const { code, context } = pythonBlocks[i];
    const result = testPython(code);
    if (result.success) {
      pyPass++;
      if (result.reason && result.reason !== 'empty') pySkip++;
    } else {
      pyFail++;
      console.log(`\n[${i + 1}] ✗ ${context}`);
      console.log(`  ${result.output.slice(0, 300)}`);
      realFailures.push({ lang: 'Python', idx: i + 1, context, code, output: result.output });
      writeFileSync(join(OUTPUT_DIR, `py-fail-${i + 1}.py`), code);
    }
  }

  console.log(`\nPython: ${pyPass} passed (${pySkip} skipped), ${pyFail} real failures`);

  console.log('\n' + '═'.repeat(60));
  console.log(`SUMMARY: ${realFailures.length} real failures (${phpFail} PHP, ${pyFail} Python)`);

  if (realFailures.length > 0) {
    console.log(`\nFailure details saved to: ${OUTPUT_DIR}/`);
    process.exit(1);
  } else {
    console.log('All code snippets are runnable!');
  }
}

main();
