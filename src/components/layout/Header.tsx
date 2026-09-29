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

  const headerBg = menuOpen
    ? isLight
      ? 'bg-transparent border-b border-transparent text-zinc-900'
      : 'bg-transparent border-b border-transparent text-white'
    : isLight
      ? scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-md text-zinc-900'
        : 'bg-white/65 backdrop-blur-md border-b border-black/10 text-zinc-900'
      : scrolled
        ? 'bg-[#040406]/85 backdrop-blur-xl border-b border-white/15 shadow-xl text-white'
        : 'bg-black/45 backdrop-blur-md border-b border-white/10 text-white';

  const linkHover = isLight
    ? 'hover:text-amber-600 transition-colors'
    : 'hover:text-amber-400 transition-colors';

  const btnText = isLight
    ? 'text-zinc-800 hover:text-zinc-950'
    : 'text-zinc-300 hover:text-white';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 ${menuOpen ? 'z-[100]' : 'z-40'} h-[60px] sm:h-[70px] flex items-center justify-between px-4 sm:px-10 transition-all duration-300 ${headerBg}`}
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
        <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
          {/* Moscow Clock (Desktop Only, hidden when menu is open to avoid duplicate) */}
          {!menuOpen && (
            <div className={`hidden md:flex items-center gap-1.5 text-xs pr-3 mr-1 border-r font-bold ${isLight ? 'border-black/15 text-zinc-700' : 'border-white/15 text-zinc-200'}`}>
              <span className={isLight ? 'text-zinc-500 font-bold' : 'text-zinc-400 font-bold'}>MSK</span>
              <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white font-bold'}>{clock}</span>
            </div>
          )}

          {/* Language Switcher */}
          <button
            type="button"
            onClick={toggleLocale}
            className={`px-2 py-1.5 sm:px-2.5 rounded-md font-mono text-[11px] sm:text-xs font-bold tracking-wider transition-colors ${btnText}`}
            title="Toggle Language"
          >
            {locale === 'ru' ? 'EN' : 'RU'}
          </button>

          {/* Theme Switcher */}
          <button
            type="button"
            onClick={toggleTheme}
            className={`w-8 h-8 flex items-center justify-center text-xs sm:text-sm transition-all hover:scale-110 cursor-pointer select-none ${btnText}`}
            title="Toggle Dark / Light Theme"
          >
            <span>{isLight ? '☀' : '☾'}</span>
          </button>

          {/* Minimal 2-Line Burger / Cross Morphing Button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`relative w-10 h-10 flex items-center justify-center transition-colors cursor-pointer select-none ${
              isLight ? 'text-zinc-900 hover:text-zinc-600' : 'text-white hover:text-zinc-300'
            }`}
            aria-label={menuOpen ? 'Close Navigation Drawer' : 'Open Navigation Drawer'}
          >
            <span
              className={`absolute h-[2px] bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                menuOpen
                  ? 'w-6 rotate-45 translate-y-0'
                  : 'w-6 -translate-y-[4px]'
              }`}
            />
            <span
              className={`absolute h-[2px] bg-current rounded-full transition-all duration-300 ease-out origin-center ${
                menuOpen
                  ? 'w-6 -rotate-45 translate-y-0'
                  : 'w-4 translate-x-[2px] translate-y-[4px]'
              }`}
            />
          </button>
        </div>
      </header>

      {/* Slide-over Drawer Menu */}
      <NavigationDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        clock={clock}
      />
    </>
  );
};
