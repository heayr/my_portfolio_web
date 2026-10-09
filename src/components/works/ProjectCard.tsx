'use client';

import React from 'react';
import { ProjectItem, Locale } from '../../types';
import { en } from '../../i18n/dictionaries/en';
import { Button } from '../ui/Button';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  total: number;
  locale: Locale;
  t: typeof en;
}

export const ProjectCard: React.FC<ProjectCardProps> = React.memo(({
  project,
  index,
  total,
  locale,
  t,
}) => {
  return (
    <div
      className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between select-none group contain-paint"
      style={{ zIndex: index + 10 }}
    >
      {/* Background Image with Cinematic Treatment and GPU Composite Layer */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover object-center filter brightness-[0.62] contrast-[1.05] transition-transform duration-1000 ease-out group-hover:scale-105 transform-gpu will-change-transform"
          loading="lazy"
        />
        {/* Top Vignette Gradient for Navbar Legibility */}
        <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-black/90 via-black/40 to-transparent pointer-events-none" />
        {/* Bottom Vignette Gradient for Metadata Legibility */}
        <div className="absolute bottom-0 inset-x-0 h-80 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none" />
      </div>

      {/* Structured Content Container Constrained to Standard 1800px / 2K Grid */}
      <div className="relative z-20 w-full max-w-[1800px] 2xl:max-w-[1920px] mx-auto h-full flex flex-col justify-between px-6 sm:px-12 lg:px-16 xl:px-24">
        {/* Top Header Bar (Arpeggio Signature) */}
        <div className="pt-18 sm:pt-20 lg:pt-20 xl:pt-20 2xl:pt-28 flex flex-wrap items-center justify-between gap-4 font-mono text-xs 2xl:text-sm">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="px-3 py-1 rounded-full bg-black/85 border border-white/25 text-amber-400 font-bold shadow-md">
              0{index + 1} // 0{total}
            </span>
            <h3 className="text-lg sm:text-2xl 2xl:text-3xl font-black uppercase tracking-tight text-white drop-shadow-sm">
              {project.title}
            </h3>
            <span className="h-4 w-[1px] bg-white/30 hidden sm:inline-block" />
            <span className="text-zinc-300 font-semibold tracking-wide hidden sm:inline-block">
              {project.tagline[locale]}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-black/80 border border-white/20 text-zinc-300 font-semibold shadow-md">
              {project.role[locale]}
            </span>
            <span className="px-3 py-1 rounded-full bg-black/75 border border-white/15 text-zinc-400 hidden md:inline-block shadow-md">
              {project.period}
            </span>
          </div>
        </div>

        {/* Center Cinematic Editorial Text */}
        <div className="max-w-4xl 2xl:max-w-5xl my-auto py-3 sm:py-4 lg:py-6">
          <span className="inline-block font-mono text-xs 2xl:text-sm tracking-widest text-amber-400 uppercase font-bold mb-3">
            // {t.works.sectionTag} · ARCHITECTURAL HIGHLIGHT
          </span>
          <h4 className="text-2xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
            {project.tagline[locale]}
          </h4>
          <p className="mt-4 text-sm sm:text-base 2xl:text-lg text-zinc-300 max-w-2xl 2xl:max-w-3xl leading-relaxed drop-shadow">
            {project.description[locale]}
          </p>
        </div>

        {/* Bottom Bar: Engineering Metrics, Stack & CTAs */}
        <div className="pb-6 sm:pb-8 lg:pb-10 2xl:pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          {/* Left: Metrics & Tech Stack */}
          <div className="flex flex-col gap-3 max-w-2xl 2xl:max-w-3xl">
            {/* Key Metrics Chips */}
            <div className="flex flex-wrap gap-2">
              {project.metrics.slice(0, 3).map((metric, mIdx) => (
                <span
                  key={mIdx}
                  className="px-3 py-1 rounded-full bg-black/85 border border-white/20 text-xs 2xl:text-sm text-zinc-200 font-medium flex items-center gap-1.5 shadow-md"
                >
                  <span className="text-amber-400 font-bold">✓</span>
                  <span>{metric[locale]}</span>
                </span>
              ))}
            </div>

            {/* Tech Stack Chips — hidden on mobile */}
            <div className="hidden sm:flex flex-wrap gap-1.5 font-mono text-[11px] 2xl:text-xs">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-black/80 text-zinc-300 border border-white/20 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Actions with 42px touch target */}
          <div className="flex items-center gap-3 shrink-0">
            {project.liveUrl && (
              <Button
                as="a"
                href={project.liveUrl}
                target="_blank"
                variant="primary"
                size="sm"
                iconRight={<span className="font-mono">↗</span>}
                className="shadow-xl"
              >
                {t.works.visitLive}
              </Button>
            )}
            {project.githubUrl && (
              <Button
                as="a"
                href={project.githubUrl}
                target="_blank"
                variant="secondary"
                size="sm"
                iconRight={<span className="font-mono">↗</span>}
                className="shadow-xl font-mono"
              >
                {t.works.viewGithub}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
