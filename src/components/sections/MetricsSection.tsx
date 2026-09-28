'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

export const MetricsSection: React.FC = () => {
  const { locale } = useApp();

  const metrics = [
    {
      value: '100',
      unit: '/100',
      label: locale === 'ru' ? 'Core Web Vitals' : 'Core Web Vitals',
      desc:
        locale === 'ru'
          ? 'Максимальные баллы PageSpeed по Performance, Accessibility, Best Practices и SEO.'
          : 'Perfect PageSpeed scores across Performance, Accessibility, Best Practices, and SEO.',
    },
    {
      value: '0',
      unit: 'ms',
      label: locale === 'ru' ? 'Total Blocking Time' : 'Total Blocking Time',
      desc:
        locale === 'ru'
          ? 'Никаких блокировок главного потока, плавная прокрутка 120 FPS без лагов.'
          : 'Zero main-thread jank, sub-second execution, and 120 FPS inertial scroll fluidity.',
    },
    {
      value: '280',
      unit: 'ms',
      label: locale === 'ru' ? 'Время отклика TTFB' : 'Edge TTFB',
      desc:
        locale === 'ru'
          ? 'Субсекундный Time To First Byte благодаря CDN-кэшированию и оптимизированному рантайму.'
          : 'Sub-second Time To First Byte via edge CDN distribution and optimized SSR pipelines.',
    },
    {
      value: '99',
      unit: '.9%',
      label: locale === 'ru' ? 'Аптайм в проде' : 'Production Uptime',
      desc:
        locale === 'ru'
          ? 'Docker health-checks, изоляция нод и zero-downtime пайплайны деплоя.'
          : 'Docker container health checks, node failover, and zero-downtime deployment topologies.',
    },
  ];

  return (
    <section id="metrics" className="py-20 px-6 sm:px-12 bg-[var(--bg-surface)] border-y border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {metrics.map((m, idx) => (
          <div key={idx} className="flex flex-col border-l border-[var(--border-subtle)] pl-6">
            <div className="flex items-baseline gap-1 mb-2 font-mono">
              <span className="text-4xl sm:text-6xl font-black tracking-tight text-[var(--text-primary)]">
                {m.value}
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-amber-400">{m.unit}</span>
            </div>
            <h4 className="text-sm font-bold text-[var(--text-primary)] mb-1">{m.label}</h4>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
