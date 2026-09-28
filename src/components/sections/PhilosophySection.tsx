'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

export const PhilosophySection: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs tracking-widest text-amber-500 uppercase font-semibold">
          // {t.philosophy.tag}
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
          {t.philosophy.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
          {t.philosophy.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {t.philosophy.pillars.map((pillar) => (
          <div
            key={pillar.num}
            className="p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-hover)] transition-all flex flex-col justify-between"
          >
            <div>
              <span className="font-mono text-2xl font-bold text-amber-500">
                {pillar.num}
              </span>
              <h3 className="mt-4 text-xl font-bold text-[var(--text-primary)] tracking-tight">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                {pillar.text}
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[var(--border-subtle)] font-mono text-[11px] text-[var(--text-tertiary)] flex items-center justify-between">
              <span>PRINCIPLE // {pillar.num}</span>
              <span className="text-amber-500">✦</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
