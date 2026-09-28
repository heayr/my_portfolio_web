'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export const StackingWorks: React.FC = () => {
  const { t, locale } = useApp();

  return (
    <section id="works" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs tracking-widest text-amber-500 uppercase font-semibold">
          // {t.works.sectionTag}
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
          {t.works.sectionTitle}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {t.works.sectionSubtitle}
        </p>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative flex flex-col gap-16 pb-24">
        {projectsData.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={projectsData.length}
            locale={locale}
            t={t}
          />
        ))}
      </div>
    </section>
  );
};
