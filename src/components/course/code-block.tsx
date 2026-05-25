'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { Copy, CheckCircle, Play, Loader2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { highlightCode } from '@/lib/syntax-highlight';

type RunOutput = {
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  error?: string;
  detail?: string;
};

export function CodeBlock({ code, language, title, onCopy }: {
  code: string;
  language: 'php' | 'python';
  title?: string;
  onCopy?: (lang: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [running, setRunning] = useState(false);
  const [output, setOutput] = useState<RunOutput | null>(null);
  const copiedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Cleanup timer on unmount
  useEffect(() => () => { if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current); }, []);

  // Auto-scroll to output when it appears
  useEffect(() => {
    if (output && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [output]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // clipboard API unavailable — graceful degradation
      const textarea = document.createElement('textarea');
      textarea.value = code;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try { navigator.clipboard?.writeText(code); } catch { /* ignore */ }
      document.body.removeChild(textarea);
    }
    setCopied(true);
    onCopy?.(language === 'php' ? 'PHP' : 'Python');
    if (copiedTimerRef.current) clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput(null);
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language }),
      });
      const data: RunOutput = await res.json();
      setOutput(data);
    } catch (err: unknown) {
      setOutput({ error: '网络请求失败', detail: err instanceof Error ? err.message : String(err) });
    } finally {
      setRunning(false);
    }
  };

  // Memoize syntax-highlighted code
  const highlightedCode = useMemo(() => highlightCode(code, language), [code, language]);

  const isPhp = language === 'php';
  return (
    <div className={cn(
      'rounded-xl border overflow-hidden',
      isPhp
        ? 'bg-gradient-to-br from-indigo-500/[0.07] to-purple-500/[0.07] border-indigo-500/20'
        : 'bg-gradient-to-br from-amber-500/[0.07] to-yellow-500/[0.07] border-amber-500/20'
    )}>
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border/50 bg-background/50">
        <div className="flex items-center gap-2">
          <span className={cn(
            'px-2 py-0.5 rounded-md text-[11px] font-bold tracking-wide uppercase',
            isPhp
              ? 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400'
              : 'bg-amber-500/15 text-amber-700 dark:text-amber-400'
          )}>
            {isPhp ? 'PHP' : 'Python'}
          </span>
          {title && <span className="text-xs text-muted-foreground">{title}</span>}
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-muted-foreground/60">{code.split('\n').length} 行</span>
          <button
            onClick={handleRun}
            disabled={running}
            className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer disabled:opacity-50"
            title="运行代码"
            aria-label="运行代码"
          >
            {running ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Play className="h-3.5 w-3.5 fill-current" />
            )}
          </button>
          <button
            onClick={handleCopy}
            className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground cursor-pointer"
            title={copied ? '已复制' : '复制代码'}
            aria-label={copied ? '代码已复制' : '复制代码'}
          >
            {copied ? <CheckCircle className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>
      <div className="max-h-[28rem] overflow-auto overscroll-contain">
        <div className="flex min-w-0">
          {/* Line numbers — sticky left column */}
          <div className="sticky left-0 z-10 select-none border-r border-border/30 bg-muted/30 backdrop-blur-sm px-2 py-3 text-right shrink-0">
            {code.split('\n').map((_, i) => (
              <div key={i} className="text-[11px] leading-[1.7] text-muted-foreground/40 font-mono whitespace-nowrap">
                {i + 1}
              </div>
            ))}
          </div>
          {/* Code content */}
          <pre className="px-3 py-3 text-[13px] leading-[1.7] min-w-0 flex-1 overflow-x-auto">
            <code className="font-mono whitespace-pre" lang={language === 'php' ? 'php' : 'python'}>{highlightedCode}</code>
          </pre>
        </div>
      </div>

      {/* Output panel */}
      {output && (
        <div ref={outputRef} className="border-t border-border/50">
          <div className="flex items-center justify-between px-3 py-1.5 bg-muted/30">
            <span className={cn(
              'text-[11px] font-semibold flex items-center gap-1.5',
              (output.exitCode === 0 && !output.error)
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            )}>
              {output.exitCode === 0 && !output.error
                ? '运行成功'
                : '运行错误'}
              {output.exitCode !== undefined && output.exitCode !== 0 && (
                <span className="text-[10px]">(退出码: {output.exitCode})</span>
              )}
            </span>
            <button
              onClick={() => setOutput(null)}
              className="p-0.5 rounded hover:bg-muted transition-colors text-muted-foreground cursor-pointer"
              aria-label="关闭输出"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
          {output.error ? (
            <div className="px-3 py-2 text-[12px] font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap bg-red-500/5">
              {output.detail ? output.detail : output.error}
            </div>
          ) : (
            <>
              {output.stdout && (
                <div className="px-3 py-2 text-[12px] font-mono text-foreground/80 whitespace-pre-wrap bg-background/30 max-h-48 overflow-auto">
                  {output.stdout}
                </div>
              )}
              {output.stderr && (
                <div className="px-3 py-2 text-[12px] font-mono text-red-600 dark:text-red-400 whitespace-pre-wrap bg-red-500/5 max-h-48 overflow-auto">
                  {output.stderr}
                </div>
              )}
              {!output.stdout && !output.stderr && (
                <div className="px-3 py-2 text-[12px] text-muted-foreground italic">
                  无输出
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
