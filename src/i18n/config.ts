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
  // Pass the i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize i18next
  .init({
    // Fallback language
    fallbackLng: 'en',
    // Supported languages
    supportedLngs: Object.keys(SUPPORTED_LANGUAGES),
    // Default namespace
    defaultNS: 'common',
    // Namespaces
    ns: ['common', 'navigation', 'home', 'events', 'subscription', 'submitEvent', 'about', 'contact'],
    // Resources
    resources: {
      en: {
        common: enTranslations.common,
        navigation: enTranslations.navigation,
        home: enTranslations.home,
        events: enTranslations.events,
        subscription: enTranslations.subscription,
        submitEvent: enTranslations.submitEvent,
        about: enTranslations.about,
        contact: enTranslations.contact,
      },
      zh: {
        common: zhTranslations.common,
        navigation: zhTranslations.navigation,
        home: zhTranslations.home,
        events: zhTranslations.events,
        subscription: zhTranslations.subscription,
        submitEvent: zhTranslations.submitEvent,
        about: zhTranslations.about,
        contact: zhTranslations.contact,
      },
    },
    // Interpolation options
    interpolation: {
      escapeValue: false,
    },
    // Debug mode (disable in production)
    debug: process.env.NODE_ENV === 'development',
  });

export default i18n; 