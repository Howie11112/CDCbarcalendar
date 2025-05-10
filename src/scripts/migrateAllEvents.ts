import { EventDataManager } from '@/utils/eventDataManager';
import { isEventPassed } from '@/utils/dateUtils';
import fs from 'fs';
import path from 'path';

/**
 * 该脚本用于强制将所有活动迁移到历史记录中
 * 适用于测试或初始化历史活动记录
 */
async function main() {
  console.log('开始强制迁移所有活动到历史记录...');

  try {
    // 检查是否在Vercel环境中运行
    if (process.env.VERCEL) {
      console.error('此脚本不能在Vercel环境中运行，请在本地环境或通过GitHub Actions运行');
      return;
    }
    
    // 保存原始函数
    const originalIsEventPassed = isEventPassed;
    
    // 替换为始终返回true的函数（所有活动都被视为已过期）
    (global as any).isEventPassed = () => true;
    
    // 创建活动数据管理器
    const eventManager = new EventDataManager();
    
    // 读取当前活动
    const eventsData = eventManager.readEvents();
    console.log(`当前活动数量: ${eventsData.events.length}`);
    
    // 读取历史活动
    const historyData = eventManager.readHistoryEvents();
    console.log(`当前历史活动数量: ${historyData.events.length}`);
    
    if (eventsData.events.length === 0) {
      console.log('当前没有活动可迁移，请检查events.json文件是否为空');
      return;
    }
    
    // 执行迁移
    eventManager.moveExpiredEvents();
    
    // 迁移后再次读取数据检查结果
    const afterEvents = eventManager.readEvents();
    const afterHistory = eventManager.readHistoryEvents();
    
    console.log(`迁移后的活动数量: ${afterEvents.events.length}`);
    console.log(`迁移后的历史活动数量: ${afterHistory.events.length}`);
    console.log(`新增历史活动: ${afterHistory.events.length - historyData.events.length}`);
    
    // 如果有活动被迁移，显示它们的详细信息
    if (afterHistory.events.length > historyData.events.length) {
      const newActivities = afterHistory.events.slice(0, afterHistory.events.length - historyData.events.length);
      console.log('新增历史活动详情:');
      newActivities.forEach((activity, index) => {
        console.log(`  ${index + 1}. ID: ${activity.id}, 标题: ${activity.title?.en || '无标题'}, 图片: ${activity.image}`);
      });
    }
    
    // 恢复原始函数
    (global as any).isEventPassed = originalIsEventPassed;
    
    console.log('所有活动迁移完成');
  } catch (error) {
    console.error('迁移过程中出错:', error);
  }
}

main();
