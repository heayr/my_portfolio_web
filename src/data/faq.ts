import { FAQItem } from '../types';

export const faqData: FAQItem[] = [
  {
    q: {
      en: 'What is your core architectural focus?',
      ru: 'В чем заключается твоя главная архитектурная экспертиза?',
    },
    a: {
      en: 'I engineer end-to-end web architectures: from responsive, accessible React 19 / Next.js 15 App Router frontends with 100/100 Core Web Vitals to asynchronous FastAPI backends, PostgreSQL schemas, and Docker topologies with automated SSL and edge routing.',
      ru: 'Сквозное проектирование веб-систем: от реактивных и доступных фронтендов на React 19 / Next.js 15 со 100/100 Core Web Vitals до асинхронных бэкендов на FastAPI/Node.js, реляционных баз данных PostgreSQL и контейнеризированной инфраструктуры на Docker с автоматическим SSL.',
    },
  },
  {
    q: {
      en: 'How do you guarantee 100/100 Core Web Vitals in production?',
      ru: 'Как достигается 100/100 Core Web Vitals на реальных проектах?',
    },
    a: {
      en: 'Strict elimination of runtime bloat, zero render-blocking scripts, modern WebP/AVIF media formats with explicit aspect ratios, CSS containment, optimized server-side rendering, and lazy hydration for below-the-fold widgets.',
      ru: 'Полный отказ от лишнего оверхеда и тяжелых рантаймов, отсутствие блокирующих скриптов, современные форматы изображений с фиксированными пропорциями, CSS-контейнмент и эффективный SSR.',
    },
  },
  {
    q: {
      en: 'What commercial production experience do you have?',
      ru: 'Какой коммерческий опыт подтверждает эти навыки?',
    },
    a: {
      en: 'Creator & Software Engineer for NoLogs SaaS—a live commercial privacy platform with active paying subscribers, automated YooKassa webhook billing, and production Wireguard configurations. Also engineered the Радиоточка advertising platform and bespoke luxury invitation web applications.',
      ru: 'Создатель и разработчик NoLogs SaaS — действующего сервиса с активными платными подписками, автоматическим приемом платежей через YooKassa и инфраструктурой туннелей. Также создал B2B-платформу агентства Радиоточка и эксклюзивные интерактивные веб-приложения.',
    },
  },
  {
    q: {
      en: 'Are you open to new opportunities and collaboration?',
      ru: 'Открыт ли ты к новым предложениям и сотрудничеству?',
    },
    a: {
      en: 'Yes! I am always open to interesting projects, strong product teams, and engineering collaboration — from building web systems from scratch to scaling key features. Reach out directly via Telegram (@PotatoChipasu) or email.',
      ru: 'Да! Я всегда открыт к интересным задачам, сильным продуктовым командам и амбициозным проектам — от создания архитектуры и сервисов с нуля до развития ключевых направлений. Связаться можно напрямую в Telegram (@PotatoChipasu) или по почте.',
    },
  },
];
