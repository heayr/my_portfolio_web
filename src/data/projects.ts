import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'nologs',
    title: 'NoLogs SaaS',
    tagline: {
      en: 'Commercial Privacy Infrastructure & Subscription Billing',
      ru: 'Коммерческая privacy-инфраструктура и биллинг подписок'
    },
    role: {
      en: 'Lead Frontend & Fullstack Architect',
      ru: 'Lead Frontend & Fullstack Архитектор'
    },
    period: '2024 — 2026',
    stack: ['Next.js 15', 'TypeScript', 'FastAPI', 'PostgreSQL', 'YooKassa Webhooks', 'Docker', 'WireGuard'],
    metrics: [
      { en: '100/100 Core Web Vitals (0ms TBT)', ru: '100/100 Core Web Vitals (0ms TBT)' },
      { en: 'Sub-second real-time telemetry updates', ru: 'Субсекундный отклик сетевой телеметрии' },
      { en: 'Zero data retention architecture', ru: 'Архитектура с нулевым сохранением логов' },
      { en: 'Automated recurring payment pipelines', ru: 'Автоматизированный биллинг и вебхуки' }
    ],
    description: {
      en: 'High-throughput privacy platform with live recurring subscriptions, asynchronous FastAPI billing webhooks, and production Wireguard/Hysteria2 tunneling topology with Let\'s Encrypt SSL automation.',
      ru: 'Действующий коммерческий privacy-сервис с платными подписками, асинхронными вебхуками YooKassa на FastAPI и production-топологией защищенных туннелей Wireguard/Hysteria2.'
    },
    image: '/projects/nologs.webp',
    githubUrl: 'https://github.com/heayr/nologs-bot-docs',
    liveUrl: undefined,
    featuredColor: '#3b82f6'
  },
  {
    id: 'radiotochka',
    title: 'Радиоточка',
    tagline: {
      en: 'Enterprise Advertising Agency Platform & Dynamic CMS',
      ru: 'B2B-платформа и CMS рекламного агентства полного цикла'
    },
    role: {
      en: 'Lead Frontend Engineer',
      ru: 'Ведущий Frontend Инженер'
    },
    period: '2024 — 2025',
    stack: ['React 19', 'Next.js 15', 'Tailwind CSS', 'Fluid Typography', 'Admin CMS'],
    metrics: [
      { en: 'Fluid responsive layout from 320px to 4K', ru: 'Сквозная fluid-адаптивность от 320px до 4K' },
      { en: 'High-conversion interactive commercial showcase', ru: 'Высокая конверсия в коммерческие заявки' },
      { en: 'Strict semantic SEO & accessibility', ru: 'Строгий семантический SEO и доступность' },
      { en: 'Live serving regional and enterprise brands', ru: 'В проде: обслуживание региональных брендов' }
    ],
    description: {
      en: 'Comprehensive digital portal and administrative media management suite for a full-cycle regional media and advertising agency. Features mathematical fluid typography, broadcast scheduling, dynamic client project showcase, and admin moderation.',
      ru: 'Комплексный веб-портал и административная панель управления контентом для рекламного медиа-агентства полного цикла. Включает fluid-типографику, расписание эфиров и панель модерации.'
    },
    image: '/projects/radiotochka.webp',
    githubUrl: 'https://github.com/heayr/pet-b-fm',
    liveUrl: 'https://radiotochka.nologs.website/',
    featuredColor: '#10b981'
  },
  {
    id: 'birthday',
    title: 'The 50th Jubilee',
    tagline: {
      en: 'Bespoke Luxury Interactive Web App with Liquid Aesthetics',
      ru: 'Эксклюзивное интерактивное веб-приложение с liquid-gold эстетикой'
    },
    role: {
      en: 'Fullstack Developer & Creative Technologist',
      ru: 'Fullstack Разработчик & Creative Technologist'
    },
    period: '2025',
    stack: ['React 19 (RC)', 'Vite 8', 'Tailwind 4', 'Express', 'Prisma', 'SQLite', 'Docker'],
    metrics: [
      { en: 'Next-gen React 19 state primitives & instant HMR', ru: 'Архитектура React 19 с мгновенным откликом' },
      { en: 'Bespoke liquid-gold particle shader animations', ru: 'Интерактивная анимация жидкого золота' },
      { en: 'Strict fullstack RSVP schema validation with Zod', ru: 'Строгая RSVP-валидация гостей на Zod' },
      { en: 'Subdomain deployment via Traefik & Docker', ru: 'Изолированный деплой через Traefik и Docker' }
    ],
    description: {
      en: 'Exclusive interactive event invitation application crafted with an editorial dark liquid-gold aesthetic. Offers seamless guest RSVP registration, timeline preview, and real-time backend guest validation.',
      ru: 'Эксклюзивное интерактивное веб-приложение с темной liquid-gold эстетикой. Включает бесшовную RSVP-регистрацию гостей, интерактивный таймлайн и серверную валидацию.'
    },
    image: '/projects/birthday.webp',
    githubUrl: 'https://github.com/heayr/birthday-invitation-web',
    liveUrl: undefined,
    featuredColor: '#f59e0b'
  }
];
