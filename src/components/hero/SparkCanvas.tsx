'use client';

import React, { useEffect, useRef } from 'react';

interface SparkCanvasProps {
  activeAct: number;
}

export const SparkCanvas: React.FC<SparkCanvasProps> = React.memo(({ activeAct }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number | null = null;
    let isVisible = false;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', onResize);

    class SparkParticle {
      x: number = 0;
      y: number = 0;
      vx: number = 0;
      vy: number = 0;
      radius: number = 0;
      alpha: number = 0;
      decay: number = 0;
      color: string = '';

      constructor() {
        this.reset();
      }

      reset() {
        this.x = width * 0.5 + (Math.random() - 0.5) * 60;
        this.y = height * 0.46 + (Math.random() - 0.5) * 50;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.2 + 0.6;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.radius = Math.random() * 2.0 + 1;
        this.alpha = Math.random() * 0.8 + 0.2;
        this.decay = Math.random() * 0.018 + 0.008;
        this.color = Math.random() > 0.4 ? '#f59e0b' : '#60a5fa';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        if (this.alpha <= 0) this.reset();
      }

      draw() {
        if (!ctx) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particles: SparkParticle[] = Array.from({ length: 32 }, () => new SparkParticle());

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animId = requestAnimationFrame(render);
    };

    // Pause RAF when Hero is scrolled out of view to save 100% CPU/GPU cycles
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isVisible = entry.isIntersecting;
        if (isVisible) {
          if (!animId) {
            animId = requestAnimationFrame(render);
          }
        } else {
          if (animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`stage-canvas transition-opacity duration-700 pointer-events-none ${
        activeAct === 0 ? 'opacity-100' : 'opacity-25'
      }`}
      aria-hidden="true"
    />
  );
});

SparkCanvas.displayName = 'SparkCanvas';
