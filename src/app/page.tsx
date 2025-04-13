'use client';

import { useAppTranslation } from '@/hooks/useAppTranslation';
import Image from 'next/image';
import allEvents from '@/data/events.json';
import { FloatingSubscriptionButton } from '@/components/FloatingSubscriptionButton';
import { SubmitEventButton } from '@/components/SubmitEventButton';
import { isEventUpcoming } from '@/utils/dateUtils';
import '../i18n/client';

export default function Home() {
  const { t: tHome } = useAppTranslation('home');
  const { t: tEvents } = useAppTranslation('events');
  const { currentLanguage } = useAppTranslation();
  
  const currentLang = currentLanguage as 'en' | 'zh'; // Get current language

  // 过滤掉已经过期的活动，只显示即将到来和正在进行的活动
  const upcomingEvents = allEvents.events.filter(event => isEventUpcoming(event));

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
              {tHome('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-2">
              {tHome('hero.subtitle')}
            </p>
            <div className="flex justify-end">
              <p className="text-sm text-white">by Howie</p>
            </div>
          </div>
        </div>
      </div>

      {/* Events Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            {tEvents('title')}
          </h2>
          <div className="max-w-7xl mx-auto space-y-16">
            {upcomingEvents.length === 0 ? (
              <p className="text-center text-gray-500">{tEvents('noEvents')}</p>
            ) : (
              upcomingEvents.map((event) => (
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
                          <span className="font-medium">{tEvents('details.date')}:</span> {event.date[currentLang] || "TBA"}
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">{tEvents('details.time')}:</span> {event.time[currentLang] || "TBA"}
                        </p>
                        <p className="mb-1">
                          <span className="font-medium">{tEvents('details.location')}:</span> {event.location[currentLang] || "TBA"}
                        </p>
                      </div>
                      <p className="text-black leading-relaxed">
                        {event.description[currentLang] || "Event details coming soon..."}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
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
