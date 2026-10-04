'use client';

import React, { useState } from 'react';
import { useApp } from '../../i18n/context';
import { faqData } from '../../data/faq';
import { SectionHeader } from '../ui/SectionHeader';
import { MorphingToggleIcon } from '../ui/MorphingToggleIcon';

export const FAQSection: React.FC = () => {
  const { locale } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative md:sticky md:top-0 z-10 py-24 px-6 sm:px-12 bg-[var(--bg-root)] border-t border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          eyebrow={locale === 'ru' ? 'ВОПРОСЫ И ОТВЕТЫ' : 'FREQUENTLY ASKED QUESTIONS'}
          title={locale === 'ru' ? 'Принципы и детали работы.' : 'Engineering Principles & Details.'}
          className="mb-14"
        />

        <div className="flex flex-col gap-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full flex items-center justify-between p-6 sm:p-7 text-left font-bold text-base sm:text-lg text-[var(--text-primary)] hover:text-amber-400 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{item.q[locale]}</span>
                  <div
                    className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center transition-colors text-zinc-500 hover:text-amber-500 shrink-0"
                    aria-hidden="true"
                  >
                    <MorphingToggleIcon open={isOpen} size="sm" />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 sm:px-7 sm:pb-7 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-subtle)]/50 pt-4">
                    {item.a[locale]}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
