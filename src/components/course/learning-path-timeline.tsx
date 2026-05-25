'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/course/fade-in';
import { learningPath } from '@/lib/course-data';

export function LearningPathTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-violet-500 to-fuchsia-500 opacity-30" />

      <div className="space-y-4">
        {learningPath.map((phase, idx) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="relative flex gap-4 md:gap-6">
              <div
                className="relative z-10 w-12 md:w-16 h-12 md:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg"
                style={{ backgroundColor: `${phase.color}15`, border: `2px solid ${phase.color}40` }}
              >
                <span className="text-sm font-bold" style={{ color: phase.color }}>
                  Day {phase.day}
                </span>
              </div>

              <Card className="flex-1 hover:shadow-md transition-shadow">
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
