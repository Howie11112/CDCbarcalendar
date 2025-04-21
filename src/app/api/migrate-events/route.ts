import { NextRequest, NextResponse } from 'next/server';
import { EventDataManager } from '@/utils/eventDataManager';

// API 路由处理程序，用于手动触发活动迁移
export async function GET(request: NextRequest) {
  try {
    // 创建活动数据管理器实例
    const eventManager = new EventDataManager();
    
    // 执行过期活动迁移
    eventManager.moveExpiredEvents();
    
    // 返回成功响应
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully migrated expired events to history' 
    });
  } catch (error) {
    console.error('Error migrating events:', error);
    
    // 返回错误响应
    return NextResponse.json({ 
      success: false, 
      message: 'Failed to migrate events', 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
