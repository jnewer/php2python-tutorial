'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Search, Expand, Shrink, RotateCcw, GraduationCap, Layers, Filter, X, CheckCheck, Download, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { FadeIn } from '@/components/course/fade-in';
import { ModuleCard } from '@/components/course/module-card';
import { modules } from '@/lib/course-data';
import { cn } from '@/lib/utils';
import { DIFF_COLORS, DIFFICULTY_OPTIONS } from '@/lib/constants';
import { updateProgress } from '@/lib/progress-store';

type ModulesSectionProps = {
  completedLessons: Set<string>;
  onCompleteLesson: (key: string) => void;
  onCopyCode: (lang: string) => void;
  showToast: (msg: string, type: 'complete' | 'uncomplete') => void;
  expandModuleId?: number | null;
};

export function ModulesSection({ completedLessons, onCompleteLesson, onCopyCode, showToast, expandModuleId }: ModulesSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('全部');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1]));
  const prevExpandRef = useRef<number | null | undefined>(null);

  // Auto-expand module when expandModuleId changes
  useEffect(() => {
    if (expandModuleId != null && expandModuleId !== prevExpandRef.current) {
      prevExpandRef.current = expandModuleId;
      setExpandedModules(prev => new Set([...prev, expandModuleId]));
    }
  }, [expandModuleId]);

  const totalLessons = 36;
  const completedCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const isAllComplete = completedCount === totalLessons && totalLessons > 0;

  const filteredModules = useMemo(() => {
    return modules.filter(m => {
      if (difficultyFilter !== '全部' && m.difficulty !== difficultyFilter) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        m.title.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.lessons.some(l =>
          l.title.toLowerCase().includes(q) ||
          l.keyPoints.some(kp => kp.toLowerCase().includes(q))
        )
      );
    });
  }, [difficultyFilter, searchQuery]);

  const hasActiveFilter = difficultyFilter !== '全部' || searchQuery.trim() !== '';

  const toggleModule = useCallback((id: number) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setExpandedModules(new Set(filteredModules.map(m => m.id)));
  }, [filteredModules]);

  const collapseAll = useCallback(() => {
    setExpandedModules(new Set());
  }, []);

  // Generate all lesson keys
  const allLessonKeys = useMemo(() =>
    modules.flatMap(m => m.lessons.map(l => `${m.id}-${l.title}`)),
  []);

  const resetProgress = useCallback(() => {
    updateProgress(() => new Set());
    setShowResetConfirm(false);
    showToast('学习进度已重置', 'uncomplete');
  }, [showToast]);

  const markAllComplete = useCallback(() => {
    updateProgress(() => new Set(allLessonKeys));
    showToast('已标记全部课时为完成', 'complete');
  }, [allLessonKeys, showToast]);

  const exportProgress = useCallback(() => {
    const data = JSON.stringify([...completedLessons], null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `php2python-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('进度已导出', 'complete');
  }, [completedLessons, showToast]);

  const importProgress = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const keys = JSON.parse(reader.result as string) as string[];
        if (Array.isArray(keys)) {
          updateProgress(() => new Set(keys));
          showToast('进度已导入', 'complete');
        }
      } catch {
        showToast('导入失败：文件格式无效', 'uncomplete');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // reset input
  }, [showToast]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section id="modules" className="py-16 md:py-20 bg-muted/20"
      style={{ scrollMarginTop: '68px' }}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-10 space-y-2">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <Layers className="h-3 w-3" />
              课程内容
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">8 大核心模块</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              点击模块展开详细内容，包含代码对比、核心要点和学习笔记
            </p>
          </div>
        </FadeIn>

        {/* Progress Overview */}
        <FadeIn delay={0.1}>
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/[0.02]">
            <CardContent className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">学习进度</h3>
                    <p className="text-xs text-muted-foreground">
                      已完成 {completedCount} / {totalLessons} 个课时
                      {completedCount > 0 && (
                        <span className="text-foreground/70">
                          {' '}· 进度已自动保存
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex-1">
                  <Progress value={overallProgress} className="h-2.5" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    'text-lg font-bold tabular-nums',
                    isAllComplete ? 'text-amber-500' : 'text-primary'
                  )}>
                    {Math.round(overallProgress)}%
                  </span>
                  <div className="flex items-center gap-0.5">
                    {/* Mark all complete */}
                    {!isAllComplete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllComplete}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-emerald-500 cursor-pointer"
                        aria-label="全部标记完成"
                        title="全部标记完成"
                      >
                        <CheckCheck className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {/* Export progress */}
                    {completedCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={exportProgress}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-primary cursor-pointer"
                        aria-label="导出进度"
                        title="导出进度"
                      >
                        <Download className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    {/* Import progress */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-primary cursor-pointer"
                      aria-label="导入进度"
                      title="导入进度"
                    >
                      <Upload className="h-3.5 w-3.5" />
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={importProgress}
                      aria-label="导入进度文件"
                    />
                    {completedCount > 0 && (
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowResetConfirm(true)}
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive cursor-pointer"
                          aria-label="重置进度"
                          title="重置进度"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </Button>
                        <AnimatePresence>
                          {showResetConfirm && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9, y: -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.9, y: -4 }}
                              className="absolute right-0 top-full mt-1 w-40 p-2 bg-popover border rounded-lg shadow-lg z-50"
                            >
                              <p className="text-xs text-muted-foreground mb-2">确定重置所有进度？</p>
                              <div className="flex gap-1">
                                <Button size="sm" variant="destructive" className="flex-1 h-7 text-xs" onClick={resetProgress}>
                                  确定重置
                                </Button>
                                <Button size="sm" variant="outline" className="flex-1 h-7 text-xs" onClick={() => setShowResetConfirm(false)}>
                                  取消
                                </Button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Search & Filter Bar */}
        <FadeIn delay={0.15}>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索模块、课时或关键词..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9"
                aria-label="搜索课程内容"
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
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Filter className="h-3.5 w-3.5 text-muted-foreground ml-1" />
                {DIFFICULTY_OPTIONS.map(diff => (
                  <Button
                    key={diff}
                    variant={difficultyFilter === diff ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setDifficultyFilter(diff)}
                    className={cn(
                      'h-9 text-xs px-2.5',
                      difficultyFilter === diff && DIFF_COLORS[diff] && 'border-0'
                    )}
                  >
                    {diff}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Expand / Collapse All */}
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="sm" onClick={expandAll} className="h-8 text-xs gap-1 text-muted-foreground">
              <Expand className="h-3.5 w-3.5" />
              全部展开
            </Button>
            <Button variant="ghost" size="sm" onClick={collapseAll} className="h-8 text-xs gap-1 text-muted-foreground">
              <Shrink className="h-3.5 w-3.5" />
              全部收起
            </Button>
            {hasActiveFilter && (
              <Badge variant="secondary" className="text-[10px] ml-1">
                显示 {filteredModules.length} / {modules.length} 个模块
              </Badge>
            )}
          </div>
        </FadeIn>

        {/* Module List */}
        <div className="space-y-4">
          {filteredModules.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="p-12 text-center">
                <Search className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">没有找到匹配的课程内容</p>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => { setSearchQuery(''); setDifficultyFilter('全部'); }}
                  className="mt-2 text-xs"
                >
                  清除筛选条件
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredModules.map((module, idx) => (
              <FadeIn key={module.id} delay={idx * 0.05}>
                <ModuleCard
                  module={module}
                  isExpanded={expandedModules.has(module.id)}
                  onToggle={() => toggleModule(module.id)}
                  completedLessons={completedLessons}
                  onCompleteLesson={onCompleteLesson}
                  onCopyCode={onCopyCode}
                  showToast={showToast}
                />
              </FadeIn>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
