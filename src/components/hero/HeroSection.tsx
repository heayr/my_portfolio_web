'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '../../i18n/context';
import { TelemetryHUD } from './TelemetryHUD';
import { NarrativeCards } from './NarrativeCards';
import { MorphingWordmark } from './MorphingWordmark';
import { FrameScrubberCanvas } from './FrameScrubberCanvas';

type HeroStage = 'initial' | 'playing' | 'completed' | 'rewinding';

interface HeroSectionProps {
  onScrollProgress?: (progress: number) => void;
}

// ─────────────────────────────────────────────────────────────
// Triple lock: html + body overflow:hidden + lenis.stop()
// overflow:hidden blocks native browser scroll.
// lenis.stop() blocks Lenis's own window.scrollTo() calls.
// Both are needed — Lenis bypasses overflow:hidden on its own.
// ─────────────────────────────────────────────────────────────
const lockPage = () => {
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  (window as any).lenis?.stop();
};

const unlockPage = () => {
  document.documentElement.style.overflow = '';
  document.body.style.overflow = '';
  (window as any).lenis?.start();
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollProgress }) => {
  const { locale } = useApp();
  const containerRef = useRef<HTMLDivElement>(null);

  const [stage, setStage] = useState<HeroStage>('initial');
  const stageRef = useRef<HeroStage>('initial');
  stageRef.current = stage;

  const [dockProgress, setDockProgress] = useState(0);
  const dockProgressRef = useRef(0);
  const dockAnimRef = useRef<number | null>(null);

  const [videoProgress, setVideoProgress] = useState(0);
  const videoProgressRef = useRef(0);
  const videoAnimRef = useRef<number | null>(null);

  const [activeAct, setActiveAct] = useState(0);
  const [windowHeight, setWindowHeight] = useState(800);

  // ── INITIAL LOCK & RETURNING VISITOR CHECK ──────────────────
  useEffect(() => {
    let hasSeenIntro = false;
    try {
      hasSeenIntro = localStorage.getItem('portfolio_hero_seen_v1') === 'true';
    } catch {
      // localStorage may fail in restricted/private contexts
    }

    if (hasSeenIntro || window.scrollY > 10) {
      // Returning visitor OR opened mid-page → start directly in completed state
      setDockProgress(1.0);
      dockProgressRef.current = 1.0;
      setVideoProgress(1.0);
      videoProgressRef.current = 1.0;
      setActiveAct(3);
      setStage('completed');
      stageRef.current = 'completed';
      unlockPage();
      onScrollProgress?.(1);
    } else {
      // First-time visitor at the top of the page → lock and wait for user scroll/action
      lockPage();
    }

    // Always restore on unmount
    return () => {
      unlockPage();
    };
  }, [onScrollProgress]);

  // ── RESIZE ────────────────────────────────────────────────
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ── PLAY EVENT ────────────────────────────────────────────
  // Exactly 6.0s, zero dependency on scroll speed, zero acceleration
  const startPlay = useCallback(() => {
    if (stageRef.current === 'playing' || stageRef.current === 'completed') return;

    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setStage('playing');
    stageRef.current = 'playing';
    lockPage(); // body stays locked during playback

    // 1. Wordmark docking: 700ms smooth cosine ease
    const dockStart = dockProgressRef.current;
    const dockDuration = Math.max(200, 700 * (1 - dockStart));
    const dockStartTime = performance.now();

    const runDock = (now: number) => {
      const t = Math.min(1, (now - dockStartTime) / dockDuration);
      const eased = (1 - Math.cos(t * Math.PI)) / 2;
      const val = dockStart + (1 - dockStart) * eased;
      setDockProgress(val);
      dockProgressRef.current = val;
      if (t < 1) {
        dockAnimRef.current = requestAnimationFrame(runDock);
      } else {
        setDockProgress(1);
        dockProgressRef.current = 1;
      }
    };
    dockAnimRef.current = requestAnimationFrame(runDock);

    // 2. Video playback: exactly 4000ms, constant speed, no scroll coupling
    const videoStart = videoProgressRef.current;
    const videoDuration = Math.max(500, 4000 * (1 - videoStart));
    const videoStartTime = performance.now();

    const runVideo = (now: number) => {
      const t = Math.min(1, (now - videoStartTime) / videoDuration);
      const eased = (1 - Math.cos(t * Math.PI)) / 2;
      const val = videoStart + (1 - videoStart) * eased;

      setVideoProgress(val);
      videoProgressRef.current = val;

      if (val >= 0.75) setActiveAct(3);
      else if (val >= 0.50) setActiveAct(2);
      else if (val >= 0.25) setActiveAct(1);
      else setActiveAct(0);

      onScrollProgress?.(val);

      if (t < 1) {
        videoAnimRef.current = requestAnimationFrame(runVideo);
      } else {
        // ── VIDEO DONE ─────────────────────────────────────
        setVideoProgress(1);
        videoProgressRef.current = 1;
        setActiveAct(3);
        setStage('completed');
        stageRef.current = 'completed';
        try {
          localStorage.setItem('portfolio_hero_seen_v1', 'true');
        } catch {}
        unlockPage(); // ← THE moment the page unlocks
        onScrollProgress?.(1);
      }
    };
    videoAnimRef.current = requestAnimationFrame(runVideo);
  }, [onScrollProgress]);

  // ── REWIND EVENT ──────────────────────────────────────────
  // 2.0s constant rewind, then 0.6s undock
  const startRewind = useCallback(() => {
    if (stageRef.current === 'rewinding' || stageRef.current === 'initial') return;

    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setStage('rewinding');
    stageRef.current = 'rewinding';
    lockPage(); // lock while rewinding

    const videoStart = videoProgressRef.current;
    const videoDuration = Math.max(400, 2000 * videoStart);
    const videoStartTime = performance.now();

    const runRewind = (now: number) => {
      const t = Math.min(1, (now - videoStartTime) / videoDuration);
      const eased = (1 - Math.cos(t * Math.PI)) / 2;
      const val = videoStart * (1 - eased);

      setVideoProgress(val);
      videoProgressRef.current = val;

      if (val >= 0.75) setActiveAct(3);
      else if (val >= 0.50) setActiveAct(2);
      else if (val >= 0.25) setActiveAct(1);
      else setActiveAct(0);

      onScrollProgress?.(val);

      if (t < 1) {
        videoAnimRef.current = requestAnimationFrame(runRewind);
      } else {
        setVideoProgress(0);
        videoProgressRef.current = 0;
        setActiveAct(0);

        // Undock wordmark: 600ms
        const dockStart = dockProgressRef.current;
        const dockDuration = Math.max(200, 600 * dockStart);
        const dockStartTime = performance.now();

        const runUndock = (now: number) => {
          const td = Math.min(1, (now - dockStartTime) / dockDuration);
          const eased = (1 - Math.cos(td * Math.PI)) / 2;
          const val = dockStart * (1 - eased);
          setDockProgress(val);
          dockProgressRef.current = val;

          if (td < 1) {
            dockAnimRef.current = requestAnimationFrame(runUndock);
          } else {
            setDockProgress(0);
            dockProgressRef.current = 0;
            setStage('initial');
            stageRef.current = 'initial';
            onScrollProgress?.(0);
            // body stays locked (user is back at top, awaiting first scroll)
          }
        };
        dockAnimRef.current = requestAnimationFrame(runUndock);
      }
    };
    videoAnimRef.current = requestAnimationFrame(runRewind);
  }, [onScrollProgress]);

  // ── SKIP ─────────────────────────────────────────────────
  const handleSkip = useCallback(() => {
    try {
      localStorage.setItem('portfolio_hero_seen_v1', 'true');
    } catch {}

    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setDockProgress(1);
    dockProgressRef.current = 1;
    setVideoProgress(1);
    videoProgressRef.current = 1;
    setActiveAct(3);
    setStage('completed');
    stageRef.current = 'completed';
    unlockPage();
    onScrollProgress?.(1);
  }, [onScrollProgress]);

  // ── REPLAY INTRO ──────────────────────────────────────────
  const handleReplay = useCallback(() => {
    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    // Scroll to top immediately
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo({ top: 0 });
    }

    setDockProgress(0);
    dockProgressRef.current = 0;
    setVideoProgress(0);
    videoProgressRef.current = 0;
    setActiveAct(0);
    setStage('initial');
    stageRef.current = 'initial';
    onScrollProgress?.(0);

    // Lock page and launch playback
    lockPage();
    requestAnimationFrame(() => {
      startPlay();
    });
  }, [startPlay, onScrollProgress]);

  // ── RESET / LOGO CLICK ───────────────────────────────────
  const handleResetToInitial = useCallback(() => {
    // If completed, just scroll to top without resetting/locking
    if (stageRef.current === 'completed') {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setDockProgress(0);
    dockProgressRef.current = 0;
    setVideoProgress(0);
    videoProgressRef.current = 0;
    setActiveAct(0);
    setStage('initial');
    stageRef.current = 'initial';

    // Scroll to top instantly, then lock
    window.scrollTo({ top: 0 });
    lockPage();
    onScrollProgress?.(0);
  }, [onScrollProgress]);

  // ── ADVANCE BUTTON ────────────────────────────────────────
  const handleAdvance = useCallback(() => {
    if (stageRef.current === 'initial' || stageRef.current === 'rewinding') {
      startPlay();
    } else if (stageRef.current === 'completed') {
      const works = document.querySelector('#works');
      if (works) {
        const lenis = (window as any).lenis;
        if (lenis) {
          lenis.scrollTo(works as HTMLElement, { offset: -70, duration: 1.2 });
        } else {
          works.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [startPlay]);

  // ── ACT JUMP (HUD tabs) ───────────────────────────────────
  const handleSelectAct = (actIdx: number) => {
    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setDockProgress(1);
    dockProgressRef.current = 1;

    const targetP = actIdx === 0 ? 0.0 : actIdx === 1 ? 0.35 : actIdx === 2 ? 0.60 : 1.0;
    setVideoProgress(targetP);
    videoProgressRef.current = targetP;
    setActiveAct(actIdx);

    if (actIdx === 3) {
      setStage('completed');
      stageRef.current = 'completed';
      unlockPage();
    } else {
      setStage('playing');
      stageRef.current = 'playing';
      lockPage();
    }
  };

  // ── GESTURE INTERCEPTOR ───────────────────────────────────
  // overflow: hidden is the real lock. These handlers are secondary:
  // - When not completed: trigger startPlay / startRewind on gesture
  // - When completed: let browser scroll freely; catch scroll-up at top for rewind
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (stageRef.current !== 'completed') {
        // Belt-and-suspenders: overflow:hidden already blocks scroll,
        // but preventDefault stops scroll event from reaching Lenis
        e.preventDefault();
        if (e.deltaY > 2 && (stageRef.current === 'initial' || stageRef.current === 'rewinding')) {
          startPlay();
        }
        return;
      }

      // Completed: free scroll. Only intercept scroll-up at the very top to rewind.
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY <= 5 && e.deltaY < -5) {
        e.preventDefault();
        startRewind();
      }
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const delta = touchStartY - e.touches[0].clientY;

      if (stageRef.current !== 'completed') {
        if (e.cancelable) e.preventDefault();
        if (delta > 8 && (stageRef.current === 'initial' || stageRef.current === 'rewinding')) {
          startPlay();
        }
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY <= 5 && delta < -8) {
        if (e.cancelable) e.preventDefault();
        startRewind();
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (stageRef.current !== 'completed') {
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
          e.preventDefault();
          if (stageRef.current === 'initial' || stageRef.current === 'rewinding') startPlay();
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
          e.preventDefault(); // don't scroll up while locked
        } else if (e.key === 'Escape' && stageRef.current === 'playing') {
          handleSkip();
        }
        return;
      }

      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      if (scrollY <= 5 && ['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        startRewind();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('keydown', onKeyDown);
      if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
      if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);
    };
  }, [startPlay, startRewind, handleSkip]);

  const isNarrativeVisible = stage === 'playing' || stage === 'completed' || videoProgress > 0.04;

  return (
    <>
      <MorphingWordmark
        dockProgress={dockProgress}
        windowHeight={windowHeight}
        onReset={handleResetToInitial}
      />

      <section
        ref={containerRef}
        id="hero"
        className="scrollytelling-container relative w-full h-screen bg-[#040406]"
      >
        <div className="scrollytelling-stage relative w-full h-screen overflow-hidden flex items-center justify-center">
          <div className="stage-gradient-top opacity-40" aria-hidden="true" />

          <FrameScrubberCanvas progress={videoProgress} frameCount={55} />

          <TelemetryHUD
            activeAct={activeAct}
            progress={videoProgress}
            visible={true}
            stage={stage}
            onSelectAct={handleSelectAct}
            onAdvance={handleAdvance}
            onSkip={handleSkip}
            onReplay={handleReplay}
          />

          <NarrativeCards activeAct={activeAct} visible={isNarrativeVisible} />
        </div>
      </section>
    </>
  );
};
