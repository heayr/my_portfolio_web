'use client';

import React, { useEffect } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  clock: string;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  clock,
}) => {
  const { t, locale, theme } = useApp();

  // Handle escape key and body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    (window as any).lenis?.stop();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
      (window as any).lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const isLight = theme === 'light';

  const menuItems = [
    { href: '#works', label: t.nav.work, num: '01' },
    { href: '#philosophy', label: t.nav.philosophy, num: '02' },
    { href: '#metrics', label: locale === 'ru' ? 'Метрики' : 'Metrics', num: '03' },
    { href: '#faq', label: 'FAQ', num: '04' },
    { href: '#contact', label: t.nav.contact, num: '05' },
  ];

  const socialLinks = [
    { name: 'TELEGRAM', href: profileData.telegram },
    { name: 'GITHUB', href: profileData.github },
    { name: 'LINKEDIN', href: profileData.linkedin },
    { name: 'EMAIL', href: `mailto:${profileData.email}` },
  ];

  return (
    <>
      {/* Dimmed Frosted Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto visible' : 'opacity-0 pointer-events-none invisible'
        }`}
        aria-hidden="true"
      />

      {/* ── UNIFIED RIGHT SLIDE-OVER DRAWER (Translucent Frosted Glass) ── */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[540px] md:w-[600px] lg:w-[660px] max-w-full flex flex-col justify-between px-6 sm:px-10 md:px-12 pb-8 sm:pb-10 pt-[78px] sm:pt-[92px] shadow-2xl transition-transform duration-300 ease-out border-l backdrop-blur-2xl ${
          isLight
            ? 'bg-[#faf9f5]/85 border-black/10 text-zinc-900'
            : 'bg-[#06060a]/80 border-white/10 text-white'
        } ${isOpen ? 'translate-x-0 pointer-events-auto visible' : 'translate-x-full pointer-events-none invisible'}`}
        aria-label="Navigation Menu"
      >
        {/* Drawer Meta: Moscow Timezone, Live Clock & Status - 100% Crisp, Large & Visible */}
        <div
          className={`flex flex-col gap-2 pb-6 border-b shrink-0 ${
            isLight ? 'border-black/10' : 'border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5 font-mono text-sm sm:text-base font-bold tracking-widest uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className={isLight ? 'text-zinc-900' : 'text-white'}>
              MOSCOW // GMT+3 · {clock}
            </span>
          </div>
          <span
            className={`font-mono text-xs sm:text-sm uppercase tracking-wider ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}
          >
            {locale === 'ru'
              ? 'ОТКРЫТ К СОТРУДНИЧЕСТВУ И НОВЫМ ПРОЕКТАМ'
              : 'OPEN TO COLLABORATION & NEW PROJECTS'}
          </span>
        </div>

        {/* Main Navigation Links: Large clean numbers (NO YELLOW), large bold titles */}
        <nav className="flex flex-col gap-3 sm:gap-5 my-auto py-6 sm:py-8 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-baseline justify-between py-2 transition-all duration-300 hover:translate-x-2 ${
                isLight
                  ? 'text-zinc-800 hover:text-zinc-950'
                  : 'text-zinc-100 hover:text-white'
              }`}
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                {/* Large clean monospace number - NO YELLOW, high contrast */}
                <span
                  className={`font-mono text-lg sm:text-2xl font-bold tracking-wider transition-colors ${
                    isLight
                      ? 'text-zinc-400 group-hover:text-zinc-800'
                      : 'text-zinc-500 group-hover:text-zinc-200'
                  }`}
                >
                  [{item.num}]
                </span>
                <span className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight transition-colors">
                  {item.label}
                </span>
              </div>
              <span
                className={`font-mono text-xl sm:text-2xl transition-all duration-300 group-hover:translate-x-1.5 group-hover:translate-y-1 ${
                  isLight
                    ? 'text-zinc-400 group-hover:text-zinc-900'
                    : 'text-zinc-500 group-hover:text-white'
                }`}
              >
                ↘
              </span>
            </a>
          ))}
        </nav>

        {/* Footer Direct Contacts & Signature */}
        <div
          className={`pt-6 sm:pt-8 border-t font-mono text-xs flex flex-col gap-4 shrink-0 ${
            isLight ? 'border-black/10' : 'border-white/10'
          }`}
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-bold text-sm sm:text-base">
            {socialLinks.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors flex items-center gap-1 ${
                  isLight
                    ? 'text-zinc-700 hover:text-zinc-950'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <span>{s.name}</span>
                <span className="text-xs">↗</span>
              </a>
            ))}
          </div>
          <div className="flex items-center justify-between text-[11px] text-zinc-500">
            <span>© 2026 YEGOR.DEV // SOFTWARE & FULLSTACK</span>
            <span>ESC TO CLOSE</span>
          </div>
        </div>
      </aside>
    </>
  );
};
