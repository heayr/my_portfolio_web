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

  // Lock background scroll when drawer is open, auto-close on scroll or Escape key
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
    <div
      aria-hidden={!isOpen}
      onClick={(e) => {
        // If clicking on the backdrop itself (not inside nav links), close the menu
        if (e.target === e.currentTarget) onClose();
      }}
      className={`fixed inset-0 z-40 flex flex-col justify-between p-6 sm:p-12 lg:p-16 pt-24 sm:pt-28 backdrop-blur-2xl transition-all duration-300 ${
        isLight
          ? 'bg-[#faf9f5]/85 text-zinc-900 border-b border-black/10'
          : 'bg-[#040406]/85 text-white border-b border-white/10'
      } ${
        isOpen
          ? 'opacity-100 pointer-events-auto visible'
          : 'opacity-0 pointer-events-none invisible'
      }`}
    >
      {/* Top Meta Line: Timezone, Clock & Status */}
      <div
        className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-6 font-mono text-xs border-b ${
          isLight ? 'border-black/10 text-zinc-600' : 'border-white/10 text-zinc-400'
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="tracking-widest uppercase font-semibold">
            {locale === 'ru'
              ? 'ОТКРЫТ К СОТРУДНИЧЕСТВУ И НОВЫМ ПРОЕКТАМ'
              : 'OPEN TO COLLABORATION & NEW PROJECTS'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">TIMEZONE // EUROPE/MOSCOW (GMT+3) ·</span>
          <span className="font-bold text-amber-500">{clock}</span>
        </div>
      </div>

      {/* Main Navigation Links */}
      <nav className="flex flex-col gap-4 sm:gap-6 my-auto max-w-4xl">
        {menuItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`group flex items-baseline gap-4 sm:gap-6 text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight transition-all duration-300 hover:translate-x-3 w-fit ${
              isLight
                ? 'text-zinc-800 hover:text-amber-600'
                : 'text-zinc-200 hover:text-amber-400'
            }`}
          >
            <span className="font-mono text-xs sm:text-sm text-zinc-500 group-hover:text-amber-500 transition-colors">
              [{item.num}]
            </span>
            <span>{item.label}</span>
            <span className="text-xl sm:text-3xl text-zinc-500 group-hover:text-amber-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all opacity-0 group-hover:opacity-100">
              ↗
            </span>
          </a>
        ))}
      </nav>

      {/* Footer Meta & Socials */}
      <div
        className={`pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs border-t ${
          isLight ? 'border-black/10 text-zinc-600' : 'border-white/10 text-zinc-500'
        }`}
      >
        <div className="flex flex-wrap gap-4 sm:gap-8 font-bold">
          {socialLinks.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={isLight ? 'hover:text-amber-600 transition-colors' : 'hover:text-amber-400 transition-colors'}
            >
              {s.name} ↗
            </a>
          ))}
        </div>
        <span>© 2026 YEGOR.DEV // SOFTWARE & FULLSTACK ENGINEER</span>
      </div>
    </div>
  );
};
