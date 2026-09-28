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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 h-[70px] flex items-center justify-between px-6 sm:px-10 transition-all duration-400 ${
          scrolled
            ? 'bg-black/80 dark:bg-black/85 light:bg-white/90 backdrop-blur-xl border-b border-white/10 dark:border-white/10 light:border-black/10 shadow-lg'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        {/* Left: Minimal Monochrome Social Acronyms (Arpeggio Signature) */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px] tracking-widest uppercase text-zinc-400">
          <a
            href="https://t.me/PotatoChipasu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            TG
          </a>
          <a
            href="https://github.com/heayr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            GH
          </a>
          <a
            href="https://linkedin.com/in/potatochipasu"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-amber-400 transition-colors"
          >
            LI
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="hover:text-amber-400 transition-colors text-left"
            title="Copy email: egormyshinsky@gmail.com"
          >
            {copiedEmail ? 'COPIED!' : 'EMAIL'}
          </button>
        </div>

        {/* Center: Dedicated slot reserved for the Morphing Hero Wordmark */}
        <div className="w-[140px] sm:w-[200px] h-[30px] pointer-events-none" aria-hidden="true" />

        {/* Right: Controls + Minimalist 2-line Burger Menu */}
        <div className="flex items-center gap-3 sm:gap-5 font-mono text-xs">
          {/* Moscow Clock */}
          <div className="hidden md:flex items-center gap-1.5 text-zinc-400 text-[11px] pr-2 border-r border-white/10 dark:border-white/10 light:border-black/10">
            <span className="text-zinc-500">MSK</span>
            <span className="text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-semibold">{clock}</span>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className="px-2 py-0.5 rounded-full border border-white/15 dark:border-white/15 light:border-black/15 text-[11px] hover:border-amber-400 hover:text-amber-400 transition-colors text-zinc-300 dark:text-zinc-300 light:text-zinc-800"
            title="Toggle Language"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-7 h-7 rounded-full border border-white/15 dark:border-white/15 light:border-black/15 flex items-center justify-center text-[12px] hover:border-amber-400 hover:text-amber-400 transition-colors text-zinc-300 dark:text-zinc-300 light:text-zinc-800"
            title="Toggle Dark / Light Theme"
          >
            {theme === 'dark' ? '☀' : '☾'}
          </button>

          {/* Minimal 2-Line Burger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-8 h-8 flex flex-col items-end justify-center gap-1.5 text-zinc-200 hover:text-amber-400 transition-colors p-1"
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
        <div className="fixed inset-0 z-30 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 sm:p-16 pt-28 text-white transition-opacity duration-300">
          {/* Top Status Meta */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-8 font-mono text-xs text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-widest uppercase text-emerald-400">
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
              className="text-3xl sm:text-6xl font-black tracking-tight text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {t.nav.work}
            </a>
            <a
              href="#philosophy"
              onClick={() => setMenuOpen(false)}
              className="text-3xl sm:text-6xl font-black tracking-tight text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {t.nav.philosophy}
            </a>
            <a
              href="#stack"
              onClick={() => setMenuOpen(false)}
              className="text-3xl sm:text-6xl font-black tracking-tight text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {t.nav.stack}
            </a>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="text-3xl sm:text-6xl font-black tracking-tight text-zinc-300 hover:text-amber-400 transition-colors"
            >
              {t.nav.contact}
            </a>
          </nav>

          {/* Footer Contacts */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 font-mono text-xs text-zinc-500">
            <div className="flex gap-6">
              <a href="https://t.me/PotatoChipasu" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                Telegram: @PotatoChipasu
              </a>
              <a href="https://github.com/heayr" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
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
