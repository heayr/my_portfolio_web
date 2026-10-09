import { MetricItem } from '../types';

export const metricsData: MetricItem[] = [
  {
    value: '98',
    unit: '+',
    label: {
      en: 'Core Web Vitals',
      ru: 'Core Web Vitals',
    },
    desc: {
      en: 'High Lighthouse benchmarks across Performance, Accessibility, Best Practices, and SEO.',
      ru: 'Высокие бенчмарки Lighthouse по категориям Performance, Accessibility, Best Practices и SEO.',
    },
  },
  {
    value: '<50',
    unit: 'ms',
    label: {
      en: 'Total Blocking Time',
      ru: 'Total Blocking Time',
    },
    desc: {
      en: 'Minimized main-thread overhead, GPU-composited transforms, and responsive interactions.',
      ru: 'Минимальная нагрузка на главный поток, вынос курсора на GPU и быстрый отклик интерфейса.',
    },
  },
  {
    value: '~120',
    unit: 'ms',
    label: {
      en: 'Edge TTFB',
      ru: 'Время отклика TTFB',
    },
    desc: {
      en: 'Low Time To First Byte powered by Anycast Edge CDN distribution and optimized asset caching.',
      ru: 'Низкий Time To First Byte благодаря глобальной Edge CDN и кэшированию ассетов.',
    },
  },
  {
    value: '99',
    unit: '.9%',
    label: {
      en: 'SaaS SLA & Uptime',
      ru: 'Аптайм сервисов',
    },
    desc: {
      en: 'Production engineering standard across commercial SaaS projects (health checks & container isolation).',
      ru: 'Инженерный стандарт надежности в коммерческих SaaS-проектах (health checks и изоляция контейнеров).',
    },
  },
];
