'use client';

import { useState, useEffect, useRef, useMemo, useCallback, useSyncExternalStore } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Code2,
  Terminal,
  GraduationCap,
  Sparkles,
  TrendingUp,
  Layers,
  Menu,
  X,
  Search,
  Expand,
  Shrink,
  RotateCcw,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { modules, phpToPythonMap } from '@/lib/course-data';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, HEADER_HEIGHT, DIFF_COLORS, DIFFICULTY_OPTIONS, QUICK_TIPS } from '@/lib/constants';
import { subscribeProgress, getProgressSnapshot, getServerProgressSnapshot, updateProgress } from '@/lib/progress-store';
import { AnimatedCounter } from '@/components/course/animated-counter';
import { FadeIn } from '@/components/course/fade-in';
import { Toast } from '@/components/course/toast';
import { ScrollToTop } from '@/components/course/scroll-to-top';
import { ModuleCard } from '@/components/course/module-card';
import { LearningPathTimeline } from '@/components/course/learning-path-timeline';
import { ThemeToggle } from '@/components/course/theme-toggle';

/* ═══════════════════════════════════════
   Main Page
   ═══════════════════════════════════════ */
export default function PythonCoursePage() {
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1]));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState<'copy' | 'complete' | 'uncomplete' | 'celebrate'>('copy');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('全部');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  // Progress state via external store (synced with localStorage)
  const completedLessons = useSyncExternalStore(subscribeProgress, getProgressSnapshot, getServerProgressSnapshot);

  // Memoized values — computed from actual data
  const totalLessons = useMemo(() => modules.reduce((s, m) => s + m.lessons.length, 0), []);
  const totalCodeExamples = useMemo(() => modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.codeExamples.length, 0), 0), []);
  const cheatsheetCount = phpToPythonMap.length;
  const completedCount = completedLessons.size;
  const overallProgress = totalLessons > 0 ? (completedCount / totalLessons) * 100 : 0;
  const isAllComplete = completedCount === totalLessons && totalLessons > 0;

  // Dynamic stats from real data
  const computedStats = useMemo(() => [
    { value: modules.length, suffix: '', label: '核心模块', icon: Layers, color: 'text-violet-600 dark:text-violet-400' },
    { value: totalLessons, suffix: '', label: '课时内容', icon: BookOpen, color: 'text-amber-600 dark:text-amber-400' },
    { value: totalCodeExamples, suffix: '', label: '代码对比', icon: Code2, color: 'text-emerald-600 dark:text-emerald-400' },
    { value: cheatsheetCount, suffix: '', label: '语法速查', icon: Terminal, color: 'text-rose-600 dark:text-rose-400' },
  ], [totalLessons, totalCodeExamples, cheatsheetCount]);

  // Filtered modules
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

  // Stable callbacks
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

  const toggleComplete = useCallback((key: string) => {
    updateProgress(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    updateProgress(() => new Set());
    setShowResetConfirm(false);
    setToastMsg('学习进度已重置');
    setToastType('uncomplete');
    setTimeout(() => setToastMsg(''), 2000);
  }, []);

  const showToast = useCallback((msg: string, type: 'complete' | 'uncomplete') => {
    setToastMsg(msg);
    setToastType(type);
    setTimeout(() => setToastMsg(''), 2000);
  }, []);

  const handleCopyCode = useCallback((lang: string) => {
    setToastMsg(`${lang} 代码已复制`);
    setToastType('copy');
    setTimeout(() => setToastMsg(''), 2000);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT - 12;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

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

  // Unified scroll handler
  const scrollProgressRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const newProgress = total > 0 ? (scrollY / total) * 100 : 0;
        if (Math.abs(newProgress - scrollProgressRef.current) > 0.5) {
          scrollProgressRef.current = newProgress;
          setScrollProgress(newProgress);
        }
        if (mobileMenuOpen) setMobileMenuOpen(false);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ─── Reading Progress Bar ─── */}
      <div className="fixed top-0 left-0 right-0 z-[60] h-0.5">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-500 via-violet-500 to-fuchsia-500"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* ─── Navigation Bar ─── */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-sm">
              <Terminal className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-sm md:text-base">PHP → Python 快速进阶</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="主导航">
            {NAV_ITEMS.map(item => (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'text-xs gap-1.5 transition-colors',
                  activeSection === item.id
                    ? 'text-primary bg-primary/5 font-semibold'
                    : 'text-muted-foreground'
                )}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </Button>
            ))}
            <div className="w-px h-4 bg-border mx-1" />
            <a href="https://github.com/jnewer/php2python-tutorial" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity">
              <svg className="h-[18px] w-[18px] text-foreground" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <ThemeToggle />
          </nav>

          {/* Mobile: github + theme + menu */}
          <div className="flex items-center gap-1 md:hidden">
            <a href="https://github.com/jnewer/php2python-tutorial" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="inline-flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity">
              <svg className="h-[18px] w-[18px] text-foreground" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            </a>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="切换菜单"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t overflow-hidden bg-background"
            >
              <nav className="container mx-auto px-4 py-2 flex flex-col gap-1" aria-label="移动端导航">
                {NAV_ITEMS.map(item => (
                  <Button
                    key={item.id}
                    variant="ghost"
                    size="sm"
                    onClick={() => scrollToSection(item.id)}
                    className={cn(
                      'justify-start text-sm gap-2',
                      activeSection === item.id && 'text-primary bg-primary/5 font-semibold'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        {/* ═══════════════ HERO ═══════════════ */}
        <section id="overview" className="relative overflow-hidden" style={{ scrollMarginTop: `${HEADER_HEIGHT + 12}px` }}>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-background to-violet-500/5" />
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-violet-400/10 rounded-full blur-3xl" />

          <div className="relative container mx-auto px-4 md:px-6 py-16 md:py-24">
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
                  <Button size="lg" onClick={() => scrollToSection('modules')} className="gap-2 shadow-md">
                    <BookOpen className="h-4 w-4" />
                    开始学习
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection('cheatsheet')} className="gap-2">
                    <Terminal className="h-4 w-4" />
                    查看速查表
                  </Button>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ═══════════════ STATS ═══════════════ */}
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

        {/* ═══════════════ LEARNING ROADMAP ═══════════════ */}
        <section id="roadmap" className="py-16 md:py-20" style={{ scrollMarginTop: `${HEADER_HEIGHT + 12}px` }}>
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-10 space-y-2">
                <Badge variant="secondary" className="gap-1.5 text-xs">
                  <TrendingUp className="h-3 w-3" />
                  学习路线
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold">20 天学习路径</h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  循序渐进的学习计划，每个阶段都基于前一阶段的知识基础
                </p>
              </div>
            </FadeIn>
            <div className="max-w-2xl mx-auto">
              <LearningPathTimeline />
            </div>
          </div>
        </section>

        {/* ═══════════════ COURSE MODULES ═══════════════ */}
        <section id="modules" className="py-16 md:py-20 bg-muted/20" style={{ scrollMarginTop: `${HEADER_HEIGHT + 12}px` }}>
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
                      onCompleteLesson={toggleComplete}
                      onCopyCode={handleCopyCode}
                      showToast={showToast}
                    />
                  </FadeIn>
                ))
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════ CHEAT SHEET ═══════════════ */}
        <section id="cheatsheet" className="py-16 md:py-20" style={{ scrollMarginTop: `${HEADER_HEIGHT + 12}px` }}>
          <div className="container mx-auto px-4 md:px-6">
            <FadeIn>
              <div className="text-center mb-10 space-y-2">
                <Badge variant="secondary" className="gap-1.5 text-xs">
                  <Terminal className="h-3 w-3" />
                  速查手册
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold">PHP → Python 语法速查表</h2>
                <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                  最常用的语法对照，贴在桌旁随时查阅
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <ScrollArea className="w-full">
                    <div className="min-w-[540px]">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground w-10">#</th>
                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                                PHP
                              </span>
                            </th>
                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-amber-500" />
                                Python
                              </span>
                            </th>
                            <th className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                              备注
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {phpToPythonMap.map((item, idx) => (
                            <tr
                              key={idx}
                              className={cn(
                                'border-b border-border/50 transition-colors hover:bg-muted/30',
                                idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'
                              )}
                            >
                              <td className="px-4 py-2.5 text-muted-foreground text-xs tabular-nums">{idx + 1}</td>
                              <td className="px-4 py-2.5">
                                <code className="text-xs bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded-md font-mono break-all">
                                  {item.php}
                                </code>
                              </td>
                              <td className="px-4 py-2.5">
                                <code className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-md font-mono break-all">
                                  {item.python}
                                </code>
                              </td>
                              <td className="px-4 py-2.5 text-xs text-muted-foreground">
                                {item.note}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Quick Tips */}
            <FadeIn delay={0.2}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {QUICK_TIPS.map((tip, idx) => (
                  <Card key={idx} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className={cn('p-2 rounded-lg w-fit mb-3', tip.bg)}>
                        <tip.icon className={cn('h-5 w-5', tip.color)} />
                      </div>
                      <h4 className="font-semibold text-sm mb-2">{tip.title}</h4>
                      <ul className="space-y-1.5">
                        {tip.tips.map((t, ti) => {
                          const tipData = t as { label: string; url?: string };
                          const content = (
                            <li key={ti} className="text-xs text-muted-foreground flex items-start gap-1.5">
                              <ChevronRight className="h-3 w-3 mt-0.5 shrink-0" />
                              <code className="font-mono text-xs">{tipData.label}</code>
                              {tipData.url && (
                                <svg className="h-3 w-3 mt-0.5 shrink-0 text-primary" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M12 4H6M12 4v6"/></svg>
                              )}
                            </li>
                          );
                          return tipData.url
                            ? <a key={ti} href={tipData.url} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">{content}</a>
                            : <div key={ti}>{content}</div>;
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t bg-muted/30 pb-14 md:pb-0">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center">
                  <Terminal className="h-3 w-3 text-white" />
                </div>
                <span className="font-medium text-foreground">PHP → Python 快速进阶课程</span>
              </div>
              <a href="https://github.com/jnewer/php2python-tutorial" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-6 h-6 hover:opacity-80 transition-opacity" aria-label="GitHub">
                <svg className="h-3.5 w-3.5 text-foreground" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              </a>
            </div>
            <p className="text-center">
              专为有 PHP 经验的开发者设计 · 通过对比学习快速掌握 Python
            </p>
            <p className="tabular-nums">
              {completedCount}/{totalLessons} 课时已完成 · {Math.round(overallProgress)}%
            </p>
          </div>
        </div>
      </footer>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-lg" aria-label="底部快速导航">
        <div className="flex items-center justify-around py-1">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-lg transition-colors cursor-pointer',
                activeSection === item.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              )}
              aria-label={item.label}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ─── Floating Elements ─── */}
      <Toast message={toastMsg} type={toastType} />
      <ScrollToTop />
    </div>
  );
}
