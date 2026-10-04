'use client';

import React from 'react';

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface SectionHeaderProps {
  tag?: string;
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  className?: string;
  align?: 'left' | 'center';
  asHeading?: HeadingTag;
  as?: 'div' | 'header' | 'section';
}

/**
 * Universal Section Header Component
 * Encapsulates the signature typography hierarchy: Monospace Tag -> Bold Hx -> Readable Description.
 * Supports polymorphic semantic heading level (h1-h6) and container tag.
 */
export const SectionHeader: React.FC<SectionHeaderProps> = React.memo(({
  tag,
  eyebrow,
  title,
  description,
  className = '',
  align = 'left',
  asHeading = 'h2',
  as: Component = 'div',
}) => {
  const isCenter = align === 'center';
  const displayTag = eyebrow || tag;
  const HeadingTag = asHeading;

  return (
    <Component suppressHydrationWarning className={`mb-14 sm:mb-18 ${isCenter ? 'text-center mx-auto' : 'max-w-4xl'} ${className}`}>
      {displayTag && (
        <div className={`inline-flex items-center gap-2 font-mono text-xs sm:text-sm tracking-widest text-amber-500 uppercase font-bold mb-3 ${isCenter ? 'justify-center' : ''}`}>
          <span>//</span>
          <span>{displayTag}</span>
        </div>
      )}
      <HeadingTag className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[var(--text-primary)] leading-[1.08]">
        {title}
      </HeadingTag>
      {description && (
        <p className={`mt-5 text-base sm:text-lg lg:text-xl text-[var(--text-secondary)] leading-relaxed ${isCenter ? 'max-w-2xl mx-auto' : 'max-w-3xl'}`}>
          {description}
        </p>
      )}
    </Component>
  );
});

SectionHeader.displayName = 'SectionHeader';
