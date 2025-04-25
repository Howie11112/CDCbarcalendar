import { EventDataManager } from '@/utils/eventDataManager';

async function main() {
  console.log('开始迁移过期活动...');

  try {
    const eventManager = new EventDataManager();
    eventManager.moveExpiredEvents();
    console.log('过期活动迁移完成');
  } catch (error) {
    console.error('迁移过程中出错:', error);
  }
}

main();
