'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

interface TelemetryHUDProps {
  activeAct: number;
  progress: number;
  visible: boolean;
  onSelectAct: (index: number) => void;
  onAdvance?: () => void;
  stage?: 'initial' | 'playing' | 'completed' | 'rewinding';
  onSkip?: () => void;
  onReplay?: () => void;
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
    year: 'INFRA // 99.9%',
    velocity: 'FAULT-TOLERANT',
  },
  {
    badge: { en: 'PHASE 04 // PRODUCTION SCALE', ru: 'ЭТАП 04 // ПРОДАКШЕН И МАСШТАБ' },
    short: '04 SCALE',
    year: 'PROD // 120 FPS',
    velocity: 'UPTIME: 99.99%',
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
}) => {
  const { locale } = useApp();
  const current = ACTS_META[activeAct] || ACTS_META[0];

  return (
    <div
      className="stage-hud pointer-events-none"
      aria-hidden="true"
    >
      {/* Top Telemetry Line */}
      <div className="hud-top">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hud-epoch-badge px-3 sm:px-4 py-1.5 rounded-full bg-[#06060a]/90 backdrop-blur-md border border-white/25 text-white font-mono text-xs tracking-wider shadow-xl flex items-center gap-2">
            <span className="hud-pulse" />
            <span className="text-white font-extrabold tracking-wider hidden sm:inline">{current.badge[locale]}</span>
            <span className="text-white font-extrabold tracking-wider sm:hidden">{current.short}</span>
          </div>

          {/* Interactive Act Tabs - High Contrast Glassmorphic Pills */}
          <div className="hidden sm:flex items-center gap-1.5 pointer-events-auto ml-2">
            {ACTS_META.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectAct(idx)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-md ${
                  activeAct === idx
                    ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/30 border border-amber-300 scale-105'
                    : 'bg-black/75 backdrop-blur-md text-zinc-100 border border-white/20 hover:text-white hover:bg-black/90 hover:border-amber-400/50'
                }`}
                title={`Jump to Phase ${idx + 1}`}
              >
                {act.short}
              </button>
            ))}
          </div>
        </div>

        {/* Year Badge */}
        <div className="hud-stat px-2.5 sm:px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-zinc-100 font-mono text-[11px] sm:text-xs font-bold tracking-wider sm:tracking-widest shadow-lg">
          <span>{current.year}</span>
        </div>
      </div>

      {/* Bottom Telemetry Line: Trajectory + Actions */}
      <div className="hud-bottom">
        <div className="hud-progress-wrap pointer-events-auto p-2.5 sm:p-3 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 shadow-2xl w-full sm:w-[280px]">
          <div className="flex justify-between text-[11px] sm:text-xs text-zinc-200 font-mono font-bold tracking-wider mb-1.5 sm:mb-2">
            <span className="text-zinc-100 font-bold">{locale === 'ru' ? 'ТРАЕКТОРИЯ' : 'TRAJECTORY'}</span>
            <span className="text-amber-400 font-black">VEL: {current.velocity}</span>
          </div>
          <div className="hud-progress-bar h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="hud-progress-fill h-full bg-gradient-to-r from-amber-400 to-cyan-400"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100)).toFixed(1)}%` }}
            />
          </div>
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
            <button
              type="button"
              onClick={onSkip}
              className="hud-skip-btn w-full sm:w-auto flex items-center justify-center gap-2 font-mono text-xs text-amber-300 font-black tracking-widest px-4 py-2.5 sm:py-2 rounded-full bg-black/85 backdrop-blur-xl border-2 border-amber-400 shadow-xl cursor-pointer transition-colors duration-200 hover:bg-amber-400 hover:text-black hover:border-amber-300"
              title="Skip intro animation (Esc)"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span>{locale === 'ru' ? 'ПРОПУСТИТЬ ▸▸' : 'SKIP INTRO ▸▸'}</span>
            </button>
          )}

          {stage === 'completed' && onReplay && (
            <button
              type="button"
              onClick={onReplay}
              className="hud-replay-btn flex-1 sm:flex-none flex items-center justify-center gap-2 font-mono text-xs text-zinc-300 hover:text-amber-300 font-bold tracking-wider px-3.5 py-2.5 sm:py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 hover:border-amber-400/60 shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
              title={locale === 'ru' ? 'Запустить интро-анимацию еще раз' : 'Replay intro animation'}
            >
              <svg
                className="w-3.5 h-3.5 text-amber-400"
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
              <span>{locale === 'ru' ? 'ИНТРО ↺' : 'REPLAY ↺'}</span>
            </button>
          )}

          {stage !== 'playing' && stage !== 'rewinding' && (
            <button
              type="button"
              onClick={onAdvance}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2.5 font-mono text-xs font-bold tracking-wider px-4 py-2.5 sm:py-2 rounded-full backdrop-blur-md border shadow-2xl cursor-pointer transition-all duration-300 ${
                stage === 'completed'
                  ? 'bg-amber-400 text-black border-amber-300 shadow-amber-400/20 hover:scale-105 hover:bg-amber-300'
                  : 'bg-black/80 text-zinc-100 border-white/20 hover:border-amber-400 hover:text-white hover:bg-black/90'
              }`}
              title={stage === 'completed' ? 'Scroll to works' : 'Start sequence'}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  stage === 'completed' ? 'bg-black' : 'bg-amber-400 animate-pulse'
                }`}
              />
              <span>
                {stage === 'completed'
                  ? locale === 'ru'
                    ? 'СМОТРЕТЬ КЕЙСЫ ↓'
                    : 'EXPLORE WORKS ↓'
                  : locale === 'ru'
                  ? 'СКРОЛЛ ДЛЯ СТАРТА ↓'
                  : 'SCROLL TO START ↓'}
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

TelemetryHUD.displayName = 'TelemetryHUD';
