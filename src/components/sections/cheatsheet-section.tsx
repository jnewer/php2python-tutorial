'use client';

import { Terminal, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FadeIn } from '@/components/course/fade-in';
import { phpToPythonMap } from '@/lib/cheatsheet-data';
import { QUICK_TIPS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function CheatsheetSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCheatsheet = useMemo(() => {
    if (!searchQuery.trim()) return phpToPythonMap;
    const q = searchQuery.toLowerCase();
    return phpToPythonMap.filter(item =>
      item.php.toLowerCase().includes(q) ||
      item.python.toLowerCase().includes(q) ||
      (item.note && item.note.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <section id="cheatsheet" className="py-16 md:py-20"
      style={{ scrollMarginTop: '68px' }}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-10 space-y-2">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <Terminal className="h-3 w-3" />
              速查手册
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">PHP → Python 语法速查表</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              最常用的语法对照，贴在桌旁随时查阅
            </p>
          </div>
        </FadeIn>

        {/* Search */}
        <FadeIn delay={0.05}>
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索语法对照..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
                aria-label="搜索速查表"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="清除搜索"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            {searchQuery.trim() && (
              <p className="text-xs text-muted-foreground mt-2 text-center">
                找到 {filteredCheatsheet.length} / {phpToPythonMap.length} 条匹配
              </p>
            )}
          </div>
        </FadeIn>

        {/* Desktop Table */}
        <FadeIn delay={0.1}>
          <Card className="overflow-hidden hidden md:block">
            <CardContent className="p-0">
              <ScrollArea className="w-full">
                <div className="min-w-[540px]">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-10">#</th>
                        <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-indigo-500" />
                            PHP
                          </span>
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            Python
                          </span>
                        </th>
                        <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                          备注
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCheatsheet.map((item, idx) => (
                        <tr
                          key={idx}
                          className={cn(
                            'border-b border-border/50 transition-colors hover:bg-muted/30',
                            idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                          )}
                        >
                          <td className="px-4 py-2.5 text-muted-foreground text-xs tabular-nums">{idx + 1}</td>
                          <td className="px-4 py-2.5">
                            <code className="text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md font-mono break-all">
                              {item.php}
                            </code>
                          </td>
                          <td className="px-4 py-2.5">
                            <code className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md font-mono break-all">
                              {item.python}
                            </code>
                          </td>
                          <td className="px-4 py-2.5 text-xs text-muted-foreground">
                            {item.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Mobile Card Layout */}
          <div className="md:hidden space-y-3">
            {filteredCheatsheet.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Search className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">没有找到匹配的语法</p>
                </CardContent>
              </Card>
            ) : (
              filteredCheatsheet.map((item, idx) => (
                <Card key={idx} className="overflow-hidden">
                  <CardContent className="p-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-xs text-muted-foreground tabular-nums shrink-0 mt-0.5">#{idx + 1}</span>
                      <div className="flex-1 min-w-0 space-y-2">
                        <div>
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">PHP</span>
                          <code className="block mt-1 text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md font-mono break-all">
                            {item.php}
                          </code>
                        </div>
                        <div>
                          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Python</span>
                          <code className="block mt-1 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md font-mono break-all">
                            {item.python}
                          </code>
                        </div>
                        {item.note && (
                          <p className="text-xs text-muted-foreground">{item.note}</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </FadeIn>

        {/* Quick Tips */}
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            {QUICK_TIPS.map((tip, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className={cn('p-2 rounded-lg w-fit mb-3', tip.bg)}>
                    <tip.icon className={cn('h-5 w-5', tip.color)} />
                  </div>
                  <h4 className="font-semibold text-sm mb-2">{tip.title}</h4>
                  <ul className="space-y-1.5">
                    {tip.tips.map((t, ti) => {
                      const tipData = t as { label: string; url?: string };
                      const content = (
                        <li key={ti} className="text-xs text-muted-foreground flex items-start gap-1.5">
                          <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
                          <code className="font-mono text-xs">{tipData.label}</code>
                          {tipData.url && (
                            <svg className="h-3 w-3 mt-0.5 shrink-0 text-primary" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
                          )}
                        </li>
                      );
                      return tipData.url
                        ? <a key={ti} href={tipData.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{content}</a>
                        : <div key={ti}>{content}</div>;
                    })}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
