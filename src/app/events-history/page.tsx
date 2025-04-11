'use client';

import { useState, useEffect } from 'react';

const EventsHistoryContent = () => {
  const [isChinese, setIsChinese] = useState(false);

  useEffect(() => {
    const checkLanguage = () => {
      const lang = localStorage.getItem('i18nextLng');
      setIsChinese(lang === 'zh');
    };

    // 初始检查
    checkLanguage();

    // 设置定时器定期检查语言变化
    const interval = setInterval(checkLanguage, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[30vh] sm:h-[40vh] w-full">
        <div className="absolute inset-0 bg-gray-800"></div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
              {isChinese ? "历史活动" : "Events History"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* 这里保留为空，等待未来添加内容 */}
      </div>
    </div>
  );
};

export default function EventsHistoryPage() {
  return <EventsHistoryContent />;
}
