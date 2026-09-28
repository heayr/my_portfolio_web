'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

interface NarrativeCardsProps {
  activeAct: number;
  visible: boolean;
}

export const NarrativeCards: React.FC<NarrativeCardsProps> = ({ activeAct, visible }) => {
  const { locale } = useApp();

  const cardsData = [
    {
      id: '01',
      year: '1512 → FUTURE',
      tag: { en: 'ACT 01 // GENESIS SPARK', ru: 'АКТ 01 // ИСКРА РАЗУМА' },
      manifesto: {
        en: '01. ENGINEERING WITHOUT COMPROMISE',
        ru: '01. БЕСКОМПРОМИССНАЯ ИНЖЕНЕРИЯ',
      },
      desc: {
        en: 'From Michelangelo’s spark to autonomous AI systems. Crafting web architectures where mathematical rigor meets digital art.',
        ru: 'От искры Микеланджело к автономным ИИ-системам. Проектирую веб-архитектуры на стыке математической строгости и цифрового крафта.',
      },
      meta: {
        en: '⚡ YEGOR // ARCHITECT',
        ru: '⚡ ЕГОР // АРХИТЕКТОР',
      },
      actionLink: '#works',
      actionText: { en: 'Works ↘', ru: 'Кейсы ↘' },
    },
    {
      id: '02',
      year: '1490 MILAN',
      tag: { en: 'ACT 02 // DA VINCI’S WORKSHOP', ru: 'АКТ 02 // ЧЕРТЕЖИ ДА ВИНЧИ' },
      manifesto: {
        en: '02. ZERO RUNTIME BLOAT · 100/100 SPEED',
        ru: '02. ZERO-LEAK & 100/100 CORE WEB VITALS',
      },
      desc: {
        en: 'Golden ratio system design: clean abstractions, zero-leak state machines, and sub-second TTFB.',
        ru: 'Архитектура золотого сечения: чистые абстракции данных, zero memory leaks и субсекундный TTFB.',
      },
      meta: {
        en: 'Next.js 15 · TypeScript · FastAPI',
        ru: 'Next.js 15 · TypeScript · FastAPI',
      },
      actionLink: '#stack',
      actionText: { en: 'Stack ↘', ru: 'Стек ↘' },
    },
    {
      id: '03',
      year: '1903 KITTY HAWK',
      tag: { en: 'ACT 03 // PROVING GROUND', ru: 'АКТ 03 // РЕАЛЬНЫЙ ВЗЛЁТ' },
      manifesto: {
        en: '03. COMMERCIAL B2B & PRIVACY SAAS',
        ru: '03. МАСШТАБНЫЙ B2B & PRIVACY SAAS',
      },
      desc: {
        en: 'Proving lift in production: high-load billing pipelines, NoLogs SaaS, and 99.9% fault-tolerant uptime.',
        ru: 'Реальный взлёт в боевом продакшене: автоматический биллинг, NoLogs SaaS и отказоустойчивость 99.9%.',
      },
      meta: {
        en: 'NoLogs · Радиоточка · Jubilee',
        ru: 'NoLogs · Радиоточка · Jubilee',
      },
      actionLink: '#works',
      actionText: { en: 'Cases ↘', ru: 'Проекты ↘' },
    },
    {
      id: '04',
      year: '2026 LUNAR BOUND',
      tag: { en: 'ACT 04 // ORBITAL VELOCITY', ru: 'АКТ 04 // ОРБИТАЛЬНАЯ СКОРОСТЬ' },
      manifesto: {
        en: '04. HIGH-VELOCITY TYPESCRIPT STACK',
        ru: '04. ВЫСОКОСКОРОСТНОЙ ТИПИЗИРОВАННЫЙ СТЕК',
      },
      desc: {
        en: 'Breaking gravitational resistance with React 19, Next.js 15, and 0ms Total Blocking Time at 120 FPS.',
        ru: 'Преодоление притяжения: React 19, Next.js 15 и 0ms Total Blocking Time на орбитальной скорости 120 FPS.',
      },
      meta: {
        en: 'Available for Roles & Contracts',
        ru: 'Доступен для контрактов и архитектуры',
      },
      actionLink: '#works',
      actionText: { en: 'Launch Works ↘', ru: 'Смотреть кейсы ↘' },
    },
  ];

  return (
    <div
      className={`story-cards-container pointer-events-none transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {cardsData.map((card, idx) => {
        const isActive = activeAct === idx && visible;
        return (
          <div
            key={idx}
            className={`story-narrative-block ${isActive ? 'active' : ''}`}
          >
            {/* Unified Bold Manifesto Headline */}
            <div className="flex items-center gap-1.5 mb-1">
              <span className="font-mono text-amber-400 font-bold text-[10px] tracking-wider uppercase shrink-0">
                {card.id} //
              </span>
              <h3 className="font-bold text-white text-[11px] sm:text-[12px] uppercase tracking-wide leading-tight truncate">
                {card.manifesto[locale].replace(/^\d+\.\s*/, '')}
              </h3>
            </div>

            {/* Concise 1-2 line narrative */}
            <p className="text-zinc-300 text-[11px] leading-relaxed mb-2">
              {card.desc[locale]}
            </p>

            {/* Footer Meta & Action Link */}
            <div className="flex items-center justify-between pt-1.5 border-t border-white/10 text-[10px] font-mono text-zinc-400">
              <span className="truncate max-w-[190px] text-zinc-400 text-[10px]">
                {card.meta[locale]}
              </span>
              <a
                href={card.actionLink}
                className="text-amber-400 hover:text-amber-300 transition-colors shrink-0 ml-2 font-medium text-[10px]"
              >
                {card.actionText[locale]}
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
};
