'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '../../i18n/context';
import { SparkCanvas } from './SparkCanvas';
import { TelemetryHUD } from './TelemetryHUD';
import { NarrativeCards } from './NarrativeCards';
import { MorphingWordmark } from './MorphingWordmark';

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

    // 4 Distinct evolutionary epochs
    // Act 0: 0.00 - 0.26
    // Act 1: 0.26 - 0.51
    // Act 2: 0.51 - 0.76
    // Act 3: 0.76 - 1.00
    let actIndex = 0;
    if (progress >= 0.76) actIndex = 3;
    else if (progress >= 0.51) actIndex = 2;
    else if (progress >= 0.26) actIndex = 1;
    else actIndex = 0;

    setActiveAct(actIndex);
  }, [onScrollProgress]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll]);

  // Jump to specific act on click
  const handleSelectAct = (actIdx: number) => {
    if (!containerRef.current) return;
    const totalHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetProgress = actIdx === 0 ? 0.08 : actIdx === 1 ? 0.35 : actIdx === 2 ? 0.62 : 0.88;
    const containerTop = window.scrollY + containerRef.current.getBoundingClientRect().top;
    const targetScrollY = containerTop + targetProgress * totalHeight;
    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Docking progress over the first ~360px
  const maxDockScroll = 360;
  const dockProgress = Math.min(1, Math.max(0, scrollY / maxDockScroll));

  // Storytelling narrative appears smoothly only after user starts scrolling into the acts
  const isNarrativeVisible = scrollY > 120;

  return (
    <>
      {/* ==================================================================
          1. ARPEGGIO MORPHING WORDMARK (Starts large, docks into Header)
         ================================================================== */}
      <MorphingWordmark dockProgress={dockProgress} windowHeight={windowHeight} />

      {/* ==================================================================
          2. SCROLLYTELLING CONTAINER: EVOLUTION OF GENIUS (400VH)
         ================================================================== */}
      <section
        ref={containerRef}
        id="hero"
        className="scrollytelling-container relative w-full h-[400vh] bg-[#040406]"
      >
        <div className="scrollytelling-stage sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
          {/* Top theme subtle blend */}
          <div className="stage-gradient-top opacity-50" aria-hidden="true" />

          {/* Ambient blurred backdrop for seamless edge bleeding on wide screens */}
          <div className="story-ambient-wrapper absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <img
              src="/storyboard/act1_spark.jpg"
              alt=""
              className={`story-ambient-layer ${activeAct === 0 ? 'active' : ''}`}
              aria-hidden="true"
            />
            <img
              src="/storyboard/act2_davinci.jpg"
              alt=""
              className={`story-ambient-layer ${activeAct === 1 ? 'active' : ''}`}
              aria-hidden="true"
            />
            <img
              src="/storyboard/act3_wright.jpg"
              alt=""
              className={`story-ambient-layer ${activeAct === 2 ? 'active' : ''}`}
              aria-hidden="true"
            />
            <img
              src="/storyboard/act4_moon.jpg"
              alt=""
              className={`story-ambient-layer ${activeAct === 3 ? 'active' : ''}`}
              aria-hidden="true"
            />
          </div>

          {/* 4 Storyboard Visual Layers (Crisp, 100% visible, no cut-off text) */}
          <div className="story-layers-wrapper absolute inset-0 w-full h-full z-1 flex items-center justify-center p-2 sm:p-4">
            <img
              src="/storyboard/act1_spark.jpg"
              alt="Act 1: Michelangelo Adam & Cybernetic Hand Creation Spark"
              className={`story-layer ${activeAct === 0 ? 'active' : ''}`}
            />
            <img
              src="/storyboard/act2_davinci.jpg"
              alt="Act 2: Leonardo Da Vinci Blueprint Workshop"
              className={`story-layer ${activeAct === 1 ? 'active' : ''}`}
            />
            <img
              src="/storyboard/act3_wright.jpg"
              alt="Act 3: Wright Brothers 1903 Kitty Hawk First Flight"
              className={`story-layer ${activeAct === 2 ? 'active' : ''}`}
            />
            <img
              src="/storyboard/act4_moon.jpg"
              alt="Act 4: Falcon Spacecraft Moon Flyby in Deep Space"
              className={`story-layer ${activeAct === 3 ? 'active' : ''}`}
            />
          </div>

          {/* Interactive Genesis Spark Canvas (Active on Act 1) */}
          <SparkCanvas activeAct={activeAct} />

          {/* High-Tech Telemetry HUD Overlay */}
          <TelemetryHUD
            activeAct={activeAct}
            progress={totalProgress}
            visible={true}
            onSelectAct={handleSelectAct}
          />

          {/* Dynamic Floating Glass Narrative Block (Acts 1 - 4) */}
          <NarrativeCards activeAct={activeAct} visible={isNarrativeVisible} />
        </div>

        {/* Exit transition gradient at the bottom of 400vh container into works */}
        <div className="absolute bottom-0 inset-x-0 h-40 z-20 pointer-events-none bg-gradient-to-t from-[var(--bg-root)] to-transparent" aria-hidden="true" />
      </section>
    </>
  );
};
