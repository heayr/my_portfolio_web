'use client';

import React from 'react';
import { useMoscowClock } from '../../hooks/useMoscowClock';

export interface MoscowClockProps {
  variant?: 'header' | 'drawer' | 'footer';
  isLight?: boolean;
  className?: string;
  fallback?: string;
}

/**
 * Universal Moscow Timezone Clock
 * Single Source of Truth for live time across Header, Drawer, and Footer.
 */
export const MoscowClock: React.FC<MoscowClockProps> = React.memo(({
  variant = 'header',
  isLight = false,
  className = '',
  fallback = '--:--:--',
}) => {
  const clock = useMoscowClock(fallback);

  if (variant === 'header') {
    return (
      <div
        className={`hidden md:flex items-center gap-1.5 text-xs pr-3 mr-1 border-r font-bold ${
          isLight ? 'border-black/15 text-zinc-700' : 'border-white/15 text-zinc-200'
        } ${className}`}
        aria-label="Moscow Time"
      >
        <span className={isLight ? 'text-zinc-500 font-bold' : 'text-zinc-400 font-bold'}>MSK</span>
        <span suppressHydrationWarning className={isLight ? 'text-zinc-900 font-bold' : 'text-white font-bold'}>
          {clock}
        </span>
      </div>
    );
  }

  if (variant === 'drawer') {
    return (
      <div
        className={`font-mono text-xs sm:text-sm tracking-wider font-bold flex items-center gap-2 ${
          isLight ? 'text-zinc-900' : 'text-zinc-200'
        } ${className}`}
      >
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
        <span>MSK (GMT+3)</span>
        <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>//</span>
        <span suppressHydrationWarning className="font-black text-amber-500">
          {clock}
        </span>
      </div>
    );
  }

  // variant === 'footer'
  return (
    <div
      suppressHydrationWarning
      className={`text-3xl sm:text-4xl lg:text-[44px] font-mono font-black tracking-tight text-white group-hover/widget:text-amber-400 transition-colors duration-300 ${className}`}
    >
      {clock}
    </div>
  );
});

MoscowClock.displayName = 'MoscowClock';
