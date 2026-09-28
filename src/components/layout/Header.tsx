'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';
import { NavigationDrawer } from './NavigationDrawer';

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
      await navigator.clipboard.writeText(profileData.email);
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
        {/* Left: Minimal Monochrome Social Acronyms with Generous Hitbox & Animated Underline */}
        <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs tracking-widest uppercase font-bold">
          <a
            href={profileData.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-btn"
          >
            TG
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-btn"
          >
            GH
          </a>
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-btn"
          >
            LI
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            className="nav-link-btn text-left"
            title={`Copy email: ${profileData.email}`}
          >
            {copiedEmail ? 'COPIED!' : 'EMAIL'}
          </button>
        </div>

        {/* Center: Dedicated slot reserved for the Morphing Hero Wordmark */}
        <div className="w-[140px] sm:w-[200px] h-[30px] pointer-events-none" aria-hidden="true" />

        {/* Right: Controls + Minimalist 2-line Burger Menu with Generous Hitboxes */}
        <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
          {/* Moscow Clock */}
          <div className={`hidden md:flex items-center gap-1.5 text-xs pr-3 mr-1 border-r font-bold ${isLight ? 'border-black/15 text-zinc-700' : 'border-white/15 text-zinc-200'}`}>
            <span className={isLight ? 'text-zinc-500 font-bold' : 'text-zinc-400 font-bold'}>MSK</span>
            <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white font-bold'}>{clock}</span>
          </div>

          {/* Language Switcher with Animated Underline */}
          <button
            type="button"
            onClick={toggleLocale}
            className="nav-link-btn"
            title="Toggle Language"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          {/* Theme Switcher with Generous Hitbox */}
          <button
            type="button"
            onClick={toggleTheme}
            className="p-3 text-sm transition-all duration-200 hover:text-[var(--accent-gold)] hover:scale-110 flex items-center justify-center cursor-pointer select-none text-[var(--text-primary)]"
            title="Toggle Dark / Light Theme"
          >
            <span>{isLight ? '☀' : '☾'}</span>
          </button>

          {/* Minimal 2-Line Burger Button with Generous Hitbox */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 flex flex-col items-end justify-center gap-1.5 transition-colors cursor-pointer text-[var(--text-primary)] hover:text-[var(--accent-gold)]"
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
      <NavigationDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        clock={clock}
      />
    </>
  );
};
