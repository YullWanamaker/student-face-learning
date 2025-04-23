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
    const leaderboard = await kv.get<LeaderboardEntry[]>(`leaderboard_${grade}`);
    return NextResponse.json(leaderboard || []);
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

    const key = `leaderboard_${grade}`;
    const currentLeaderboard = await kv.get<LeaderboardEntry[]>(key) || [];
    
    // 같은 이름의 최신 점수만 유지
    const filteredLeaderboard = currentLeaderboard.filter(
      item => item.teacherName.toLowerCase() !== entry.teacherName.toLowerCase()
    );
    
    const newLeaderboard = [...filteredLeaderboard, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 100); // 상위 100개 기록만 유지

    await kv.set(key, newLeaderboard);
    
    return NextResponse.json(newLeaderboard);
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json({ error: 'Failed to update leaderboard' }, { status: 500 });
  }
} 