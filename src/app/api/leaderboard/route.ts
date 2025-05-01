import { NextResponse } from 'next/server';
import { LeaderboardEntry } from '@/types/student';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const grade = parseInt(searchParams.get('grade') || '1');

  try {
    const entries = JSON.parse(localStorage.getItem(`leaderboard:grade${grade}`) || '[]');
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { grade, entry } = await request.json();
    const entries = JSON.parse(localStorage.getItem(`leaderboard:grade${grade}`) || '[]');
    entries.push(entry);
    localStorage.setItem(`leaderboard:grade${grade}`, JSON.stringify(entries));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating leaderboard:', error);
    return NextResponse.json({ error: 'Failed to update leaderboard' }, { status: 500 });
  }
} 