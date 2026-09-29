'use client';

import React from 'react';
import { ProjectItem, Locale } from '../../types';
import { en } from '../../i18n/dictionaries/en';

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

      {/* Top Header Bar (Arpeggio Signature) */}
      <div className="relative z-20 pt-24 sm:pt-28 px-6 sm:px-12 lg:px-16 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="px-3 py-1 rounded-full bg-black/85 border border-white/25 text-amber-400 font-bold shadow-md">
            0{index + 1} // 0{total}
          </span>
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white drop-shadow-sm">
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
      <div className="relative z-20 px-6 sm:px-12 lg:px-16 max-w-4xl my-auto">
        <span className="inline-block font-mono text-xs tracking-widest text-amber-400 uppercase font-bold mb-3">
          // {t.works.sectionTag} · ARCHITECTURAL HIGHLIGHT
        </span>
        <h4 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
          {project.tagline[locale]}
        </h4>
        <p className="mt-4 text-sm sm:text-base text-zinc-300 max-w-2xl leading-relaxed drop-shadow">
          {project.description[locale]}
        </p>
      </div>

      {/* Bottom Bar: Engineering Metrics, Stack & CTAs */}
      <div className="relative z-20 pb-10 sm:pb-12 px-6 sm:px-12 lg:px-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        {/* Left: Metrics & Tech Stack */}
        <div className="flex flex-col gap-3 max-w-2xl">
          {/* Key Metrics Chips */}
          <div className="flex flex-wrap gap-2">
            {project.metrics.slice(0, 3).map((metric, mIdx) => (
              <span
                key={mIdx}
                className="px-3 py-1 rounded-full bg-black/85 border border-white/20 text-xs text-zinc-200 font-medium flex items-center gap-1.5 shadow-md"
              >
                <span className="text-amber-400 font-bold">✓</span>
                <span>{metric[locale]}</span>
              </span>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
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
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm transition-all shadow-xl hover:scale-[1.03]"
            >
              <span>{t.works.visitLive}</span>
              <span className="font-mono">↗</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/80 hover:bg-black/95 text-white font-mono text-xs sm:text-sm border border-white/25 hover:border-white/50 transition-all shadow-xl"
            >
              <span>{t.works.viewGithub}</span>
              <span className="font-mono">↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';
