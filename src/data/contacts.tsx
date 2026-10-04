import React from 'react';
import { Locale } from '../types';

export interface ContactCardData {
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

export function getContactCards(
  profile: {
    telegram: string;
    telegramHandle: string;
    email: string;
    github: string;
    githubHandle: string;
    linkedin: string;
  },
  locale: Locale,
  copied: boolean,
  handleCopyEmail: () => void,
  copiedLabel: string
): ContactCardData[] {
  return [
    {
      id: 'telegram',
      type: 'link',
      href: profile.telegram,
      label: 'Telegram',
      value: profile.telegramHandle,
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
      label: copied ? copiedLabel : 'Email',
      value: profile.email,
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
      href: profile.github,
      label: 'GitHub',
      value: profile.githubHandle,
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
      href: profile.linkedin,
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
}
