'use client';

import { useAppTranslation } from '@/hooks/useAppTranslation';
import historyEventsData from '@/data/eventsHistory.json';
import Image from 'next/image';
import { HistoryEvent } from '@/types/historyEvent';
import styles from './history-events-list.module.css';

const EventsHistoryContent = () => {
  const { t, currentLanguage } = useAppTranslation('eventsHistory');
  
  // 使用历史活动数据
  const pastEvents = historyEventsData.events;

  return (
    <div>
      {/* Hero Section - 减小高度与首页保持一致 */}
      <div className="relative h-[25vh] sm:h-[30vh] w-full">
        <div className="absolute inset-0 bg-gray-800"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            <p className="text-lg text-gray-300">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {pastEvents.map((event: HistoryEvent, index) => (
              <div key={`${event.id}-${index}`} className={`${styles.eventCard} bg-gray-800 rounded-lg overflow-hidden shadow-lg`}>
                <div className={`${styles.eventImageContainer} aspect-[3/4]`}>
                  {event.image ? (
                    <Image
                      src={event.image}
                      alt={`Event ${event.id}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index < 6} // 优先加载前6张图片
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-700 text-white">
                      <span className="text-xl">Event Image</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-white mb-4">
              {t('noEvents')}
            </h2>
            <p className="text-gray-400">
              {currentLanguage === 'zh' 
                ? "目前没有历史活动记录。" 
                : "There are no past events to display at this time."
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default function EventsHistoryPage() {
  return <EventsHistoryContent />;
}
