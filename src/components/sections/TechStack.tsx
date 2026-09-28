'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { stackData } from '../../data/stack';

export const TechStack: React.FC = () => {
  const { t, locale } = useApp();

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs tracking-widest text-amber-500 uppercase font-semibold">
          // {t.stack.tag}
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
          {t.stack.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {t.stack.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stackData.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between"
          >
            <div>
              <h3 className="font-mono text-xs font-semibold tracking-wider text-amber-500 uppercase pb-4 mb-4 border-b border-[var(--border-subtle)]">
                {cat.title[locale]}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex flex-col">
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {item.name}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)] font-mono">
                      {item.tag[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
