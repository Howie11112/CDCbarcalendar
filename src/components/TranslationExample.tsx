import React from 'react';
import { useAppTranslation } from '../hooks/useAppTranslation';
import { LanguageSwitcher } from './LanguageSwitcher';

export const TranslationExample: React.FC = () => {
  const { t: tCommon } = useAppTranslation('common');
  const { t: tHome } = useAppTranslation('home');
  const { t: tEvents } = useAppTranslation('events');
  const { t: tAbout } = useAppTranslation('about');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{tHome('hero.title')}</h1>
        <LanguageSwitcher />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{tEvents('title')}</h2>
          <p className="text-gray-600 mb-4">{tEvents('noEvents')}</p>
          <div className="space-y-2">
            <p><span className="font-medium">{tEvents('details.date')}:</span> April 12, 2024</p>
            <p><span className="font-medium">{tEvents('details.time')}:</span> 8:00 PM</p>
            <p><span className="font-medium">{tEvents('details.location')}:</span> Papuwa, Jinjiang District</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">{tAbout('title')}</h2>
          <p className="text-gray-600">{tAbout('description')}</p>
        </div>
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">{tCommon('language')} Selection</h2>
        <p className="text-gray-600 mb-4">
          This example demonstrates how to use the translation system in your components.
          Try switching languages using the language switcher in the top-right corner.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Common Translations</h3>
            <ul className="space-y-1">
              <li><span className="font-medium">{tCommon('submit')}:</span> {tCommon('submit')}</li>
              <li><span className="font-medium">{tCommon('cancel')}:</span> {tCommon('cancel')}</li>
              <li><span className="font-medium">{tCommon('success')}:</span> {tCommon('success')}</li>
              <li><span className="font-medium">{tCommon('error')}:</span> {tCommon('error')}</li>
            </ul>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Navigation</h3>
            <ul className="space-y-1">
              <li><span className="font-medium">Home:</span> {tHome('hero.title')}</li>
              <li><span className="font-medium">Events:</span> {tEvents('title')}</li>
              <li><span className="font-medium">About:</span> {tAbout('title')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 