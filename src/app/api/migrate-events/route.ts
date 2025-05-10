import { NextRequest, NextResponse } from 'next/server';
import { EventDataManager } from '@/utils/eventDataManager';
import { isEventPassed } from '@/utils/dateUtils';

// 定义一个临时的测试日期处理函数
function setupTestDateEnvironment(testDate: string | null) {
  if (testDate) {
    // 保存原始函数
    const originalIsEventPassed = (global as any).originalIsEventPassed || isEventPassed;
    
    // 如果还没保存原始函数，则保存它
    if (!(global as any).originalIsEventPassed) {
      (global as any).originalIsEventPassed = isEventPassed;
    }
    
    // 替换为测试版本的函数
    (global as any).isEventPassed = (event: any) => {
      try {
        const testDateObj = new Date(testDate);
        testDateObj.setHours(0, 0, 0, 0);
      
        // 获取事件日期
        let eventDateStr = event.date.en;
        // 如果有日期范围，取结束日期
        if (eventDateStr.includes(' to ')) {
          eventDateStr = eventDateStr.split(' to ')[1].trim();
        }
        
        const eventDate = new Date(eventDateStr);
        eventDate.setHours(0, 0, 0, 0);
        
        return eventDate < testDateObj;
      } catch (error) {
        console.error('测试日期判断出错:', error);
        // 出错时回退到原始函数
        return originalIsEventPassed(event);
      }
    };
    
    console.log(`测试日期环境已设置: ${testDate}`);
  }
}

function restoreOriginalFunctions() {
  // 恢复原始函数
  if ((global as any).originalIsEventPassed) {
    (global as any).isEventPassed = (global as any).originalIsEventPassed;
    delete (global as any).originalIsEventPassed;
    console.log('已恢复原始日期判断函数');
  }
}

// API 路由处理程序，用于手动触发活动迁移
export async function GET(request: NextRequest) {
  try {
    console.log('开始执行活动迁移...');

    // 检查是否有测试日期参数
    const testDate = request.nextUrl.searchParams.get('testDate');
    if (testDate) {
      console.log(`使用测试日期: ${testDate}`);
      setupTestDateEnvironment(testDate);
    }
    
    // 创建活动数据管理器实例
    const eventManager = new EventDataManager();
    
    // 在Vercel环境中，我们无法直接修改文件系统，所以需要处理这种情况
    if (process.env.VERCEL) {
      console.log('检测到Vercel环境，返回模拟迁移结果');
      // 返回成功响应但提示这是在Vercel环境中
      return NextResponse.json({ 
        success: true, 
        message: '在Vercel环境中模拟迁移成功。实际迁移需要在本地环境或通过GitHub Actions执行。',
        isSimulated: true
      });
    }
    
    // 执行过期活动迁移
    eventManager.moveExpiredEvents();
    
    // 清理测试日期
    if (testDate) {
      restoreOriginalFunctions();
    }
    
    // 返回成功响应
    return NextResponse.json({ 
      success: true, 
      message: '成功迁移过期活动到历史记录' 
    });
  } catch (error) {
    console.error('迁移活动时出错:', error);
    
    // 确保恢复原始函数
    restoreOriginalFunctions();
    
    // 返回错误响应
    return NextResponse.json({ 
      success: false, 
      message: '迁移活动失败', 
      error: (error as Error).message 
    }, { status: 500 });
  }
}
