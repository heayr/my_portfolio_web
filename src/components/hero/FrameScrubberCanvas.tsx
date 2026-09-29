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

  // Direct frame and inertia state
  const targetFloatFrameRef = useRef<number>(Math.min(1, Math.max(0, progress)) * (frameCount - 1));
  const currentFloatFrameRef = useRef<number>(0);

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
    let isExactFrame = true;
    if (!img1 || !img1.complete || img1.naturalWidth === 0) {
      isExactFrame = false;
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

    // Determine orientation: portrait (mobile/vertical screen) vs landscape/desktop
    const isPortrait = w < h;

    let renderW: number;
    let renderH: number;
    let offsetX: number;
    let offsetY: number;

    if (isPortrait) {
      // In portrait mode, fit by width so the full 16:9 composition is visible.
      // Both Adam's hand (left) and the cybernetic hand + spark (right) remain 100% visible!
      const scale = w / imgW;
      renderW = w;
      renderH = imgH * scale;
      offsetX = 0;
      // Position in the upper-middle visual focal area (~36% down the viewport)
      offsetY = Math.round(h * 0.36 - renderH / 2);
    } else {
      // Desktop / Landscape: Cover entire canvas
      const scale = Math.max(w / imgW, h / imgH);
      renderW = imgW * scale;
      renderH = imgH * scale;
      offsetX = (w - renderW) / 2;
      offsetY = (h - renderH) / 2;
    }

    // Always clear canvas background to seamless deep void
    ctx.fillStyle = '#040406';
    ctx.fillRect(0, 0, w, h);

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

    // Subtle edge fades on portrait view so 16:9 frame dissolves seamlessly into #040406
    if (isPortrait && offsetY > 0) {
      const edgeH = Math.min(32, renderH * 0.16);
      // Top fade
      const topGrad = ctx.createLinearGradient(0, offsetY, 0, offsetY + edgeH);
      topGrad.addColorStop(0, '#040406');
      topGrad.addColorStop(1, 'rgba(4, 4, 6, 0)');
      ctx.fillStyle = topGrad;
      ctx.fillRect(0, offsetY, w, edgeH);

      // Bottom fade
      const botGrad = ctx.createLinearGradient(0, offsetY + renderH - edgeH, 0, offsetY + renderH);
      botGrad.addColorStop(0, 'rgba(4, 4, 6, 0)');
      botGrad.addColorStop(1, '#040406');
      ctx.fillStyle = botGrad;
      ctx.fillRect(0, offsetY + renderH - edgeH, w, edgeH);
    }

    // Only mark as rendered if the exact requested base frame was drawn; otherwise keep -1 so ready image redraws
    currentRenderedFrameRef.current = isExactFrame ? floatFrame : -1;
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

    const lastFrameIdx = frameCount - 1;

    // Priority 1: Load First Frame (0) AND Final Frame (54) immediately
    const loadKeyFrame = (idx: number) => {
      const img = new Image();
      img.src = getFrameUrl(idx);
      images[idx] = img;
      img.onload = () => {
        loadedSetRef.current.add(idx);
        setInitialFrameReady(true);
        updateCanvasSize();
        const currentTarget = Math.round(targetFloatFrameRef.current);
        if (currentTarget === idx || currentRenderedFrameRef.current === -1) {
          drawFrame(targetFloatFrameRef.current);
        }
      };
      img.onerror = () => {
        console.warn(`[FrameScrubber] Failed to load key frame ${idx + 1}`);
      };
    };

    loadKeyFrame(0);
    loadKeyFrame(lastFrameIdx);

    // Priority 2: Preload remaining frames in batches
    for (let i = 1; i < lastFrameIdx; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      images[i] = img;

      img.onload = () => {
        loadedSetRef.current.add(i);

        const currentTarget = Math.round(targetFloatFrameRef.current);
        if (currentTarget === i || currentRenderedFrameRef.current === -1) {
          drawFrame(targetFloatFrameRef.current);
        }
      };

      img.onerror = () => {
        console.warn(`[FrameScrubber] Failed to load frame ${i + 1}`);
      };
    }

    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [frameCount, getFrameUrl, updateCanvasSize, drawFrame]);

  // Target float frame directly mapped to input progress (0.0 to 1.0)
  useEffect(() => {
    const clamped = Math.min(1, Math.max(0, progress));
    targetFloatFrameRef.current = clamped * (frameCount - 1);
  }, [progress, frameCount]);

  // Direct frame render: progress from HeroSection RAF is already smooth.
  // No extra LERP needed — that only adds lag on top of the cosine-eased animation.
  useEffect(() => {
    if (!initialFrameReady) return;
    const target = targetFloatFrameRef.current;
    currentFloatFrameRef.current = target;
    drawFrame(target);
  }, [progress, initialFrameReady, drawFrame]);

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
    </div>
  );
};
