/**
 * Lightweight syntax highlighter for PHP and Python.
 * Zero dependencies, works on both client and server.
 */
import React from 'react';

/* ─── Token types ─── */
type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'variable'
  | 'operator'
  | 'builtin'
  | 'decorator'
  | 'tag'
  | 'type'
  | 'plain';

interface Token {
  text: string;
  type: TokenType;
}

/* ─── Color maps (Tailwind classes) ─── */
const lightColors: Record<TokenType, string> = {
  keyword:  'text-[#7c3aed]',     // purple-600
  string:   'text-[#059669]',     // emerald-600
  comment:  'text-[#9ca3af]',     // gray-400
  number:   'text-[#d97706]',     // amber-600
  function: 'text-[#2563eb]',     // blue-600
  variable: 'text-[#db2777]',     // pink-600
  operator: 'text-[#4b5563]',     // gray-600
  builtin:  'text-[#0891b2]',     // cyan-600
  decorator:'text-[#9333ea]',     // purple-600
  tag:      'text-[#dc2626]',     // red-600
  type:     'text-[#7c3aed]',     // purple-600
  plain:    'text-inherit',
};

const darkColors: Record<TokenType, string> = {
  keyword:  'text-purple-400',
  string:   'text-emerald-400',
  comment:  'text-gray-500',
  number:   'text-amber-400',
  function: 'text-blue-400',
  variable: 'text-pink-400',
  operator: 'text-gray-400',
  builtin:  'text-cyan-400',
  decorator:'text-purple-400',
  tag:      'text-red-400',
  type:     'text-purple-400',
  plain:    'text-inherit',
};

/* ─── PHP keywords / builtins ─── */
const PHP_KEYWORDS = new Set([
  'abstract', 'and', 'array', 'as', 'break', 'callable', 'case', 'catch',
  'class', 'clone', 'const', 'continue', 'declare', 'default', 'die',
  'do', 'echo', 'else', 'elseif', 'empty', 'enddeclare', 'endfor',
  'endforeach', 'endif', 'endswitch', 'endwhile', 'exit', 'extends',
  'final', 'finally', 'fn', 'for', 'foreach', 'function', 'global',
  'goto', 'if', 'implements', 'include', 'include_once', 'instanceof',
  'insteadof', 'interface', 'isset', 'list', 'match', 'namespace',
  'new', 'or', 'print', 'private', 'protected', 'public', 'readonly',
  'require', 'require_once', 'return', 'static', 'switch', 'throw',
  'trait', 'try', 'unset', 'use', 'var', 'while', 'xor', 'yield',
  'from', 'as', 'int', 'float', 'bool', 'string', 'void', 'null',
  'true', 'false', 'mixed', 'never', 'self', 'parent',
]);

const PHP_BUILTINS = new Set([
  'array_push', 'array_pop', 'array_shift', 'array_unshift', 'array_map',
  'array_filter', 'array_reduce', 'array_merge', 'array_keys', 'array_values',
  'count', 'sizeof', 'in_array', 'explode', 'implode', 'strlen', 'strpos',
  'substr', 'trim', 'str_replace', 'preg_match', 'json_encode', 'json_decode',
  'file_get_contents', 'file_put_contents', 'fopen', 'fclose', 'fwrite',
  'var_dump', 'print_r', 'header', 'session_start', 'isset', 'empty',
  'define', 'defined', 'class_exists', 'method_exists', 'is_array',
  'is_string', 'is_int', 'is_null', 'is_object', 'get_class', 'gettype',
]);

/* ─── Python keywords / builtins ─── */
const PYTHON_KEYWORDS = new Set([
  'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
  'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
  'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
  'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
  'try', 'while', 'with', 'yield', 'match', 'case',
]);

const PYTHON_BUILTINS = new Set([
  'print', 'len', 'range', 'type', 'int', 'float', 'str', 'bool',
  'list', 'dict', 'set', 'tuple', 'open', 'input', 'enumerate',
  'zip', 'map', 'filter', 'sorted', 'reversed', 'sum', 'min', 'max',
  'abs', 'all', 'any', 'isinstance', 'issubclass', 'hasattr',
  'getattr', 'setattr', 'super', 'self', 'cls',
  '__init__', '__str__', '__repr__', '__name__', '__main__',
  'Exception', 'ValueError', 'TypeError', 'KeyError', 'IndexError',
]);

