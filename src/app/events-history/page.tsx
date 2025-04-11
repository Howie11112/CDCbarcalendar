'use client';

import { useAppTranslation } from '@/hooks/useAppTranslation';
import eventsData from '@/data/events.json';
import { isEventPassed } from '@/utils/dateUtils';
import Image from 'next/image';

const EventsHistoryContent = () => {
  const { t, currentLanguage } = useAppTranslation('eventsHistory');
  const currentLang = currentLanguage as 'en' | 'zh';
  
  // 过滤出已过期的活动
  const pastEvents = eventsData.events.filter(event => isEventPassed(event));

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[30vh] sm:h-[40vh] w-full">
        <div className="absolute inset-0 bg-gray-800"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {t('title')}
            </h1>
            {/* 删除了说明文本 */}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 已删除小标题 */}

        {pastEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <div key={event.id} className="flex flex-col items-center">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto">
                  {/* 统一图片尺寸为竖向海报，宽高比为 2:3 (如电影海报) */}
                  <div className="relative" style={{ paddingTop: '150%' }}> {/* 2:3 比例 = 150% */}
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
              {currentLang === 'zh' 
                ? "目前没有过期的活动记录。" 
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
