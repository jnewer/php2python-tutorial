'use client';

import { useMemo } from 'react';
import { BookOpen, ChevronDown, Play, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/course/fade-in';
import { modules } from '@/lib/course-data';

export function HeroSection({
  onScrollTo,
  onContinueLearning,
  completedLessonCount,
}: {
  onScrollTo: (id: string) => void;
  onContinueLearning: (moduleId: number) => void;
  completedLessonCount: number;
}) {
  // Find the next incomplete module for the "continue" button
  const nextModule = useMemo(() => {
    if (completedLessonCount === 0) return null;
    for (const mod of modules) {
      for (const lesson of mod.lessons) {
        // We don't have access to completedLessons Set here, so we use count > 0 as heuristic
        // Actual resolution happens in page.tsx
      }
    }
    return null;
  }, [completedLessonCount]);

  const hasProgress = completedLessonCount > 0;

  return (
    <section id="overview" className="relative overflow-hidden pt-16 pb-12 md:pt-24 md:pb-16"
      style={{ scrollMarginTop: '68px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-violet-500/5" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <Badge variant="secondary" className="text-xs px-3 py-1 gap-1.5">
              <Sparkles className="h-3 w-3 text-amber-500" />
              专为 PHP 开发者设计 · 20 天掌握 Python 核心
            </Badge>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                PHP 开发者的
              </span>
              <br />
              <span className="text-foreground">Python 快速进阶之路</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              利用你已有的 PHP 编程经验，通过对比学习法快速掌握 Python。
              <br className="hidden sm:block" />
              每个知识点都有 PHP vs Python 代码对照，让迁移学习更加高效。
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {hasProgress ? (
                <Button size="lg" onClick={() => onContinueLearning(0)} className="gap-2 shadow-md">
                  <Play className="h-4 w-4" />
                  继续学习
                </Button>
              ) : (
                <Button size="lg" onClick={() => onScrollTo('modules')} className="gap-2 shadow-md">
                  <BookOpen className="h-4 w-4" />
                  开始学习
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={() => onScrollTo('cheatsheet')} className="gap-2">
                <Terminal className="h-4 w-4" />
                查看速查表
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <FadeIn delay={0.6}>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pb-2">
          <button
            onClick={() => onScrollTo('modules')}
            className="flex flex-col items-center gap-1 text-muted-foreground/50 hover:text-muted-foreground transition-colors cursor-pointer"
            aria-label="向下滚动查看课程模块"
          >
            <span className="text-[10px] uppercase tracking-widest">课程模块</span>
            <ChevronDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </FadeIn>
    </section>
  );
}
