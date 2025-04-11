'use client';

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../locales/en.json';
import zhTranslations from '../locales/zh.json';

// Define supported languages
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  zh: '中文',
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
    defaultNS: 'common',
    ns: ['common', 'navigation', 'home', 'events', 'subscription', 'submitEvent', 'about', 'eventsHistory'],
    resources: {
      en: {
        common: enTranslations.common,
        navigation: enTranslations.navigation,
        home: enTranslations.home,
        events: enTranslations.events,
        subscription: enTranslations.subscription,
        submitEvent: enTranslations.submitEvent,
        about: enTranslations.about,
        eventsHistory: enTranslations.eventsHistory,
      },
      zh: {
        common: zhTranslations.common,
        navigation: zhTranslations.navigation,
        home: zhTranslations.home,
        events: zhTranslations.events,
        subscription: zhTranslations.subscription,
        submitEvent: zhTranslations.submitEvent,
        about: zhTranslations.about,
        eventsHistory: zhTranslations.eventsHistory,
      },
    },
    interpolation: {
      escapeValue: false,
    },
    // 启用 react 检测语言变化
    react: {
      useSuspense: false,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      nsMode: 'default'
    },
    // 禁用生产环境调试以提高性能
    debug: process.env.NODE_ENV === 'development',
  });

// 从 localStorage 获取缓存的语言
const savedLanguage = typeof window !== 'undefined' 
  ? localStorage.getItem('i18nextLng') 
  : null;

// 如果有保存的语言设置，立即应用
if (savedLanguage && Object.keys(SUPPORTED_LANGUAGES).includes(savedLanguage)) {
  i18n.changeLanguage(savedLanguage);
}

export default i18n;