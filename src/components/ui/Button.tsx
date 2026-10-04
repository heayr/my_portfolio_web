'use client';

import React from 'react';

/**
 * ButtonVariants dictate the visual theme of the button.
 * To add a new variant, simply add its name here and define its tailwind classes in VARIANT_STYLES.
 */
export type ButtonVariant = 'primary' | 'secondary' | 'glass' | 'ghost' | 'nav' | 'icon';

/**
 * ButtonSizes control the padding, font size, and border radius.
 * To add a new size, add it here and define it in SIZE_STYLES (and ICON_SIZE_STYLES if applicable).
 */
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

export interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

/**
 * True Polymorphic Type Magic:
 * The `as` prop allows rendering the button as ANY HTML tag or React Component (e.g. `as={Link}`, `as="div"`).
 * It automatically infers all valid props for that element.
 */
export type ButtonProps<E extends React.ElementType = 'button'> = BaseButtonProps & {
  as?: E;
} & Omit<React.ComponentPropsWithoutRef<E>, keyof BaseButtonProps | 'as'>;

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-amber-400 to-amber-500 text-black shadow-lg shadow-amber-500/25 hover:from-amber-300 hover:to-amber-400 border border-amber-300 active:scale-95',
  secondary:
    'bg-white/10 dark:bg-zinc-800/80 text-zinc-100 hover:bg-white/20 border border-white/10 hover:border-white/25 backdrop-blur-md active:scale-95',
  glass:
    'apple-glass text-white border border-white/15 hover:border-white/35 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] active:scale-95',
  ghost:
    'text-zinc-400 hover:text-white hover:bg-white/5 active:scale-95',
  nav:
    'nav-link-btn active:scale-95',
  icon:
    'rounded-full flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/10 active:scale-95',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  xs: 'text-[11px] px-2.5 py-1 rounded-full gap-1 font-mono tracking-wider font-bold',
  sm: 'text-xs px-3 py-1.5 rounded-full gap-1.5 font-mono tracking-wider font-bold',
  md: 'text-sm px-4 py-2 rounded-full gap-2 font-bold',
  lg: 'text-base px-6 py-3 rounded-full gap-2.5 font-bold',
};

const ICON_SIZE_STYLES: Record<ButtonSize, string> = {
  xs: 'w-7 h-7 p-0 text-xs',
  sm: 'w-8 h-8 p-0 text-xs',
  md: 'w-10 h-10 p-0 text-sm',
  lg: 'w-12 h-12 p-0 text-base',
};

/**
 * Universal Polymorphic Button Component (Senior Level)
 * Supports dynamic `as` prop to render as Next.js <Link>, <a>, <button>, or ANY other component.
 */
export const Button = <E extends React.ElementType = 'button'>({
  variant = 'secondary',
  size = 'md',
  icon,
  iconRight,
  className = '',
  disabled = false,
  children,
  as,
  ...restProps
}: ButtonProps<E>) => {
  const isIconOnly = variant === 'icon' || (!children && Boolean(icon));
  const baseClasses =
    'relative inline-flex items-center justify-center select-none transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed before:absolute before:-inset-1.5 before:content-[\'\']';

  const sizeClass = isIconOnly ? ICON_SIZE_STYLES[size] : SIZE_STYLES[size];
  const variantClass = VARIANT_STYLES[variant];

  const combinedClasses = `${baseClasses} ${variantClass} ${sizeClass} ${className}`.trim();

  // Smart fallback: if `as` isn't provided, check if `href` exists to default to <a>
  const Component = as || (('href' in restProps && (restProps as any).href) ? 'a' : 'button');

  const safeProps: Record<string, any> = {};
  if (Component === 'button') {
    safeProps.type = (restProps as any).type || 'button';
  } else if (Component === 'a') {
    const rawTarget = (restProps as any).target;
    const hrefVal = (restProps as any).href;
    const isExternal = typeof hrefVal === 'string' && (hrefVal.startsWith('http') || hrefVal.startsWith('mailto'));
    if (rawTarget === '_blank' || isExternal) {
      safeProps.target = rawTarget || '_blank';
      safeProps.rel = (restProps as any).rel || 'noopener noreferrer';
    }
  }

  return (
    <Component
      className={combinedClasses}
      disabled={Component === 'button' ? disabled : undefined}
      {...(restProps as any)}
      {...safeProps}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="shrink-0">{iconRight}</span>}
    </Component>
  );
};
