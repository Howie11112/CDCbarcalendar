import { EventDataManager } from '@/utils/eventDataManager';
import fs from 'fs';
import path from 'path';

async function main() {
  console.log('GitHub Actions: 开始迁移过期活动...');

  try {
    const eventManager = new EventDataManager();
    const { updatedEvents, updatedHistory, hasMigrated } = eventManager.prepareEventMigration();
    
    if (!hasMigrated) {
      console.log('没有需要迁移的活动');
      return;
    }
    
    // 文件路径
    const eventsPath = path.join(process.cwd(), 'src', 'data', 'events.json');
    const historyPath = path.join(process.cwd(), 'src', 'data', 'eventsHistory.json');
    
    // 写入更新后的文件
    fs.writeFileSync(
      eventsPath,
      JSON.stringify({ events: updatedEvents }, null, 4),
      'utf-8'
    );
    
    fs.writeFileSync(
      historyPath,
      JSON.stringify({ events: updatedHistory }, null, 4),
      'utf-8'
    );
    
    console.log('过期活动迁移完成，文件已更新');
  } catch (error) {
    console.error('迁移过程中出错:', error);
    process.exit(1);
  }
}

main();
