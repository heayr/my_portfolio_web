'use client';

import React, { useState } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';

export const CurtainFooter: React.FC = () => {
  const { t, locale } = useApp();
  const [copied, setCopied] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, px: 0, py: 0, active: false });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({
      x,
      y,
      px: e.clientX - rect.left,
      py: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, x: 0, y: 0, active: false }));
  };

  const contactCards = [
    {
      id: 'telegram',
      type: 'link',
      href: profileData.telegram,
      label: 'Telegram',
      value: profileData.telegramHandle,
      subtext: locale === 'ru' ? 'Быстрый отклик & чат' : 'Direct & fast response',
      arrow: '↗',
      // Apple Electric Cyan & Cyber Violet Aurora
      auroraBg: 'bg-[radial-gradient(circle_at_50%_50%,#0088cc_0%,#00c6ff_35%,#9d4edd_75%,transparent_100%)]',
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
      arrow: copied ? '✓' : '⧉',
      isCopied: copied,
      // Apple Sunset Gold & Neon Orchid Aurora
      auroraBg: 'bg-[radial-gradient(circle_at_50%_50%,#f59e0b_0%,#ec4899_40%,#8b5cf6_75%,transparent_100%)]',
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
      arrow: '↗',
      // Apple Titanium Aurora Borealis (Indigo & Emerald)
      auroraBg: 'bg-[radial-gradient(circle_at_50%_50%,#6366f1_0%,#3b82f6_40%,#10b981_75%,transparent_100%)]',
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
      arrow: '↗',
      // Apple Deep Sapphire & Cobalt Aurora
      auroraBg: 'bg-[radial-gradient(circle_at_50%_50%,#0A66C2_0%,#38bdf8_40%,#6366f1_75%,transparent_100%)]',
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
        {/* Top Tag & Description - Scaled up for large 16:9 displays */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono tracking-widest text-amber-400 uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            {t.nav.status}
          </div>
          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-normal leading-relaxed">
            {t.footer.subtext}
          </p>
        </div>

        {/* Massive Monumental Typography with Parallax & Spotlight - fits screen width perfectly */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative my-auto py-8 sm:py-12 border-y border-white/10 select-none group/title cursor-default w-full overflow-hidden"
        >
          {/* Subtle Ambient Spotlight Glow following cursor across full width */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 opacity-0 group-hover/title:opacity-100"
            style={{
              background: mousePos.active
                ? `radial-gradient(500px circle at ${mousePos.px}px ${mousePos.py}px, rgba(245, 158, 11, 0.14), transparent 70%)`
                : 'none',
            }}
          />

          <h2 className="relative z-10 text-[clamp(2rem,5.2vw,6.4rem)] font-black uppercase leading-[0.92] tracking-tight sm:tracking-normal transition-transform duration-500 max-w-full">
            {locale === 'ru' ? (
              <>
                <span
                  className="block text-zinc-300 hover:text-white transition-all duration-300 max-w-full"
                  style={{
                    transform: `translateX(${mousePos.x * -10}px)`,
                  }}
                >
                  СОЗДАДИМ НЕЧТО
                </span>
                <span
                  className="block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent animate-text-shimmer transition-all duration-300 drop-shadow-[0_0_35px_rgba(245,158,11,0.25)] max-w-full"
                  style={{
                    transform: `translateX(${mousePos.x * 12}px)`,
                  }}
                >
                  МОНУМЕНТАЛЬНОЕ
                </span>
              </>
            ) : (
              <>
                <span
                  className="block text-zinc-300 hover:text-white transition-all duration-300 max-w-full"
                  style={{
                    transform: `translateX(${mousePos.x * -10}px)`,
                  }}
                >
                  LET&apos;S BUILD SOMETHING
                </span>
                <span
                  className="block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent animate-text-shimmer transition-all duration-300 drop-shadow-[0_0_35px_rgba(245,158,11,0.25)] max-w-full"
                  style={{
                    transform: `translateX(${mousePos.x * 12}px)`,
                  }}
                >
                  EXTRAORDINARY
                </span>
              </>
            )}
          </h2>
        </div>

        {/* Action Controls: Apple-Style Iridescent Hologram Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 my-4 lg:my-6 items-stretch w-full">
          {contactCards.map((card) => {
            const innerContent = (
              <>
                {/* Apple Iridescent Aurora Gradient Layer */}
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none overflow-hidden">
                  <div
                    className={`absolute -inset-[50%] w-[200%] h-[200%] ${card.auroraBg} opacity-60 filter blur-2xl animate-aurora`}
                  />
                  {/* Dark contrast veil to ensure 100% white text legibility */}
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                </div>

                {/* Top Glass Specularity Reflection Line */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                {/* Card Foreground Content */}
                <div className="relative z-10 flex flex-col justify-between h-full min-h-[140px] sm:min-h-[155px]">
                  {/* Top: Icon Badge & Arrow */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 shadow-md ${card.iconBorder}`}
                    >
                      {card.icon}
                    </div>
                    <div
                      className={`w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        card.isCopied
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/40 scale-110 font-bold'
                          : 'text-zinc-400 group-hover:text-white group-hover:border-white/30 group-hover:translate-x-1 group-hover:-translate-y-1'
                      }`}
                    >
                      {card.arrow}
                    </div>
                  </div>

                  {/* Bottom: Meta Info */}
                  <div className="flex flex-col pt-4">
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
              </>
            );

            const containerClasses =
              "group relative p-6 sm:p-7 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-white/30 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] text-left flex flex-col justify-between cursor-pointer w-full select-none";

            if (card.type === 'button') {
              return (
                <button
                  key={card.id}
                  type="button"
                  onClick={card.onClick}
                  className={containerClasses}
                >
                  {innerContent}
                </button>
              );
            }

            return (
              <a
                key={card.id}
                href={card.href}
                target="_blank"
                rel="noopener noreferrer"
                className={containerClasses}
              >
                {innerContent}
              </a>
            );
          })}
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


