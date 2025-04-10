'use client';

import { useAppTranslation } from '../hooks/useAppTranslation';
import { useState, useEffect } from 'react';
import useScrollVisibility from '../hooks/useScrollVisibility';

export const SubmitEventButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { t } = useAppTranslation('submitEvent');
  const { isVisible } = useScrollVisibility();
  
  // 确保组件仅在客户端渲染后显示，避免水合错误
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleSubscriptionOpen = () => setIsSubscriptionOpen(true);
    const handleSubscriptionClose = () => setIsSubscriptionOpen(false);

    window.addEventListener('subscription:open', handleSubscriptionOpen);
    window.addEventListener('subscription:close', handleSubscriptionClose);

    return () => {
      window.removeEventListener('subscription:open', handleSubscriptionOpen);
      window.removeEventListener('subscription:close', handleSubscriptionClose);
    };
  }, []);

  // 如果组件还未挂载，返回 null 或占位符
  if (!mounted) return null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {!isSubscriptionOpen && (
        <button
          onClick={handleOpenModal}
          className={`fixed right-6 bottom-24 bg-white text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 z-50 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
          style={{
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>{t('title')}</span>
        </button>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('title')}</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* 嵌入腾讯问卷，设置合适的高度和宽度 */}
              <div className="w-full" style={{ height: '650px' }}>
                <iframe 
                  id='idy_frame' 
                  height="100%" 
                  width="100%" 
                  src="https://wj.qq.com/s2/20186284/7edc/" 
                  frameBorder="0" 
                  style={{ minHeight: '650px', width: '100%' }} 
                  allowFullScreen 
                  sandbox="allow-same-origin allow-scripts allow-modals allow-downloads allow-forms allow-popups"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
