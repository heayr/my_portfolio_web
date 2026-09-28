'use client';

import React from 'react';
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

  if (!isOpen) return null;

  const isLight = theme === 'light';
  const linkHover = isLight
    ? 'hover:text-amber-600 transition-colors'
    : 'hover:text-amber-400 transition-colors';

  return (
    <div
      className={`fixed inset-0 z-30 flex flex-col justify-between p-8 sm:p-16 pt-28 backdrop-blur-2xl transition-opacity duration-300 ${
        isLight ? 'bg-[#f7f6f2]/98 text-zinc-900' : 'bg-[#040406]/98 text-white'
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
          <span
            className={`tracking-widest uppercase font-semibold ${
              isLight ? 'text-emerald-700' : 'text-emerald-400'
            }`}
          >
            {locale === 'ru'
              ? 'ДОСТУПЕН ДЛЯ КОНТРАКТОВ И АРХИТЕКТУРЫ'
              : 'AVAILABLE FOR ARCHITECTURAL ROLES'}
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
          onClick={onClose}
          className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
            isLight
              ? 'text-zinc-800 hover:text-amber-600'
              : 'text-zinc-200 hover:text-amber-400'
          }`}
        >
          {t.nav.work}
        </a>
        <a
          href="#philosophy"
          onClick={onClose}
          className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
            isLight
              ? 'text-zinc-800 hover:text-amber-600'
              : 'text-zinc-200 hover:text-amber-400'
          }`}
        >
          {t.nav.philosophy}
        </a>
        <a
          href="#stack"
          onClick={onClose}
          className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
            isLight
              ? 'text-zinc-800 hover:text-amber-600'
              : 'text-zinc-200 hover:text-amber-400'
          }`}
        >
          {t.nav.stack}
        </a>
        <a
          href="#contact"
          onClick={onClose}
          className={`text-3xl sm:text-6xl font-black tracking-tight transition-colors ${
            isLight
              ? 'text-zinc-800 hover:text-amber-600'
              : 'text-zinc-200 hover:text-amber-400'
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
          <a
            href={profileData.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className={linkHover}
          >
            Telegram: {profileData.telegramHandle}
          </a>
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className={linkHover}
          >
            GitHub: {profileData.githubHandle}
          </a>
        </div>
        <span>© 2026 YEGOR.DEV // LEAD ENGINEER</span>
      </div>
    </div>
  );
};
