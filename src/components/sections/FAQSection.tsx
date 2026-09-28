'use client';

import React, { useState } from 'react';
import { useApp } from '../../i18n/context';

interface FAQItem {
  q: { en: string; ru: string };
  a: { en: string; ru: string };
}

const faqData: FAQItem[] = [
  {
    q: {
      en: 'What is your core architectural focus?',
      ru: 'В чем заключается твоя главная архитектурная экспертиза?',
    },
    a: {
      en: 'I engineer end-to-end web architectures: from responsive, accessible React 19 / Next.js 15 App Router frontends with 100/100 Core Web Vitals to asynchronous FastAPI backends, PostgreSQL schemas, and Docker topologies with automated SSL and edge routing.',
      ru: 'Сквозное проектирование веб-систем: от реактивных и доступных фронтендов на React 19 / Next.js 15 со 100/100 Core Web Vitals до асинхронных бэкендов на FastAPI/Node.js, реляционных баз данных PostgreSQL и контейнеризированной инфраструктуры на Docker с автоматическим SSL.',
    },
  },
  {
    q: {
      en: 'How do you guarantee 100/100 Core Web Vitals in production?',
      ru: 'Как достигается 100/100 Core Web Vitals на реальных проектах?',
    },
    a: {
      en: 'Strict elimination of runtime bloat, zero render-blocking scripts, modern WebP/AVIF media formats with explicit aspect ratios, CSS containment, optimized server-side rendering, and lazy hydration for below-the-fold widgets.',
      ru: 'Полный отказ от лишнего оверхеда и тяжелых рантаймов, отсутствие блокирующих скриптов, современные форматы изображений с фиксированными пропорциями, CSS-контейнмент и эффективный SSR.',
    },
  },
  {
    q: {
      en: 'What commercial production experience do you have?',
      ru: 'Какой коммерческий опыт подтверждает эти навыки?',
    },
    a: {
      en: 'Lead Architect for NoLogs SaaS—a live commercial privacy platform with active paying subscribers, automated YooKassa webhook billing, and real-time Wireguard configurations. Also engineered the Радиоточка advertising platform and bespoke luxury invitation web applications.',
      ru: 'Ведущий архитектор NoLogs SaaS — действующего сервиса с активными платными подписками, автоматическим приемом платежей через YooKassa и инфраструктурой туннелей. Также создал B2B-платформу агентства Радиоточка и эксклюзивные интерактивные веб-приложения.',
    },
  },
  {
    q: {
      en: 'Are you available for contract or lead architectural roles?',
      ru: 'Доступен ли ты для контрактной работы или роли Lead-инженера?',
    },
    a: {
      en: 'Yes. I am open to Lead Frontend, Fullstack Engineering, and Architecture roles. Reach out directly via Telegram (@PotatoChipasu) or email.',
      ru: 'Да, открыт для предложений на позиции Lead Frontend, Fullstack Architect и проектной разработки. Связаться можно напрямую в Telegram (@PotatoChipasu) или по почте.',
    },
  },
];

export const FAQSection: React.FC = () => {
  const { locale } = useApp();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 px-6 sm:px-12 bg-[var(--bg-root)] border-t border-[var(--border-subtle)]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="font-mono text-xs tracking-widest text-amber-500 uppercase font-semibold">
            // {locale === 'ru' ? 'ВОПРОСЫ И ОТВЕТЫ' : 'FREQUENTLY ASKED QUESTIONS'}
          </span>
          <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
            {locale === 'ru' ? 'Принципы и детали работы.' : 'Engineering Principles & Details.'}
          </h2>
        </div>

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
                  <span>{item.q[locale]}</span>
                  <span className="font-mono text-xl text-amber-500 ml-4">{isOpen ? '−' : '+'}</span>
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
