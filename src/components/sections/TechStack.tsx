'use client';

import React from 'react';
import { useApp } from '../../i18n/context';

interface StackCategory {
  title: string;
  items: { name: string; tag: string }[];
}

const stackCategories: StackCategory[] = [
  {
    title: 'Frontend & UI Engineering',
    items: [
      { name: 'React 19', tag: 'State Primitives & Actions' },
      { name: 'Next.js 15', tag: 'App Router & RSC' },
      { name: 'TypeScript', tag: 'Strict Typing' },
      { name: 'Tailwind CSS v4', tag: 'Fluid Design Systems' },
      { name: 'Core Web Vitals', tag: '100/100 PageSpeed' }
    ]
  },
  {
    title: 'Backend & Systems Architecture',
    items: [
      { name: 'Python / FastAPI', tag: 'Asynchronous APIs' },
      { name: 'Node.js / Express', tag: 'Event-driven Services' },
      { name: 'PostgreSQL', tag: 'Indexing & Schemas' },
      { name: 'Prisma ORM', tag: 'Type-Safe DB Layer' },
      { name: 'Payment Webhooks', tag: 'YooKassa / Automated Billing' }
    ]
  },
  {
    title: 'DevOps & Zero-Leak Security',
    items: [
      { name: 'Docker Compose', tag: 'Production Topology' },
      { name: 'WireGuard / Hysteria2', tag: 'Encrypted Tunnels' },
      { name: 'Traefik / Nginx', tag: 'Reverse Proxy & Let\'s Encrypt' },
      { name: 'Edge Deployments', tag: 'Vercel / Cloudflare' }
    ]
  },
  {
    title: 'Motion & Creative Tech',
    items: [
      { name: 'Lenis', tag: 'Smooth Inertial Scroll' },
      { name: 'Canvas 2D / Shaders', tag: 'Particle Simulations' },
      { name: 'Framer Motion', tag: 'Spring Physics' },
      { name: '3D Tilt & Specular', tag: 'Perspective Overlays' }
    ]
  }
];

export const TechStack: React.FC = () => {
  const { t } = useApp();

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[var(--border-subtle)]">
      <div className="max-w-3xl mb-16">
        <span className="font-mono text-xs tracking-widest text-amber-500 uppercase font-semibold">
          // {t.stack.tag}
        </span>
        <h2 className="mt-3 text-3xl sm:text-5xl font-black tracking-tight text-[var(--text-primary)]">
          {t.stack.title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--text-secondary)]">
          {t.stack.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stackCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex flex-col justify-between"
          >
            <div>
              <h3 className="font-mono text-xs font-semibold tracking-wider text-amber-500 uppercase pb-4 mb-4 border-b border-[var(--border-subtle)]">
                {cat.title}
              </h3>
              <ul className="space-y-4">
                {cat.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex flex-col">
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {item.name}
                    </span>
                    <span className="text-xs text-[var(--text-tertiary)] font-mono">
                      {item.tag}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
