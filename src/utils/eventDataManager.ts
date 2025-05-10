import fs from 'fs';
import path from 'path';
import { Event } from '@/types/event';
import { isEventPassed } from './dateUtils';

// 修改历史活动接口定义，只保留ID和图片
export interface HistoryEvent {
  id: string;
  image: string;
}

// 活动数据管理器
export class EventDataManager {
  private eventsPath: string;
  private historyEventsPath: string;

  constructor() {
    this.eventsPath = path.join(process.cwd(), 'src', 'data', 'events.json');
    this.historyEventsPath = path.join(process.cwd(), 'src', 'data', 'eventsHistory.json');
  }

  // 读取当前活动
  public readEvents(): { events: Event[] } {
    try {
      if (!fs.existsSync(this.eventsPath)) {
        console.warn(`活动文件不存在: ${this.eventsPath}`);
        return { events: [] };
      }
      const data = fs.readFileSync(this.eventsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('读取活动文件出错:', error);
      return { events: [] };
    }
  }

  // 读取历史活动
  public readHistoryEvents(): { events: HistoryEvent[] } {
    try {
      if (!fs.existsSync(this.historyEventsPath)) {
        console.warn(`历史活动文件不存在: ${this.historyEventsPath}`);
        return { events: [] };
      }
      const data = fs.readFileSync(this.historyEventsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('读取历史活动文件出错:', error);
      return { events: [] };
    }
  }

  // 将过期活动移动到历史记录
  public moveExpiredEvents(): void {
    // 只在服务器端运行这个函数
    if (typeof window !== 'undefined') {
      return;
    }

    try {
      // 读取当前活动
      const eventsData = this.readEvents();
      // 读取历史活动
      const historyData = this.readHistoryEvents();

      // 分离过期和未过期活动
      const { expiredEvents, activeEvents } = this.separateEvents(eventsData.events);

      console.log(`总活动数: ${eventsData.events.length}, 过期活动数: ${expiredEvents.length}, 有效活动数: ${activeEvents.length}`);

      // 转换过期活动为历史活动格式
      const newHistoryEvents = this.convertToHistoryEvents(expiredEvents);

      // 检查是否有需要迁移的活动
      if (newHistoryEvents.length === 0) {
        console.log('没有需要迁移的过期活动');
        return;
      }

      // 合并历史活动数据，避免重复
      const mergedHistory = this.mergeHistoryEvents(historyData.events, newHistoryEvents);

      // 确保目录存在
      const eventsDir = path.dirname(this.eventsPath);
      if (!fs.existsSync(eventsDir)) {
        fs.mkdirSync(eventsDir, { recursive: true });
      }

      // 更新文件
      fs.writeFileSync(
        this.eventsPath,
        JSON.stringify({ events: activeEvents }, null, 2),
        'utf-8'
      );

      fs.writeFileSync(
        this.historyEventsPath,
        JSON.stringify({ events: mergedHistory }, null, 2),
        'utf-8'
      );

      console.log(`已将 ${newHistoryEvents.length} 个过期活动移至历史记录`);
    } catch (error) {
      console.error('移动过期活动时出错:', error);
    }
  }

  // 准备迁移数据（不直接写入文件系统，适用于GitHub Actions）
  public prepareEventMigration(): {
    updatedEvents: Event[];
    updatedHistory: HistoryEvent[];
    hasMigrated: boolean;
  } {
    try {
      // 读取当前活动
      const eventsData = this.readEvents();
      // 读取历史活动
      const historyData = this.readHistoryEvents();

      // 分离过期和未过期活动
      const { expiredEvents, activeEvents } = this.separateEvents(eventsData.events);

      // 转换过期活动为历史活动格式
      const newHistoryEvents = this.convertToHistoryEvents(expiredEvents);

      // 检查是否有需要迁移的活动
      const hasMigrated = newHistoryEvents.length > 0;
      
      // 如果没有需要迁移的活动，直接返回原始数据
      if (!hasMigrated) {
        return {
          updatedEvents: eventsData.events,
          updatedHistory: historyData.events,
          hasMigrated: false
        };
      }

      // 合并历史活动数据，避免重复
      const mergedHistory = this.mergeHistoryEvents(historyData.events, newHistoryEvents);

      return {
        updatedEvents: activeEvents,
        updatedHistory: mergedHistory,
        hasMigrated: true
      };
    } catch (error) {
      console.error('准备活动迁移时出错:', error);
      throw error;
    }
  }

  // 分离过期和未过期活动
  private separateEvents(events: Event[]): { expiredEvents: Event[]; activeEvents: Event[] } {
    const expiredEvents: Event[] = [];
    const activeEvents: Event[] = [];

    events.forEach(event => {
      // 尝试解析日期并判断活动是否已过期
      const isPassed = isEventPassed(event);
      console.log(`活动 ${event.id} (${event.title.en}) 是否已过期: ${isPassed}`);
      
      if (isPassed) {
        expiredEvents.push(event);
      } else {
        activeEvents.push(event);
      }
    });

    return { expiredEvents, activeEvents };
  }

  // 转换为历史活动格式
  private convertToHistoryEvents(events: Event[]): HistoryEvent[] {
    return events.map(event => ({
      id: event.id,
      image: event.image
      // 移除timestamp和title字段
    }));
  }

  // 合并历史活动，避免重复
  private mergeHistoryEvents(existingEvents: HistoryEvent[], newEvents: HistoryEvent[]): HistoryEvent[] {
    // 使用Map来检查重复项，优先使用图片路径作为识别依据，其次使用ID
    const existingMap = new Map<string, HistoryEvent>();
    const imageMap = new Map<string, boolean>();
    
    existingEvents.forEach(e => {
      existingMap.set(e.id, e);
      if (e.image) {
        imageMap.set(e.image, true);
      }
    });
    
    // 过滤重复项
    const uniqueNewEvents: HistoryEvent[] = [];
    
    newEvents.forEach(e => {
      if (!existingMap.has(e.id) && !imageMap.has(e.image)) {
        // 全新的活动，直接添加
        uniqueNewEvents.push(e);
      } else if (!imageMap.has(e.image)) {
        // ID重复但图片不同，使用新ID
        const newId = `${e.id}-${Date.now().toString().slice(-4)}`;
        console.log(`ID冲突，为活动生成新ID: ${e.id} → ${newId}`);
        uniqueNewEvents.push({
          ...e,
          id: newId
        });
      } else {
        // 图片重复，跳过此活动
        console.log(`跳过重复图片的活动: ${e.image}`);
      }
      
      // 更新图片映射以避免后续重复
      if (e.image) {
        imageMap.set(e.image, true);
      }
    });
    
    console.log(`历史活动去重: ${newEvents.length} 个新活动中有 ${uniqueNewEvents.length} 个是唯一的`);
    
    // 合并并按照ID排序（假设ID是按时间顺序分配的，较小的ID表示较早的活动）
    return [...existingEvents, ...uniqueNewEvents].sort((a, b) => {
      // 尝试从ID中提取数字部分进行比较
      const idA = parseInt(a.id.replace(/\D/g, '')) || 0;
      const idB = parseInt(b.id.replace(/\D/g, '')) || 0;
      return idA - idB; // 升序排列，从早到晚
    });
  }
}
