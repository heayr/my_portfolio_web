'use client';

import { useState, useEffect } from 'react';

/**
 * Universal Hook for Window Dimensions
 * Safe for SSR with responsive resize tracking.
 */
export function useWindowDimensions(defaultWidth = 1200, defaultHeight = 800) {
  const [dimensions, setDimensions] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
