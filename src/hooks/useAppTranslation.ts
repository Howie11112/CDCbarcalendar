import { useTranslation as useI18nTranslation } from 'react-i18next';
import { useCallback } from 'react';
import { SupportedLanguage } from '../i18n/config';

// Define translation namespaces
export type TranslationNamespace = 
  | 'common'
  | 'navigation'
  | 'home'
  | 'events'
  | 'subscription'
  | 'submitEvent'
  | 'about'
  | 'contact';

// Custom hook for translations with better TypeScript support
export function useAppTranslation(namespace?: TranslationNamespace) {
  const { t, i18n } = useI18nTranslation(namespace);

  // Function to change language
  const changeLanguage = useCallback((language: SupportedLanguage) => {
    i18n.changeLanguage(language);
    // Store language preference in localStorage
    localStorage.setItem('i18nextLng', language);
  }, [i18n]);

  // Get current language
  const currentLanguage = i18n.language as SupportedLanguage;

  return {
    t,
    currentLanguage,
    changeLanguage,
    isInitialized: i18n.isInitialized,
  };
} 