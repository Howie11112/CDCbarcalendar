// 用于处理日期相关的工具函数

/**
 * 判断一个活动是否已过期
 * @param eventDate 活动日期（格式可以是 "YYYY-MM-DD" 或 "YYYY.MM.DD" 或其他标准日期格式）
 * @returns 如果活动已过期返回 true，否则返回 false
 */
export function isEventExpired(eventDate: string): boolean {
  // 获取北京时间（UTC+8）的当前日期
  const now = new Date();
  // 转换为北京时间
  const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const today = new Date(beijingTime.toISOString().split('T')[0]);
  
  // 尝试按不同格式解析日期
  let date: Date | null = null;
  
  // 处理 "YYYY-MM-DD" 或 "YYYY.MM.DD" 格式
  if (eventDate.includes('-') || eventDate.includes('.')) {
    // 替换所有 . 为 -
    const normalizedDate = eventDate.replace(/\./g, '-');
    date = new Date(normalizedDate);
  } 
  // 处理中文日期格式，比如 "2025年4月13日"
  else if (eventDate.includes('年') && eventDate.includes('月') && eventDate.includes('日')) {
    const parts = eventDate.match(/(\d+)年(\d+)月(\d+)日/);
    if (parts && parts.length === 4) {
      date = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
    }
  }
  // 如果没有匹配到任何格式，尝试直接解析
  else {
    date = new Date(eventDate);
  }

  // 如果日期无效，返回 false
  if (!date || isNaN(date.getTime())) {
    console.warn(`无法解析日期: ${eventDate}`);
    return false;
  }

  // 重置时间部分，仅比较日期
  date.setHours(0, 0, 0, 0);

  // 如果活动日期小于今天，则活动已过期
  return date < today;
}

/**
 * 从中英文日期字段中获取日期对象
 * @param dateField 包含中英文日期的对象
 * @returns 解析后的日期对象，如果无法解析则返回 null
 */
export function getDateFromField(dateField: { en: string; zh: string }): Date | null {
  // 尝试先解析英文日期，再尝试中文日期
  let endDate: Date | null = null;
  
  // 1. 尝试从英文日期解析
  try {
    // 检查是否包含日期范围（如 "April 11-12, 2025"）
    if (dateField.en.includes('-')) {
      const rangeMatch = dateField.en.match(/([A-Za-z]+)\s+(\d+)-(\d+),\s+(\d+)/);
      if (rangeMatch && rangeMatch.length >= 5) {
        const [_, month, startDay, endDay, year] = rangeMatch;
        if (month && startDay && endDay && year) {
          // 我们使用范围的结束日期来判断活动是否已过期
          const monthIndex = getMonthIndex(month);
          if (monthIndex !== -1) {
            endDate = new Date(parseInt(year), monthIndex, parseInt(endDay));
            if (!isNaN(endDate.getTime())) {
              return endDate;
            }
          }
        }
      }
    }
    
    // 如果不是范围格式，尝试直接解析
    const date = new Date(dateField.en);
    if (!isNaN(date.getTime())) {
      return date;
    }
  } catch (error) {
    console.warn("无法解析英文日期:", dateField.en);
  }

  // 2. 尝试从中文日期解析
  try {
    // 检查是否包含日期范围（如 "2025年4月11-12日" 或 "2025年4月11,12日"）
    if (dateField.zh.includes('-') || dateField.zh.includes(',')) {
      let endDay = '';
      let year = '';
      let month = '';
      
      // 处理如 "2025年4月11-12日" 的情况
      if (dateField.zh.includes('-')) {
        const rangeMatch = dateField.zh.match(/(\d+)年(\d+)月(\d+)-(\d+)日/);
        if (rangeMatch && rangeMatch.length >= 5) {
          year = rangeMatch[1];
          month = rangeMatch[2];
          endDay = rangeMatch[4]; // 取结束日期
        }
      } 
      // 处理如 "2025年4月11,12日" 的情况
      else if (dateField.zh.includes(',')) {
        const rangeMatch = dateField.zh.match(/(\d+)年(\d+)月([\d,]+)日/);
        if (rangeMatch && rangeMatch.length >= 4) {
          year = rangeMatch[1];
          month = rangeMatch[2];
          // 提取最后一个日期（结束日期）
          endDay = rangeMatch[3].split(',').pop()?.trim() || '';
        }
      }
      
      if (year && month && endDay) {
        endDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(endDay));
        if (!isNaN(endDate.getTime())) {
          return endDate;
        }
      }
    }
    
    // 如果不是范围格式，尝试常规解析
    const parts = dateField.zh.match(/(\d+)年(\d+)月(\d+)日/);
    if (parts && parts.length === 4) {
      const date = new Date(Number(parts[1]), Number(parts[2]) - 1, Number(parts[3]));
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
  } catch (error) {
    console.warn("无法解析中文日期:", dateField.zh);
  }

  return null;
}

/**
 * 获取月份英文名称对应的索引（0-11）
 */
function getMonthIndex(monthName: string): number {
  const months = [
    'january', 'february', 'march', 'april',
    'may', 'june', 'july', 'august',
    'september', 'october', 'november', 'december'
  ];
  return months.findIndex(m => m.toLowerCase() === monthName.toLowerCase());
}

/**
 * 判断一个事件是否已过期
 * @param event 事件对象，包含 date 字段
 * @returns 如果事件已过期返回 true，否则返回 false
 */
export function isEventPassed(event: { date: { en: string; zh: string } }): boolean {
  // 获取北京时间（UTC+8）的当前日期
  const now = new Date();
  const beijingTime = new Date(now.getTime() + 8 * 60 * 60 * 1000);
  const today = new Date(beijingTime.toISOString().split('T')[0]);
  today.setHours(0, 0, 0, 0);

  // 获取事件日期（使用结束日期来判断是否过期）
  const eventDate = getDateFromField(event.date);
  if (!eventDate) {
    return false; // 如果无法解析日期，默认不过期
  }

  // 重置时间部分，仅比较日期
  eventDate.setHours(0, 0, 0, 0);

  // 活动需要已经过了结束日期才算过期（也就是当天的活动不算过期）
  // 使用 < 而不是 <= 确保当天的活动仍然显示在主页上
  return eventDate < today;
}

/**
 * 判断一个事件是否应该显示在主页（即将到来或正在进行的活动）
 * @param event 事件对象，包含 date 字段
 * @returns 如果事件应该显示在主页返回 true，否则返回 false
 */
export function isEventUpcoming(event: { date: { en: string; zh: string } }): boolean {
  // 直接返回事件未过期的判断结果
  return !isEventPassed(event);
}
