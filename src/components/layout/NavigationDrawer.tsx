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

  // Lock background scroll when drawer is open and handle Escape key
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
    { href: '#stack', label: t.nav.stack, num: '03' },
    { href: '#contact', label: t.nav.contact, num: '04' },
  ];

  return (
    <>
      {/* Dimmed Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-over Drawer Panel from the Right */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[440px] md:w-[480px] max-w-full flex flex-col justify-between p-6 sm:p-8 shadow-2xl transition-transform duration-300 ease-out overflow-y-auto border-l ${
          isLight
            ? 'bg-[#faf9f5]/98 border-black/10 text-zinc-900'
            : 'bg-[#06060a]/98 border-white/10 text-white'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Navigation Menu"
      >
        {/* Drawer Header (Below fixed navbar, always 100% visible) */}
        <div
          className={`flex items-center justify-between pb-6 border-b ${
            isLight ? 'border-black/10' : 'border-white/10'
          }`}
        >
          {/* Status badge */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span
              className={`tracking-wider uppercase font-bold text-[11px] sm:text-xs ${
                isLight ? 'text-emerald-700' : 'text-emerald-400'
              }`}
            >
              {locale === 'ru'
                ? 'ДОСТУПЕН ДЛЯ КОНТРАКТОВ'
                : 'AVAILABLE FOR ARCHITECTURE'}
            </span>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-sm transition-all duration-200 cursor-pointer ${
              isLight
                ? 'bg-black/5 hover:bg-black/10 text-zinc-800'
                : 'bg-white/5 hover:bg-white/15 text-zinc-200 hover:text-amber-400'
            }`}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Main Navigation Links */}
        <nav className="flex flex-col gap-4 sm:gap-6 my-auto py-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center justify-between text-2xl sm:text-4xl font-black tracking-tight transition-colors py-2 ${
                isLight
                  ? 'text-zinc-800 hover:text-amber-600'
                  : 'text-zinc-100 hover:text-amber-400'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs font-bold text-amber-400">
                  {item.num} //
                </span>
                <span>{item.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                ↘
              </span>
            </a>
          ))}
        </nav>

        {/* Drawer Footer with Meta and Social Links */}
        <div
          className={`pt-6 border-t font-mono text-xs flex flex-col gap-3.5 ${
            isLight ? 'border-black/10 text-zinc-600' : 'border-white/10 text-zinc-400'
          }`}
        >
          {/* Moscow Clock */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-500 uppercase tracking-wider">MSK TIMEZONE (GMT+3)</span>
            <span className={`font-bold ${isLight ? 'text-zinc-900' : 'text-zinc-200'}`}>
              {clock}
            </span>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-4 pt-1 font-bold text-xs">
            <a
              href={profileData.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'
              }`}
            >
              TG ↗
            </a>
            <a
              href={profileData.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'
              }`}
            >
              GH ↗
            </a>
            <a
              href={profileData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${
                isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'
              }`}
            >
              LI ↗
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className={`transition-colors ${
                isLight ? 'hover:text-amber-600' : 'hover:text-amber-400'
              }`}
            >
              EMAIL ↗
            </a>
          </div>

          {/* Copyright */}
          <div className="text-[10px] text-zinc-500 pt-1">
            © 2026 YEGOR.DEV // LEAD ENGINEER & ARCHITECT
          </div>
        </div>
      </aside>
    </>
  );
};
