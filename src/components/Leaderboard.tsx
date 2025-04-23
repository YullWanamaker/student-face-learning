'use client';

import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '@/types/student';

const ALLOWED_TEACHERS = [
  '원동현', '강윤용', '김도일', '김의성', '김하은',
  '김하정', '문예찬', '박윤재', '신서영', '이성훈',
  '이안나', '이예린', '이종섭', '이현정', '장대근',
  '전기홍', '전용천', '최유나', '한효진', '함미정',
  '홍효주', '조율'
];

interface LeaderboardProps {
  grade: 1 | 2 | 3;
  onStartQuiz: () => void;
}

const MEDAL_EMOJIS = ['🥇', '🥈', '🥉'];

export default function Leaderboard({ grade, onStartQuiz }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [teacherName, setTeacherName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string>('');

  useEffect(() => {
    fetchLeaderboard();
  }, [grade]);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/leaderboard?grade=${grade}`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      const data = await response.json();
      setEntries(data || []);
    } catch (err) {
      setError('리더보드를 불러오는데 실패했습니다.');
      console.error('Error fetching leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = () => {
    const trimmedName = teacherName.trim();
    setNameError('');

    if (!trimmedName) {
      setNameError('선생님 이름을 입력해주세요.');
      return;
    }

    if (!ALLOWED_TEACHERS.includes(trimmedName)) {
      setNameError('등록되지 않은 선생님 이름입니다.');
      return;
    }

    const isDuplicate = entries.some(
      entry => entry.teacherName.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      const confirmReplace = window.confirm(
        '이미 등록된 이름입니다. 같은 이름으로 계속 진행하시겠습니까?\n(기존 점수는 새로운 점수로 대체됩니다)'
      );
      if (!confirmReplace) return;
    }

    localStorage.setItem('currentTeacher', trimmedName);
    onStartQuiz();
  };

  if (isLoading) {
    return <div className="text-center py-8 text-black font-medium">리더보드를 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        {error}
        <button
          onClick={fetchLeaderboard}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-black">{grade}학년 이름 암기 명예의 전당</h2>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={teacherName}
            onChange={(e) => {
              setTeacherName(e.target.value);
              setNameError('');
            }}
            placeholder="선생님 이름을 입력하세요"
            className={`w-full p-3 border rounded-lg mb-2 text-black placeholder-gray-500 ${
              nameError ? 'border-red-500' : 'border-gray-300'
            }`}
            list="teacherNames"
          />
          <datalist id="teacherNames">
            {ALLOWED_TEACHERS.map((name) => (
              <option key={name} value={name} />
            ))}
          </datalist>
          {nameError && (
            <p className="text-red-500 text-sm mb-2">{nameError}</p>
          )}
        </div>
        <button
          onClick={handleStartQuiz}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-semibold"
        >
          시험 시작하기
        </button>
      </div>

      <div className="space-y-4">
        {entries.length > 0 ? (
          entries.slice(0, 10).map((entry, index) => (
            <div
              key={`${entry.teacherName}-${entry.date}`}
              className={`p-4 rounded-lg ${
                index < 3 ? 'bg-yellow-50' : 'bg-white'
              } shadow`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg text-black">
                    {index < 3 ? MEDAL_EMOJIS[index] : `${index + 1}.`}
                  </span>
                  <span className="font-semibold text-black">{entry.teacherName}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`font-bold text-lg ${
                    index === 0 ? 'text-yellow-600' :
                    index === 1 ? 'text-gray-600' :
                    index === 2 ? 'text-orange-600' :
                    'text-blue-600'
                  }`}>
                    {entry.score}점
                  </span>
                  <span className="text-sm text-gray-900">{entry.date}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-900 py-8 font-medium">
            아직 기록이 없습니다. 첫 번째 도전자가 되어보세요!
          </div>
        )}
      </div>
    </div>
  );
} 