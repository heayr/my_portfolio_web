'use client';

import React, { useState, useEffect } from 'react';

export const Preloader: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsDone(true), 150);
          setTimeout(() => setRemoved(true), 1100);
          return 100;
        }
        return prev + 5;
      });
    }, 25);

    return () => clearInterval(interval);
  }, []);

  if (removed) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none flex w-full h-full overflow-hidden ${
        isDone ? 'preloader-hidden' : ''
      }`}
      aria-hidden={isDone}
    >
      {/* 6 Staggered Rectangular Bars */}
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          className="preloader-bar flex-1 h-full bg-[#050508] border-r border-white/5 last:border-r-0"
          style={{ transitionDelay: `${index * 50}ms` }}
        />
      ))}

      {/* Center Counter */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 font-mono ${
          isDone ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <span className="text-xs tracking-[0.25em] text-zinc-500 uppercase mb-2">INITIALIZING RUNTIME</span>
        <span className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
          {percent}<span className="text-amber-400">%</span>
        </span>
      </div>
    </div>
  );
};
