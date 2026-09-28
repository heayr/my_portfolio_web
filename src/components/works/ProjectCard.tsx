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

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  total,
  locale,
  t,
}) => {
  const topOffset = 96 + index * 24;

  return (
    <div
      className="sticky rounded-3xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-2xl transition-all duration-300"
      style={{
        top: `${topOffset}px`,
        zIndex: index + 10,
        boxShadow:
          '0 24px 48px -12px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
        {/* Left Info Column */}
        <div className="lg:col-span-6 flex flex-col justify-between h-full">
          <div>
            {/* Header: Index number + Role & Period Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4 font-mono text-xs">
              <span className="px-2.5 py-1 rounded-full bg-white/5 text-amber-400 font-bold border border-white/10">
                0{index + 1} / 0{total}
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-500 font-semibold border border-amber-400/20">
                {project.role[locale]}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-[var(--text-tertiary)] border border-[var(--border-subtle)]">
                {project.period}
              </span>
            </div>

            {/* Project Title & Tagline */}
            <h3 className="text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-sm sm:text-base font-medium text-[var(--text-secondary)] leading-relaxed">
              {project.tagline[locale]}
            </p>

            {/* Description */}
            <p className="mt-4 text-xs sm:text-sm text-[var(--text-tertiary)] leading-relaxed">
              {project.description[locale]}
            </p>

            {/* Technical Outcomes Bullets */}
            <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
              <h4 className="text-xs font-mono font-semibold tracking-wider text-[var(--text-secondary)] uppercase mb-3">
                {t.works.keyOutcomes}
              </h4>
              <ul className="space-y-2">
                {project.metrics.map((metric, mIdx) => (
                  <li
                    key={mIdx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-secondary)]"
                  >
                    <span className="text-amber-500 font-bold mt-0.5">✓</span>
                    <span>{metric[locale]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech Stack Pills & Actions */}
          <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col gap-4">
            <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] border border-[var(--border-subtle)]"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-2">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs sm:text-sm transition-all shadow-md hover:scale-[1.02]"
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
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[var(--text-primary)] border border-[var(--border-subtle)] font-bold text-xs sm:text-sm transition-all hover:scale-[1.02]"
                >
                  <span>{t.works.viewGithub}</span>
                  <span className="font-mono">↗</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right Visual Media Column */}
        <div className="lg:col-span-6 rounded-2xl overflow-hidden bg-black/20 border border-[var(--border-subtle)] shadow-inner relative group aspect-[16/10]">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
