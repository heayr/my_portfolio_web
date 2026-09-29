'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

export const PhilosophySection: React.FC = () => {
  const { t, locale, theme } = useApp();
  const isLight = theme === 'light';

  return (
    <section id="philosophy" className="py-24 sm:py-32 border-t border-[var(--border-subtle)] bg-[var(--bg-root)] transition-colors duration-300">
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24">
        {/* Section Header (Arpeggio Signature) */}
        <div className="max-w-4xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-amber-500 uppercase font-bold mb-3">
            <span>//</span>
            <span>{t.philosophy.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.05]">
            {t.philosophy.title}
          </h2>
          <p className="mt-5 text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {t.philosophy.description}
          </p>
        </div>

        {/* 5 Stacked Full-Width Service / Principle Rows (The Arpeggio Layout) */}
        <div className="border-t border-[var(--border-subtle)] flex flex-col">
          {t.philosophy.pillars.map((pillar) => (
            <div
              key={pillar.num}
              className={`group relative border-b border-[var(--border-subtle)] py-10 sm:py-14 lg:py-16 transition-all duration-300 -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-3xl ${
                isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.02]'
              }`}
            >
              {/* Left Amber Accent Bar on Hover */}
              <div
                className="absolute left-0 top-8 bottom-8 w-1 bg-amber-400 rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                {/* 1. Large Monospace Number: {01} */}
                <div className="lg:col-span-2 flex flex-row lg:flex-col items-baseline lg:items-start justify-between">
                  <span
                    className={`font-mono text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight transition-colors duration-300 ${
                      isLight
                        ? 'text-zinc-400 group-hover:text-amber-600'
                        : 'text-zinc-500 group-hover:text-amber-400'
                    }`}
                  >
                    {`{${pillar.num}}`}
                  </span>
                  <span
                    className={`font-mono text-[10px] sm:text-[11px] uppercase tracking-widest mt-1 lg:mt-2 ${
                      isLight ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    PHASE // {pillar.num}
                  </span>
                </div>

                {/* 2. Main Title, Subtitle & Comprehensive Description */}
                <div className="lg:col-span-6 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight flex items-baseline gap-3 transition-all">
                    <span
                      className={`group-hover:translate-x-2 transition-transform duration-300 inline-block ${
                        isLight
                          ? 'text-zinc-900 group-hover:text-amber-700'
                          : 'text-[var(--text-primary)] group-hover:text-white'
                      }`}
                    >
                      {pillar.title}
                    </span>
                    <span className="text-amber-500 group-hover:scale-x-125 transition-transform origin-left font-normal select-none">
                      —
                    </span>
                  </h3>
                  <span className="font-mono text-xs sm:text-sm text-amber-500 font-semibold tracking-wider uppercase mt-2.5">
                    {pillar.subtitle}
                  </span>
                  <p
                    className={`text-sm sm:text-base leading-relaxed mt-4 max-w-2xl transition-colors ${
                      isLight
                        ? 'text-zinc-600 group-hover:text-zinc-900'
                        : 'text-[var(--text-secondary)] group-hover:text-zinc-200'
                    }`}
                  >
                    {pillar.text}
                  </p>
                </div>

                {/* 3. Deliverables & Core Competencies Tag Cloud */}
                <div className="lg:col-span-4 flex flex-col pt-2 lg:pt-0">
                  <span
                    className={`font-mono text-[11px] uppercase tracking-widest mb-3.5 block ${
                      isLight ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  >
                    // {locale === 'ru' ? 'АРТЕФАКТЫ & КОМПЕТЕНЦИИ' : 'DELIVERABLES & COMPETENCIES'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-mono transition-all duration-300 cursor-default ${
                          isLight
                            ? 'bg-black/5 border border-black/10 text-zinc-700 group-hover:border-black/20 group-hover:bg-black/[0.08] group-hover:text-zinc-900 hover:border-amber-600 hover:text-amber-700'
                            : 'bg-white/5 border border-white/10 text-zinc-300 group-hover:border-white/20 group-hover:bg-white/10 group-hover:text-white hover:border-amber-400/50 hover:text-amber-300'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation Strip (Arpeggio Signature Action Bar) */}
        <div className="mt-14 pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div
            className={`flex items-center gap-3 font-mono text-xs sm:text-sm ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="uppercase tracking-wider">
              {locale === 'ru' ? '5 НАПРАВЛЕНИЙ СИНХРОНИЗИРОВАНЫ С ИНТРО-СКРАББЕРОМ' : '5 DISCIPLINES SYNCHRONIZED WITH INTRO SCRUBBER'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#works"
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-mono font-bold transition-all hover:scale-105 ${
                isLight
                  ? 'bg-black/5 hover:bg-black/10 border-black/15 text-zinc-800 hover:text-amber-700'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-amber-400/50 text-white'
              }`}
            >
              <span>[01] {t.nav.work}</span>
              <span className="text-amber-500">↗</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black text-xs font-mono font-black transition-all hover:scale-105 shadow-md shadow-amber-400/20"
            >
              <span>[04] {t.nav.contact}</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

