import { ProjectItem } from '../types';

export const projectsData: ProjectItem[] = [
  {
    id: 'nologs',
    title: 'NoLogs SaaS',
    tagline: {
      en: 'Complete Privacy Ecosystem, VPN Infrastructure & Subscription Billing',
      ru: 'Комплексная privacy-экосистема: веб-сайт, бот, VPN-сервера и биллинг'
    },
    role: {
      en: 'Creator & Fullstack Engineer',
      ru: 'Создатель & Fullstack Инженер'
    },
    period: '2024 — 2026',
    stack: ['Next.js 15', 'TypeScript', 'FastAPI', 'PostgreSQL', 'YooKassa Webhooks', 'Docker', 'WireGuard'],
    metrics: [
      { en: '100/100 Core Web Vitals (0ms TBT)', ru: '100/100 Core Web Vitals (0ms TBT)' },
      { en: 'Sub-second real-time telemetry updates', ru: 'Субсекундный отклик сетевой телеметрии' },
      { en: 'Zero data retention architecture', ru: 'Архитектура с нулевым сохранением логов' },
      { en: 'Automated recurring payment pipelines', ru: 'Автоматизированный биллинг и подписки' }
    ],
    description: {
      en: 'Full-cycle privacy ecosystem featuring an interactive marketing portal, Telegram management bot, automated recurring YooKassa billing, and multi-node WireGuard/Hysteria2 tunneling server topology providing secure internet access.',
      ru: 'Комплексная экосистема защищенного интернета: веб-сайт, Telegram-бот, автоматический рекуррентный биллинг подписок и серверная сеть защищенных туннелей WireGuard/Hysteria2.'
    },
    image: '/projects/nologs_art.webp',
    githubUrl: 'https://github.com/heayr/nologs-bot-docs',
    liveUrl: 'https://nologs.website/',
    featuredColor: '#3b82f6'
  },
  {
    id: 'radiotochka',
    title: 'Радиоточка',
    tagline: {
      en: 'Awwwards-Caliber Advertising Agency Platform & Dynamic CMS',
      ru: 'Платформа рекламного агентства уровня Awwwards и динамическая CMS'
    },
    role: {
      en: 'Frontend & UI Engineer',
      ru: 'Frontend & UI Инженер'
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
      en: 'Awwwards-caliber digital platform and content management suite for a full-cycle creative advertising agency. Features mathematical fluid typography (320px to 4K), interactive commercial campaign showcase, and administrative moderation.',
      ru: 'Сайт рекламного агентства полного цикла уровня Awwwards с административной панелью управления контентом. Включает математическую fluid-типографику (от 320px до 4K), интерактивную витрину коммерческих кейсов и панель модерации.'
    },
    image: '/projects/radiotochka_art.webp',
    githubUrl: 'https://github.com/heayr/radiotochka',
    liveUrl: 'https://radiotochka.vercel.app/',
    featuredColor: '#10b981'
  },
  {
    id: 'birthday',
    title: 'The 50th Jubilee',
    tagline: {
      en: 'Bespoke Luxury Interactive Invitation & Native Calendar Sync',
      ru: 'Эксклюзивный интерактивный сайт-приглашение на юбилей с экспортом в календарь'
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
      { en: 'One-click native calendar sync (Apple, Google, .ics)', ru: 'Экспорт события в календари (Apple iOS, Google, .ics)' }
    ],
    description: {
      en: 'Exclusive interactive event invitation web application crafted with an editorial dark liquid-gold aesthetic. Offers guest RSVP registration flow, interactive timeline, and seamless one-click event sync to Apple iOS Calendar, Google Calendar, and native Android devices.',
      ru: 'Эксклюзивный интерактивный сайт-приглашение на юбилей с темной liquid-gold эстетикой. Включает регистрацию гостей (RSVP), интерактивный таймлайн и экспорт события в календарь любого смартфона (Apple iOS, Google, Android, .ics) в 1 клик.'
    },
    image: '/projects/birthday_art.webp',
    githubUrl: 'https://github.com/heayr/birthday-invitation-web',
    liveUrl: undefined,
    featuredColor: '#f59e0b'
  }
];
