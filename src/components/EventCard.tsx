'use client';

import { useTranslation } from '@/components/i18n/useTranslation';
import Image from 'next/image';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  title: {
    en: string;
    zh: string;
  };
  date: {
    en: string;
    zh: string;
  };
  time: {
    en: string;
    zh: string;
  };
  location: {
    en: string;
    zh: string;
  };
  image: string;
  description: {
    en: string;
    zh: string;
  };
}

export default function EventCard({
  id,
  title,
  date,
  time,
  location,
  image,
  description,
}: EventCardProps) {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as 'en' | 'zh';

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
      <div className="relative h-[300px] w-full rounded-t-lg overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={title[currentLang]}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white bg-gray-700">
            <span className="text-xl">Event Image</span>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          {title[currentLang]}
        </h3>
        <div className="text-gray-300 mb-4">
          <p className="mb-1">
            <span className="font-medium">{t('events.date')}:</span> {date[currentLang]}
          </p>
          <p className="mb-1">
            <span className="font-medium">{t('events.time')}:</span> {time[currentLang]}
          </p>
          <p>
            <span className="font-medium">{t('events.location')}:</span> {location[currentLang]}
          </p>
        </div>
        <p className="text-gray-300 mb-4 line-clamp-3">
          {description[currentLang]}
        </p>
        <Link
          href={`/events/${id}`}
          className="inline-block bg-gold-500 text-gray-900 px-6 py-2 rounded-md font-medium hover:bg-gold-600 transition-colors duration-300"
        >
          {t('events.readMore')}
        </Link>
      </div>
    </div>
  );
} 