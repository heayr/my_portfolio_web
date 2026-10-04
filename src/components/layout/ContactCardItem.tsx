'use client';

import React, { useRef } from 'react';
import { ContactCardData } from '../../data/contacts';

export interface ContactCardItemProps {
  card: ContactCardData;
}

export const ContactCardItem: React.FC<ContactCardItemProps> = React.memo(({ card }) => {
  const cardSpotlightRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardSpotlightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left + 24;
    const y = e.clientY - rect.top + 24;
    cardSpotlightRef.current.style.opacity = '1';
    cardSpotlightRef.current.style.background = `radial-gradient(280px circle at ${x}px ${y}px, ${card.glowColor}, transparent 75%)`;
  };

  const handleMouseEnter = () => {
    if (cardSpotlightRef.current) cardSpotlightRef.current.style.opacity = '1';
  };

  const handleMouseLeave = () => {
    if (cardSpotlightRef.current) cardSpotlightRef.current.style.opacity = '0';
  };

  const innerContent = (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 flex flex-col justify-between h-full min-h-[110px] sm:min-h-[145px] sm:min-h-[160px]"
    >
      {/* Dynamic Cursor Spotlight that follows the mouse - stays bright wherever the mouse moves */}
      <div
        ref={cardSpotlightRef}
        className="pointer-events-none absolute -inset-6 sm:-inset-7 rounded-3xl transition-opacity duration-200 opacity-0"
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
    'group relative p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-zinc-950/85 border border-white/10 hover:border-white/30 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.95)] text-left flex flex-col justify-between cursor-pointer w-full select-none';

  const Component = card.type === 'button' ? 'button' : 'a';

  return (
    <Component
      type={card.type === 'button' ? 'button' : undefined}
      onClick={card.onClick}
      href={card.href}
      target={card.type === 'link' ? '_blank' : undefined}
      rel={card.type === 'link' ? 'noopener noreferrer' : undefined}
      className={containerClasses}
    >
      {innerContent}
    </Component>
  );
});

ContactCardItem.displayName = 'ContactCardItem';
