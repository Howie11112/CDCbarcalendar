'use client';

import React, { useState, useEffect } from 'react';
import { SubscriptionForm } from './SubscriptionForm';
import { useAppTranslation } from '../hooks/useAppTranslation';
import useScrollVisibility from '../hooks/useScrollVisibility';

export const FloatingSubscriptionButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useAppTranslation('subscription');
  const [mounted, setMounted] = useState(false);
  const { isVisible } = useScrollVisibility();
  
  // 确保组件仅在客户端渲染后显示，避免水合错误
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // 如果组件还未挂载，返回 null 或占位符
  if (!mounted) return null;

  const handleOpenModal = () => {
    setIsModalOpen(true);
    window.dispatchEvent(new Event('subscription:open'));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    window.dispatchEvent(new Event('subscription:close'));
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className={`fixed bottom-6 right-6 bg-white text-gray-900 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 z-50 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
        <span>{t('title')}</span>
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <SubscriptionForm onClose={handleCloseModal} />
        </div>
      )}
    </>
  );
};