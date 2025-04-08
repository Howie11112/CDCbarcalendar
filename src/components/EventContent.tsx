'use client';

import { useTranslation } from '@/components/i18n/useTranslation';
import Image from 'next/image';
import { Event } from '@/types/event';

interface EventContentProps {
  event: Event;
}

export default function EventContent({ event }: EventContentProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'zh';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative h-64 md:h-96 mb-8">
        {event.image ? (
          <Image
            src={event.image}
            alt={event.title[currentLang]}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white rounded-lg">
            <span className="text-xl">Event Image</span>
          </div>
        )}
      </div>
      <h1 className="text-4xl font-bold text-white mb-6">
        {event.title[currentLang]}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {t('events.date')}
            </h2>
            <p className="text-gray-300">{event.date[currentLang]}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">
              {t('events.time')}
            </h2>
            <p className="text-gray-300">{event.time[currentLang]}</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">
            {t('events.location')}
          </h2>
          <p className="text-gray-300">{event.location[currentLang]}</p>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">
          {t('events.about')}
        </h2>
        <div className="prose prose-invert max-w-none">
          {event.description[currentLang].split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
} 