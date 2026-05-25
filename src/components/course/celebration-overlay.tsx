'use client';

import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

export function CelebrationOverlay({ show, onDone }: { show: boolean; onDone: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onDone, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onDone]);

  const emojis = ['🎉', '🏆', '⭐', '✨', '🌟', '🎊', '💫', '🥇'];
  const particles = useMemo(() => Array.from({ length: 24 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 1.5,
    emoji: emojis[i % emojis.length],
    size: 20 + Math.random() * 16,
  })), []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ top: '-5%', left: `${p.x}%`, opacity: 1, rotate: 0, scale: 0 }}
          animate={{ top: '105%', opacity: [1, 1, 0], rotate: [0, 360], scale: [0, 1.2, 0.8] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          className="absolute"
          style={{ fontSize: p.size }}
        >
          {p.emoji}
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
      >
        <div className="bg-background rounded-2xl shadow-2xl px-8 py-6 border">
          <div className="text-5xl mb-3">🎉</div>
          <h3 className="text-xl font-bold mb-1">恭喜完成！</h3>
          <p className="text-muted-foreground text-sm">你已完成本模块所有课时</p>
        </div>
      </motion.div>
    </div>
  );
}
