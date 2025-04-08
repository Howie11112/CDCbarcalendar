'use client';

import { useContext } from 'react';
import { LanguageContext } from './I18nProvider';

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  
  return {
    t: context.t,
    i18n: {
      language: context.language,
      changeLanguage: context.setLanguage
    }
  };
}; 