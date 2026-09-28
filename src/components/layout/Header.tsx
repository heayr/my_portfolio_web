'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../i18n/context';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const { t, locale, toggleLocale, theme, toggleTheme } = useApp();
  const [clock, setClock] = useState('--:--:--');
  const [menuOpen, setMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(
        new Intl.DateTimeFormat('en-US', {
          timeZone: 'Europe/Moscow',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('egormyshinsky@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      // Fallback
    }
  };

  const isLight = theme === 'light';

  const headerBg = isLight
    ? scrolled
      ? 'bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-md text-zinc-900'
      : 'bg-white/65 backdrop-blur-md border-b border-black/10 text-zinc-900'
    : scrolled
      ? 'bg-[#040406]/85 backdrop-blur-xl border-b border-white/15 shadow-xl text-white'
      : 'bg-black/45 backdrop-blur-md border-b border-white/10 text-white';

  const linkHover = isLight
    ? 'hover:text-amber-600 transition-colors'
    : 'hover:text-amber-400 transition-colors';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 h-[70px] flex items-center justify-between px-6 sm:px-10 transition-all duration-400 ${headerBg}`}
      >
        {/* Left: Minimal Monochrome Social Acronyms (No pill background) */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs tracking-widest uppercase font-bold">
          <a
            href="https://t.me/PotatoChipasu"
            target="_blank"
            rel="noopener noreferrer"
            className={linkHover}
          >
            TG
          </a>
          <a
            href="https://github.com/heayr"
            target="_blank"
            rel="noopener noreferrer"
            className={linkHover}
          >
            GH
          </a>
          <a
            href="https://linkedin.com/in/potatochipasu"
            target="_blank"
            rel="noopener noreferrer"
            className={linkHover}
          >
            LI
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`${linkHover} text-left`}
            title="Copy email: egormyshinsky@gmail.com"
          >
            {copiedEmail ? 'COPIED!' : 'EMAIL'}
          </button>
        </div>

        {/* Center: Dedicated slot reserved for the Morphing Hero Wordmark */}
        <div className="w-[140px] sm:w-[200px] h-[30px] pointer-events-none" aria-hidden="true" />

        {/* Right: Controls + Minimalist 2-line Burger Menu (No pill background) */}
        <div className="flex items-center gap-3.5 sm:gap-5 font-mono text-xs">
          {/* Moscow Clock */}
          <div className={`hidden md:flex items-center gap-1.5 text-xs pr-3 border-r font-bold ${isLight ? 'border-black/15 text-zinc-700' : 'border-white/15 text-zinc-200'}`}>
            <span className={isLight ? 'text-zinc-500 font-bold' : 'text-zinc-400 font-bold'}>MSK</span>
            <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white font-bold'}>{clock}</span>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className={`font-bold text-xs tracking-wider transition-colors ${
              isLight ? 'text-zinc-800 hover:text-amber-600' : 'text-zinc-200 hover:text-amber-400'
            }`}
            title="Toggle Language"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`text-sm transition-colors ${
              isLight ? 'text-zinc-800 hover:text-amber-600' : 'text-zinc-200 hover:text-amber-400'
            }`}
            title="Toggle Dark / Light Theme"
          >
            {isLight ? '☀' : '☾'}
          </button>

          {/* Minimal 2-Line Burger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`w-7 h-7 flex flex-col items-end justify-center gap-1.5 transition-colors p-1 ${
              isLight ? 'text-zinc-900 hover:text-amber-600' : 'text-white hover:text-amber-400'
            }`}
            aria-label="Toggle Navigation Drawer"
          >
            <span
              className={`h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? 'w-6 -rotate-45 translate-y-[3.5px]' : 'w-6'
              }`}
            />
            <span
              className={`h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? 'w-6 rotate-45 -translate-y-[4px]' : 'w-4'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Full-Screen Drawer Menu (Arpeggio Style) */}
      {menuOpen && (
        <div
          className={`fixed inset-0 z-30 flex flex-col justify-between p-8 sm:p-16 pt-28 backdrop-blur-2xl transition-opacity duration-300 ${
            isLight
              ? 'bg-[#f7f6f2]/98 text-zinc-900'
              : 'bg-[#040406]/98 text-white'
          }`}
        >
          {/* Top Status Meta */}
          <div
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-8 font-mono text-xs border-b ${
              isLight ? 'border-black/10 text-zinc-600' : 'border-white/10 text-zinc-400'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className={`tracking-widest uppercase font-semibold ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                {locale === 'ru' ? 'ДОСТУПЕН ДЛЯ КОНТРАКТОВ И АРХИТЕКТУРЫ' : 'AVAILABLE FOR ARCHITECTURAL ROLES'}
              </span>
            </div>
            <div>
              <span>TIMEZONE // EUROPE/MOSCOW (GMT+3) · {clock}</span>
            </div>
          </div>

          {/* Main Menu Links */}
          <nav className="flex flex-col gap-6 sm:gap-8 my-auto">
            <a
              href="#works"
              onClick={() => setMenuOpen(false)}
              className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
                isLight ? 'text-zinc-800 hover:text-amber-600' : 'text-zinc-200 hover:text-amber-400'
              }`}
            >
              {t.nav.work}
            </a>
            <a
              href="#philosophy"
              onClick={() => setMenuOpen(false)}
              className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
                isLight ? 'text-zinc-800 hover:text-amber-600' : 'text-zinc-200 hover:text-amber-400'
              }`}
            >
              {t.nav.philosophy}
            </a>
            <a
              href="#stack"
              onClick={() => setMenuOpen(false)}
              className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
                isLight ? 'text-zinc-800 hover:text-amber-600' : 'text-zinc-200 hover:text-amber-400'
              }`}
            >
              {t.nav.stack}
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
                isLight ? 'text-zinc-800 hover:text-amber-600' : 'text-zinc-200 hover:text-amber-400'
              }`}
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Footer Contacts */}
          <div
            className={`pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs border-t ${
              isLight ? 'border-black/10 text-zinc-600' : 'border-white/10 text-zinc-500'
            }`}
          >
            <div className="flex gap-6">
              <a href="https://t.me/PotatoChipasu" target="_blank" rel="noopener noreferrer" className={linkHover}>
                Telegram: @PotatoChipasu
              </a>
              <a href="https://github.com/heayr" target="_blank" rel="noopener noreferrer" className={linkHover}>
                GitHub: @heayr
              </a>
            </div>
            <span>© 2026 YEGOR.DEV // LEAD ENGINEER</span>
          </div>
        </div>
      )}
    </>
  );
};
