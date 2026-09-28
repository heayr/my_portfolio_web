'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, Theme } from '../types';
import { en } from './dictionaries/en';
import { ru } from './dictionaries/ru';

interface AppContextType {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  toggleLocale: () => void;
  t: typeof en;
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>('ru');
  const [theme, setThemeState] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = localStorage.getItem('yegor_locale') as Locale;
    if (savedLocale === 'en' || savedLocale === 'ru') {
      setLocaleState(savedLocale);
    }

    const savedTheme = localStorage.getItem('yegor_theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
      document.documentElement.classList.toggle('light', savedTheme === 'light');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const setLocale = (loc: Locale) => {
    setLocaleState(loc);
    localStorage.setItem('yegor_locale', loc);
  };

  const toggleLocale = () => {
    const next = locale === 'ru' ? 'en' : 'ru';
    setLocale(next);
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    localStorage.setItem('yegor_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme === 'light');
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
  };

  const t = locale === 'ru' ? ru : en;

  return (
    <AppContext.Provider value={{ locale, setLocale, toggleLocale, t, theme, setTheme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
