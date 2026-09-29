'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

interface NarrativeCardsProps {
  activeAct: number;
  visible: boolean;
}

const CARDS_DATA = [
  {
    id: '01',
    year: 'CORE // ARCH',
    tag: { en: 'PHASE 01 // ARCHITECTURE & VISION', ru: 'ЭТАП 01 // АРХИТЕКТУРА И СМЫСЛ' },
    manifesto: {
      en: '01. ARCHITECTURE WITHOUT COMPROMISE',
      ru: '01. БЕСКОМПРОМИССНАЯ АРХИТЕКТУРА',
    },
    desc: {
      en: 'Designing high-velocity digital products where mathematical precision meets expressive interaction and modern graphics.',
      ru: 'Проектирую цифровые продукты на стыке математической точности, выразительного интерактива и современной графики.',
    },
    meta: {
      en: '⚡ YEGOR // SENIOR FULL-STACK & ARCHITECT',
      ru: '⚡ ЕГОР // SENIOR FULL-STACK & АРХИТЕКТОР',
    },
    actionLink: '#works',
    actionText: { en: 'Works ↘', ru: 'Кейсы ↘' },
  },
  {
    id: '02',
    year: 'PERF // 100/100',
    tag: { en: 'PHASE 02 // ALGORITHMIC RIGOR', ru: 'ЭТАП 02 // АЛГОРИТМЫ И СТРОГОСТЬ' },
    manifesto: {
      en: '02. ZERO BLOAT · 100/100 CORE WEB VITALS',
      ru: '02. ZERO-LEAK & 100/100 CORE WEB VITALS',
    },
    desc: {
      en: 'Predictable state machines, zero memory leaks, sub-second cold starts, and resilient backend pipelines.',
      ru: 'Предсказуемые стейт-машины, zero memory leaks, мгновенный холодный старт и надежные бэкенд-пайплайны.',
    },
    meta: {
      en: 'Next.js 15 · TypeScript · FastAPI · Tailwind',
      ru: 'Next.js 15 · TypeScript · FastAPI · Tailwind',
    },
    actionLink: '#philosophy',
    actionText: { en: 'Standards ↘', ru: 'Стандарты ↘' },
  },
  {
    id: '03',
    year: 'INFRA // 99.9%',
    tag: { en: 'PHASE 03 // B2B SYSTEMS & SAAS', ru: 'ЭТАП 03 // B2B-СИСТЕМЫ И SAAS' },
    manifesto: {
      en: '03. COMMERCIAL B2B & PRIVACY SAAS',
      ru: '03. МАСШТАБНЫЙ B2B & PRIVACY SAAS',
    },
    desc: {
      en: 'Battle-tested in production: automated billing pipelines, telemetry HUDs, NoLogs privacy infrastructure, and 99.9% uptime.',
      ru: 'Боевой продакшен: автоматический биллинг, телеметрия в реальном времени, NoLogs SaaS и отказоустойчивость 99.9%.',
    },
    meta: {
      en: 'NoLogs · Radiotochka · Jubilee',
      ru: 'NoLogs · Радиоточка · Юбилей 30 лет',
    },
    actionLink: '#works',
    actionText: { en: 'Cases ↘', ru: 'Проекты ↘' },
  },
  {
    id: '04',
    year: 'PROD // INFRA',
    tag: { en: 'PHASE 04 // PRODUCTION SCALE', ru: 'ЭТАП 04 // ПРОДАКШЕН И МАСШТАБ' },
    manifesto: {
      en: '04. HIGH-VELOCITY INFRASTRUCTURE',
      ru: '04. ВЫСОКОСКОРОСТНАЯ ИНФРАСТРУКТУРА',
    },
    desc: {
      en: 'Zero Total Blocking Time, frictionless developer ergonomics, and rock-solid deployment ready for mission-critical scale.',
      ru: '0ms Total Blocking Time, безупречная эргономика стэка и надежный деплой, готовый к нагрузкам реального бизнеса.',
    },
    meta: {
      en: 'Open for Roles & Core Contracts',
      ru: 'Открыт для сильных проектов и контрактов',
    },
    actionLink: '#philosophy',
    actionText: { en: 'Standards ↘', ru: 'Стандарты ↘' },
  },
  {
    id: '05',
    year: 'CRAFT // MOTION',
    tag: { en: 'PHASE 05 // DESIGN & MOTION CRAFT', ru: 'ЭТАП 05 // ДИЗАЙН И МОУШН-КРАФТ' },
    manifesto: {
      en: '05. CREATIVE DIRECTION & MOTION CRAFT',
      ru: '05. КРЕАТИВНЫЙ ДИРЕКШЕН И МОУШН-КРАФТ',
    },
    desc: {
      en: 'From AI prompt generation and classical art animation in CapCut to custom GPU Canvas rendering. Design engineered with soul.',
      ru: 'От нейро-генерации арта и покадровой анимации в CapCut до кастомного GPU Canvas. Дизайн и код как единое искусство.',
    },
    meta: {
      en: 'CapCut · AI Synthesis · UI/UX · Canvas',
      ru: 'CapCut · AI Synthesis · UI/UX · Canvas',
    },
    actionLink: '#works',
    actionText: { en: 'Launch Works ↘', ru: 'Смотреть кейсы ↘' },
  },
];

export const NarrativeCards: React.FC<NarrativeCardsProps> = React.memo(({ activeAct, visible }) => {
  const { locale } = useApp();

  return (
    <div
      className={`story-cards-container pointer-events-none transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      {CARDS_DATA.map((card, idx) => {
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
});

NarrativeCards.displayName = 'NarrativeCards';
