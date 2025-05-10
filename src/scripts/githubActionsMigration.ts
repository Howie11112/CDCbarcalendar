import { EventDataManager } from '@/utils/eventDataManager';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('GitHub Actions: 开始迁移过期活动...');
  console.log(`当前时间: ${new Date().toISOString()}`);
  console.log(`运行环境: ${process.env.NODE_ENV || 'development'}`);

  try {
    // 确保数据目录存在
    const dataDir = path.join(process.cwd(), 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      console.log(`数据目录不存在，创建目录: ${dataDir}`);
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const eventManager = new EventDataManager();
    
    // 读取当前活动数量
    const currentEvents = eventManager.readEvents();
    console.log(`当前活动数量: ${currentEvents.events.length}`);
    
    // 读取当前历史活动数量
    const historyEvents = eventManager.readHistoryEvents();
    console.log(`当前历史活动数量: ${historyEvents.events.length}`);
    
    // 执行迁移
    eventManager.moveExpiredEvents(); // 直接使用EventDataManager的moveExpiredEvents方法
    
    // 迁移后再次读取数据检查结果
    const afterEvents = eventManager.readEvents();
    const afterHistory = eventManager.readHistoryEvents();
    
    console.log(`迁移后的活动数量: ${afterEvents.events.length}`);
    console.log(`迁移后的历史活动数量: ${afterHistory.events.length}`);
    console.log(`新增历史活动: ${afterHistory.events.length - historyEvents.events.length}`);
    
    if (afterHistory.events.length === historyEvents.events.length) {
      console.log('没有新增历史活动');
    } else {
      const newCount = afterHistory.events.length - historyEvents.events.length;
      console.log(`过期活动迁移完成，文件已更新，新增了 ${newCount} 个历史活动`);
      
      // 打印新增活动的详细信息，便于调试
      const newActivities = afterHistory.events.slice(0, newCount);
      console.log('新增历史活动详情:');
      newActivities.forEach((activity, index) => {
        console.log(`  ${index + 1}. ID: ${activity.id}, 标题: ${activity.title?.en || '无标题'}`);
      });
    }
  } catch (error) {
    console.error('迁移过程中出错:', error);
    process.exit(1);
  }
}

main();
