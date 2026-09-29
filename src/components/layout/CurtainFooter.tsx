'use client';

import React, { useState } from 'react';
import { useApp } from '../../i18n/context';
import { profileData } from '../../data/profile';

export const CurtainFooter: React.FC = () => {
  const { t, locale } = useApp();
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
    <footer id="contact" className="relative w-full bg-[#050508] text-white overflow-hidden pt-24 sm:pt-28 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Top Tag & Description */}
        <div className="max-w-2xl mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono tracking-widest text-amber-400 uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {t.nav.status}
          </div>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
            {t.footer.subtext}
          </p>
        </div>

        {/* Massive Full-Width Screen Typography - responsive and fitted */}
        <div className="my-8 sm:my-12 py-8 sm:py-10 border-y border-white/10 select-none">
          <h2 className="text-[clamp(2.4rem,7.5vw,7.5rem)] font-black tracking-tighter leading-[0.92] uppercase text-zinc-100 transition-colors">
            {locale === 'ru' ? (
              <>
                <span className="block hover:text-white transition-colors">СОЗДАДИМ НЕЧТО</span>
                <span className="block text-amber-400 hover:text-amber-300 transition-colors">МОНУМЕНТАЛЬНОЕ</span>
              </>
            ) : (
              <>
                <span className="block hover:text-white transition-colors">LET&apos;S BUILD SOMETHING</span>
                <span className="block text-amber-400 hover:text-amber-300 transition-colors">EXTRAORDINARY</span>
              </>
            )}
          </h2>
        </div>

        {/* Action Controls & Contacts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-10 sm:my-12 items-stretch">
          {/* Telegram */}
          <a
            href={profileData.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#2AABEE]/15 group-hover:border-[#2AABEE]/40 transition-all">
                <svg className="w-5 h-5 text-[#2AABEE] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">Telegram</span>
                <span className="text-sm font-semibold truncate text-zinc-200 group-hover:text-white">{profileData.telegramHandle}</span>
              </div>
            </div>
            <span className="text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-base shrink-0 ml-2">↗</span>
          </a>

          {/* Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400/40 transition-all duration-300 text-left"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400/15 group-hover:border-amber-400/40 transition-all">
                <svg className="w-5 h-5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">
                  {copied ? t.footer.copied : 'Email'}
                </span>
                <span className="text-sm font-semibold truncate text-zinc-200 group-hover:text-white">
                  {profileData.email}
                </span>
              </div>
            </div>
            <span className={`text-base shrink-0 ml-2 transition-all ${copied ? 'text-emerald-400 font-bold scale-110' : 'text-zinc-500 group-hover:text-amber-400'}`}>
              {copied ? '✓' : '⧉'}
            </span>
          </button>

          {/* GitHub */}
          <a
            href={profileData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/15 group-hover:border-white/30 transition-all">
                <svg className="w-5 h-5 text-zinc-100 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">GitHub</span>
                <span className="text-sm font-semibold truncate text-zinc-200 group-hover:text-white">{profileData.githubHandle}</span>
              </div>
            </div>
            <span className="text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-base shrink-0 ml-2">↗</span>
          </a>

          {/* LinkedIn */}
          <a
            href={profileData.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-amber-400/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#0A66C2]/15 group-hover:border-[#0A66C2]/40 transition-all">
                <svg className="w-5 h-5 text-[#0A66C2] shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-mono text-zinc-400 group-hover:text-amber-400 transition-colors">LinkedIn</span>
                <span className="text-sm font-semibold truncate text-zinc-200 group-hover:text-white">Profile</span>
              </div>
            </div>
            <span className="text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-base shrink-0 ml-2">↗</span>
          </a>
        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <span>© 2026 YEGOR.DEV // SOFTWARE & FULLSTACK ENGINEER</span>
          <span>{t.footer.rights}</span>
        </div>
      </div>
    </footer>
  );
};

