import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const eventsPath = path.join(process.cwd(), 'src', 'data', 'events.json');
    const data = fs.readFileSync(eventsPath, 'utf-8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    console.error('Error reading events:', error);
    return NextResponse.json({ error: '无法读取活动数据' }, { status: 500 });
  }
}
