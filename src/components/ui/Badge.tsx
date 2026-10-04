'use client';

import React from 'react';

export type BadgeVariant = 'pill' | 'mono' | 'glass' | 'gold';

export interface BaseBadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  dot?: boolean;
  dotColor?: string;
  className?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export type BadgeProps<E extends React.ElementType = 'span'> = BaseBadgeProps & {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof BaseBadgeProps | 'as'>;

/**
 * Universal Badge & Pill Component
 * TRUE POLYMORPHIC: Renders as a `span` by default, but can be `a`, `button`, `div`, etc.
 */
export const Badge = <E extends React.ElementType = 'span'>({
  children,
  variant = 'pill',
  dot = false,
  dotColor = 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.85)]',
  className = '',
  disabled = false,
  as,
  ...props
}: BadgeProps<E>) => {
  let baseStyles = 'inline-flex items-center gap-1.5 font-mono select-none';

  if (variant === 'pill') {
    baseStyles += ' px-2.5 py-0.5 rounded-full text-[10px] tracking-wider border backdrop-blur-md bg-white/[0.08] dark:bg-white/[0.08] border-white/[0.14] text-zinc-200';
  } else if (variant === 'glass') {
    baseStyles += ' px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-lg bg-black/40 border-white/20 text-white shadow-lg';
  } else if (variant === 'gold') {
    baseStyles += ' px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider bg-amber-400 text-black shadow-md border border-amber-300';
  } else if (variant === 'mono') {
    baseStyles += ' text-xs tracking-widest text-amber-500 uppercase font-bold';
  }

  const Component = as || (('href' in props && (props as any).href) ? 'a' : 'span');

  const safeProps: Record<string, any> = {};
  if (Component === 'button') {
    safeProps.type = (props as any).type || 'button';
  } else if (Component === 'a') {
    const rawTarget = (props as any).target;
    const hrefVal = (props as any).href;
    const isExternal = typeof hrefVal === 'string' && (hrefVal.startsWith('http') || hrefVal.startsWith('mailto'));
    if (rawTarget === '_blank' || isExternal) {
      safeProps.target = rawTarget || '_blank';
      safeProps.rel = (props as any).rel || 'noopener noreferrer';
    }
  }

  return (
    <Component
      className={`${baseStyles} ${className}`}
      disabled={Component === 'button' ? disabled : undefined}
      {...(props as any)}
      {...safeProps}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} aria-hidden="true" />}
      <span>{children}</span>
    </Component>
  );
};
