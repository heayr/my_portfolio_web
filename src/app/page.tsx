'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Lenis from 'lenis';
import { useApp } from '../i18n/context';
import { Preloader } from '../components/layout/Preloader';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/hero/HeroSection';
import { Marquee } from '../components/ui/Marquee';

const StackingWorks = dynamic(
  () => import('../components/works/StackingWorks').then((m) => m.StackingWorks),
  { ssr: true }
);
const PhilosophySection = dynamic(
  () => import('../components/sections/PhilosophySection').then((m) => m.PhilosophySection),
  { ssr: true }
);
const MetricsSection = dynamic(
  () => import('../components/sections/MetricsSection').then((m) => m.MetricsSection),
  { ssr: true }
);
const FAQSection = dynamic(
  () => import('../components/sections/FAQSection').then((m) => m.FAQSection),
  { ssr: true }
);
const CurtainFooter = dynamic(
  () => import('../components/layout/CurtainFooter').then((m) => m.CurtainFooter),
  { ssr: true }
);

const MARQUEE_TECH_STACK = [
  '✦ NEXT.JS 15 APP ROUTER',
  '✦ REACT 19 PRIMITIVES',
  '✦ STRICT TYPESCRIPT',
  '✦ TAILWIND CSS V4',
  '✦ 100/100 CORE WEB VITALS',
  '✦ FASTAPI & POSTGRESQL',
  '✦ ZERO-LEAK SECURITY',
  '✦ AWWWARDS FLUID MOTION',
];

export default function Home() {
  const { locale } = useApp();
  const [scrolled, setScrolled] = useState(false);

  // Initialize Luxury Fluid Inertia Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.09, // Silky, responsive, zero-lag inertia
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      smoothWheel: true,
      infinite: false,
    });

    (window as any).lenis = lenis;

    // Only stop Lenis if user opens page at top AND has NOT seen the intro yet!
    let hasSeenIntro = false;
    try {
      hasSeenIntro = localStorage.getItem('portfolio_hero_seen_v1') === 'true';
    } catch {}

    if (window.scrollY <= 10 && !hasSeenIntro) {
      lenis.stop();
    }

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Anchor smooth navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const el = document.querySelector(anchor.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.1 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    // Throttled scroll indicator synchronized with Lenis
    const unsubscribeScroll = lenis.on('scroll', (e: { scroll: number }) => {
      setScrolled(e.scroll > 80);
    });

    return () => {
      cancelAnimationFrame(rafId);
      unsubscribeScroll();
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-400">
      {/* Keyboard Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2.5 focus:bg-amber-400 focus:text-black focus:font-mono focus:font-bold focus:rounded-lg focus:shadow-2xl focus:outline-none"
      >
        {locale === 'ru' ? 'Перейти к основному контенту' : 'Skip to main content'}
      </a>

      {/* Background Film Grain Texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Arpeggio Staggered Rectangular Bars Preloader */}
      <Preloader />

      {/* Landmark: Banner / Site Header */}
      <Header scrolled={scrolled} />

      {/* Landmark: Unique Main Page Content */}
      <main id="main-content" tabIndex={-1} className="relative outline-none">
        {/* Arpeggio Hero Section with Morphing Wordmark Docking into Header */}
        <HeroSection />

        {/* Infinite Marquee Strip */}
        <Marquee items={MARQUEE_TECH_STACK} />

        {/* Stacking Project Promo Cards */}
        <StackingWorks />

        {/* The Digital Polymath Philosophy (Da Vinci -> Wright -> Orbit) */}
        <PhilosophySection />

        {/* Key Architectural & Performance Metrics */}
        <MetricsSection />

        {/* Spring FAQ Accordion */}
        <FAQSection />
      </main>

      {/* Landmark: Contentinfo / Site Footer */}
      <CurtainFooter />
    </div>
  );
}
