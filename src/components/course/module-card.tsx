'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Clock,
  ArrowRight,
  CheckCircle2,
  Star,
  Code2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { CodeComparisonPanel } from '@/components/course/code-comparison-panel';
import { Quiz } from '@/components/course/quiz';
import { CelebrationOverlay } from '@/components/course/celebration-overlay';
import { DIFF_COLORS } from '@/lib/constants';
import { quizData } from '@/lib/quiz-data';
import { cn } from '@/lib/utils';
import type { Module } from '@/lib/course-data';

export function ModuleCard({ module, isExpanded, onToggle, completedLessons, onCompleteLesson, onCopyCode, showToast }: {
  module: Module;
  isExpanded: boolean;
  onToggle: () => void;
  completedLessons: Set<string>;
  onCompleteLesson: (key: string) => void;
  onCopyCode?: (lang: string) => void;
  showToast: (msg: string, type: 'complete' | 'uncomplete') => void;
}) {
  const totalLessons = module.lessons.length;
  const completedCount = module.lessons.filter(l => completedLessons.has(`${module.id}-${l.title}`)).length;
  const progress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const [justCompleted, setJustCompleted] = useState(false);

  const handleComplete = (lessonKey: string, lessonTitle: string) => {
    const wasCompleted = completedLessons.has(lessonKey);
    onCompleteLesson(lessonKey);
    if (!wasCompleted) {
      showToast(`已完成: ${lessonTitle}`, 'complete');
    } else {
      showToast(`已取消: ${lessonTitle}`, 'uncomplete');
    }
  };

  // Detect module just completed
  useEffect(() => {
    if (completedCount === totalLessons && totalLessons > 0 && !justCompleted) {
      const timer = setTimeout(() => {
        setJustCompleted(true);
        setTimeout(() => setJustCompleted(false), 3000);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [completedCount, totalLessons, justCompleted]);

  return (
    <>
      <Card className={cn(
        'overflow-hidden transition-all duration-300 border-2',
        isExpanded
          ? 'border-primary/30 shadow-lg shadow-primary/5'
          : 'border-border hover:border-primary/15 hover:shadow-md'
      )}>
        <button
          onClick={onToggle}
          className="w-full text-left cursor-pointer"
          aria-expanded={isExpanded}
          aria-controls={`module-content-${module.id}`}
        >
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={cn(
                  'flex items-center justify-center w-12 h-12 rounded-xl text-xl shrink-0 bg-gradient-to-br shadow-sm',
                  module.color
                )}>
                  {module.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">{module.id}/8</Badge>
                    <span className={cn('px-2 py-0.5 rounded-full text-[11px] font-semibold', DIFF_COLORS[module.difficulty])}>
                      {module.difficulty}
                    </span>
                    {completedCount === totalLessons && totalLessons > 0 && (
                      <Badge className="text-[10px] px-1.5 py-0 gap-0.5 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-0">
                        <CheckCircle2 className="h-3 w-3" /> 已完成
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-base md:text-lg leading-tight">{module.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{module.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 mt-1">
                <Badge variant="outline" className="text-xs gap-1 hidden sm:inline-flex">
                  <Clock className="h-3 w-3" />
                  {module.duration}
                </Badge>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                </motion.div>
              </div>
            </div>
            <div className="mt-2 flex items-center gap-3">
              <Progress value={progress} className="h-1.5 flex-1" />
              <span className="text-xs text-muted-foreground shrink-0">
                {completedCount}/{totalLessons} 课时
              </span>
            </div>
          </CardHeader>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={`module-content-${module.id}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0">
                <Separator className="mb-4" />

                {module.phpConcept && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 shrink-0">PHP</span>
                      <span className="text-sm text-muted-foreground">{module.phpConcept}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 hidden sm:block self-center" />
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-500/15 text-amber-700 dark:text-amber-400 shrink-0">Python</span>
                      <span className="text-sm text-foreground font-medium">{module.pythonConcept}</span>
                    </div>
                  </div>
                )}

                <Accordion type="single" collapsible className="w-full">
                  {module.lessons.map((lesson, idx) => {
                    const lessonKey = `${module.id}-${lesson.title}`;
                    const isCompleted = completedLessons.has(lessonKey);
                    return (
                      <AccordionItem key={idx} value={`lesson-${idx}`} className="border-border/60">
                        <AccordionTrigger className="py-3 hover:no-underline">
                          <div className="flex items-center gap-3 text-left">
                            <div
                              role="checkbox"
                              tabIndex={0}
                              aria-checked={isCompleted}
                              aria-label={isCompleted ? `取消完成: ${lesson.title}` : `标记完成: ${lesson.title}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleComplete(lessonKey, lesson.title);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleComplete(lessonKey, lesson.title);
                                }
                              }}
                              className={cn(
                                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all shrink-0 hover:scale-110 cursor-pointer',
                                isCompleted
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-muted-foreground/30 hover:border-primary'
                              )}
                            >
                              {isCompleted && <CheckCircle2 className="h-3.5 w-3.5" />}
                            </div>
                            <div className="min-w-0">
                              <span className={cn('text-sm font-medium', isCompleted && 'line-through text-muted-foreground')}>
                                {lesson.title}
                              </span>
                              <div className="flex items-center gap-2 mt-0.5">
                                <Badge variant="outline" className="text-[10px] px-1 py-0 gap-0.5">
                                  <Clock className="h-2.5 w-2.5" />
                                  {lesson.duration}
                                </Badge>
                                <span className="text-[11px] text-muted-foreground">
                                  {lesson.codeExamples.length} 个代码对比
                                </span>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 pl-8 pt-2">
                            <p className="text-sm text-muted-foreground leading-relaxed">{lesson.description}</p>

                            <div className="space-y-1.5">
                              <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Star className="h-3.5 w-3.5 text-amber-500" />
                                核心要点
                              </h6>
                              <ul className="space-y-1">
                                {lesson.keyPoints.map((point, pi) => (
                                  <li key={pi} className="flex items-start gap-2 text-sm text-muted-foreground">
                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="space-y-4">
                              <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                                <Code2 className="h-3.5 w-3.5 text-primary" />
                                代码对比
                              </h6>
                              {lesson.codeExamples.map((comp, ci) => (
                                <CodeComparisonPanel key={ci} comparison={comp} onCopy={onCopyCode} />
                              ))}
                            </div>

                            {/* Quiz */}
                            {quizData[`${module.id}-${idx}`] && (
                              <Quiz questions={quizData[`${module.id}-${idx}`]} />
                            )}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
      <CelebrationOverlay show={justCompleted} onDone={() => setJustCompleted(false)} />
    </>
  );
}
