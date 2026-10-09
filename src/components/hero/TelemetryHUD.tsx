'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

interface TelemetryHUDProps {
  activeAct: number;
  progress: number;
  visible: boolean;
  onSelectAct: (index: number) => void;
  onAdvance?: () => void;
  stage?: 'initial' | 'playing' | 'completed' | 'rewinding';
  onSkip?: () => void;
  onReplay?: () => void;
  children?: React.ReactNode;
}

const ACTS_META = [
  {
    badge: { en: 'PHASE 01 // ARCHITECTURE & VISION', ru: 'ЭТАП 01 // АРХИТЕКТУРА И СМЫСЛ' },
    short: '01 ARCH',
    year: 'CORE // ARCH',
    velocity: '0.0 → MACH 1',
  },
  {
    badge: { en: 'PHASE 02 // ALGORITHMIC RIGOR', ru: 'ЭТАП 02 // АЛГОРИТМЫ И СТРОГОСТЬ' },
    short: '02 LOGIC',
    year: 'PERF // 100/100',
    velocity: 'TTFB: 38ms',
  },
  {
    badge: { en: 'PHASE 03 // B2B SYSTEMS & SAAS', ru: 'ЭТАП 03 // B2B-СИСТЕМЫ И SAAS' },
    short: '03 SAAS',
    year: 'INFRA // VDS PROD',
    velocity: 'FAULT-TOLERANT',
  },
  {
    badge: { en: 'PHASE 04 // PRODUCTION SCALE', ru: 'ЭТАП 04 // ПРОДАКШЕН И МАСШТАБ' },
    short: '04 SCALE',
    year: 'PROD // 120 FPS',
    velocity: 'PROD-READY',
  },
  {
    badge: { en: 'PHASE 05 // DESIGN & MOTION CRAFT', ru: 'ЭТАП 05 // ДИЗАЙН И МОУШН-КРАФТ' },
    short: '05 DESIGN',
    year: 'CRAFT // MOTION',
    velocity: '120 FPS CANVAS',
  },
];

