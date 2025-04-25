import fs from 'fs';
import path from 'path';
import { Event } from '@/types/event';
import { isEventPassed } from './dateUtils';

// 定义历史活动的接口，只保留ID和图片
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
      const data = fs.readFileSync(this.eventsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading events file:', error);
      return { events: [] };
    }
  }

  // 读取历史活动
  public readHistoryEvents(): { events: HistoryEvent[] } {
    try {
      const data = fs.readFileSync(this.historyEventsPath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading history events file:', error);
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

      // 转换过期活动为历史活动格式
      const newHistoryEvents = this.convertToHistoryEvents(expiredEvents);

      // 检查是否有需要迁移的活动
      if (newHistoryEvents.length === 0) {
        return;
      }

      // 合并历史活动数据，避免重复
      const mergedHistory = this.mergeHistoryEvents(historyData.events, newHistoryEvents);

      // 更新文件
      fs.writeFileSync(
        this.eventsPath,
        JSON.stringify({ events: activeEvents }, null, 4),
        'utf-8'
      );

      fs.writeFileSync(
        this.historyEventsPath,
        JSON.stringify({ events: mergedHistory }, null, 4),
        'utf-8'
      );

      console.log(`Moved ${newHistoryEvents.length} expired events to history`);
    } catch (error) {
      console.error('Error moving expired events:', error);
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
      console.error('Error preparing event migration:', error);
      throw error;
    }
  }

  // 分离过期和未过期活动
  private separateEvents(events: Event[]): { expiredEvents: Event[]; activeEvents: Event[] } {
    const expiredEvents: Event[] = [];
    const activeEvents: Event[] = [];

    events.forEach(event => {
      if (isEventPassed(event)) {
        expiredEvents.push(event);
      } else {
        activeEvents.push(event);
      }
    });

    return { expiredEvents, activeEvents };
  }

  // 转换为历史活动格式，只保留ID和图片
  private convertToHistoryEvents(events: Event[]): HistoryEvent[] {
    return events.map(event => ({
      id: event.id,
      image: event.image
    }));
  }

  // 合并历史活动，避免重复
  private mergeHistoryEvents(existingEvents: HistoryEvent[], newEvents: HistoryEvent[]): HistoryEvent[] {
    const existingIds = new Set(existingEvents.map(e => e.id));
    const uniqueNewEvents = newEvents.filter(e => !existingIds.has(e.id));
    
    return [...existingEvents, ...uniqueNewEvents];
  }
}
