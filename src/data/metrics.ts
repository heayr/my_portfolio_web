import { MetricItem } from '../types';

export const metricsData: MetricItem[] = [
  {
    value: '100',
    unit: '/100',
    label: {
      en: 'Core Web Vitals',
      ru: 'Core Web Vitals',
    },
    desc: {
      en: 'Perfect PageSpeed scores across Performance, Accessibility, Best Practices, and SEO.',
      ru: 'Максимальные баллы PageSpeed по Performance, Accessibility, Best Practices и SEO.',
    },
  },
  {
    value: '0',
    unit: 'ms',
    label: {
      en: 'Total Blocking Time',
      ru: 'Total Blocking Time',
    },
    desc: {
      en: 'Zero main-thread jank, sub-second execution, and 120 FPS inertial scroll fluidity.',
      ru: 'Никаких блокировок главного потока, плавная прокрутка 120 FPS без лагов.',
    },
  },
  {
    value: '280',
    unit: 'ms',
    label: {
      en: 'Edge TTFB',
      ru: 'Время отклика TTFB',
    },
    desc: {
      en: 'Sub-second Time To First Byte via edge CDN distribution and optimized SSR pipelines.',
      ru: 'Субсекундный Time To First Byte благодаря CDN-кэшированию и оптимизированному рантайму.',
    },
  },
  {
    value: '99',
    unit: '.9%',
    label: {
      en: 'Production Uptime',
      ru: 'Аптайм в проде',
    },
    desc: {
      en: 'Docker container health checks, node failover, and zero-downtime deployment topologies.',
      ru: 'Docker health-checks, изоляция нод и zero-downtime пайплайны деплоя.',
    },
  },
];
