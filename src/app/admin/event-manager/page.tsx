'use client';

import { useState } from 'react';

export default function EventManagerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // 处理活动迁移
  const handleMigrateEvents = async () => {
    if (isLoading) return;
    
    setIsLoading(true);
    setMessage('');
    setError('');
    
    try {
      const response = await fetch('/api/migrate-events');
      const data = await response.json();
      
      if (data.success) {
        setMessage(data.message);
      } else {
        setError(data.message || 'Unknown error occurred');
      }
    } catch (err) {
      setError('Failed to migrate events: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">活动管理控制台</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-4">过期活动迁移</h2>
          <p className="text-gray-300 mb-6">
            点击下面的按钮将过期活动从当前活动列表迁移到历史活动列表。
            只有已过期的活动会被迁移，活动海报和基本信息将被保留用于历史记录。
          </p>
          
          <button
            onClick={handleMigrateEvents}
            disabled={isLoading}
            className={`px-6 py-3 rounded-md font-medium ${
              isLoading
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-gold-500 text-gray-900 hover:bg-gold-600'
            } transition-colors duration-300`}
          >
            {isLoading ? '迁移中...' : '迁移过期活动'}
          </button>
          
          {message && (
            <div className="mt-4 p-4 bg-green-800 bg-opacity-30 border border-green-600 text-green-400 rounded-md">
              {message}
            </div>
          )}
          
          {error && (
            <div className="mt-4 p-4 bg-red-800 bg-opacity-30 border border-red-600 text-red-400 rounded-md">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