/* ─── Tokenizer ─── */
function tokenize(code: string, language: 'php' | 'python'): Token[] {
  const tokens: Token[] = [];
  const keywords = language === 'php' ? PHP_KEYWORDS : PYTHON_KEYWORDS;
  const builtins = language === 'php' ? PHP_BUILTINS : PYTHON_BUILTINS;

  let i = 0;
  const len = code.length;

  while (i < len) {
    // Whitespace
    if (code[i] === ' ' || code[i] === '\t') {
      let j = i;
      while (j < len && (code[j] === ' ' || code[j] === '\t')) j++;
      tokens.push({ text: code.slice(i, j), type: 'plain' });
      i = j;
      continue;
    }

    // Newline
    if (code[i] === '\n') {
      tokens.push({ text: '\n', type: 'plain' });
      i++;
      continue;
    }

    // Comments
    if (language === 'python' && code[i] === '#') {
      let j = i;
      while (j < len && code[j] !== '\n') j++;
      tokens.push({ text: code.slice(i, j), type: 'comment' });
      i = j;
      continue;
    }
    if (language === 'php') {
      // Single-line comment //
      if (code[i] === '/' && code[i + 1] === '/') {
        let j = i;
        while (j < len && code[j] !== '\n') j++;
        tokens.push({ text: code.slice(i, j), type: 'comment' });
        i = j;
        continue;
      }
      // Multi-line comment /* */
      if (code[i] === '/' && code[i + 1] === '*') {
        let j = i + 2;
        while (j < len && !(code[j] === '*' && code[j + 1] === '/')) j++;
        j = Math.min(j + 2, len);
        tokens.push({ text: code.slice(i, j), type: 'comment' });
        i = j;
        continue;
      }
      // Hash comment #
      if (code[i] === '#') {
        let j = i;
        while (j < len && code[j] !== '\n') j++;
        tokens.push({ text: code.slice(i, j), type: 'comment' });
        i = j;
        continue;
      }
    }

    // Python docstring / multi-line string (""" or ''')
    if (language === 'python') {
      if (code.slice(i, i + 3) === '"""' || code.slice(i, i + 3) === "'''") {
        const quote = code.slice(i, i + 3);
        let j = i + 3;
        while (j < len && code.slice(j, j + 3) !== quote) j++;
        j = Math.min(j + 3, len);
        tokens.push({ text: code.slice(i, j), type: 'string' });
        i = j;
        continue;
      }
    }

    // Strings (double and single quotes)
    if (code[i] === '"' || code[i] === "'") {
      const quote = code[i];
      let j = i + 1;
      while (j < len && code[j] !== quote) {
        if (code[j] === '\\') j++; // skip escaped chars
        j++;
      }
      j = Math.min(j + 1, len);
      tokens.push({ text: code.slice(i, j), type: 'string' });
      i = j;
      continue;
    }

    // PHP heredoc / nowdoc
    if (language === 'php' && code.slice(i, i + 3) === '<<<') {
      let j = i;
      while (j < len && code[j] !== '\n') j++;
      tokens.push({ text: code.slice(i, j + 1 > len ? len : j + 1), type: 'string' });
      i = j + 1 > len ? len : j + 1;
      // Skip until the closing identifier — simplified
      let depth = 0;
      while (i < len) {
        if (code[i] === '\n') {
          const rest = code.slice(i + 1, Math.min(i + 50, len));
          if (rest.trimEnd().match(/^[A-Z_][A-Z0-9_]*\s*;?\s*$/i)) {
            const endIdx = i + 1 + rest.indexOf('\n');
            const end = endIdx > i ? endIdx : i + 1 + rest.length;
            tokens.push({ text: code.slice(i, end + 1 > len ? len : end + 1), type: 'string' });
            i = end + 1 > len ? len : end + 1;
            depth = -1;
            break;
          }
        }
        i++;
        if (i >= len) break;
      }
      if (depth >= 0) i = len;
      continue;
    }

    // Python decorator
    if (language === 'python' && code[i] === '@') {
      let j = i + 1;
      while (j < len && /[a-zA-Z0-9_.]/.test(code[j])) j++;
      tokens.push({ text: code.slice(i, j), type: 'decorator' });
      i = j;
      continue;
    }

    // PHP variable ($var)
    if (language === 'php' && code[i] === '$') {
      let j = i + 1;
      // $this-> is special
      if (code.slice(i, i + 6) === '$this-') {
        j = i + 6;
      } else {
        while (j < len && /[a-zA-Z0-9_>]/.test(code[j])) {
          if (code[j] === '-' && code[j + 1] === '>') {
            j += 2;
            continue;
          }
          j++;
        }
      }
      tokens.push({ text: code.slice(i, j), type: 'variable' });
      i = j;
      continue;
    }

    // PHP tags
    if (language === 'php' && (code.slice(i, i + 5) === '<?php' || code.slice(i, i + 2) === '?>')) {
      const tagLen = code.slice(i, i + 5) === '<?php' ? 5 : 2;
      tokens.push({ text: code.slice(i, i + tagLen), type: 'tag' });
      i += tagLen;
      continue;
    }

    // Numbers
    if (/[0-9]/.test(code[i])) {
      let j = i;
      if (code[i] === '0' && (code[i + 1] === 'x' || code[i + 1] === 'b' || code[i + 1] === 'o')) {
        j += 2;
        while (j < len && /[0-9a-fA-F_.]/.test(code[j])) j++;
      } else {
        while (j < len && /[0-9.eE_+-]/.test(code[j])) {
          if ((code[j] === '+' || code[j] === '-') && code[j - 1] !== 'e' && code[j - 1] !== 'E') break;
          j++;
        }
      }
      tokens.push({ text: code.slice(i, j), type: 'number' });
      i = j;
      continue;
    }

    // Identifiers (keywords, builtins, functions, types)
    if (/[a-zA-Z_]/.test(code[i])) {
      let j = i;
      while (j < len && /[a-zA-Z0-9_]/.test(code[j])) j++;
      const word = code.slice(i, j);

      // Check what follows — if it's '(' then it's a function call
      let k = j;
      while (k < len && code[k] === ' ') k++;
      const isFuncCall = k < len && code[k] === '(';

      if (keywords.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (builtins.has(word)) {
        tokens.push({ text: word, type: 'builtin' });
      } else if (isFuncCall) {
        tokens.push({ text: word, type: 'function' });
      } else {
        // Check for type-like identifiers (PascalCase)
        if (word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase()) {
          tokens.push({ text: word, type: 'type' });
        } else {
          tokens.push({ text: word, type: 'plain' });
        }
      }
      i = j;
      continue;
    }

    // PHP arrow operator
    if (language === 'php' && code[i] === '-' && code[i + 1] === '>') {
      tokens.push({ text: '->', type: 'operator' });
      i += 2;
      continue;
    }

    // Double-character operators
    const doubleOps = ['==', '!=', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%=', '**', '//', '=>', '::', '->'];
    let foundDouble = false;
    for (const op of doubleOps) {
      if (code.slice(i, i + op.length) === op) {
        tokens.push({ text: op, type: 'operator' });
        i += op.length;
        foundDouble = true;
        break;
      }
    }
    if (foundDouble) continue;

    // Single-character operators / punctuation
    if (/[+\-*\/%=<>!&|^~.,:;()[\]{}]/.test(code[i])) {
      tokens.push({ text: code[i], type: 'operator' });
      i++;
      continue;
    }

    // Fallback: any other character
    let j = i;
    while (
      j < len &&
      !/[ \t\n]/.test(code[j]) &&
      !/[a-zA-Z0-9_]/.test(code[j]) &&
      code[j] !== '"' && code[j] !== "'" &&
      code[j] !== '#' && code.slice(j, j + 2) !== '//' &&
      code[j] !== '$' && code[j] !== '@'
    ) {
      j++;
    }
    if (j === i) {
      tokens.push({ text: code[i], type: 'plain' });
      i++;
    } else {
      tokens.push({ text: code.slice(i, j), type: 'plain' });
      i = j;
    }
  }

  return tokens;
}

/* ─── Highlighted code renderer ─── */
export function highlightCode(
  code: string,
  language: 'php' | 'python',
): React.ReactNode[] {
  const tokens = tokenize(code, language);
  let key = 0;

  return tokens.map((token, idx) => {
    const text = token.text;
    if (text === '\n') {
      key++;
      return React.createElement('span', { key: `nl-${idx}` }, '\n');
    }

    const cls = [
      'font-mono',
      lightColors[token.type],
      `dark:${darkColors[token.type]}`,
    ].join(' ');

    return React.createElement(
      'span',
      { key: `t${idx}-${key}`, className: cls },
      text,
    );
  });
}
