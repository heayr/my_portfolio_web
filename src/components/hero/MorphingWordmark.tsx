'use client';

import React from 'react';

interface MorphingWordmarkProps {
  dockProgress: number;
  windowHeight: number;
  onReset?: () => void;
}

export const MorphingWordmark: React.FC<MorphingWordmarkProps> = ({
  dockProgress,
  windowHeight,
  onReset,
}) => {
  // Height of the fixed navbar is 70px
  const headerHeight = 70;

  // Raised by 50px higher than previous baseline as requested.
  // startY moves from (windowHeight - 61 - 35) to (windowHeight - 111 - 35).
  const startY = Math.max(100, windowHeight - 111 - headerHeight / 2);
  const targetY = 0; // Exactly inside the 70px header navbar

  const clampedProgress = Math.min(1, Math.max(0, dockProgress));
  const currentY = startY - clampedProgress * (startY - targetY);

  // Scaled down from 1.0 (massive 2x initial size) to 0.105 (crisp 22px navbar wordmark)
  const currentScale = 1 - clampedProgress * 0.895;

  const isDocked = clampedProgress > 0.85;

  const handleBackToTop = (e: React.MouseEvent) => {
    if (isDocked) {
      e.preventDefault();
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.2, easing: (t: number) => (1 - Math.cos(t * Math.PI)) / 2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      onReset?.();
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-0 h-[70px] pointer-events-none z-50 flex items-center justify-center px-4"
      style={{
        transform: `translate3d(0, ${currentY}px, 0)`,
        willChange: 'transform',
      }}
    >
      <a
        href="#hero"
        onClick={handleBackToTop}
        className={`pointer-events-auto select-none flex items-center justify-center font-black tracking-tighter uppercase transition-colors duration-200 ${isDocked ? 'hover:text-amber-400 cursor-pointer' : 'cursor-default'
          }`}
        style={{
          transform: `scale(${currentScale})`,
          transformOrigin: 'center center',
          willChange: 'transform',
          fontSize: 'clamp(96px, 14.5vw, 220px)',
          lineHeight: 1,
          whiteSpace: 'nowrap',
          color: isDocked ? 'var(--text-primary)' : '#ffffff',
          textShadow: clampedProgress < 0.8 ? '0 12px 48px rgba(0,0,0,0.95), 0 0 80px rgba(0,0,0,0.85)' : 'none',
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

