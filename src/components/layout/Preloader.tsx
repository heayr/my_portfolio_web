'use client';

import React, { useState, useEffect } from 'react';

const BARS_COUNT = 10;

export const Preloader: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            document.body.style.overflow = '';
          }, 100);
          setTimeout(() => setRemoved(true), 1350);
          return 100;
        }
        // Smooth progression
        const increment = prev < 50 ? 5 : prev < 85 ? 4 : 2;
        return Math.min(100, prev + increment);
      });
    }, 22);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none flex w-full h-full overflow-hidden select-none ${
        isDone ? 'preloader-hidden' : ''
      }`}
      aria-hidden={isDone}
    >
      {/* 10 Staggered Rectangular Vertical Columns (Arpeggio Stepped Reveal) */}
      {Array.from({ length: BARS_COUNT }).map((_, index) => (
        <div
          key={index}
          className="preloader-bar flex-1 h-full bg-[#040406]"
          style={{ transitionDelay: `${index * 45}ms` }}
        />
      ))}

      {/* Subtle Minimal High-Tech Bottom-Right Percentage Indicator */}
      <div
        className={`absolute bottom-6 right-6 sm:bottom-9 sm:right-12 z-20 flex items-center gap-2.5 font-mono transition-opacity duration-200 ${
          isDone ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[10px] tracking-widest text-zinc-500 uppercase">
          {percent < 100 ? 'INITIALIZING' : 'READY'}
        </span>
        <span className="text-xs sm:text-sm font-semibold tracking-wider text-white">
          {percent}
          <span className="text-amber-400 text-[10px] ml-0.5">%</span>
        </span>
      </div>
    </div>
  );
};

