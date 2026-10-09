'use client';

import React, { useRef, useMemo, useCallback } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';
import { getContactCards } from '../../data/contacts';
import { ContactCardItem } from './ContactCardItem';
import { MoscowClock } from '../ui/MoscowClock';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard';

export const CurtainFooter: React.FC = () => {
  const { t, locale } = useApp();
  const { isCopied, copy } = useCopyToClipboard(2400);
  const footerSpotlightRef = useRef<HTMLDivElement>(null);

  const handleCopyEmail = useCallback(() => {
    copy(profileData.email);
  }, [copy]);

  const handleFooterMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!footerSpotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    footerSpotlightRef.current.style.opacity = '1';
    footerSpotlightRef.current.style.background = `radial-gradient(850px circle at ${px}px ${py}px, rgba(245, 158, 11, 0.14), transparent 70%)`;
  }, []);

  const handleFooterMouseLeave = useCallback(() => {
    if (footerSpotlightRef.current) {
      footerSpotlightRef.current.style.opacity = '0';
    }
  }, []);

  const handleScrollToTop = useCallback(() => {
    if (typeof window !== 'undefined') {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { duration: 1.4, immediate: false });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, []);

  // Memoized contacts configuration (Referential Equality)
  const contactCards = useMemo(
    () => getContactCards(profileData, locale, isCopied, handleCopyEmail, t.footer.copied),
    [locale, isCopied, handleCopyEmail, t.footer.copied]
  );

  // Dynamic telemetry items for the right-hand column widget
  const telemetryItems = useMemo(
    () => [
      {
        id: 'clock',
        badge: locale === 'ru' ? 'МОСКОВСКОЕ ВРЕМЯ // GMT+3' : 'MOSCOW TIME // GMT+3',
        dot: 'bg-emerald-400 animate-pulse',
        component: <MoscowClock variant="footer" />,
      },
      {
        id: 'location',
        badge: locale === 'ru' ? 'МОСКВА, РОССИЯ' : 'MOSCOW, RUSSIA',
        dot: 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.6)]',
        component: (
          <div className="text-xs text-zinc-400 tracking-wide pl-4 font-mono">
            {locale === 'ru' ? 'Работаю удаленно по всему миру' : 'Remote Worldwide'}
          </div>
        ),
      },
    ],
    [locale]
  );

  const headline = useMemo(
    () =>
      locale === 'ru'
        ? { line1: 'СОЗДАДИМ НЕЧТО', line2: 'МОНУМЕНТАЛЬНОЕ' }
        : { line1: "LET'S BUILD SOMETHING", line2: 'EXTRAORDINARY' },
    [locale]
  );

  return (
    <footer
      id="contact"
      role="contentinfo"
      onMouseMove={handleFooterMouseMove}
      onMouseLeave={handleFooterMouseLeave}
      className="relative z-20 min-h-[85vh] xl:min-h-screen w-full bg-[#050508] text-white overflow-hidden flex flex-col justify-between pt-10 sm:pt-14 lg:pt-16 2xl:pt-24 pb-6 sm:pb-8 lg:pb-12 rounded-t-[36px] md:rounded-t-[56px] shadow-[0_-50px_120px_rgba(0,0,0,0.98)] border-t border-white/15 select-none"
    >
      {/* Dynamic Cursor Spotlight (Direct DOM Mutation, 0 Re-renders) */}
      <div
        ref={footerSpotlightRef}
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0 opacity-0"
      />

      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 sm:px-12 lg:px-16 xl:px-24 flex-1 flex flex-col justify-between gap-10 sm:gap-12">
        {/* Top Header Narrative */}
        <div className="max-w-3xl">
          <p className="text-lg sm:text-xl lg:text-2xl text-zinc-300 font-normal leading-relaxed">
            {t.footer.subtext}
          </p>
        </div>

        {/* Central Monumental Architecture + Telemetry Widget Column */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 sm:gap-12 my-auto py-4 sm:py-6 w-full">
          {/* Borderless Monumental Typography */}
          <div className="flex-1 select-none group/title cursor-default max-w-full">
            <h2
              className={`relative z-10 text-[clamp(2.2rem,5vw,6.2rem)] font-black uppercase max-w-full ${
                locale === 'ru'
                  ? 'leading-[1.08] sm:leading-[1.12] tracking-[0.03em] sm:tracking-[0.05em]'
                  : 'leading-[0.92] tracking-tight sm:tracking-normal'
              }`}
            >
              <span className="block text-zinc-300 group-hover/title:text-white transition-colors duration-500 max-w-full mb-2 sm:mb-4">
                {headline.line1}
              </span>
              <span className="block bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 bg-clip-text text-transparent group-hover/title:from-amber-300 group-hover/title:via-amber-100 group-hover/title:to-amber-400 transition-all duration-500 drop-shadow-[0_0_40px_rgba(245,158,11,0.35)] max-w-full">
                {headline.line2}
              </span>
            </h2>
          </div>

          {/* Universal GlassCard: Telemetry Column Widget */}
          <GlassCard
            intensity="crystal"
            sheen={true}
            className="relative z-10 w-full sm:w-auto xl:w-[380px] shrink-0 p-6 sm:p-7 rounded-3xl flex flex-col justify-between gap-5 transition-all duration-300 shadow-2xl group/widget hover:border-amber-400/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.16)]"
          >
            {telemetryItems.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx > 0 && <div className="w-full h-[1px] bg-white/10" />}
                <div className="flex flex-col">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-400 mb-2">
                    <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                    <span>{item.badge}</span>
                  </div>
                  {item.component}
                </div>
              </React.Fragment>
            ))}
          </GlassCard>
        </div>

        {/* Action Controls: Dynamic Hologram Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 my-2 sm:my-4 items-stretch w-full">
          {contactCards.map((card) => (
            <ContactCardItem key={card.id} card={card} />
          ))}
        </div>

        {/* Bottom Rights Bar with Borderless Large Back to Top Button */}
        <div className="pt-8 sm:pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-xs sm:text-sm text-zinc-500">
          <span className="order-2 md:order-1 text-center md:text-left">
            © 2026 YEGOR.DEV // SOFTWARE & FULLSTACK ENGINEER
          </span>

          {/* Animated Back To Top Button */}
          <Button
            variant="ghost"
            onClick={handleScrollToTop}
            className="order-1 md:order-2 group gap-3.5 text-zinc-400 hover:text-white py-2 px-3"
            aria-label={t.footer.backToTop}
            iconRight={
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-amber-400/10">
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-400 group-hover:text-amber-400 transition-all duration-300 group-hover:-translate-y-1.5"
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
            }
          >
            <span className="text-base sm:text-lg lg:text-xl font-black uppercase tracking-widest text-zinc-300 group-hover:text-amber-400 transition-colors">
              {locale === 'ru' ? 'НАВЕРХ' : 'BACK TO TOP'}
            </span>
          </Button>

          <span className="order-3 text-center md:text-right">
            {t.footer.rights}
          </span>
        </div>
      </div>
    </footer>
  );
};
