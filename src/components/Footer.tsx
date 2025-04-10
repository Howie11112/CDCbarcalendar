'use client';

import React from 'react';
import { useAppTranslation } from '../hooks/useAppTranslation';

export const Footer: React.FC = () => {
  const { t, currentLanguage } = useAppTranslation('common');
  const isChinese = currentLanguage === 'zh';

  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="text-lg font-medium mb-3">Follow us</div>
          <div className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
            {/* Instagram Icon */}
            <a 
              href="https://www.instagram.com/chengdu_barcalendar/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span className="sr-only">Instagram</span>
              <svg className="h-6 w-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              <span>@chengdu_barcalendar</span>
            </a>

            {/* WeChat - 使用更标准的微信图标 */}
            <div className="text-gray-400 hover:text-white transition-colors flex items-center">
              <svg className="h-6 w-6 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9.5,4C5.36,4 2,6.69 2,10C2,11.89 3.08,13.56 4.78,14.66L4,17L6.5,15.5C7.39,15.81 8.37,16 9.41,16C9.15,15.37 9,14.7 9,14C9,10.69 12.13,8 16,8C16.19,8 16.38,8.01 16.56,8.03C15.54,5.69 12.78,4 9.5,4M6.5,6.5A1,1 0 0,1 7.5,7.5A1,1 0 0,1 6.5,8.5A1,1 0 0,1 5.5,7.5A1,1 0 0,1 6.5,6.5M11.5,6.5A1,1 0 0,1 12.5,7.5A1,1 0 0,1 11.5,8.5A1,1 0 0,1 10.5,7.5A1,1 0 0,1 11.5,6.5M16,9C13.24,9 11,11.24 11,14C11,16.76 13.24,19 16,19C16.84,19 17.63,18.81 18.36,18.46L20,19.5L19.5,17.97C20.48,17.12 21,15.62 21,14C21,11.24 18.76,9 16,9M14.5,11.5A1,1 0 0,1 15.5,12.5A1,1 0 0,1 14.5,13.5A1,1 0 0,1 13.5,12.5A1,1 0 0,1 14.5,11.5M17.5,11.5A1,1 0 0,1 18.5,12.5A1,1 0 0,1 17.5,13.5A1,1 0 0,1 16.5,12.5A1,1 0 0,1 17.5,11.5Z" />
              </svg>
              <span>{isChinese ? "微信账号：" : "WeChat: "}1664508573</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};