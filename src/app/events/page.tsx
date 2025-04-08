'use client';

import { useTranslation } from '@/components/i18n/useTranslation';
import Link from 'next/link';
import Image from 'next/image';
import eventsData from '@/data/events.json';

export default function EventsPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'zh';

  // 使用eventsData中的事件数据
  const events = eventsData.events;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white mb-8">{t('events.title')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Link key={event.id} href={`/events/${event.id}`}>
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-48">
                {event.image ? (
                  <Image
                    src={event.image}
                    alt={event.title[currentLang]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white">
                    <span className="text-xl">Event Image</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-2">
                  {event.title[currentLang]}
                </h2>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <span className="font-medium">{t('events.date')}:</span>{' '}
                    {event.date[currentLang]}
                  </p>
                  <p>
                    <span className="font-medium">{t('events.time')}:</span>{' '}
                    {event.time[currentLang]}
                  </p>
                  <p>
                    <span className="font-medium">{t('events.location')}:</span>{' '}
                    {event.location[currentLang]}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 