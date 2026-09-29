'use client';

import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { Preloader } from '../components/layout/Preloader';
import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/hero/HeroSection';
import { StackingWorks } from '../components/works/StackingWorks';
import { PhilosophySection } from '../components/sections/PhilosophySection';
import { MetricsSection } from '../components/sections/MetricsSection';
import { FAQSection } from '../components/sections/FAQSection';
import { CurtainFooter } from '../components/layout/CurtainFooter';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  // Initialize Luxury Waterfall Inertia Lenis
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.065, // Luxury fluid waterfall inertia
      wheelMultiplier: 0.9,
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


    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);


    // Anchor smooth navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#')) {
        const el = document.querySelector(anchor.hash);
        if (el) {
          e.preventDefault();
          lenis.scrollTo(el as HTMLElement, { offset: -70, duration: 1.2 });
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);

    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-400">
      {/* Background Film Grain Texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Arpeggio Staggered Rectangular Bars Preloader */}
      <Preloader />

      {/* Arpeggio Top Navigation Bar */}
      <Header scrolled={scrolled} />

      {/* Arpeggio Hero Section with Morphing Wordmark Docking into Header */}
      <HeroSection />

      {/* Infinite Marquee Strip */}
      <div className="py-4 border-y border-[var(--border-subtle)] bg-[var(--bg-surface)] overflow-hidden font-mono text-xs tracking-widest text-[var(--text-secondary)]">
        <div className="marquee-track" aria-hidden="true">
          <div className="marquee-content">
            <span>✦ NEXT.JS 15 APP ROUTER</span>
            <span>✦ REACT 19 PRIMITIVES</span>
            <span>✦ STRICT TYPESCRIPT</span>
            <span>✦ TAILWIND CSS V4</span>
            <span>✦ 100/100 CORE WEB VITALS</span>
            <span>✦ FASTAPI &amp; POSTGRESQL</span>
            <span>✦ ZERO-LEAK SECURITY</span>
            <span>✦ AWWWARDS FLUID MOTION</span>
          </div>
          <div className="marquee-content" aria-hidden="true">
            <span>✦ NEXT.JS 15 APP ROUTER</span>
            <span>✦ REACT 19 PRIMITIVES</span>
            <span>✦ STRICT TYPESCRIPT</span>
            <span>✦ TAILWIND CSS V4</span>
            <span>✦ 100/100 CORE WEB VITALS</span>
            <span>✦ FASTAPI &amp; POSTGRESQL</span>
            <span>✦ ZERO-LEAK SECURITY</span>
            <span>✦ AWWWARDS FLUID MOTION</span>
          </div>
        </div>
      </div>

      {/* Stacking Project Promo Cards */}
      <StackingWorks />

      {/* The Digital Polymath Philosophy (Da Vinci -> Wright -> Orbit) */}
      <PhilosophySection />

      {/* Key Architectural & Performance Metrics */}
      <MetricsSection />

      {/* Spring FAQ Accordion */}
      <FAQSection />

      {/* Curtain Footer with Massive Typography */}
      <CurtainFooter />
    </main>
  );
}
