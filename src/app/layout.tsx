import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '../i18n/context';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yegor.dev';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Yegor — Frontend & Fullstack Engineer | Portfolio',
  description:
    'Portfolio of Yegor (heayr): Frontend & Fullstack Engineer specializing in React 19, Next.js 15, TypeScript, commercial SaaS, and high-performance Awwwards-caliber digital experiences.',
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
    'Awwwards',
  ],
  authors: [{ name: 'Yegor (heayr)' }],
  openGraph: {
    title: 'Yegor — Frontend & Fullstack Engineer',
    description:
      'Engineering high-performance commercial SaaS, B2B platforms, and bespoke Awwwards-caliber digital experiences. 100/100 PageSpeed obsessed.',
    images: ['/projects/nologs.webp'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,600;1,400;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⚡</text></svg>"
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--bg-root)] text-[var(--text-primary)] transition-colors duration-400">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
