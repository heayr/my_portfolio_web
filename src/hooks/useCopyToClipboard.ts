'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Universal Clipboard hook with auto-reset feedback timer.
 * Follows Single Responsibility Principle (SRP) and zero memory leak guarantee.
 */
export function useCopyToClipboard(resetDelayMs: number = 2400) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up timer on unmount to prevent state updates on unmounted components
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const copy = useCallback(
    async (text: string): Promise<boolean> => {
      if (!navigator?.clipboard) {
        return false;
      }
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);

        // Clear existing timer if user clicks multiple times rapidly
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
          setCopied(false);
          timerRef.current = null;
        }, resetDelayMs);

        return true;
      } catch {
        return false;
      }
    },
    [resetDelayMs]
  );

  return { copied, isCopied: copied, copy };
}
