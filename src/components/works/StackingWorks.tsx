'use client';

import React from 'react';
import { useApp } from '../../i18n/context';
import { projectsData } from '../../data/projects';
import { ProjectCard } from './ProjectCard';

export const StackingWorks: React.FC = () => {
  const { t, locale } = useApp();

  return (
    <section id="works" className="relative w-full bg-black flex flex-col">
      {/* Full-Bleed Sticky Project Promos (Arpeggio Highlights Architecture) */}
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
    </section>
  );
};
