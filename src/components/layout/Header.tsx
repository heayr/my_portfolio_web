'use client';

import React, { useState } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';
import { Navbar } from './Navbar';
import { NavigationDrawer } from './NavigationDrawer';
import { MoscowClock } from '../ui/MoscowClock';
import { MorphingToggleIcon } from '../ui/MorphingToggleIcon';
import { Button } from '../ui/Button';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

interface HeaderProps {
  scrolled: boolean;
}

export const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const { locale, toggleLocale, theme, toggleTheme } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const { isCopied, copy } = useCopyToClipboard(2400);

  const handleCopyEmail = () => {
    copy(profileData.email);
  };

  const isLight = theme === 'light';

  const headerBg = menuOpen
    ? 'bg-transparent border-b border-transparent text-white'
    : isLight
      ? scrolled
        ? 'bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-md text-zinc-900'
        : 'bg-white/65 backdrop-blur-md border-b border-black/10 text-zinc-900'
      : scrolled
        ? 'bg-[#040406]/85 backdrop-blur-xl border-b border-white/15 shadow-xl text-white'
        : 'bg-black/45 backdrop-blur-md border-b border-white/10 text-white';

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 inset-x-0 ${menuOpen ? 'z-[100]' : 'z-40'} h-[60px] sm:h-[70px] flex items-center px-4 sm:px-12 2xl:px-16 transition-all duration-300 ${headerBg}`}
      >
        <div className="w-full max-w-[clamp(1200px,92vw,1800px)] mx-auto flex items-center justify-between">
          {/* Left: Semantic Navbar rendered via data-driven array and universal Button */}
          <Navbar copiedEmail={isCopied} onCopyEmail={handleCopyEmail} />

          {/* Mobile Left: Optical balance spacer so center wordmark stays centered */}
          <div className="sm:hidden w-8" aria-hidden="true" />

          {/* Center: Dedicated slot reserved for the Morphing Hero Wordmark */}
          <div className="w-[100px] sm:w-[200px] h-[30px] pointer-events-none" aria-hidden="true" />

          {/* Right: Controls + Minimalist 2-line Burger Menu */}
          <div className="flex items-center gap-1 sm:gap-2 font-mono text-xs">
            {/* Moscow Clock (Desktop Only, hidden when menu is open to avoid duplicate) */}
            {!menuOpen && <MoscowClock variant="header" isLight={isLight} />}

            {/* Language Switcher Button */}
            <Button
              variant="icon"
              size="sm"
              onClick={toggleLocale}
              className={`font-bold tracking-wider ${isLight ? 'text-zinc-800 hover:text-zinc-950' : 'text-zinc-300 hover:text-white'}`}
              title="Toggle Language"
            >
              {locale === 'ru' ? 'EN' : 'RU'}
            </Button>

            {/* Theme Switcher Button */}
            <Button
              variant="icon"
              size="sm"
              onClick={toggleTheme}
              className={isLight ? 'text-zinc-800 hover:text-zinc-950' : 'text-zinc-300 hover:text-white'}
              title="Toggle Dark / Light Theme"
            >
              <span>{isLight ? '☀' : '☾'}</span>
            </Button>

            {/* Minimal 2-Line Burger / Cross Morphing Button */}
            <Button
              variant="icon"
              size="md"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close Navigation Drawer' : 'Open Navigation Drawer'}
              className={isLight ? 'text-zinc-900 hover:text-zinc-600' : 'text-white hover:text-zinc-300'}
            >
              <MorphingToggleIcon open={menuOpen} size="md" />
            </Button>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer Menu */}
      <NavigationDrawer
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
};
