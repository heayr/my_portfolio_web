'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { metricsData } from '../../data/metrics';

export const MetricsSection: React.FC = () => {
  const { locale } = useApp();

  return (
    <section id="metrics" className="py-20 px-6 sm:px-12 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {metricsData.map((m, idx) => (
          <div key={idx} className="flex flex-col border-l border-[var(--border-subtle)] pl-6">
            <div className="flex items-baseline gap-1 mb-2 font-mono">
              <span className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)]">
                {m.value}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-400">{m.unit}</span>
            </div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{m.label[locale]}</h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{m.desc[locale]}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

