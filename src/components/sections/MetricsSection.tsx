'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { metricsData } from '../../data/metrics';

export const MetricsSection: React.FC = () => {
  const { locale } = useApp();

  return (
    <section id="metrics" className="py-14 sm:py-20 px-4 sm:px-8 lg:px-12 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {metricsData.map((m, idx) => (
          <div key={idx} className="flex flex-col border-l border-[var(--border-subtle)] pl-4 sm:pl-6 min-w-0">
            <div className="flex items-baseline gap-1 mb-2 font-mono">
              <span className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)]">
                {m.value}
              </span>
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-400">{m.unit}</span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-[var(--text-primary)] mb-1">{m.label[locale]}</h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{m.desc[locale]}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

