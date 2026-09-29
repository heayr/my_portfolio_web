'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

export const PhilosophySection: React.FC = () => {
  const { t, locale } = useApp();

  return (
    <section id="philosophy" className="py-24 sm:py-32 border-t border-[var(--border-subtle)] bg-[var(--bg-root)]">
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
              className="group relative border-b border-[var(--border-subtle)] py-10 sm:py-14 lg:py-16 transition-all duration-500 hover:bg-white/[0.02] -mx-4 px-4 sm:-mx-8 sm:px-8 rounded-3xl"
            >
              {/* Left Amber Accent Bar on Hover */}
              <div
                className="absolute left-0 top-8 bottom-8 w-1 bg-amber-400 rounded-full scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                {/* 1. Large Monospace Number: {01} */}
                <div className="lg:col-span-2 flex flex-row lg:flex-col items-baseline lg:items-start justify-between">
                  <span className="font-mono text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-500 group-hover:text-amber-400 transition-colors duration-300 tracking-tight">
                    {`{${pillar.num}}`}
                  </span>
                  <span className="font-mono text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-widest mt-1 lg:mt-2">
                    PHASE // {pillar.num}
                  </span>
                </div>

                {/* 2. Main Title, Subtitle & Comprehensive Description */}
                <div className="lg:col-span-6 flex flex-col">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[var(--text-primary)] group-hover:text-white transition-all flex items-baseline gap-3">
                    <span className="group-hover:translate-x-2 transition-transform duration-300 inline-block">
                      {pillar.title}
                    </span>
                    <span className="text-amber-400 group-hover:scale-x-125 transition-transform origin-left font-normal select-none">
                      —
                    </span>
                  </h3>
                  <span className="font-mono text-xs sm:text-sm text-amber-500/90 font-semibold tracking-wider uppercase mt-2.5">
                    {pillar.subtitle}
                  </span>
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] group-hover:text-zinc-200 leading-relaxed mt-4 max-w-2xl transition-colors">
                    {pillar.text}
                  </p>
                </div>

                {/* 3. Deliverables & Core Competencies Tag Cloud */}
                <div className="lg:col-span-4 flex flex-col pt-2 lg:pt-0">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest mb-3.5 block">
                    // {locale === 'ru' ? 'АРТЕФАКТЫ & КОМПЕТЕНЦИИ' : 'DELIVERABLES & COMPETENCIES'}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {pillar.tags.map((tag, tagIdx) => (
                      <span
                        key={tagIdx}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 group-hover:border-white/20 group-hover:bg-white/10 text-xs sm:text-[13px] font-mono text-zinc-300 group-hover:text-white transition-all duration-300 hover:border-amber-400/50 hover:text-amber-300 cursor-default"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-400 shrink-0" />
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
          <div className="flex items-center gap-3 font-mono text-xs sm:text-sm text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="uppercase tracking-wider">
              {locale === 'ru' ? '5 НАПРАВЛЕНИЙ СИНХРОНИЗИРОВАНЫ С ИНТРО-СКРАББЕРОМ' : '5 DISCIPLINES SYNCHRONIZED WITH INTRO SCRUBBER'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="#works"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-xs font-mono font-bold text-white transition-all hover:scale-105"
            >
              <span>[01] {t.nav.work}</span>
              <span className="text-amber-400">↗</span>
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

