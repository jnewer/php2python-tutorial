'use client';

import { useState, useEffect, useCallback, useSyncExternalStore } from 'react';
import { subscribeProgress, getProgressSnapshot, getServerProgressSnapshot, updateProgress } from '@/lib/progress-store';
import { HEADER_HEIGHT, NAV_ITEMS } from '@/lib/constants';
import { TOTAL_LESSONS, modules } from '@/lib/course-data';
import { NavigationBar } from '@/components/sections/navigation-bar';
import { HeroSection } from '@/components/sections/hero-section';
import { StatsSection } from '@/components/sections/stats-section';
import { RoadmapSection } from '@/components/sections/roadmap-section';
import { ModulesSection } from '@/components/sections/modules-section';
import { CheatsheetSection } from '@/components/sections/cheatsheet-section';
import { FooterSection } from '@/components/sections/footer-section';
import { Toast } from '@/components/course/toast';
import { ScrollToTop } from '@/components/course/scroll-to-top';

export default function PythonCoursePage() {
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'copy' | 'complete' | 'uncomplete' | 'celebrate'>('copy');
  const [activeSection, setActiveSection] = useState('overview');
  const [expandModuleId, setExpandModuleId] = useState<number | null>(null);

  // Progress state via external store
  const completedLessons = useSyncExternalStore(subscribeProgress, getProgressSnapshot, getServerProgressSnapshot);

  const completedCount = completedLessons.size;
  const overallProgress = TOTAL_LESSONS > 0 ? (completedCount / TOTAL_LESSONS) * 100 : 0;

  // Unified toast
  const showToast = useCallback((msg: string, type: 'complete' | 'uncomplete' | 'copy') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 2000);
  }, []);

  const handleCompleteLesson = useCallback((key: string) => {
    updateProgress(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const handleCopyCode = useCallback((lang: string) => {
    showToast(`${lang} 代码已复制`, 'copy');
  }, [showToast]);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // "继续学习"：找到第一个未完成的课时所属模块，滚动并展开
  const handleContinueLearning = useCallback((moduleId: number) => {
    // Find the first module with incomplete lessons
    let targetModuleId = moduleId;
    if (moduleId === 0) {
      // Auto-detect: find first module that has any incomplete lesson
      for (const mod of modules) {
        const hasIncomplete = mod.lessons.some(
          lesson => !completedLessons.has(`${mod.id}-${lesson.title}`)
        );
        if (hasIncomplete) {
          targetModuleId = mod.id;
          break;
        }
      }
      // If all complete, go to first module
      if (targetModuleId === 0) targetModuleId = 1;
    }
    setExpandModuleId(targetModuleId);
    // Small delay so expand state settles before scrolling
    setTimeout(() => scrollToSection('modules'), 100);
  }, [completedLessons, scrollToSection]);

  // Active section tracking via IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map(n => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: `-${HEADER_HEIGHT + 20}px 0px -50% 0px`, threshold: 0 }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavigationBar activeSection={activeSection} onScrollTo={scrollToSection} />

      <main className="flex-1">
        <HeroSection
          onScrollTo={scrollToSection}
          onContinueLearning={handleContinueLearning}
          completedLessonCount={completedCount}
        />
        <StatsSection />
        <RoadmapSection onExpandModule={setExpandModuleId} />
        <ModulesSection
          completedLessons={completedLessons}
          onCompleteLesson={handleCompleteLesson}
          onCopyCode={handleCopyCode}
          showToast={showToast}
          expandModuleId={expandModuleId}
        />
        <CheatsheetSection />
      </main>

      <FooterSection
        completedCount={completedCount}
        totalLessons={TOTAL_LESSONS}
        overallProgress={overallProgress}
      />

      {/* Mobile Bottom Nav removed from here; it's inside NavigationBar */}
      <Toast message={toastMsg} type={toastType} />
      <ScrollToTop />
    </div>
  );
}
