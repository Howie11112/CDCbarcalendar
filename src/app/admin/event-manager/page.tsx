'use client';

import { useState, useEffect } from 'react';

export default function EventManagerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [eventsData, setEventsData] = useState(null);
  const [historyData, setHistoryData] = useState(null);

  // 获取当前事件和历史事件数据用于显示
  useEffect(() => {
    async function fetchData() {
      try {
        const eventsResponse = await fetch('/api/events');
        const historyResponse = await fetch('/api/history-events');
        
        if (eventsResponse.ok && historyResponse.ok) {
          const eventsData = await eventsResponse.json();
          const historyData = await historyResponse.json();
          setEventsData(eventsData);
          setHistoryData(historyData);
        }
      } catch (err) {
        console.error('获取数据失败:', err);
      }
    }
    
    fetchData();
  }, [message]); // 当有成功消息时重新获取数据

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
        setError(data.message || '发生未知错误');
      }
    } catch (err) {
      setError('迁移活动失败: ' + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">活动管理控制台</h1>
        
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-8">
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

        {/* 显示当前活动和历史活动数据 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 当前活动 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">当前活动</h3>
            {eventsData ? (
              <pre className="text-gray-300 overflow-auto max-h-96 text-sm">
                {JSON.stringify(eventsData, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-400">加载中...</p>
            )}
          </div>
          
          {/* 历史活动 */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-4">历史活动</h3>
            {historyData ? (
              <pre className="text-gray-300 overflow-auto max-h-96 text-sm">
                {JSON.stringify(historyData, null, 2)}
              </pre>
            ) : (
              <p className="text-gray-400">加载中...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
