import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { LeaderboardEntry } from '@/types/student';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const grade = parseInt(searchParams.get('grade') || '1');

  try {
    // Vercel KV 대신 localStorage를 사용하도록 수정
    if (process.env.NODE_ENV === 'development') {
      const entries = JSON.parse(localStorage.getItem(`leaderboard:grade${grade}`) || '[]');
      return NextResponse.json(entries);
    } else {
      const entries = await kv.get<LeaderboardEntry[]>(`leaderboard:grade${grade}`) || [];
      return NextResponse.json(entries);
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { grade, entry } = await request.json();

    if (process.env.NODE_ENV === 'development') {
      const entries = JSON.parse(localStorage.getItem(`leaderboard:grade${grade}`) || '[]');
      entries.push(entry);
      localStorage.setItem(`leaderboard:grade${grade}`, JSON.stringify(entries));
      return NextResponse.json({ success: true });
    } else {
      const entries = await kv.get<LeaderboardEntry[]>(`leaderboard:grade${grade}`) || [];
      entries.push(entry);
      await kv.set(`leaderboard:grade${grade}`, entries);
      return NextResponse.json({ success: true });
    }
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json({ error: 'Failed to update leaderboard' }, { status: 500 });
  }
} 