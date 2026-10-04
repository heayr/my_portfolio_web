'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useScrollLock } from './useScrollLock';
import { cosineEase } from '../utils/math';

export type HeroStage = 'initial' | 'playing' | 'completed' | 'rewinding';

interface UseHeroPlaybackProps {
  onScrollProgress?: (progress: number) => void;
}

export function useHeroPlayback({ onScrollProgress }: UseHeroPlaybackProps = {}) {
  const { lock, unlock } = useScrollLock();

  const [stage, setStage] = useState<HeroStage>('initial');
  const stageRef = useRef<HeroStage>(stage);
  stageRef.current = stage;

  const [dockProgress, setDockProgress] = useState(0);
  const dockProgressRef = useRef(dockProgress);
  const dockAnimRef = useRef<number | null>(null);

  const [videoProgress, setVideoProgress] = useState(0);
  const videoProgressRef = useRef(videoProgress);
  const videoAnimRef = useRef<number | null>(null);

  const [activeAct, setActiveAct] = useState(0);

  // Initial check for returning visitor
  useEffect(() => {
    let hasSeenIntro = false;
    try {
      hasSeenIntro = localStorage.getItem('portfolio_hero_seen_v1') === 'true';
    } catch {}

    if (hasSeenIntro || window.scrollY > 10) {
      setDockProgress(1.0);
      dockProgressRef.current = 1.0;
      setVideoProgress(1.0);
      videoProgressRef.current = 1.0;
      setActiveAct(4);
      setStage('completed');
      stageRef.current = 'completed';
      unlock();
      onScrollProgress?.(1);
    } else {
      lock();
    }

    return () => {
      unlock();
    };
  }, [lock, unlock, onScrollProgress]);

  const updateActFromProgress = (val: number) => {
    if (val >= 0.8) setActiveAct(4);
    else if (val >= 0.6) setActiveAct(3);
    else if (val >= 0.4) setActiveAct(2);
    else if (val >= 0.2) setActiveAct(1);
    else setActiveAct(0);
  };

  const startPlay = useCallback(() => {
    if (stageRef.current === 'playing' || stageRef.current === 'completed') return;

    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setStage('playing');
    stageRef.current = 'playing';
    lock();

    // 1. Wordmark docking: 700ms smooth cosine ease
    const dockStart = dockProgressRef.current;
    const dockDuration = Math.max(200, 700 * (1 - dockStart));
    const dockStartTime = performance.now();

    const runDock = (now: number) => {
      const t = Math.min(1, (now - dockStartTime) / dockDuration);
      const val = dockStart + (1 - dockStart) * cosineEase(t);
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

    // 2. Video playback: exactly 5000ms
    const videoStart = videoProgressRef.current;
    const videoDuration = Math.max(500, 5000 * (1 - videoStart));
    const videoStartTime = performance.now();

    const runVideo = (now: number) => {
      const t = Math.min(1, (now - videoStartTime) / videoDuration);
      const val = videoStart + (1 - videoStart) * cosineEase(t);

      setVideoProgress(val);
      videoProgressRef.current = val;
      updateActFromProgress(val);
      onScrollProgress?.(val);

      if (t < 1) {
        videoAnimRef.current = requestAnimationFrame(runVideo);
      } else {
        setVideoProgress(1);
        videoProgressRef.current = 1;
        setActiveAct(4);
        setStage('completed');
        stageRef.current = 'completed';
        try {
          localStorage.setItem('portfolio_hero_seen_v1', 'true');
        } catch {}
        unlock();
        onScrollProgress?.(1);
      }
    };
    videoAnimRef.current = requestAnimationFrame(runVideo);
  }, [lock, unlock, onScrollProgress]);

  const startRewind = useCallback(() => {
    if (stageRef.current === 'rewinding' || stageRef.current === 'initial') return;

    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

    setStage('rewinding');
    stageRef.current = 'rewinding';
    lock();

    const videoStart = videoProgressRef.current;
    const videoDuration = Math.max(400, 2000 * videoStart);
    const videoStartTime = performance.now();

    const runRewind = (now: number) => {
      const t = Math.min(1, (now - videoStartTime) / videoDuration);
      const val = videoStart * (1 - cosineEase(t));

      setVideoProgress(val);
      videoProgressRef.current = val;
      updateActFromProgress(val);
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
          const val = dockStart * (1 - cosineEase(td));
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
          }
        };
        dockAnimRef.current = requestAnimationFrame(runUndock);
      }
    };
    videoAnimRef.current = requestAnimationFrame(runRewind);
  }, [lock, onScrollProgress]);

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
    setActiveAct(4);
    setStage('completed');
    stageRef.current = 'completed';
    unlock();
    onScrollProgress?.(1);
  }, [unlock, onScrollProgress]);

  const handleReplay = useCallback(() => {
    if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
    if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

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

    lock();
    requestAnimationFrame(() => {
      startPlay();
    });
  }, [lock, startPlay, onScrollProgress]);

  const handleResetToInitial = useCallback(() => {
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

    window.scrollTo({ top: 0 });
    lock();
    onScrollProgress?.(0);
  }, [lock, onScrollProgress]);

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

  const handleSelectAct = useCallback(
    (actIdx: number) => {
      if (dockAnimRef.current) cancelAnimationFrame(dockAnimRef.current);
      if (videoAnimRef.current) cancelAnimationFrame(videoAnimRef.current);

      setDockProgress(1);
      dockProgressRef.current = 1;

      const targetP = actIdx === 0 ? 0.0 : actIdx === 1 ? 0.25 : actIdx === 2 ? 0.50 : actIdx === 3 ? 0.75 : 1.0;
      setVideoProgress(targetP);
      videoProgressRef.current = targetP;
      setActiveAct(actIdx);

      setStage('completed');
      stageRef.current = 'completed';
      try {
        localStorage.setItem('portfolio_hero_seen_v1', 'true');
      } catch {}
      unlock();
      onScrollProgress?.(targetP);
    },
    [unlock, onScrollProgress]
  );

  // Gesture & Keyboard Interceptors
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (stageRef.current !== 'completed') {
        e.preventDefault();
        if (e.deltaY > 2 && (stageRef.current === 'initial' || stageRef.current === 'rewinding')) {
          startPlay();
        }
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
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (stageRef.current !== 'completed') {
        if (['ArrowDown', 'PageDown', ' '].includes(e.key)) {
          e.preventDefault();
          if (stageRef.current === 'initial' || stageRef.current === 'rewinding') startPlay();
        } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
          e.preventDefault();
        } else if (e.key === 'Escape' && stageRef.current === 'playing') {
          handleSkip();
        }
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
  }, [startPlay, handleSkip]);

  return {
    stage,
    dockProgress,
    videoProgress,
    activeAct,
    startPlay,
    startRewind,
    handleSkip,
    handleReplay,
    handleResetToInitial,
    handleAdvance,
    handleSelectAct,
  };
}
