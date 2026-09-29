'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface FrameScrubberCanvasProps {
  progress: number; // 0.0 to 1.0 from hero scroll
  frameCount?: number;
  className?: string;
}

export const FrameScrubberCanvas: React.FC<FrameScrubberCanvasProps> = ({
  progress,
  frameCount = 55,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedSetRef = useRef<Set<number>>(new Set());
  const currentRenderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // Inertia and smooth physics state
  const targetFloatFrameRef = useRef<number>(0);
  const currentFloatFrameRef = useRef<number>(0);

  const [loadingProgress, setLoadingProgress] = useState(0);
  const [initialFrameReady, setInitialFrameReady] = useState(false);

  // Helper to format frame path: /GIF-for%20video/ezgif-frame-001.jpg
  const getFrameUrl = useCallback((index: number) => {
    const padIndex = String(index + 1).padStart(3, '0');
    return `/GIF-for%20video/ezgif-frame-${padIndex}.jpg`;
  }, []);

  // Draw specific frame or blended sub-frame with temporal crossfade for fluid 60-120 FPS motion
  const drawFrame = useCallback((floatFrame: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const clampedFrame = Math.max(0, Math.min(frameCount - 1, floatFrame));
    const baseIdx = Math.floor(clampedFrame);
    const nextIdx = Math.min(frameCount - 1, baseIdx + 1);
    const blendRatio = clampedFrame - baseIdx; // 0.0 to 1.0

    // Find requested base frame or fallback to nearest loaded frame
    let img1 = imagesRef.current[baseIdx];
    if (!img1 || !img1.complete || img1.naturalWidth === 0) {
      let nearestIdx = -1;
      let minDistance = Infinity;
      loadedSetRef.current.forEach((idx) => {
        const dist = Math.abs(idx - baseIdx);
        if (dist < minDistance) {
          minDistance = dist;
          nearestIdx = idx;
        }
      });
      if (nearestIdx !== -1) {
        img1 = imagesRef.current[nearestIdx];
      }
    }

    if (!img1 || !img1.complete || img1.naturalWidth === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const imgW = img1.naturalWidth || img1.width;
    const imgH = img1.naturalHeight || img1.height;

    // Cover calculation
    const scale = Math.max(w / imgW, h / imgH);
    const renderW = imgW * scale;
    const renderH = imgH * scale;
    const offsetX = (w - renderW) / 2;
    const offsetY = (h - renderH) / 2;

    // 1. Draw base frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(img1, offsetX, offsetY, renderW, renderH);

    // 2. Crossfade next frame on top for buttery-smooth temporal interpolation
    if (blendRatio > 0.02 && nextIdx !== baseIdx) {
      const img2 = imagesRef.current[nextIdx];
      if (img2 && img2.complete && img2.naturalWidth > 0) {
        ctx.globalAlpha = blendRatio;
        ctx.drawImage(img2, offsetX, offsetY, renderW, renderH);
        ctx.globalAlpha = 1.0;
      }
    }

    currentRenderedFrameRef.current = floatFrame;
  }, [frameCount]);

  // Resize canvas to match display size & device pixel ratio
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2 for performance
    const rect = canvas.getBoundingClientRect();
    const displayW = Math.round(rect.width * dpr);
    const displayH = Math.round(rect.height * dpr);

    if (canvas.width !== displayW || canvas.height !== displayH) {
      canvas.width = displayW;
      canvas.height = displayH;
      if (currentRenderedFrameRef.current >= 0) {
        drawFrame(currentRenderedFrameRef.current);
      }
    }
  }, [drawFrame]);

  // Preload all 55 frames progressively
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    let loadedCount = 0;

    // Priority 1: Load First Frame immediately
    const firstImg = new Image();
    firstImg.src = getFrameUrl(0);
    images[0] = firstImg;

    firstImg.onload = () => {
      loadedSetRef.current.add(0);
      setInitialFrameReady(true);
      updateCanvasSize();
      drawFrame(0);

      // Priority 2: Preload remaining frames in batches
      for (let i = 1; i < frameCount; i++) {
        const img = new Image();
        img.src = getFrameUrl(i);
        images[i] = img;

        img.onload = () => {
          loadedSetRef.current.add(i);
          loadedCount++;
          setLoadingProgress(Math.round((loadedCount / (frameCount - 1)) * 100));

          const currentTarget = Math.round(targetFloatFrameRef.current);
          if (currentTarget === i && currentRenderedFrameRef.current !== i) {
            drawFrame(i);
          }
        };

        img.onerror = () => {
          console.warn(`[FrameScrubber] Failed to load frame ${i + 1}`);
        };
      }
    };

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [frameCount, getFrameUrl, updateCanvasSize, drawFrame]);

  // Calculate target float frame directly from master hero progress:
  // Phase 1 (0 to 0.08): hold on first frame while wordmark docks into header
  // Phase 2 (0.08 to 0.95): scrub smoothly through frames 0 to 54 in lockstep
  useEffect(() => {
    if (progress <= 0.08) {
      targetFloatFrameRef.current = 0;
    } else {
      const animProgress = Math.min(1, Math.max(0, (progress - 0.08) / 0.87));
      targetFloatFrameRef.current = animProgress * (frameCount - 1);
    }
  }, [progress, frameCount]);

  // Continuous Fluid Inertia Physics Loop (Smooth, cinematic LERP tracking)
  useEffect(() => {
    if (!initialFrameReady) return;

    let active = true;

    const renderLoop = () => {
      if (!active) return;

      const target = targetFloatFrameRef.current;
      const current = currentFloatFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.002) {
        // Silky smooth interpolation (factor 0.14)
        currentFloatFrameRef.current += diff * 0.14;
        drawFrame(currentFloatFrameRef.current);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      active = false;
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [initialFrameReady, frameCount, drawFrame]);

  return (
    <div className={`video-scrubber-wrapper absolute inset-0 w-full h-full overflow-hidden ${className}`}>
      {/* HTML5 Canvas with continuous GPU-backed inertia scrubbing */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover transform-gpu"
        style={{
          width: '100%',
          height: '100%',
        }}
      />

      {/* Subtle cinematic gradient vignette for text readability */}
      <div
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#040406] via-transparent to-[#040406]/40 opacity-70"
        aria-hidden="true"
      />

      {/* Frame indicator & buffer status */}
      {loadingProgress < 100 && (
        <div className="absolute top-20 right-6 z-20 pointer-events-none font-mono text-[10px] text-white/50 bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
          BUFFERING 4K FRAMES: {loadingProgress}%
        </div>
      )}
    </div>
  );
};
