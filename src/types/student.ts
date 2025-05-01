export interface Student {
  id: number;
  name: string;
  image: string;
  grade: 1 | 2 | 3;
}

export type LearningMode = 'grade1' | 'grade2' | 'study1' | 'study2';

export interface Badge {
  id: string;
  name: string;
  description: string;
  image: string;
  achieved: boolean;
}

export interface UserProgress {
  badges: {
    grade1: boolean;
    grade2: boolean;
  };
  highScores: {
    grade1: number;
    grade2: number;
  };
}

export interface LeaderboardEntry {
  teacherName: string;
  score: number;
  date: string;
  grade: number;
}

export interface Leaderboard {
  grade1: LeaderboardEntry[];
  grade2: LeaderboardEntry[];
} 