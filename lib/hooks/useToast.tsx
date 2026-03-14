'use client';

import { useState, useCallback, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

type ToastType = 'success' | 'info' | 'warning' | 'error';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

// Module-level singleton so all hook instances share the same toast list
const listeners: Array<(toasts: Toast[]) => void> = [];
let toastList: Toast[] = [];

function emitChange() {
  listeners.forEach((l) => l([...toastList]));
}

function addToast(message: string, type: ToastType = 'info') {
  const id = Math.random().toString(36).slice(2);
  toastList = [...toastList, { id, message, type }];
  emitChange();
  setTimeout(() => {
    toastList = toastList.filter((t) => t.id !== id);
    emitChange();
  }, 3200);
}

// ── Hook ─────────────────────────────────────────────────────
export function useToast() {
  const toast = useCallback((message: string, type: ToastType = 'info') => {
    addToast(message, type);
  }, []);
  return { toast };
}

// ── Toaster component ─────────────────────────────────────────
const TYPE_STYLES: Record<ToastType, string> = {
  success: 'bg-brand-green text-white',
  info:    'bg-navy-600 text-white',
  warning: 'bg-brand-gold text-white',
  error:   'bg-red-600 text-white',
};

export function Toaster() {
  const [current, setCurrent] = useState<Toast[]>([]);

  useEffect(() => {
    const handler = (updated: Toast[]) => setCurrent(updated);
    listeners.push(handler);
    return () => {
      const i = listeners.indexOf(handler);
      if (i >= 0) listeners.splice(i, 1);
    };
  }, []);

  return (
    <div
      aria-live="polite"
      className="fixed bottom-[calc(var(--nav-height,72px)+16px)] left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none w-[calc(100%-2rem)]"
    >
      <AnimatePresence>
        {current.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.22 }}
            className={cn(
              'font-body text-[15px] px-5 py-2.5 rounded-full shadow-l text-center w-full max-w-xs',
              TYPE_STYLES[t.type]
            )}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
