'use client';

import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import eventsData from '@/data/events.json';
import { FloatingSubscriptionButton } from '@/components/FloatingSubscriptionButton';
import { SubmitEventButton } from '@/components/SubmitEventButton';
import '../i18n/client';

export default function Home() {
  const { t, i18n } = useTranslation(['home', 'events']);
  const featuredEvent = eventsData.events[0]; // Get the first event as featured
  const currentLang = i18n.language as 'en' | 'zh'; // Get current language

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[70vh] w-full">
        {/* For now, we'll use a fallback for the missing image */}
        <div className="absolute inset-0 bg-gray-800"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          {/* Centered Main Titles */}
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {t('hero.title', { ns: 'home' })}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-2">
              {t('hero.subtitle', { ns: 'home' })}
            </p>
            <div className="flex justify-end">
              <p className="text-sm text-white">by Howie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Event Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {t('title', { ns: 'events' })}
          </h2>
          <div className="max-w-7xl mx-auto space-y-16">
            {eventsData.events.map((event) => (
              <div key={event.id} className="border-4 border-gray-900 rounded-lg p-6 bg-white shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/10 before:to-transparent before:pointer-events-none">
                <div className="flex flex-col md:flex-row gap-4 items-start">
                  {/* Event Image */}
                  <div className="w-full md:w-1/3 md:ml-0">
                    <div className="relative h-[500px] rounded-lg overflow-hidden">
                      {event.image ? (
                        <Image
                          src={event.image}
                          alt={event.title[currentLang] || "Event Image"}
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 33vw"
                          priority={event.id === "1"}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white">
                          <span className="text-xl">Event Image</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Event Content */}
                  <div className="w-full md:w-2/3 space-y-4 md:pl-2">
                    <h3 className="text-2xl font-bold text-black">
                      {event.title[currentLang] || "Event Title"}
                    </h3>
                    <div className="text-black">
                      <p className="mb-1">
                        <span className="font-medium">{t('details.date', { ns: 'events' })}:</span> {event.date[currentLang] || "TBA"}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">{t('details.time', { ns: 'events' })}:</span> {event.time[currentLang] || "TBA"}
                      </p>
                      <p className="mb-1">
                        <span className="font-medium">{t('details.location', { ns: 'events' })}:</span> {event.location[currentLang] || "TBA"}
                      </p>
                    </div>
                    <p className="text-black leading-relaxed">
                      {event.description[currentLang] || "Event details coming soon..."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Subscription Button */}
      <FloatingSubscriptionButton />
      
      {/* Submit Event Button */}
      <SubmitEventButton />
    </div>
  );
}
