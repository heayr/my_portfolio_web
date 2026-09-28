'use client';

import React, { useEffect, useRef } from 'react';

interface SparkCanvasProps {
  activeAct: number;
}

export const SparkCanvas: React.FC<SparkCanvasProps> = ({ activeAct }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
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
        this.radius = Math.random() * 2.2 + 1;
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
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    const particles: SparkParticle[] = Array.from({ length: 40 }, () => new SparkParticle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
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
};
