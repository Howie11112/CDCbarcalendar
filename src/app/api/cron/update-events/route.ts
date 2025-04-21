import { NextResponse } from 'next/server';
import { EventDataManager } from '@/utils/eventDataManager';

// 用于定时任务的API路由，可以设置成每天自动执行一次
export async function GET() {
  try {
    console.log('Running automated event migration task');
    
    const eventManager = new EventDataManager();
    eventManager.moveExpiredEvents();
    
    return NextResponse.json({
      success: true,
      message: 'Event migration completed successfully'
    });
  } catch (error) {
    console.error('Automated event migration failed:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Event migration failed',
      error: (error as Error).message
    }, { status: 500 });
  }
}
