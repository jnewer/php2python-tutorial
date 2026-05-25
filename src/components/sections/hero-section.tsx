'use client';

import { BookOpen, Sparkles, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/course/fade-in';

export function HeroSection({ onScrollTo }: { onScrollTo: (id: string) => void }) {
  return (
    <section id="overview" className="relative overflow-hidden py-16 md:py-24"
      style={{ scrollMarginTop: '68px' }}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-violet-500/5" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <FadeIn>
            <Badge variant="secondary" className="text-xs px-3 py-1 gap-1.5">
              <Sparkles className="h-3 w-3 text-amber-500" />
              专为 PHP 开发者设计 · 20 天精通 Python
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
              <Button size="lg" onClick={() => onScrollTo('modules')} className="gap-2 shadow-md">
                <BookOpen className="h-4 w-4" />
                开始学习
              </Button>
              <Button size="lg" variant="outline" onClick={() => onScrollTo('cheatsheet')} className="gap-2">
                <Terminal className="h-4 w-4" />
                查看速查表
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
