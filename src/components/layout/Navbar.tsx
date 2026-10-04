'use client';

import React from 'react';
import { profileData } from '../../data/profile';
import { Button } from '../ui/Button';

interface NavbarProps {
  copiedEmail: boolean;
  onCopyEmail: () => void;
  className?: string;
}

interface NavItemConfig {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  title: string;
  ariaLabel?: string;
}

/**
 * Semantic Navbar Component for Header Quick Links
 * Renders an accessible HTML5 <nav> element dynamically via .map() and universal Button.
 */
export const Navbar: React.FC<NavbarProps> = React.memo(({
  copiedEmail,
  onCopyEmail,
  className = '',
}) => {
  const navItems: NavItemConfig[] = [
    {
      id: 'tg',
      label: 'TG',
      href: profileData.telegram,
      title: 'Telegram: @PotatoChipasu',
    },
    {
      id: 'gh',
      label: 'GH',
      href: profileData.github,
      title: 'GitHub: @heayr',
    },
    {
      id: 'li',
      label: 'LI',
      href: profileData.linkedin,
      title: 'LinkedIn Profile',
    },
    {
      id: 'easystaff',
      label: 'EASYSTAFF',
      href: profileData.easystaff,
      title: 'EasyStaff B2B Contract & Payroll',
    },
    {
      id: 'email',
      label: copiedEmail ? 'COPIED!' : 'EMAIL',
      onClick: onCopyEmail,
      title: `Copy email: ${profileData.email}`,
      ariaLabel: copiedEmail ? 'Email address copied' : `Copy email: ${profileData.email}`,
    },
  ];

  return (
    <nav
      aria-label="Quick Contacts & Socials"
      className={`hidden sm:flex items-center gap-1 sm:gap-2 font-mono text-xs tracking-widest uppercase font-bold ${className}`}
    >
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="nav"
          href={item.href}
          onClick={item.onClick}
          title={item.title}
          aria-label={item.ariaLabel || item.title}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  );
});

Navbar.displayName = 'Navbar';
