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
          <div className="hud-epoch-badge">
            <span className="hud-pulse" />
            <span>{current.badge[locale]}</span>
          </div>

          {/* Interactive Act Tabs */}
          <div className="hidden sm:flex items-center gap-1.5 pointer-events-auto ml-2">
            {actsMeta.map((act, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectAct(idx)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider transition-all duration-300 ${
                  activeAct === idx
                    ? 'bg-amber-400 text-black font-bold shadow-lg shadow-amber-400/20'
                    : 'bg-white/10 text-zinc-400 hover:text-white hover:bg-white/20'
                }`}
                title={`Jump to Act ${idx + 1}`}
              >
                {act.short}
              </button>
            ))}
          </div>
        </div>

        <div className="hud-stat text-zinc-400 font-mono text-[11px] tracking-widest">
          <span>{current.year}</span>
        </div>
      </div>

      {/* Bottom Telemetry Line: Trajectory on the Left, Epoch scroll indicator on the Right */}
      <div className="hud-bottom">
        <div className="hud-progress-wrap pointer-events-auto">
          <div className="flex justify-between text-[10px] text-zinc-400 font-mono tracking-wider mb-1">
            <span className="text-zinc-400 font-semibold">{locale === 'ru' ? 'ТРАЕКТОРИЯ' : 'TRAJECTORY'}</span>
            <span className="text-amber-400 font-bold">VEL: {current.velocity}</span>
          </div>
          <div className="hud-progress-bar">
            <div
              className="hud-progress-fill"
              style={{ width: `${Math.min(100, Math.max(0, progress * 100)).toFixed(1)}%` }}
            />
          </div>
        </div>

        {/* Right side prompt: scroll indicator */}
        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-zinc-400 tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>{locale === 'ru' ? 'СКРОЛЛ ДЛЯ СМЕНЫ ЭПОХ ↓' : 'SCROLL TO ADVANCE EPOCHS ↓'}</span>
        </div>
      </div>
    </div>
  );
};
