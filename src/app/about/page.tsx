'use client';

import { useAppTranslation } from '@/hooks/useAppTranslation';

const AboutContent = () => {
  const { t, currentLanguage } = useAppTranslation('about');
  const isChinese = currentLanguage === 'zh';

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
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="prose max-w-none">
          <p className="text-base sm:text-lg mb-4 sm:mb-6">
            {t('content')}
          </p>
        </div>
        
        <div className="mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            {t('Follow Us')}
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
