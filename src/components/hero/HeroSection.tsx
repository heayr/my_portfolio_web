'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '../../i18n/context';
import { SparkCanvas } from './SparkCanvas';
import { TelemetryHUD } from './TelemetryHUD';
import { NarrativeCards } from './NarrativeCards';
import { MorphingWordmark } from './MorphingWordmark';
import { FrameScrubberCanvas } from './FrameScrubberCanvas';

interface HeroSectionProps {
  onScrollProgress?: (progress: number) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollProgress }) => {
  const { locale } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeAct, setActiveAct] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(800);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setScrollY(y);

    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;

    if (totalHeight <= 0) return;

    const offset = -rect.top;
    const progress = Math.max(0, Math.min(1, offset / totalHeight));
    setTotalProgress(progress);
    if (onScrollProgress) onScrollProgress(progress);

    // 4 Distinct evolutionary epochs synchronized with video progression
    let actIndex = 0;
    if (progress >= 0.80) actIndex = 3;
    else if (progress >= 0.55) actIndex = 2;
    else if (progress >= 0.30) actIndex = 1;
    else actIndex = 0;

    setActiveAct(actIndex);
  }, [onScrollProgress]);

  // Smooth cinematic play-to-end triggered on initial scroll down
  const isAutoScrollingRef = useRef(false);

  const triggerScrollToEnd = useCallback(() => {
    if (isAutoScrollingRef.current) return;
    if (!containerRef.current) return;

    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const containerTop = window.scrollY + containerRef.current.getBoundingClientRect().top;
    const targetY = containerTop + totalHeight;

    isAutoScrollingRef.current = true;
    const lenis = (window as any).lenis;

    if (lenis) {
      lenis.scrollTo(targetY, {
        duration: 2.8,
        easing: (t: number) => (1 - Math.cos(t * Math.PI)) / 2, // Smooth cinematic sine ease-in-out
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }

    setTimeout(() => {
      isAutoScrollingRef.current = false;
    }, 2900);
  }, []);

  // Listen for initial downward scroll / gesture to consistently advance to the end
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (window.scrollY < 20 && e.deltaY > 5 && !isAutoScrollingRef.current) {
        e.preventDefault();
        triggerScrollToEnd();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (window.scrollY < 20 && !isAutoScrollingRef.current) {
        const delta = touchStartY - e.touches[0].clientY;
        if (delta > 20) {
          triggerScrollToEnd();
        }
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [triggerScrollToEnd]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize();

    // Bind to Lenis smooth physics scroll stream
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll]);

  // Jump to specific act on click
  const handleSelectAct = (actIdx: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = actIdx === 0 ? 0.15 : actIdx === 1 ? 0.45 : actIdx === 2 ? 0.70 : 0.95;
    const containerTop = window.scrollY + containerRef.current.getBoundingClientRect().top;
    const targetScrollY = containerTop + targetProgress * totalHeight;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.4, easing: (t: number) => (1 - Math.cos(t * Math.PI)) / 2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
    }
  };

  // Docking progress: Wordmark docks completely in the first 18% of scroll!
  // This guarantees yegor.dev is in the navbar before the video animation gets in full swing.
  const dockProgress = Math.min(1, Math.max(0, totalProgress / 0.18));

  // Storytelling narrative appears smoothly once wordmark starts docking
  const isNarrativeVisible = totalProgress > 0.06;

  return (
    <>
      {/* ==================================================================
          1. ARPEGGIO MORPHING WORDMARK (Starts large, docks into Header)
         ================================================================== */}
      <MorphingWordmark dockProgress={dockProgress} windowHeight={windowHeight} />

      {/* ==================================================================
          2. SCROLLYTELLING CONTAINER: EVOLUTION OF GENIUS (250VH)
         ================================================================== */}
      <section
        ref={containerRef}
        id="hero"
        className="scrollytelling-container relative w-full h-[250vh] bg-[#040406]"
      >
        <div className="scrollytelling-stage sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          {/* Top theme subtle blend */}
          <div className="stage-gradient-top opacity-40" aria-hidden="true" />

          {/* Sliced Video Sequence Canvas Scrubber (55 Frames from public/GIF-for video) */}
          <FrameScrubberCanvas progress={totalProgress} frameCount={55} />

          {/* Interactive Genesis Spark Canvas (Active on Act 1) */}
          <SparkCanvas activeAct={activeAct} />

          {/* High-Tech Telemetry HUD Overlay */}
          <TelemetryHUD
            activeAct={activeAct}
            progress={totalProgress}
            visible={true}
            onSelectAct={handleSelectAct}
            onAdvance={triggerScrollToEnd}
          />

          {/* Dynamic Floating Glass Narrative Block (Acts 1 - 4) */}
          <NarrativeCards activeAct={activeAct} visible={isNarrativeVisible} />
        </div>

        {/* Exit transition gradient at the bottom of 250vh container into works */}
        <div className="absolute bottom-0 inset-x-0 h-40 z-20 pointer-events-none bg-gradient-to-t from-[var(--bg-root)] to-transparent" aria-hidden="true" />
      </section>
    </>
  );
};
