export interface Student {
  id: number;
  name: string;
  image: string;
  grade: 1 | 2 | 3;
}

export type LearningMode = 'grade1' | 'grade2' | 'grade3' | 'study1' | 'study2' | 'study3';

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
    grade3: boolean;
  };
  highScores: {
    grade1: number;
    grade2: number;
    grade3: number;
  };
}

export interface LeaderboardEntry {
  teacherName: string;
  score: number;
  date: string;
  grade: 1 | 2 | 3;
}

export interface Leaderboard {
  grade1: LeaderboardEntry[];
  grade2: LeaderboardEntry[];
  grade3: LeaderboardEntry[];
} 