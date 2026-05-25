'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/course/fade-in';
import { learningPath } from '@/lib/learning-path-data';

// Map learning path phases to module IDs
const PHASE_TO_MODULE: Record<number, number> = {
  0: 1, // Day 1 → Module 1: 环境搭建与快速入门
  1: 2, // Day 2-3 → Module 2: 基础语法对比
  2: 3, // Day 4-5 → Module 3: 控制流与数据结构
  3: 4, // Day 6-7 → Module 4: 函数与模块化
  4: 5, // Day 8-10 → Module 5: 面向对象编程
  5: 6, // Day 11-12 → Module 6: 异常处理与文件操作
  6: 7, // Day 13-15 → Module 7: Web 开发入门
  7: 8, // Day 16-20 → Module 8: 高级特性与实战
};

export function LearningPathTimeline({ onPhaseClick }: { onPhaseClick?: (dayLabel: string, moduleId: number) => void }) {
  return (
    <div className="relative">
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-violet-500 to-fuchsia-500 opacity-30" />

      <div className="space-y-4">
        {learningPath.map((phase, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div
              className="relative flex gap-4 md:gap-6 group cursor-pointer"
              onClick={() => onPhaseClick?.(phase.day, PHASE_TO_MODULE[idx])}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onPhaseClick?.(phase.day, PHASE_TO_MODULE[idx]);
                }
              }}
              aria-label={`跳转到第 ${phase.day} 天：${phase.title}`}
            >
              <div
                className="relative z-10 w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform"
                style={{ backgroundColor: `${phase.color}15`, border: `2px solid ${phase.color}40` }}
              >
                <span className="text-sm font-bold" style={{ color: phase.color }}>
                  Day {phase.day}
                </span>
              </div>

              <Card className="flex-1 group-hover:shadow-md group-hover:border-primary/20 transition-all">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{phase.title}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.milestones.map((m, mi) => (
                      <Badge key={mi} variant="secondary" className="text-[11px]">
                        {m}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