export const TelemetryHUD: React.FC<TelemetryHUDProps> = React.memo(({
  activeAct,
  progress,
  visible,
  onSelectAct,
  onAdvance,
  stage = 'initial',
  onSkip,
  onReplay,
  children,
}) => {
  const { locale } = useApp();
  const current = ACTS_META[activeAct] || ACTS_META[0];

  return (
    <div
      className="stage-hud pointer-events-none"
      aria-hidden="true"
    >
      <div className="stage-hud-inner">
        {/* Top Telemetry Line */}
        <div className="hud-top">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hud-epoch-badge px-3 sm:px-4 py-1.5 rounded-full bg-[#06060a]/90 backdrop-blur-md border border-white/25 text-white font-mono text-xs tracking-wider shadow-xl flex items-center gap-2">
            <span className="hud-pulse shrink-0" />
            <span className="text-white font-extrabold tracking-wider hidden sm:inline-block w-[260px] lg:w-[280px] whitespace-nowrap">{current.badge[locale]}</span>
            <span className="text-white font-extrabold tracking-wider sm:hidden">{current.short}</span>
          </div>

          {/* Interactive Act Tabs - Rendered with .map() via Universal Button */}
          <div className="hidden sm:flex items-center gap-1.5 pointer-events-auto ml-2">
            {ACTS_META.map((act, idx) => (
              <Button
                key={idx}
                variant={activeAct === idx ? 'primary' : 'glass'}
                size="xs"
                onClick={() => onSelectAct(idx)}
                className={`rounded-full transition-all duration-300 w-[96px] whitespace-nowrap justify-center ${
                  activeAct === idx
                    ? 'scale-105'
                    : 'bg-black/75 text-zinc-200 border-white/20 hover:border-amber-400/50'
                }`}
                title={`Jump to Phase ${idx + 1}`}
              >
                {act.short}
              </Button>
            ))}
          </div>
        </div>

        {/* Year Badge */}
        <div className="hud-stat px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-zinc-100 font-mono text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest shadow-lg min-w-[140px] lg:min-w-[160px] text-center flex items-center justify-center">
          <span>{current.year}</span>
        </div>
      </div>

      {/* Bottom Telemetry Line: Trajectory + Actions */}
      <div className="hud-bottom">
        {/* Left Column: Narrative Card (Anchored Above) + Trajectory Progress (Strictly Unified Left Alignment) */}
        <div className="relative w-full sm:w-[280px] md:w-[290px] lg:w-[310px] xl:w-[330px] 2xl:w-[440px] max-w-[calc(100vw-32px)] pointer-events-auto">
          {children}
          <GlassCard intensity="crystal" sheen={true} className="hud-progress-wrap pointer-events-auto p-2.5 sm:p-2.5 lg:p-3 2xl:p-3.5 w-full">
            <div className="flex justify-between text-[10px] sm:text-[10.5px] lg:text-[11px] 2xl:text-xs font-mono font-bold tracking-wider mb-1 sm:mb-1.5 2xl:mb-2">
              <span className="text-zinc-100 [html.light_&]:text-zinc-950 font-bold">{locale === 'ru' ? 'ТРАЕКТОРИЯ' : 'TRAJECTORY'}</span>
              <span className="text-amber-400 [html.light_&]:text-amber-600 font-black tracking-widest drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]">VEL: {current.velocity}</span>
            </div>
            <div className="hud-progress-bar h-1.5 bg-white/[0.08] [html.light_&]:bg-black/10 shadow-inner rounded-full overflow-hidden border border-white/15 [html.light_&]:border-black/10">
              <div
                className="hud-progress-fill h-full bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 shadow-[0_0_10px_rgba(245,158,11,0.8)]"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100)).toFixed(1)}%` }}
              />
            </div>
          </GlassCard>
        </div>

        {/* Renaissance / High-Tech Exhibition Cartouche Plaque */}
        <div
          className={`absolute left-1/2 -translate-x-1/2 bottom-1 hidden md:flex items-center justify-center transition-all duration-700 ${
            stage === 'completed'
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-3 pointer-events-none'
          }`}
        >
          <div
            className="museum-cartouche"
            title={locale === 'ru' ? 'Гений человеческой инженерии: Эволюция' : 'The Genius of Human Engineering: An Evolution'}
          >
            <span className="museum-cartouche-ornament" aria-hidden="true">❖</span>
            <span className="museum-cartouche-text">
              {locale === 'ru'
                ? 'ГЕНИЙ ЧЕЛОВЕЧЕСКОЙ ИНЖЕНЕРИИ: ЭВОЛЮЦИЯ'
                : 'THE GENIUS OF HUMAN ENGINEERING: AN EVOLUTION'}
            </span>
            <span className="museum-cartouche-ornament" aria-hidden="true">❖</span>
          </div>
        </div>

        {/* Right side prompt: scroll indicator / advance button / skip */}
        <div className="hud-actions-row flex items-center gap-2 pointer-events-auto w-full sm:w-auto">
          {(stage === 'playing' || stage === 'rewinding') && onSkip && (
            <Button
              variant="glass"
              size="sm"
              onClick={onSkip}
              className="hud-skip-btn w-full sm:w-auto text-amber-300 font-black border-2 border-amber-400 rounded-full hover:bg-amber-400 hover:text-black"
              title="Skip intro animation (Esc)"
              icon={
                <span className="relative flex h-2.5 w-2.5 mr-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                </span>
              }
            >
              {locale === 'ru' ? 'ПРОПУСТИТЬ ▸▸' : 'SKIP INTRO ▸▸'}
            </Button>
          )}

          {stage === 'completed' && onReplay && (
            <Button
              variant="glass"
              size="sm"
              onClick={onReplay}
              className="hud-replay-btn flex-1 sm:flex-none text-zinc-300 hover:text-amber-300 rounded-full hover:border-amber-400/60"
              title={locale === 'ru' ? 'Запустить интро-анимацию еще раз' : 'Replay intro animation'}
              icon={
                <svg
                  className="w-3.5 h-3.5 text-amber-400 mr-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              }
            >
              {locale === 'ru' ? 'ИНТРО ↺' : 'REPLAY ↺'}
            </Button>
          )}

          {stage !== 'playing' && stage !== 'rewinding' && (
            <Button
              variant={stage === 'completed' ? 'primary' : 'glass'}
              size="sm"
              onClick={onAdvance}
              className="flex-1 sm:flex-none rounded-full"
              title={stage === 'completed' ? 'Scroll to works' : 'Start sequence'}
              icon={
                <span
                  className={`w-2 h-2 rounded-full mr-1 ${
                    stage === 'completed' ? 'bg-black' : 'bg-amber-400 animate-pulse'
                  }`}
                />
              }
            >
              {stage === 'completed'
                ? locale === 'ru'
                  ? 'СМОТРЕТЬ КЕЙСЫ ↓'
                  : 'EXPLORE WORKS ↓'
                : locale === 'ru'
                ? 'СКРОЛЛ ДЛЯ СТАРТА ↓'
                : 'SCROLL TO START ↓'}
            </Button>
          )}
        </div>
      </div>
    </div>
  </div>
  );
});

TelemetryHUD.displayName = 'TelemetryHUD';
