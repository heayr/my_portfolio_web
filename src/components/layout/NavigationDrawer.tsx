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

  const socialLinks = [
    { name: 'TELEGRAM', href: profileData.telegram },
    { name: 'GITHUB', href: profileData.github },
    { name: 'LINKEDIN', href: profileData.linkedin },
    { name: 'EMAIL', href: `mailto:${profileData.email}` },
  ];

  return (
    <>
      {/* Dimmed / Frosted Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/75 backdrop-blur-md transition-opacity duration-400 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* ── LEFT / TRANSPARENT ZONE: Massive Upper-Left Typography (Half-Screen) ── */}
      <div
        className={`fixed inset-y-0 left-0 right-0 md:right-[460px] lg:right-[500px] z-40 p-8 sm:p-12 lg:p-16 hidden md:flex flex-col justify-between pointer-events-none transition-all duration-500 ease-out ${
          isOpen
            ? 'opacity-100 translate-x-0'
            : 'opacity-0 -translate-x-12 pointer-events-none'
        }`}
      >
        {/* Upper-Left Meta: Timezone, Live Clock & Status */}
        <div className="flex flex-col gap-2.5 pointer-events-auto">
          <div className="flex items-center gap-2.5 font-mono text-xs text-amber-400 tracking-widest uppercase font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>MOSCOW // GMT+3 · {clock}</span>
          </div>
          <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
            {locale === 'ru'
              ? 'ОТКРЫТ К СОТРУДНИЧЕСТВУ И НОВЫМ ПРОЕКТАМ'
              : 'OPEN TO COLLABORATION & NEW PROJECTS'}
          </div>
        </div>

        {/* Center / Left Half: MASSIVE Giant Contact Links taking up half the screen */}
        <div className="flex flex-col gap-3 lg:gap-5 my-auto pointer-events-auto">
          <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-1">
            // {locale === 'ru' ? 'ПРЯМЫЕ КОНТАКТЫ & СЕТИ' : 'DIRECT CHANNELS & SOCIALS'}
          </div>
          {socialLinks.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline gap-3 text-4xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tighter text-zinc-300 hover:text-amber-400 transition-all duration-300 hover:translate-x-3 w-fit"
            >
              <span className="font-mono text-xs lg:text-sm text-zinc-600 group-hover:text-amber-400 transition-colors">
                [0{idx + 1}]
              </span>
              <span>{item.name}</span>
              <span className="text-2xl lg:text-4xl text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-2 group-hover:-translate-y-1 transition-all">
                ↗
              </span>
            </a>
          ))}
        </div>

        {/* Lower-Left Signature */}
        <div className="font-mono text-xs text-zinc-500 uppercase tracking-widest pointer-events-auto">
          © 2026 YEGOR.DEV // SOFTWARE & FULLSTACK ENGINEER
        </div>
      </div>

      {/* ── RIGHT PANEL: Slide-over Drawer with Page Links ── */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full md:w-[460px] lg:w-[500px] max-w-full flex flex-col justify-between p-6 sm:p-10 shadow-2xl transition-transform duration-400 ease-out overflow-y-auto border-l ${
          isLight
            ? 'bg-[#faf9f5]/98 border-black/10 text-zinc-900'
            : 'bg-[#06060a]/98 border-white/10 text-white'
        } ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        aria-label="Navigation Menu"
      >
        {/* Drawer Header (Always 100% visible, never cut off) */}
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
              {locale === 'ru' ? 'МЕНЮ НАВИГАЦИИ' : 'NAVIGATION'}
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
        <nav className="flex flex-col gap-5 sm:gap-7 my-auto py-8">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center justify-between text-3xl sm:text-5xl font-black tracking-tight transition-all py-1 ${
                isLight
                  ? 'text-zinc-800 hover:text-amber-600'
                  : 'text-zinc-100 hover:text-amber-400'
              }`}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">
                  {item.num} //
                </span>
                <span>{item.label}</span>
              </div>
              <span className="font-mono text-sm sm:text-base text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-1.5 transition-all">
                ↘
              </span>
            </a>
          ))}
        </nav>

        {/* Mobile-Only Contacts Block (visible on phones where left-half is hidden) */}
        <div
          className={`md:hidden pt-6 border-t font-mono text-xs flex flex-col gap-3 ${
            isLight ? 'border-black/10 text-zinc-600' : 'border-white/10 text-zinc-400'
          }`}
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-zinc-500 uppercase tracking-wider">MSK // {clock}</span>
            <span className="text-emerald-400 font-bold uppercase">
              {locale === 'ru' ? 'ОТКРЫТ К ПРЕДЛОЖЕНИЯМ' : 'OPEN TO WORK'}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 pt-1 font-bold text-sm">
            <a href={profileData.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              TG ↗
            </a>
            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              GH ↗
            </a>
            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
              LI ↗
            </a>
            <a href={`mailto:${profileData.email}`} className="hover:text-amber-400 transition-colors">
              EMAIL ↗
            </a>
          </div>
        </div>

        {/* Desktop Drawer Footer */}
        <div
          className={`hidden md:flex items-center justify-between pt-6 border-t font-mono text-[11px] ${
            isLight ? 'border-black/10 text-zinc-500' : 'border-white/10 text-zinc-500'
          }`}
        >
          <span>ESC TO CLOSE</span>
          <span>SELECT TO NAVIGATE ↓</span>
        </div>
      </aside>
    </>
  );
};
