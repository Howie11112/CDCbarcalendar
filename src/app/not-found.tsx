'use client';

import Link from 'next/link';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function NotFound() {
  const { t, currentLanguage } = useAppTranslation('common');

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-6">
          {currentLanguage === 'zh' ? '页面未找到' : 'Page Not Found'}
        </h2>
        <p className="text-gray-400 mb-8">
          {currentLanguage === 'zh' 
            ? '您尝试访问的页面不存在或已被移除。' 
            : 'The page you are looking for does not exist or has been removed.'}
        </p>
        <Link 
          href="/" 
          className="px-6 py-3 bg-gold-500 text-gray-900 rounded-md font-medium hover:bg-gold-600 transition-all duration-300"
        >
          {currentLanguage === 'zh' ? '返回首页' : 'Return Home'}
        </Link>
      </div>
    </div>
  );
}
