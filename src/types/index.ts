export type Locale = 'en' | 'ru';
export type Theme = 'dark' | 'light';

export interface ProjectItem {
  id: string;
  title: string;
  tagline: {
    en: string;
    ru: string;
  };
  role: {
    en: string;
    ru: string;
  };
  period: string;
  stack: string[];
  metrics: {
    en: string;
    ru: string;
  }[];
  description: {
    en: string;
    ru: string;
  };
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featuredColor: string;
}

export interface EpochItem {
  id: string;
  title: {
    en: string;
    ru: string;
  };
  year: string;
  badge: {
    en: string;
    ru: string;
  };
  desc: {
    en: string;
    ru: string;
  };
  velocity: string;
}

export type LocalizedText = {
  en: string;
  ru: string;
};

export interface StackCategory {
  title: LocalizedText;
  items: {
    name: string;
    tag: LocalizedText;
  }[];
}

export interface FAQItem {
  q: LocalizedText;
  a: LocalizedText;
}

export interface MetricItem {
  value: string;
  unit: string;
  label: LocalizedText;
  desc: LocalizedText;
}

