'use client';

import { TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/course/fade-in';
import { LearningPathTimeline } from '@/components/course/learning-path-timeline';
import { HEADER_HEIGHT } from '@/lib/constants';

export function RoadmapSection({ onExpandModule }: { onExpandModule?: (moduleId: number) => void }) {
  const handlePhaseClick = (dayLabel: string, moduleId: number) => {
    // Scroll to modules section
    const el = document.getElementById('modules');
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    // Auto-expand the corresponding module
    onExpandModule?.(moduleId);
  };

  return (
    <section id="roadmap" className="py-16 md:py-20"
      style={{ scrollMarginTop: `${HEADER_HEIGHT + 12}px` }}>
      <div className="container mx-auto px-4 md:px-6">
        <FadeIn>
          <div className="text-center mb-10 space-y-2">
            <Badge variant="secondary" className="gap-1.5 text-xs">
              <TrendingUp className="h-3 w-3" />
              学习路线
            </Badge>
            <h2 className="text-2xl md:text-3xl font-bold">20 天学习路径</h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              循序渐进的学习计划，点击跳转到对应模块开始学习
            </p>
          </div>
        </FadeIn>
        <div className="max-w-2xl mx-auto">
          <LearningPathTimeline onPhaseClick={handlePhaseClick} />
        </div>
      </div>
    </section>
  );
}
