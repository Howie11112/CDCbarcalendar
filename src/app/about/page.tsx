'use client';

import { useState, useEffect } from 'react';

const AboutContent = () => {
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
              {isChinese ? "关于我们" : "About Us"}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="prose max-w-none">
          <p className="text-base sm:text-lg mb-4 sm:mb-6">
            {isChinese ? 
              "成都酒吧日历是您探索成都充满活力的饮酒文化的首选指南。我们致力于为本地居民和游客提供最全面、最新的鸡尾酒、精酿啤酒和烈酒资讯。无论您是资深爱好者、好奇的旅行者，还是业内专业人士，我们都将为您介绍成都最棒的酒吧活动、品鉴会、特色促销和行业动态。与我们一同踏上这段探索成都热闹酒吧文化的精彩旅程。" :
              "Chengdu Bar Calendar is your premier guide to exploring the vibrant drinking culture of Chengdu. We are dedicated to providing locals and visitors with the most comprehensive and up-to-date information on cocktails, craft beers, and spirits. Whether you're a seasoned enthusiast, curious traveler, or industry professional, we introduce you to the city's finest bar events, tastings, special promotions, and industry news. Join us on this exciting journey through Chengdu's buzzing bar scene."
            }
          </p>
        </div>
        
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {isChinese ? "关注我们" : "Follow Us"}
          </h2>
          <div className="space-y-4">
            <div>
              <a 
                href="https://www.instagram.com/chengdu_barcalendar/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-red-500 hover:text-red-400 transition-colors flex items-center text-lg sm:text-xl font-medium"
              >
                <span className="sr-only">Instagram</span>
                <span>@chengdu_barcalendar</span>
              </a>
            </div>
            <div className="text-red-500 flex items-center text-lg sm:text-xl font-medium">
              <span className="sr-only">{isChinese ? "微信" : "Wechat"}</span>
              <span>{isChinese ? "微信账号：" : "Wechat: "}1664508573</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AboutPage() {
  return <AboutContent />;
}