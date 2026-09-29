'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';

interface ContactCardData {
  id: string;
  type: 'link' | 'button';
  href?: string;
  onClick?: () => void;
  label: string;
  value: string;
  subtext: string;
  isCopied?: boolean;
  glowColor: string;
  ambientGlow: string;
  iconBorder: string;
  icon: React.ReactNode;
}

const ContactCardItem: React.FC<{ card: ContactCardData }> = ({ card }) => {
  const [pos, setPos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setPos((prev) => ({ ...prev, isHovered: false }));
  };

  const innerContent = (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setPos((prev) => ({ ...prev, isHovered: true }))}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 flex flex-col justify-between h-full min-h-[145px] sm:min-h-[160px]"
    >
      {/* Dynamic Cursor Spotlight that follows the mouse - stays bright wherever the mouse moves */}
      <div
        className="pointer-events-none absolute -inset-6 sm:-inset-7 rounded-3xl transition-opacity duration-200"
        style={{
          opacity: pos.isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${pos.x + 24}px ${pos.y + 24}px, ${card.glowColor}, transparent 75%)`,
        }}
      />

      {/* Vibrant Ambient Gradient Background on hover (Zero dark veil, stays luminous) */}
      <div
        className={`pointer-events-none absolute -inset-6 sm:-inset-7 rounded-3xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${card.ambientGlow}`}
      />

      {/* Top Glass Specularity Reflection Line */}
      <div className="pointer-events-none absolute -top-6 sm:-top-7 -left-6 sm:-left-7 -right-6 sm:-right-7 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Top Row: Icon Badge & Action Symbol */}
      <div className="relative z-20 flex items-center justify-between">
        <div
          className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 shadow-md ${card.iconBorder}`}
        >
          {card.icon}
        </div>

        {card.id === 'email' ? (
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
              card.isCopied
                ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/50 scale-110 font-bold shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'text-zinc-400 group-hover:text-amber-300 group-hover:scale-110'
            }`}
          >
            {card.isCopied ? '✓' : '⧉'}
          </div>
        ) : (
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-zinc-400 group-hover:text-white transition-all duration-300">
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
        )}
      </div>

      {/* Bottom Row: Meta Info */}
      <div className="relative z-20 flex flex-col pt-4">
        <span className="text-xs font-mono tracking-wider text-zinc-400 group-hover:text-amber-300 transition-colors uppercase font-medium">
          {card.label}
        </span>
        <span className="text-lg sm:text-xl font-bold text-white tracking-tight mt-1 truncate drop-shadow-sm group-hover:text-white">
          {card.value}
        </span>
        <span className="text-[11px] font-mono text-zinc-500 group-hover:text-zinc-300 mt-1 transition-colors">
          {card.subtext}
        </span>
      </div>
    </div>
  );

  const containerClasses =
    "group relative p-6 sm:p-7 rounded-3xl bg-zinc-950/85 border border-white/10 hover:border-white/30 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] text-left flex flex-col justify-between cursor-pointer w-full select-none";

  if (card.type === 'button') {
    return (
      <button key={card.id} type="button" onClick={card.onClick} className={containerClasses}>
        {innerContent}
      </button>
    );
  }

  return (
    <a key={card.id} href={card.href} target="_blank" rel="noopener noreferrer" className={containerClasses}>
      {innerContent}
    </a>
  );
};

export const CurtainFooter: React.FC = () => {
  const { t, locale } = useApp();
  const [copied, setCopied] = useState(false);
  const [clock, setClock] = useState('');
  const [titleMousePos, setTitleMousePos] = useState({ px: 0, py: 0, active: false });

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleTitleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTitleMousePos({
      px: e.clientX - rect.left,
      py: e.clientY - rect.top,
      active: true,
    });
  };

  const handleTitleMouseLeave = () => {
    setTitleMousePos((prev) => ({ ...prev, active: false }));
  };

  const handleScrollToTop = () => {
    if (typeof window !== 'undefined') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { duration: 1.4, immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const contactCards: ContactCardData[] = [
    {
      id: 'telegram',
      type: 'link',
      href: profileData.telegram,
      label: 'Telegram',
      value: profileData.telegramHandle,
      subtext: locale === 'ru' ? 'Быстрый отклик & чат' : 'Direct & fast response',
      glowColor: 'rgba(0, 198, 255, 0.38)',
      ambientGlow: 'bg-[radial-gradient(ellipse_at_top,#0088cc_0%,rgba(0,198,255,0.22)_45%,transparent_80%)]',
      iconBorder: 'group-hover:border-[#2AABEE]/50 group-hover:bg-[#2AABEE]/15',
      icon: (
        <svg className="w-6 h-6 text-[#2AABEE] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      ),
    },
    {
      id: 'email',
      type: 'button',
      onClick: handleCopyEmail,
      label: copied ? t.footer.copied : 'Email',
      value: profileData.email,
      subtext: locale === 'ru' ? 'Нажмите, чтобы скопировать' : 'Click to copy address',
      isCopied: copied,
      glowColor: 'rgba(245, 158, 11, 0.42)',
      ambientGlow: 'bg-[radial-gradient(ellipse_at_top,#f59e0b_0%,rgba(236,72,153,0.22)_45%,transparent_80%)]',
      iconBorder: 'group-hover:border-amber-400/50 group-hover:bg-amber-400/15',
      icon: (
        <svg className="w-6 h-6 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
    },
    {
      id: 'github',
      type: 'link',
      href: profileData.github,
      label: 'GitHub',
      value: profileData.githubHandle,
      subtext: locale === 'ru' ? 'Исходный код & коммиты' : 'Source code & commits',
      glowColor: 'rgba(99, 102, 241, 0.42)',
      ambientGlow: 'bg-[radial-gradient(ellipse_at_top,#6366f1_0%,rgba(59,130,246,0.22)_45%,transparent_80%)]',
      iconBorder: 'group-hover:border-white/50 group-hover:bg-white/15',
      icon: (
        <svg className="w-6 h-6 text-zinc-100 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
    },
    {
      id: 'linkedin',
      type: 'link',
      href: profileData.linkedin,
      label: 'LinkedIn',
      value: 'Profile',
      subtext: locale === 'ru' ? 'Карьера & рекомендации' : 'Career & recommendations',
      glowColor: 'rgba(10, 102, 194, 0.45)',
      ambientGlow: 'bg-[radial-gradient(ellipse_at_top,#0A66C2_0%,rgba(56,189,248,0.22)_45%,transparent_80%)]',
      iconBorder: 'group-hover:border-[#0A66C2]/50 group-hover:bg-[#0A66C2]/15',
      icon: (
        <svg className="w-6 h-6 text-[#0A66C2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
        </svg>
      ),
    },
  ];

  return (
    <footer
      id="contact"
      className="relative z-20 min-h-screen w-full bg-[#050508] text-white overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 rounded-t-[36px] md:rounded-t-[56px] shadow-[0_-50px_120px_rgba(0,0,0,0.98)] border-t border-white/15 select-none"
    >
      <div className="w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 flex-1 flex flex-col justify-between gap-10 sm:gap-12">
        {/* Top Meta Bar: Status, Moscow Timezone Clock & Remote Work Phrase */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              {/* Availability Status Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-amber-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {t.nav.status}
              </div>

              {/* Moscow Timezone Live Clock */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>MOSCOW // GMT+3 · {clock}</span>
              </div>
            </div>

            {/* Location & Remote Phrase */}
            <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-400">
              <svg className="w-4 h-4 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{t.footer.location}</span>
            </div>
          </div>

          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-normal leading-relaxed max-w-3xl">
            {t.footer.subtext}
          </p>
        </div>

        {/* Completely Borderless Monumental Typography with Pure Gradient Hover Illumination */}
        <div
          onMouseMove={handleTitleMouseMove}
          onMouseLeave={handleTitleMouseLeave}
          className="relative my-auto py-6 sm:py-10 select-none group/title cursor-default w-full overflow-hidden"
        >
          {/* Subtle Ambient Spotlight Glow following cursor across title */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/title:opacity-100"
            style={{
              background: titleMousePos.active
                ? `radial-gradient(550px circle at ${titleMousePos.px}px ${titleMousePos.py}px, rgba(245, 158, 11, 0.16), transparent 70%)`
                : 'none',
            }}
          />

          <h2 className="relative z-10 text-[clamp(2rem,5.2vw,6.4rem)] font-black uppercase leading-[0.92] tracking-tight sm:tracking-normal max-w-full">
            {locale === 'ru' ? (
              <>
                <span className="block text-zinc-300 group-hover/title:text-white transition-colors duration-500 max-w-full">
                  СОЗДАДИМ НЕЧТО
                </span>
                <span className="block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent group-hover/title:from-amber-300 group-hover/title:via-amber-100 group-hover/title:to-amber-400 transition-all duration-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.3)] max-w-full">
                  МОНУМЕНТАЛЬНОЕ
                </span>
              </>
            ) : (
              <>
                <span className="block text-zinc-300 group-hover/title:text-white transition-colors duration-500 max-w-full">
                  LET&apos;S BUILD SOMETHING
                </span>
                <span className="block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent group-hover/title:from-amber-300 group-hover/title:via-amber-100 group-hover/title:to-amber-400 transition-all duration-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.3)] max-w-full">
                  EXTRAORDINARY
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Action Controls: Dynamic Hologram Cards with Persistent Brightness */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 my-2 sm:my-4 items-stretch w-full">
          {contactCards.map((card) => (
            <ContactCardItem key={card.id} card={card} />
          ))}
        </div>

        {/* Big "Back to Top" Action Button */}
        <div className="w-full pt-2">
          <button
            type="button"
            onClick={handleScrollToTop}
            className="group relative w-full py-5 sm:py-6 px-6 sm:px-10 rounded-2xl sm:rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-400/50 transition-all duration-300 flex items-center justify-between overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_0_35px_rgba(245,158,11,0.22)] active:scale-[0.99]"
          >
            {/* Amber Ambient Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex items-center gap-4 sm:gap-6">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-black transition-all duration-300 shadow-md group-hover:-translate-y-1">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5" />
                  <path d="M5 12l7-7 7 7" />
                </svg>
              </div>

              <div className="flex flex-col text-left">
                <span className="text-base sm:text-xl font-black text-white tracking-widest uppercase group-hover:text-amber-400 transition-colors">
                  {t.footer.backToTop}
                </span>
                <span className="text-xs sm:text-sm font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors mt-0.5">
                  {t.footer.backToTopSub}
                </span>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-3 font-mono text-xs sm:text-sm text-zinc-400 group-hover:text-amber-400 transition-colors">
              <span className="hidden sm:inline">[ 00 // HERO ]</span>
              <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-base font-bold group-hover:border-amber-400/40 group-hover:scale-110 transition-all">
                ↑
              </span>
            </div>
          </button>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <span>© 2026 YEGOR.DEV // SOFTWARE & FULLSTACK ENGINEER</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
};
