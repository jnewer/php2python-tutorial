'use client';

import { Terminal } from 'lucide-react';

export function FooterSection({
  completedCount,
  totalLessons,
  overallProgress,
}: {
  completedCount: number;
  totalLessons: number;
  overallProgress: number;
}) {
  return (
    <footer className="border-t bg-muted/30 md:pb-0" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }}>
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                <Terminal className="h-3 w-3 text-white" />
              </div>
              <span className="font-medium text-foreground">PHP → Python 快速进阶课程</span>
            </div>
            <a href="https://github.com/jnewer/php2python-tutorial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-6 h-6 hover:opacity-80 transition-opacity" aria-label="GitHub">
              <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
          </div>
          <p className="text-center">
            专为有 PHP 经验的开发者设计 · 通过对比学习快速掌握 Python
          </p>
          <p className="tabular-nums">
            {completedCount}/{totalLessons} 课时已完成 · {Math.round(overallProgress)}%
          </p>
        </div>
      </div>
    </footer>
  );
}
