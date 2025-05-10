'use client';

import { useState, useEffect } from 'react';
import { isEventPassed } from '@/utils/dateUtils';

interface TestDateOptions {
  enabled: boolean;
  date: string;
}

export default function EventManagerPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [eventsData, setEventsData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [testDateOptions, setTestDateOptions] = useState<TestDateOptions>({ 
    enabled: false, 
    date: new Date().toISOString().split('T')[0]
  });
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // 简单的身份验证
  const authenticate = () => {
    // 这只是一个简单的示例，实际应用中应该使用更安全的方法
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD || password === 'cdc-admin') {
      setIsAuthenticated(true);
    } else {
      setError('密码错误');
    }
  };

  // 获取当前事件和历史事件数据用于显示
  useEffect(() => {
    if (!isAuthenticated) return;
    
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
  }, [message, isAuthenticated]); 

  // 处理活动迁移
  const handleMigrateEvents = async () => {
    if (isLoading || !isAuthenticated) return;
    
    setIsLoading(true);
    setMessage('');
    setError('');
    
    try {
      // 如果启用了测试日期，则传递测试日期参数
      let url = '/api/migrate-events';
      if (testDateOptions.enabled && testDateOptions.date) {
        url += `?testDate=${encodeURIComponent(testDateOptions.date)}`;
      }
      
      const response = await fetch(url);
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

  // 添加一个测试活动的功能
  const testEventExpiry = () => {
    if (!eventsData || !eventsData.events || !isAuthenticated) return;
    
    setMessage('');
    setError('');
    
    try {
      const expiredEvents = [];
      const activeEvents = [];
      
      // 测试每个活动是否已过期
      for (const event of eventsData.events) {
        console.log(`测试活动: ${event.title.en}`);
        
        // 根据是否启用测试日期来判断过期
        const isPassed = testDateOptions.enabled 
          ? isEventPassedWithTestDate(event, testDateOptions.date)
          : isEventPassed(event);
          
        console.log(`活动 ${event.title.en} 是否过期: ${isPassed}`);
        
        if (isPassed) {
          expiredEvents.push(event);
        } else {
          activeEvents.push(event);
        }
      }
      
      setMessage(`已过期活动: ${expiredEvents.length}个，未过期活动: ${activeEvents.length}个`);
    } catch (err) {
      setError('测试活动过期失败: ' + (err as Error).message);
    }
  };
  
  // 使用指定日期测试活动是否过期
  const isEventPassedWithTestDate = (event: any, testDateStr: string) => {
    try {
      const testDate = new Date(testDateStr);
      testDate.setHours(0, 0, 0, 0);
      
      // 获取事件结束日期
      const eventDate = new Date(event.date.en.includes(' to ') 
        ? event.date.en.split(' to ')[1].trim()
        : event.date.en
      );
      eventDate.setHours(0, 0, 0, 0);
      
      return eventDate < testDate;
    } catch (error) {
      console.error('测试日期过期判断失败:', error);
      return false;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-white mb-6">管理员登录</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                管理员密码
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-gold-500 focus:border-gold-500"
              />
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-800 bg-opacity-30 border border-red-600 text-red-400 rounded-md">
                {error}
              </div>
            )}
            
            <button
              onClick={authenticate}
              className="w-full px-4 py-2 bg-gold-500 text-gray-900 rounded-md hover:bg-gold-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gold-500"
            >
              登录
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          
          <div className="mb-6 bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="enable-test-date"
                checked={testDateOptions.enabled}
                onChange={(e) => setTestDateOptions({
                  ...testDateOptions,
                  enabled: e.target.checked
                })}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="enable-test-date" className="text-white">
                启用测试日期（用于模拟特定日期的过期状态）
              </label>
            </div>
            
            {testDateOptions.enabled && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  测试日期
                </label>
                <input
                  type="date"
                  value={testDateOptions.date}
                  onChange={(e) => setTestDateOptions({
                    ...testDateOptions,
                    date: e.target.value
                  })}
                  className="w-full max-w-xs px-4 py-2 bg-gray-600 border border-gray-500 rounded-md text-white focus:ring-gold-500 focus:border-gold-500"
                />
                <p className="text-gray-400 text-sm mt-1">
                  如果活动日期早于此日期，将被视为已过期
                </p>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap gap-4">
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
            
            <button
              onClick={testEventExpiry}
              className="px-6 py-3 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-300"
            >
              测试活动过期状态
            </button>
          </div>
          
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
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
