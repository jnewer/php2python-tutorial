'use client';

import { cn } from '@/lib/utils';
import { AnimatedCounter } from '@/components/course/animated-counter';
import { FadeIn } from '@/components/course/fade-in';
import { Layers, BookOpen, Code2, Terminal } from 'lucide-react';
import { TOTAL_LESSONS, TOTAL_CODE_EXAMPLES } from '@/lib/course-data';
import { phpToPythonMap } from '@/lib/cheatsheet-data';

const computedStats = [
  { value: 8, suffix: '', label: '核心模块', icon: Layers, color: 'text-violet-600 dark:text-violet-400' },
  { value: TOTAL_LESSONS, suffix: '', label: '课时内容', icon: BookOpen, color: 'text-amber-600 dark:text-amber-400' },
  { value: TOTAL_CODE_EXAMPLES, suffix: '', label: '代码对比', icon: Code2, color: 'text-emerald-600 dark:text-emerald-400' },
  { value: phpToPythonMap.length, suffix: '', label: '语法速查', icon: Terminal, color: 'text-rose-600 dark:text-rose-400' },
];

export function StatsSection() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {computedStats.map((stat, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="text-center space-y-1">
                <div className="flex justify-center mb-2">
                  <div className={cn('p-2 rounded-xl bg-background shadow-sm', stat.color)}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
