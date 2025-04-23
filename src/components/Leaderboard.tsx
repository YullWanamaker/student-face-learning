import { useState } from 'react';
import { Leaderboard as LeaderboardType, LeaderboardEntry } from '@/types/student';

interface LeaderboardProps {
  grade: 1 | 2 | 3;
  onStartQuiz: () => void;
}

const MEDAL_EMOJIS = ['🥇', '🥈', '🥉'];

const ALLOWED_TEACHERS = [
  '원동현', '강윤용', '김도일', '김의성', '김하은',
  '김하정', '문예찬', '박윤재', '신서영', '이성훈',
  '이안나', '이예린', '이종섭', '이현정', '장대근',
  '전기홍', '전용천', '최유나', '한효진', '함미정',
  '홍효주', '조율'
];

export default function Leaderboard({ grade, onStartQuiz }: LeaderboardProps) {
  const [teacherName, setTeacherName] = useState('');
  const [error, setError] = useState('');
  const [leaderboard] = useState<LeaderboardType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('leaderboard');
      if (saved) {
        return JSON.parse(saved);
      }
    }
    return {
      grade1: [],
      grade2: [],
      grade3: [],
    };
  });

  const handleTeacherNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setTeacherName(name);
    setError('');
  };

  const handleStartQuiz = () => {
    const trimmedName = teacherName.trim();
    if (!trimmedName) {
      setError('선생님 성함을 입력해주세요.');
      return;
    }
    if (!ALLOWED_TEACHERS.includes(trimmedName)) {
      setError('등록되지 않은 선생님 성함입니다.');
      return;
    }
    onStartQuiz();
  };

  // 각 이름당 최신 점수만 필터링
  const filterLatestScores = (entries: LeaderboardEntry[]) => {
    const nameMap = new Map<string, LeaderboardEntry>();
    
    entries.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach(entry => {
        nameMap.set(entry.teacherName.toLowerCase().trim(), entry);
      });
    
    return Array.from(nameMap.values());
  };

  const currentGradeLeaderboard = filterLatestScores(
    leaderboard[`grade${grade}` as keyof LeaderboardType]
  )
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="mb-4">
        <label className="block text-gray-700 text-xs font-bold mb-1">
          선생님 성함
        </label>
        <input
          type="text"
          value={teacherName}
          onChange={handleTeacherNameChange}
          className={`shadow appearance-none border rounded w-full py-1.5 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            error ? 'border-red-500' : ''
          }`}
          placeholder="성함을 입력해주세요"
          list="teacherNames"
        />
        <datalist id="teacherNames">
          {ALLOWED_TEACHERS.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {error && (
          <p className="text-red-500 text-xs mt-1">{error}</p>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-lg font-bold mb-3 text-center">
          <span className="inline-block mr-1">👑</span>
          {grade}학년 이름 암기 명예의 전당
          <span className="inline-block ml-1">👑</span>
        </h3>
        {currentGradeLeaderboard.length > 0 ? (
          <div className="space-y-1.5">
            {currentGradeLeaderboard.map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-1.5 bg-gray-50 rounded text-sm"
              >
                <div className="flex items-center">
                  <span className="font-bold w-6">
                    {index < 3 ? MEDAL_EMOJIS[index] : `${index + 1}.`}
                  </span>
                  <span>{entry.teacherName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`font-bold ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-500' :
                    index === 2 ? 'text-orange-500' :
                    'text-blue-600'
                  }`}>{entry.score}점</span>
                  <span className="text-gray-500 text-xs">{entry.date}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm">아직 기록이 없습니다.</p>
        )}
      </div>

      <button
        onClick={handleStartQuiz}
        className="w-full bg-blue-500 text-white py-1.5 px-4 rounded text-sm hover:bg-blue-600 transition-colors"
      >
        아이들 만나러 가기
      </button>
    </div>
  );
} 