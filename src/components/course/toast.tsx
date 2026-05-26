'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, CheckCircle2, RotateCcw, PartyPopper } from 'lucide-react';

export function Toast({ message, type = 'copy' }: { message: string; type?: 'copy' | 'complete' | 'uncomplete' | 'celebrate' }) {
  const icons = {
    copy: <CheckCircle className="h-4 w-4 text-green-400" />,
    complete: <CheckCircle2 className="h-4 w-4 text-emerald-400" />,
    uncomplete: <RotateCcw className="h-4 w-4 text-amber-400" />,
    celebrate: <PartyPopper className="h-4 w-4 text-amber-400" />,
  };
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-xl bg-foreground text-background shadow-xl flex items-center gap-2 text-sm font-medium pointer-events-none bottom-[calc(72px+env(safe-area-inset-bottom,0px))] md:bottom-6"
        >
          {icons[type]}
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
