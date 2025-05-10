const fs = require('fs');
const path = require('path');

/**
 * 该脚本在Vercel构建时运行
 * 用于确保历史活动数据在构建时可用
 */
async function main() {
  console.log('Vercel构建: 准备历史活动数据...');

  try {
    const dataDir = path.join(process.cwd(), 'src', 'data');
    
    // 确保数据目录存在
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    // 检查eventsHistory.json是否存在
    const historyPath = path.join(dataDir, 'eventsHistory.json');
    
    if (!fs.existsSync(historyPath)) {
      console.log('历史活动文件不存在，创建空文件');
      fs.writeFileSync(historyPath, JSON.stringify({ events: [] }, null, 2), 'utf-8');
    }
    
    console.log('准备完成');
  } catch (error) {
    console.error('准备数据时出错:', error);
  }
}

main();
