import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { LeaderboardEntry } from '@/types/student';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const grade = searchParams.get('grade');
  
  if (!grade) {
    return NextResponse.json({ error: 'Grade is required' }, { status: 400 });
  }

  try {
    const entries = await kv.get<LeaderboardEntry[]>(`leaderboard:grade${grade}`) || [];
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { grade, entry } = await request.json();
    
    if (!grade || !entry) {
      return NextResponse.json({ error: 'Grade and entry are required' }, { status: 400 });
    }

    const key = `leaderboard:grade${grade}`;
    const entries = await kv.get<LeaderboardEntry[]>(key) || [];
    
    // 같은 선생님의 기존 점수를 찾습니다
    const existingIndex = entries.findIndex(
      e => e.teacherName.toLowerCase() === entry.teacherName.toLowerCase()
    );

    if (existingIndex !== -1) {
      // 기존 점수가 있다면 업데이트
      entries[existingIndex] = entry;
    } else {
      // 새로운 점수 추가
      entries.push(entry);
    }

    // 점수와 날짜로 정렬
    const sortedEntries = entries.sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // 상위 10개만 저장
    const topEntries = sortedEntries.slice(0, 10);
    
    await kv.set(key, topEntries);
    return NextResponse.json(topEntries);
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json({ error: 'Failed to update leaderboard' }, { status: 500 });
  }
} 