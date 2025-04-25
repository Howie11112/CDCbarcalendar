import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const historyPath = path.join(process.cwd(), 'src', 'data', 'eventsHistory.json');
    const data = fs.readFileSync(historyPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading history events:', error);
    return NextResponse.json({ error: '无法读取历史活动数据' }, { status: 500 });
  }
}
