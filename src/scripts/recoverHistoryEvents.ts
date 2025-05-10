import fs from 'fs';
import path from 'path';
import { HistoryEvent } from '@/types/historyEvent';
import { EventDataManager } from '@/utils/eventDataManager';

/**
 * 该脚本用于手动将活动添加到历史记录中
 * 对于在实施迁移机制前已过期且未记录的活动很有用
 */
async function main() {
  console.log('开始手动恢复历史活动...');

  try {
    // 创建活动数据管理器
    const eventManager = new EventDataManager();
    
    // 读取历史活动
    const historyData = eventManager.readHistoryEvents();
    console.log(`当前历史活动数量: ${historyData.events.length}`);
    
    // 需要手动添加到历史记录的活动，已简化为仅包含ID和图片
    const missingEvents: HistoryEvent[] = [
      {
        id: "11",
        image: "/images/4_11.jpg"
      },
      {
        id: "12",
        image: "/images/4_12.jpg"
      },
      {
        id: "13",
        image: "/images/4_13.jpg"
      },
      {
        id: "15",
        image: "/images/4_18.jpg"
      },
      {
        id: "14",
        image: "/images/4_19.jpg"
      },
      {
        id: "16",
        image: "/images/4_23.jpg"
      }
    ];
    
    console.log(`准备添加 ${missingEvents.length} 个缺失的历史活动`);
    
    // 检查是否有重复图片的活动
    const imageMap = new Map<string, boolean>();
    historyData.events.forEach(event => {
      imageMap.set(event.image, true);
    });
    
    // 过滤掉已有相同图片的活动
    const uniqueEvents = missingEvents.filter(event => !imageMap.has(event.image));
    
    if (uniqueEvents.length === 0) {
      console.log('没有新的活动需要添加，所有图片都已存在于历史记录中');
      return;
    }
    
    console.log(`过滤后需要添加 ${uniqueEvents.length} 个唯一的历史活动`);
    
    // 合并到现有历史记录，按照ID顺序排序
    const mergedHistory = [...historyData.events, ...uniqueEvents].sort((a, b) => {
      // 尝试从ID中提取数字部分进行比较
      const idA = parseInt(a.id.replace(/\D/g, '')) || 0;
      const idB = parseInt(b.id.replace(/\D/g, '')) || 0;
      return idA - idB; // 升序排列，从早到晚
    });
    
    // 写入文件
    const historyEventsPath = path.join(process.cwd(), 'src', 'data', 'eventsHistory.json');
    fs.writeFileSync(
      historyEventsPath,
      JSON.stringify({ events: mergedHistory }, null, 2),
      'utf-8'
    );
    
    console.log(`已成功添加 ${uniqueEvents.length} 个活动到历史记录`);
    console.log(`更新后的历史活动总数: ${mergedHistory.length}`);
  } catch (error) {
    console.error('恢复历史活动时出错:', error);
  }
}

main();
