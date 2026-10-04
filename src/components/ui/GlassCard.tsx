'use client';

import React from 'react';

export type GlassIntensity = 'crystal' | 'frosted' | 'subtle';

export interface BaseGlassCardProps {
  children?: React.ReactNode;
  className?: string;
  sheen?: boolean;
  intensity?: GlassIntensity;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

export type GlassCardProps<E extends React.ElementType = 'div'> = BaseGlassCardProps & {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof BaseGlassCardProps | 'as'>;

const GlassCardInner = (
  props: GlassCardProps<any>,
  ref: React.Ref<any>
) => {
  const {
    children,
    className = '',
    sheen = true,
    intensity = 'crystal',
    as,
    ...rest
  } = props;

  const Component = as || (('href' in rest && (rest as any).href) ? 'a' : 'div');

  const safeProps: Record<string, any> = {};
  if (Component === 'button') {
    safeProps.type = (rest as any).type || 'button';
  } else if (Component === 'a') {
    const rawTarget = (rest as any).target;
    const hrefVal = (rest as any).href;
    const isExternal = typeof hrefVal === 'string' && (hrefVal.startsWith('http') || hrefVal.startsWith('mailto'));
    if (rawTarget === '_blank' || isExternal) {
      safeProps.target = rawTarget || '_blank';
      safeProps.rel = (rest as any).rel || 'noopener noreferrer';
    }
  }

  return (
    <Component
      ref={ref}
      className={`apple-glass ${sheen ? 'apple-glass-sheen' : ''} apple-glass--${intensity} ${className}`}
      {...(rest as any)}
      {...safeProps}
    >
      {children}
    </Component>
  );
};

/**
 * Universal Apple Glassmorphic Card (macOS Sequoia / visionOS)
 * TRUE POLYMORPHIC + FORWARDREF: Renders as a `div` by default, but can be `section`, `article`, `a`, etc.
 */
export const GlassCard = React.forwardRef(GlassCardInner) as <E extends React.ElementType = 'div'>(
  props: GlassCardProps<E> & { ref?: React.ComponentPropsWithRef<E>['ref'] }
) => React.ReactElement | null;
