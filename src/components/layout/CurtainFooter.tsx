'use client';

import React, { useState } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';

export const CurtainFooter: React.FC = () => {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
    }
  };

  return (
    <footer id="contact" className="relative w-full bg-[#050508] text-white overflow-hidden pt-28 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Tag & Description */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-amber-400 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.nav.status}
          </div>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {t.footer.subtext}
          </p>
        </div>

        {/* Massive Full-Width Screen Typography (The Arpeggio signature!) */}
        <div className="my-8 py-8 border-y border-white/10 select-none overflow-hidden">
          <h2 className="text-[12vw] font-black tracking-tighter leading-none text-zinc-100 uppercase hover:text-amber-400 transition-colors duration-500 whitespace-nowrap">
            {t.footer.giantTitle}
          </h2>
        </div>

        {/* Action Controls & Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-12 items-center">
          <a
            href={profileData.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm transition-all shadow-lg"
          >
            <span>{t.footer.telegram}</span>
            <span className="text-base">↗</span>
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all text-left"
          >
            <span>{copied ? t.footer.copied : profileData.email}</span>
            <span className="text-amber-400">{copied ? '✓' : '⧉'}</span>
          </button>

          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all"
          >
            <span>GitHub {profileData.githubHandle}</span>
            <span className="text-zinc-500">↗</span>
          </a>

          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-all"
          >
            <span>LinkedIn Profile</span>
            <span className="text-zinc-500">↗</span>
          </a>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <span>© 2026 YEGOR.DEV // LEAD ENGINEER</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
};
