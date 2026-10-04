---
name: portfolio_architecture_ui_standards
description: "Best practices, layout, and logic rules for my_portfolio_web"
trigger: always_on
---

# ARCHITECTURE & UI RULES FOR PORTFOLIO WEB

## 1. Project Architecture (SOLID, KISS, DRY)
- **KISS (Keep It Simple, Stupid):** Avoid over-engineering. Write clear, readable, and predictable code.
- **DRY (Don't Repeat Yourself):** Use data-driven rendering (e.g., `array.map()`) instead of duplicating JSX nodes.
- **NO BARREL FILES:** Never use `index.ts` files to re-export components. Always import directly from the source file (e.g., `import { Button } from '../ui/Button'`). This prevents circular dependencies, optimizes Next.js tree-shaking, and significantly speeds up HMR.

## 2. Component Design & Logic
- **Universal/Polymorphic Components:** Create versatile UI primitives. For example, `Button.tsx` must intelligently act as an `<a>` tag if an `href` is passed, or as a `<button>` otherwise, sharing the exact same styling variants and sizes.
- **Strict Separation of Concerns:** Isolate logic (hooks, data arrays like `profile.ts` or `faq.ts`) from the presentation layer.

## 3. UI/UX & Layout Optimizations
- **Hitbox Expansion:** Ensure small interactive elements are easy to click. Use an invisible pseudo-element to expand the clickable area without altering the visual design (e.g., `relative before:absolute before:-inset-1.5 before:content-['']`).
- **Layout Stability:** When text inside flex/grid containers changes dynamically (e.g., a tab switch), apply fixed widths (`w-[Xpx]`) or `min-w-[Xpx]` to text containers to prevent the layout from jumping or stretching.
- **Visual Consistency:** Avoid overriding core variables in specific states unless intended. Use `rounded-full` universally for pill buttons to avoid them turning square in active states. Keep font weights consistent across component variants.

## 4. SSR & Hydration Safety (Next.js)
- **Browser Extension Resilience:** Text blocks that duplicate content (like `Marquee`) or dynamically render system parameters (like `MoscowClock`) are prone to React hydration mismatches due to browser extensions (translators, grammar checkers).
- **Fix:** Always add `suppressHydrationWarning` to the root `div` of such components to safely bypass mismatch crashes.

## 5. Semantic HTML
- Always use proper HTML5 landmarks: `<header role="banner">`, `<main id="main-content">`, `<footer>`, `<nav>`. 
- Ensure accessibility tags are present (`aria-label`, `aria-hidden="true"` for decorative elements).
