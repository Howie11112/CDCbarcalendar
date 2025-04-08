'use client';

import { ReactNode, createContext, useEffect, useState } from 'react';
import { i18n } from '@/i18n-config';

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
});

// Import translations
import enTranslations from '@/locales/en.json';
import zhTranslations from '@/locales/zh.json';

const translations: Record<string, any> = {
  en: enTranslations,
  zh: zhTranslations,
};

// Helper function to get nested translations
const getNestedTranslation = (obj: any, path: string): string => {
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Translation key not found: ${path}`);
      return path;
    }
    current = current[key];
  }
  
  return current;
};

export default function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('en');

  // Detect browser language on client-side only
  useEffect(() => {
    const savedLang = localStorage.getItem('language');
    if (savedLang && i18n.locales.includes(savedLang as any)) {
      setLanguage(savedLang);
    } else {
      const browserLang = navigator.language.split('-')[0];
      const detectedLang = i18n.locales.includes(browserLang as any) ? browserLang : 'en';
      setLanguage(detectedLang);
    }
  }, []);

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const currentTranslations = translations[language] || translations.en;
    return getNestedTranslation(currentTranslations, key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
} 