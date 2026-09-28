import { StackCategory } from '../types';

export const stackData: StackCategory[] = [
  {
    title: {
      en: 'Frontend & UI Engineering',
      ru: 'Фронтенд и UI-инженерия',
    },
    items: [
      { name: 'React 19', tag: { en: 'State Primitives & Actions', ru: 'Новые примитивы состояния и Actions' } },
      { name: 'Next.js 15', tag: { en: 'App Router & RSC', ru: 'App Router и серверные компоненты' } },
      { name: 'TypeScript', tag: { en: 'Strict Typing & Schemas', ru: 'Строгая типизация и схемы Zod' } },
      { name: 'Tailwind CSS v4', tag: { en: 'Fluid Design Systems', ru: 'Fluid дизайн-системы и токены' } },
      { name: 'Core Web Vitals', tag: { en: '100/100 PageSpeed', ru: '100/100 PageSpeed и 0ms TBT' } },
    ],
  },
  {
    title: {
      en: 'Backend & Systems Architecture',
      ru: 'Бэкенд и системная архитектура',
    },
    items: [
      { name: 'Python / FastAPI', tag: { en: 'Asynchronous APIs', ru: 'Асинхронные REST/WebSocket API' } },
      { name: 'Node.js / Express', tag: { en: 'Event-driven Services', ru: 'Событийно-ориентированные сервисы' } },
      { name: 'PostgreSQL', tag: { en: 'Indexing & Schemas', ru: 'Индексы, миграции и оптимизация' } },
      { name: 'Prisma ORM', tag: { en: 'Type-Safe DB Layer', ru: 'Типобезопасный слой работы с БД' } },
      { name: 'Payment Webhooks', tag: { en: 'YooKassa / Automated Billing', ru: 'YooKassa и авто-биллинг' } },
    ],
  },
  {
    title: {
      en: 'DevOps & Zero-Leak Security',
      ru: 'DevOps и сетевая безопасность',
    },
    items: [
      { name: 'Docker Compose', tag: { en: 'Production Topology', ru: 'Изоляция сервисов и топология нод' } },
      { name: 'WireGuard / Hysteria2', tag: { en: 'Encrypted Tunnels', ru: 'Зашифрованные туннели и routing' } },
      { name: 'Traefik / Nginx', tag: { en: "Reverse Proxy & Let's Encrypt", ru: 'Обратный прокси и авто-SSL' } },
      { name: 'Edge Deployments', tag: { en: 'Vercel / Cloudflare', ru: 'Глобальная дистрибуция и кэш' } },
    ],
  },
  {
    title: {
      en: 'Motion & Creative Tech',
      ru: 'Анимация и Creative Tech',
    },
    items: [
      { name: 'Lenis', tag: { en: 'Smooth Inertial Scroll', ru: 'Плавный инерционный скролл 120 FPS' } },
      { name: 'Canvas 2D / Shaders', tag: { en: 'Particle Simulations', ru: 'Симуляция частиц и шейдеры' } },
      { name: 'CSS Transitions', tag: { en: 'Hardware Acceleration', ru: 'Аппаратное ускорение без оверхеда' } },
      { name: 'Fluid Typography', tag: { en: 'Mathematical Clamp Scales', ru: 'Математические clamp-сетки' } },
    ],
  },
];
