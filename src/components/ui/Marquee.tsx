'use client';

import React from 'react';

export interface MarqueeProps {
  items: string[];
  className?: string;
  speedSec?: number;
}

/**
 * Universal Infinite Marquee Ticker Component
 * Automatically duplicates content track for seamless GPU-accelerated CSS scroll.
 */
export const Marquee: React.FC<MarqueeProps> = React.memo(({
  items,
  className = '',
}) => {
  return (
    <div
      className={`py-4 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden font-mono text-xs tracking-widest text-[var(--text-secondary)] select-none ${className}`}
      aria-hidden="true"
      suppressHydrationWarning
    >
      <div className="marquee-track" suppressHydrationWarning>
        <div className="marquee-content" suppressHydrationWarning>
          {items.map((item, idx) => (
            <span key={`m1-${idx}`} suppressHydrationWarning>{item}</span>
          ))}
        </div>
        <div className="marquee-content" aria-hidden="true" suppressHydrationWarning>
          {items.map((item, idx) => (
            <span key={`m2-${idx}`} suppressHydrationWarning>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
});

Marquee.displayName = 'Marquee';
