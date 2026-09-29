'use client';

import React, { useState, useEffect } from 'react';

interface MorphingWordmarkProps {
  dockProgress: number;
  windowHeight: number;
  onReset?: () => void;
}

export const MorphingWordmark: React.FC<MorphingWordmarkProps> = React.memo(({
  dockProgress,
  windowHeight,
  onReset,
}) => {
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 640;
  const headerHeight = isMobile ? 60 : 70;

  // Responsive startY:
  // On mobile: positioned in lower-mid area (~62% down), right below the center spark and hands
  // On desktop: positioned near the bottom baseline
  const startY = isMobile
    ? Math.round(windowHeight * 0.62 - headerHeight / 2)
    : Math.max(100, windowHeight - 111 - headerHeight / 2);
  const targetY = 0; // Exactly inside the header navbar

  const clampedProgress = Math.min(1, Math.max(0, dockProgress));
  const currentY = startY - clampedProgress * (startY - targetY);

  // Responsive initial font size:
  // On mobile (390px): ~40px (fits ~240px wide, zero overflow)
  // On desktop (1440px): ~160px-210px (heroic, massive)
  const baseFontSize = isMobile
    ? Math.min(46, Math.max(34, Math.round(windowWidth * 0.10)))
    : Math.min(210, Math.max(96, Math.round(windowWidth * 0.13)));

  // Target font size in navbar: 18px on mobile, 22px on desktop
  const targetNavbarFontSize = isMobile ? 18 : 22;
  const targetScale = targetNavbarFontSize / baseFontSize;

  // Smoothly interpolate scale down to exact navbar size
  const currentScale = 1 - clampedProgress * (1 - targetScale);

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
      className="fixed inset-x-0 top-0 h-[60px] sm:h-[70px] pointer-events-none z-50 flex items-center justify-center px-4"
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
          fontSize: `${baseFontSize}px`,
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
});

MorphingWordmark.displayName = 'MorphingWordmark';

