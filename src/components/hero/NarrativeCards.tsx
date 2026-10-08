'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { GlassCard } from '../ui/GlassCard';

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
      en: '⚡ DIGITAL POLYMATH // FULLSTACK & PRODUCT',
      ru: '⚡ DIGITAL POLYMATH // FULLSTACK & PRODUCT',
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
    year: 'INFRA // VDS PROD',
    tag: { en: 'PHASE 03 // B2B SYSTEMS & SAAS', ru: 'ЭТАП 03 // B2B-СИСТЕМЫ И SAAS' },
    manifesto: {
      en: '03. COMMERCIAL B2B & PRIVACY SAAS',
      ru: '03. МАСШТАБНЫЙ B2B & PRIVACY SAAS',
    },
    desc: {
      en: 'Battle-tested in production: automated billing pipelines, telemetry HUDs, NoLogs privacy infrastructure, and independent Linux VDS topology.',
      ru: 'Боевой продакшен: автоматический биллинг, телеметрия в реальном времени, NoLogs SaaS и стабильные Linux VDS.',
    },
    meta: {
      en: 'NoLogs · Radiotochka · Jubilee',
      ru: 'NoLogs · Радиоточка · Jubilee',
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
  const { locale, theme } = useApp();
  const isLight = theme === 'light';

  return (
    <div
      className={`story-cards-container w-full grid grid-cols-1 grid-rows-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? 'opacity-100 max-h-[500px] mb-0 pointer-events-auto'
          : 'opacity-0 max-h-0 mb-[-12px] overflow-hidden pointer-events-none'
      }`}
    >
      {CARDS_DATA.map((card, idx) => {
        const isActive = activeAct === idx && visible;
        return (
          <GlassCard
            key={idx}
            className={`story-narrative-card col-start-1 row-start-1 w-full p-4 sm:p-5 2xl:p-6 rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isActive
                ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto z-10'
                : 'opacity-0 translate-y-3 scale-[0.98] pointer-events-none z-0'
            } ${
              isLight ? 'shadow-[0_20px_50px_rgba(0,0,0,0.12)] !text-zinc-950' : ''
            }`}
            sheen={true}
            intensity="frosted"
          >
            {/* Apple Frosted Pill & Phase Indicator */}
            <div className="flex items-center justify-between gap-2 mb-2.5">
              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono tracking-wider backdrop-blur-md ${
                  isLight
                    ? 'bg-black/[0.06] border-black/10 shadow-[0_1px_3px_rgba(0,0,0,0.05)] text-zinc-950 font-extrabold'
                    : 'bg-white/[0.08] border-white/[0.14] text-zinc-200'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.85)]" />
                <span className="font-bold uppercase tracking-wider">
                  {card.tag[locale].replace(/\s*\/\/\s*/g, ' · ')}
                </span>
              </div>
              <span
                className={`font-mono text-[10px] tracking-widest shrink-0 ${
                  isLight ? 'text-zinc-800 font-extrabold' : 'text-zinc-400/80 font-medium'
                }`}
              >
                {card.id} / 05
              </span>
            </div>

            {/* Apple-style Refined Manifesto Headline */}
            <h3
              className={`text-[13.5px] sm:text-[14.5px] 2xl:text-[16px] tracking-tight leading-snug mb-1.5 ${
                isLight ? 'text-zinc-950 font-black' : 'text-white font-semibold'
              }`}
            >
              {card.manifesto[locale].replace(/^\d+\.\s*/, '')}
            </h3>

            {/* Crisp Human Body Narrative */}
            <p
              className={`text-[11.5px] sm:text-[12px] 2xl:text-[13px] leading-relaxed mb-3.5 ${
                isLight ? 'text-zinc-800 font-medium' : 'text-zinc-300/90 font-normal'
              }`}
            >
              {card.desc[locale]}
            </p>

            {/* Apple Frosted Footer Meta & Action Pill */}
            <div
              className={`flex items-center justify-between pt-2.5 border-t text-[10.5px] ${
                isLight ? 'border-black/10' : 'border-white/[0.08]'
              }`}
            >
              <span
                className={`truncate flex-1 min-w-0 pr-2.5 font-mono tracking-tight text-[10px] sm:text-[10.5px] 2xl:text-[11.5px] ${
                  isLight ? 'text-zinc-700 font-bold' : 'text-zinc-400'
                }`}
              >
                {card.meta[locale].replace(/\s*\/\/\s*/g, ' · ')}
              </span>
              <a
                href={card.actionLink}
                className={`group/btn shrink-0 inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10.5px] 2xl:text-[11.5px] font-bold transition-all duration-200 active:scale-95 border shadow-sm backdrop-blur-md ${
                  isLight
                    ? 'bg-amber-400 hover:bg-amber-300 text-zinc-950 border-amber-400 shadow-[0_1px_4px_rgba(245,158,11,0.25)]'
                    : 'bg-white/[0.08] hover:bg-white/[0.16] text-white border-white/[0.14] hover:border-white/[0.28]'
                }`}
              >
                <span>{card.actionText[locale].replace(/[\s↘↗→]+$/, '')}</span>
                <svg
                  className="w-2.5 h-2.5 text-zinc-950 dark:text-amber-500 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H9M17 7V15" />
                </svg>
              </a>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
});

NarrativeCards.displayName = 'NarrativeCards';
