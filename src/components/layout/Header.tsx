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
      : 'bg-transparent border-b border-transparent text-zinc-900'
    : scrolled
      ? 'bg-[#040406]/85 backdrop-blur-xl border-b border-white/15 shadow-xl text-white'
      : 'bg-transparent border-b border-transparent text-white';

  const linkHover = isLight
    ? 'hover:text-amber-600 transition-colors'
    : 'hover:text-amber-400 transition-colors';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 h-[60px] sm:h-[70px] flex items-center justify-between px-4 sm:px-10 transition-all duration-300 ${headerBg}`}
      >
        {/* Left: Desktop Socials with Animated Underlines (Hidden on mobile to eliminate clutter) */}
        <div className="hidden sm:flex items-center gap-1 sm:gap-2 font-mono text-xs tracking-widest uppercase font-bold">
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

        {/* Mobile Left: Optical balance spacer so center wordmark stays centered */}
        <div className="sm:hidden w-8" aria-hidden="true" />

        {/* Center: Dedicated slot reserved for the Morphing Hero Wordmark */}
        <div className="w-[100px] sm:w-[200px] h-[30px] pointer-events-none" aria-hidden="true" />

        {/* Right: Controls + Minimalist 2-line Burger Menu */}
        <div className="flex items-center gap-0.5 sm:gap-2 font-mono text-xs">
          {/* Moscow Clock (Desktop Only) */}
          <div className={`hidden md:flex items-center gap-1.5 text-xs pr-3 mr-1 border-r font-bold ${isLight ? 'border-black/15 text-zinc-700' : 'border-white/15 text-zinc-200'}`}>
            <span className={isLight ? 'text-zinc-500 font-bold' : 'text-zinc-400 font-bold'}>MSK</span>
            <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white font-bold'}>{clock}</span>
          </div>

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className="px-2 py-1.5 sm:px-2.5 rounded-md font-mono text-[11px] sm:text-xs font-bold tracking-wider text-zinc-300 hover:text-amber-400 transition-colors"
            title="Toggle Language"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-xs sm:text-sm text-zinc-300 hover:text-amber-400 transition-all hover:scale-110 cursor-pointer select-none"
            title="Toggle Dark / Light Theme"
          >
            <span>{isLight ? '☀' : '☾'}</span>
          </button>

          {/* Minimal 2-Line Burger Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer text-[var(--text-primary)] hover:text-amber-400"
            aria-label="Toggle Navigation Drawer"
          >
            <span
              className={`h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? 'w-5 -rotate-45 translate-y-[3.5px]' : 'w-5'
              }`}
            />
            <span
              className={`h-[1.5px] bg-current transition-all duration-300 ${
                menuOpen ? 'w-5 rotate-45 -translate-y-[4px]' : 'w-3.5'
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
