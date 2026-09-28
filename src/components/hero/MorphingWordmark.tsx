'use client';

import React from 'react';

interface MorphingWordmarkProps {
  dockProgress: number;
  windowHeight: number;
}

export const MorphingWordmark: React.FC<MorphingWordmarkProps> = ({
  dockProgress,
  windowHeight,
}) => {
  // Initial vertical position: centered vertically in the hero stage
  const startY = Math.max(220, windowHeight * 0.44 - 40);
  const targetY = 22; // Aligned with the center of the 70px fixed header

  const clampedProgress = Math.min(1, Math.max(0, dockProgress));
  const currentY = startY - clampedProgress * (startY - targetY);
  const currentScale = 1 - clampedProgress * 0.82;

  const isDocked = clampedProgress > 0.85;

  const handleBackToTop = (e: React.MouseEvent) => {
    if (isDocked) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-0 pointer-events-none z-50 flex justify-center"
      style={{
        transform: `translate3d(0, ${currentY}px, 0)`,
        willChange: 'transform',
      }}
    >
      <a
        href="#hero"
        onClick={handleBackToTop}
        className={`pointer-events-auto select-none flex items-center justify-center font-black tracking-tighter uppercase transition-colors duration-200 ${
          isDocked ? 'hover:text-amber-400 cursor-pointer' : 'cursor-default'
        }`}
        style={{
          transform: `scale(${currentScale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
          fontSize: 'clamp(54px, 12vw, 150px)',
          lineHeight: 0.9,
          whiteSpace: 'nowrap',
          color: isDocked ? 'var(--text-primary)' : '#ffffff',
          textShadow: clampedProgress < 0.8 ? '0 12px 48px rgba(0,0,0,0.85)' : 'none',
        }}
        title={isDocked ? 'Back to top' : undefined}
      >
        <span>YEGOR</span>
        <span className="text-amber-400">.</span>
        <span>DEV</span>
      </a>
    </div>
  );
};
