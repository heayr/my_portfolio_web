'use client';

import React from 'react';

export interface MorphingToggleIconProps {
  open: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Universal Morphing Icon: "2 Parallel Lines ↔ Cross (X)"
 * Implements Section 1 of STYLE_GUIDE.md across Header Burger and FAQ Accordions.
 */
export const MorphingToggleIcon: React.FC<MorphingToggleIconProps> = React.memo(({
  open,
  size = 'md',
  className = '',
}) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-colors select-none ${
        isSm ? 'w-8 h-8 gap-1.5' : 'w-10 h-10'
      } ${className}`}
      aria-hidden="true"
    >
      <span
        className={`bg-current rounded-full transition-all duration-300 ease-out origin-center ${
          isSm ? 'h-[1.5px]' : 'h-[2px] absolute'
        } ${
          open
            ? isSm
              ? 'w-4 -rotate-45 translate-y-[3.5px]'
              : 'w-6 rotate-45 translate-y-0'
            : isSm
            ? 'w-4'
            : 'w-6 -translate-y-[4px]'
        }`}
      />
      <span
        className={`bg-current rounded-full transition-all duration-300 ease-out origin-center ${
          isSm ? 'h-[1.5px]' : 'h-[2px] absolute'
        } ${
          open
            ? isSm
              ? 'w-4 rotate-45 -translate-y-[4px]'
              : 'w-6 -rotate-45 translate-y-0'
            : isSm
            ? 'w-2.5'
            : 'w-4 translate-x-[2px] translate-y-[4px]'
        }`}
      />
    </div>
  );
});

MorphingToggleIcon.displayName = 'MorphingToggleIcon';
