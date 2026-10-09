import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { AppProvider } from '../i18n/context';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-playfair',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yegor.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Yegor — Frontend & Fullstack Engineer | Portfolio',
  description:
    'Portfolio of Yegor (heayr): Frontend & Fullstack Engineer specializing in React 19, Next.js 15, TypeScript, commercial SaaS, and high-performance interactive web experiences.',
  keywords: [
    'Frontend Engineer',
    'Fullstack Engineer',
    'Product Engineer',
    'React 19',
    'Next.js 15',
    'TypeScript',
    'NoLogs SaaS',
    'Radiotochka',
    'Core Web Vitals',
    'Creative Development',
  ],
  authors: [{ name: 'Yegor (heayr)' }],
  openGraph: {
    title: 'Yegor — Frontend & Fullstack Engineer',
    description:
      'Engineering high-performance commercial SaaS, B2B platforms, and interactive digital experiences with strict performance and UI standards.',
    images: ['/projects/nologs.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      className={`dark ${inter.variable} ${jetbrainsMono.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>"
        />
      </head>
      <body
        suppressHydrationWarning
        className="antialiased min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-400"
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
