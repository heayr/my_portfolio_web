'use client';

import { useCallback } from 'react';

/**
 * Universal Scroll Lock Hook
 * Safely synchronizes document body/html overflow styles with Lenis smooth scroll engine.
 */
export function useScrollLock() {
  const lock = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    (window as any).lenis?.stop();
  }, []);

  const unlock = useCallback(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    (window as any).lenis?.start();
  }, []);

  return { lock, unlock };
}
