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
  // Height of the fixed navbar is 70px
  const headerHeight = 70;

  // The wrapper is h-[70px] with flex items-center.
  // When currentY = 0, the wordmark is centered at Y = 35px (exact center of 70px header).
  // When dockProgress = 0, we want the wordmark centered at windowHeight * 0.44:
  // startY = (windowHeight * 0.44) - (headerHeight / 2)
  const startY = Math.max(140, windowHeight * 0.44 - headerHeight / 2);
  const targetY = 0; // Exactly inside the 70px header

  const clampedProgress = Math.min(1, Math.max(0, dockProgress));
  const currentY = startY - clampedProgress * (startY - targetY);
  
  // Scale down from 1 (hero title) to 0.22 (compact navbar wordmark)
  const currentScale = 1 - clampedProgress * 0.78;

  const isDocked = clampedProgress > 0.85;

  const handleBackToTop = (e: React.MouseEvent) => {
    if (isDocked) {
      e.preventDefault();
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.8, easing: (t: number) => (1 - Math.cos(t * Math.PI)) / 2 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div
      className="fixed inset-x-0 top-0 h-[70px] pointer-events-none z-50 flex items-center justify-center"
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
          fontSize: 'clamp(54px, 11vw, 110px)',
          lineHeight: 1,
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

