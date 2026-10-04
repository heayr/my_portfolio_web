/**
 * Pure mathematical helper functions for animation and coordinate mapping.
 * KISS / FP compliant.
 */

/**
 * Clamps a number between a minimum and maximum value.
 */
export function clamp(val: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, val));
}

/**
 * Linear interpolation between two values.
 */
export function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

/**
 * Cosine ease in-out smoothing function (0.0 to 1.0).
 */
export function cosineEase(t: number): number {
  const clampedT = clamp(t, 0, 1);
  return (1 - Math.cos(clampedT * Math.PI)) / 2;
}
