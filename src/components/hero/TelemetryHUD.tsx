'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

interface TelemetryHUDProps {
  activeAct: number;
  progress: number;
  visible: boolean;
  onSelectAct: (index: number) => void;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  activeAct,
  progress,
  visible,
  onSelectAct,
}) => {
  const { locale } = useApp();

  const actsMeta = [
    {
      badge: { en: 'ACT 01 // GENESIS SPARK', ru: 'АКТ 01 // ИСКРА РАЗУМА' },
      short: '01 SPARK',
      year: '1512 → FUTURE',
      velocity: '0.0 km/s',
    },
    {
      badge: { en: 'ACT 02 // DA VINCI’S BLUEPRINTS', ru: 'АКТ 02 // ЧЕРТЕЖИ ДА ВИНЧИ' },
      short: '02 DA VINCI',
      year: '1490 MILAN',
      velocity: '180 km/h',
    },
    {
      badge: { en: 'ACT 03 // PROVING GROUND', ru: 'АКТ 03 // ПОЛИГОН КИТТИ-ХОК' },
      short: '03 WRIGHT',
      year: '1903 KITTY HAWK',
      velocity: '48 km/h',
    },
    {
      badge: { en: 'ACT 04 // ORBITAL VELOCITY', ru: 'АКТ 04 // ОРБИТАЛЬНАЯ СКОРОСТЬ' },
      short: '04 ORBIT',
      year: '2026 LUNAR BOUND',
      velocity: '11.2 km/s',
    },
  ];

  const current = actsMeta[activeAct] || actsMeta[0];

  return (
    <div
      className="stage-hud pointer-events-none"
      aria-hidden="true"
    >
      {/* Top Telemetry Line */}
      <div className="hud-top">
        <div className="flex items-center gap-3">
          <div className="hud-epoch-badge px-3.5 sm:px-4 py-1.5 rounded-full bg-[#06060a]/90 backdrop-blur-md border border-white/25 text-white font-mono text-xs tracking-wider shadow-xl flex items-center gap-2.5">
            <span className="hud-pulse" />
            <span className="text-white font-extrabold tracking-wider">{current.badge[locale]}</span>
          </div>

          {/* Interactive Act Tabs - High Contrast Glassmorphic Pills */}
          <div className="hidden sm:flex items-center gap-2 pointer-events-auto ml-2">
            {actsMeta.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectAct(idx)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 shadow-md ${
                  activeAct === idx
                    ? 'bg-amber-400 text-black font-black shadow-lg shadow-amber-400/30 border border-amber-300 scale-105'
                    : 'bg-black/75 backdrop-blur-md text-zinc-100 border border-white/20 hover:text-white hover:bg-black/90 hover:border-amber-400/50'
                }`}
                title={`Jump to Act ${idx + 1}`}
              >
                {act.short}
              </button>
            ))}
          </div>
        </div>

        {/* Year Badge */}
        <div className="hud-stat px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-zinc-100 font-mono text-xs font-bold tracking-widest shadow-lg">
          <span>{current.year}</span>
        </div>
      </div>

      {/* Bottom Telemetry Line: Trajectory on the Left, Epoch scroll indicator on the Right */}
      <div className="hud-bottom">
        <div className="hud-progress-wrap pointer-events-auto p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl w-[240px] sm:w-[280px]">
          <div className="flex justify-between text-xs text-zinc-200 font-mono font-bold tracking-wider mb-2">
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

        {/* Right side prompt: scroll indicator */}
        <div className="hidden sm:flex items-center gap-2.5 font-mono text-xs text-zinc-100 font-bold tracking-wider px-4 py-2 rounded-full bg-black/80 backdrop-blur-md border border-white/20 shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>{locale === 'ru' ? 'СКРОЛЛ ДЛЯ СМЕНЫ ЭПОХ ↓' : 'SCROLL TO ADVANCE EPOCHS ↓'}</span>
        </div>
      </div>
    </div>
  );
};
