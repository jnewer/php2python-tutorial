'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  const answeredCount = Object.keys(selectedAnswers).length;
  const allAnswered = answeredCount === questions.length;
  const correctCount = questions.filter((q, idx) => selectedAnswers[`q${idx}`] === q.correctIndex).length;

  const handleSelect = (qi: number, oi: number) => {
    setSelectedAnswers(prev => ({ ...prev, [`q${qi}`]: oi }));
    setShowExplanations(prev => ({ ...prev, [`q${qi}`]: true }));
  };

  return (
    <div className="space-y-4 mt-4">
      <h6 className="text-xs font-semibold text-foreground uppercase tracking-wider flex items-center gap-1.5">
        <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
        课后测验
      </h6>

      <div className="space-y-3">
        {questions.map((q, qi) => {
          const selected = selectedAnswers[`q${qi}`];
          const showExp = showExplanations[`q${qi}`];
          const isCorrect = selected === q.correctIndex;

          return (
            <Card key={q.id} className={cn(
              'border transition-colors',
              selected !== undefined
                ? isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-red-500/30 bg-red-500/5'
                : 'border-border'
            )}>
              <CardContent className="p-4 space-y-3">
                <p className="text-sm font-medium text-foreground">
                  <span className="text-muted-foreground mr-2">Q{qi + 1}.</span>
                  {q.question}
                </p>

                <div className="space-y-1.5">
                  {q.options.map((opt, oi) => {
                    const isSelected = selected === oi;
                    const isCorrectOption = oi === q.correctIndex;

                    return (
                      <button
                        key={oi}
                        onClick={() => selected === undefined && handleSelect(qi, oi)}
                        disabled={selected !== undefined}
                        className={cn(
                          'w-full text-left px-3 py-2 rounded-lg text-sm border transition-all flex items-center gap-2',
                          selected === undefined
                            ? 'border-border hover:border-primary/50 hover:bg-primary/5 cursor-pointer'
                            : isSelected && isCorrectOption
                              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
                              : isSelected && !isCorrectOption
                                ? 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-300'
                                : !isSelected && isCorrectOption
                                  ? 'border-emerald-500/50 bg-emerald-500/5 text-emerald-700 dark:text-emerald-300'
                                  : 'border-border/50 text-muted-foreground'
                        )}
                      >
                        <span className="shrink-0">
                          {selected !== undefined && isSelected && isCorrectOption && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          )}
                          {selected !== undefined && isSelected && !isCorrectOption && (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                          {selected !== undefined && !isSelected && isCorrectOption && (
                            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                          )}
                          {selected === undefined && (
                            <span className="w-4 h-4 rounded-full border border-muted-foreground/30 inline-block" />
                          )}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                <AnimatePresence>
                  {showExp && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="flex gap-2 items-start p-2.5 rounded-lg bg-amber-500/5 border border-amber-500/20 overflow-hidden"
                    >
                      <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <p className="text-xs text-amber-700 dark:text-amber-300 leading-relaxed">{q.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {allAnswered && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            'p-3 rounded-lg text-center text-sm font-medium',
            correctCount === questions.length
              ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300'
              : correctCount >= questions.length / 2
                ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300'
                : 'bg-red-500/10 text-red-700 dark:text-red-300'
          )}
        >
          {correctCount === questions.length
            ? '🎉 全部正确！你对这节课的知识掌握得非常好！'
            : `答对 ${correctCount}/${questions.length} 题，${correctCount >= questions.length / 2 ? '继续加油！' : '建议重新复习本节内容。'}`}
        </motion.div>
      )}
    </div>
  );
}
