import React from 'react';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { SUPPORTED_LANGUAGES } from '../i18n/config';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { t, currentLanguage, changeLanguage } = useAppTranslation('common');

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-gray-600">{t('language')}:</span>
      <div className="flex space-x-1">
        {Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => (
          <button
            key={code}
            onClick={() => changeLanguage(code as keyof typeof SUPPORTED_LANGUAGES)}
            className={`px-2 py-1 text-sm rounded ${
              currentLanguage === code
                ? 'bg-gold-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}; 