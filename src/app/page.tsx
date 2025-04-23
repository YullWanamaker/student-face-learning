'use client';

import { useState } from 'react';
import { LearningMode, UserProgress, Leaderboard as LeaderboardType } from '@/types/student';
import StudyMode from '@/components/StudyMode';
import QuizMode from '@/components/QuizMode';
import Leaderboard from '@/components/Leaderboard';
import { Toaster } from 'react-hot-toast';

const originalStudents = [
  { id: 1, name: '최시온', image: '/students/grade1/1학년_최시온.jpg', grade: 1 as const },
  { id: 2, name: '이송연', image: '/students/grade1/1학년_이송연.jpg', grade: 1 as const },
  { id: 3, name: '백솔이', image: '/students/grade1/1학년_백솔이.jpg', grade: 1 as const },
  { id: 4, name: '김나경', image: '/students/grade1/1학년_김나경.jpg', grade: 1 as const },
  { id: 5, name: '윤소정', image: '/students/grade1/1학년_윤소정.jpg', grade: 1 as const },
  { id: 6, name: '강이안', image: '/students/grade1/1학년_강이안.jpg', grade: 1 as const },
  { id: 7, name: '김현우', image: '/students/grade1/1학년_김현우.jpg', grade: 1 as const },
  { id: 8, name: '최정후', image: '/students/grade1/1학년_최정후.jpg', grade: 1 as const },
  { id: 9, name: '박지민', image: '/students/grade1/1학년_박지민.jpg', grade: 1 as const },
  { id: 10, name: '김유찬', image: '/students/grade1/1학년_김유찬.jpg', grade: 1 as const },
  { id: 11, name: '김태준', image: '/students/grade1/1학년_김태준.jpg', grade: 1 as const },
  { id: 12, name: '전지언', image: '/students/grade1/1학년_전지언.jpg', grade: 1 as const },
  { id: 13, name: '이영광', image: '/students/grade1/1학년_이영광.jpg', grade: 1 as const },
  { id: 14, name: '김승구', image: '/students/grade1/1학년_김승구.jpg', grade: 1 as const },
  { id: 15, name: '김주성', image: '/students/grade1/1학년_김주성.jpg', grade: 1 as const },
  { id: 16, name: '이조은', image: '/students/grade1/1학년_이조은.jpg', grade: 1 as const },
  { id: 17, name: '노진철', image: '/students/grade1/1학년_노진철.jpg', grade: 1 as const },
  { id: 18, name: '오승민', image: '/students/grade1/1학년_오승민.jpg', grade: 1 as const },
  { id: 19, name: '전성현', image: '/students/grade1/1학년_전성현.jpg', grade: 1 as const },
  { id: 20, name: '유은수', image: '/students/grade1/1학년_유은수.jpg', grade: 1 as const },
  { id: 21, name: '구본서', image: '/students/grade1/1학년_구본서.jpg', grade: 1 as const },
  { id: 22, name: '이현준', image: '/students/grade1/1학년_이현준.jpg', grade: 1 as const },
  { id: 23, name: '김동현', image: '/students/grade1/1학년_김동현.jpg', grade: 1 as const },
  { id: 24, name: '김하늘', image: '/students/grade1/1학년_김하늘.jpg', grade: 1 as const },
  { id: 25, name: '임유정', image: '/students/grade1/1학년_임유정.jpg', grade: 1 as const },
  { id: 26, name: '이사랑', image: '/students/grade1/1학년_이사랑.jpg', grade: 1 as const },
  { id: 27, name: '김채연', image: '/students/grade1/1학년_ 김채연.jpg', grade: 1 as const },
  { id: 28, name: '마지민', image: '/students/grade1/1학년_마지민.jpg', grade: 1 as const },
  { id: 29, name: '김효민', image: '/students/grade1/1학년_김효민.jpg', grade: 1 as const },
  { id: 30, name: '윤지우', image: '/students/grade1/1학년_윤지우.jpg', grade: 1 as const },
  { id: 31, name: '김하연', image: '/students/grade1/1학년_김하연.jpg', grade: 1 as const },
  { id: 32, name: '배주영', image: '/students/grade1/1학년_배주영.jpg', grade: 1 as const },
  { id: 33, name: '김민서', image: '/students/grade1/1학년_김민서.jpg', grade: 1 as const },
  { id: 34, name: '서이안', image: '/students/grade1/1학년_서이안.jpg', grade: 1 as const },
  { id: 35, name: '이재교', image: '/students/grade1/1학년_이재교.jpg', grade: 1 as const },
  { id: 36, name: '장승원', image: '/students/grade1/1학년_장승원.jpg', grade: 1 as const },
  { id: 37, name: '정서린', image: '/students/grade1/1학년_정서린.jpg', grade: 1 as const },
  { id: 38, name: '김소명', image: '/students/grade1/1학년_김소명.jpg', grade: 1 as const },
  { id: 39, name: '강하음', image: '/students/grade1/1학년_강하음.jpg', grade: 1 as const },
  { id: 40, name: '이지수', image: '/students/grade1/1학년_이지수.jpg', grade: 1 as const },
  { id: 41, name: '임정원', image: '/students/grade1/1학년_임정원.jpg', grade: 1 as const }
];

const initialProgress: UserProgress = {
  badges: {
    grade1: false,
    grade2: false,
    grade3: false,
  },
  highScores: {
    grade1: 0,
    grade2: 0,
    grade3: 0,
  },
};

export default function Home() {
  const [mode, setMode] = useState<LearningMode | 'start' | 'select' | 'selectStudy'>('start');
  const [showContent, setShowContent] = useState(false);
  const [students, setStudents] = useState(originalStudents);
  const [progress, setProgress] = useState<UserProgress>(initialProgress);

  const handleStartQuiz = () => {
    setShowContent(true);
    setMode('select');
  };

  const handleStartStudy = () => {
    setShowContent(true);
    setMode('selectStudy');
  };

  const handleModeChange = (newMode: LearningMode) => {
    const gradeStudents = originalStudents.filter(student => {
      const grade = parseInt(newMode.replace('grade', '').replace('study', ''));
      return student.grade === grade;
    });
    setStudents(gradeStudents.sort(() => Math.random() - 0.5));
    setMode(newMode);
  };

  const handleQuizComplete = (grade: 1 | 2 | 3, score: number) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      if (score === 100) {
        newProgress.badges[`grade${grade}` as keyof typeof prev.badges] = true;
      }
      if (score > prev.highScores[`grade${grade}` as keyof typeof prev.highScores]) {
        newProgress.highScores[`grade${grade}` as keyof typeof prev.highScores] = score;
      }
      return newProgress;
    });

    // 리더보드에 점수 추가
    const leaderboardData = localStorage.getItem('leaderboard');
    const leaderboard: LeaderboardType = leaderboardData ? JSON.parse(leaderboardData) : {
      grade1: [],
      grade2: [],
      grade3: [],
    };

    const teacherName = localStorage.getItem('currentTeacher');
    if (teacherName) {
      const gradeKey = `grade${grade}` as keyof LeaderboardType;
      leaderboard[gradeKey].push({
        teacherName,
        score,
        date: new Date().toLocaleDateString(),
        grade,
      });
      localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }
  };

  if (!showContent) {
  return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative">
          <h1 className="text-3xl font-bold mb-2">아이들 얼굴 익히기</h1>
          <p className="text-sm text-gray-600 text-center mb-8 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>
          <div className="space-y-4">
            <button
              onClick={handleStartStudy}
              className="w-full px-8 py-3 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              학습하기
            </button>
            <button
              onClick={handleStartQuiz}
              className="w-full px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors"
            >
              시험보기
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (mode === 'selectStudy') {
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative">
          <button
            onClick={() => {
              setShowContent(false);
              setMode('start');
            }}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
          >
            ← 뒤로
          </button>
          <h1 className="text-3xl font-bold mb-2">학년 선택</h1>
          <p className="text-sm text-gray-600 text-center mb-8 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>
          
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => handleModeChange('study1')}
              className="px-8 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
          >
              1학년
            </button>
            <button
              onClick={() => handleModeChange('study2')}
              className="px-8 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              2학년
            </button>
            <button
              onClick={() => handleModeChange('study3')}
              className="px-8 py-4 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              3학년
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (mode === 'select') {
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative">
          <button
            onClick={() => {
              setShowContent(false);
              setMode('start');
            }}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
          >
            ← 뒤로
          </button>
          <h1 className="text-3xl font-bold mb-2">학년 선택</h1>
          <p className="text-sm text-gray-600 text-center mb-8 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>
          
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3].map((grade) => (
              <button
                key={grade}
                onClick={() => {
                  localStorage.setItem('currentGrade', grade.toString());
                  setMode(`leaderboard${grade}` as LearningMode);
                }}
                className="px-8 py-4 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors relative"
              >
                {grade}학년
                {progress.badges[`grade${grade}` as keyof typeof progress.badges] && (
                  <span className="absolute top-1/2 -translate-y-1/2 right-4 text-yellow-300 text-2xl" title="100점 달성!">
                    ★
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (mode.startsWith('leaderboard')) {
    const grade = parseInt(mode.replace('leaderboard', '')) as 1 | 2 | 3;
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 flex items-center justify-center"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative">
          <button
            onClick={() => setMode('select')}
            className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
            ← 뒤로
          </button>
          <Leaderboard 
            grade={grade} 
            onStartQuiz={() => {
              const teacherName = (document.querySelector('input[type="text"]') as HTMLInputElement)?.value;
              if (teacherName) {
                localStorage.setItem('currentTeacher', teacherName);
                handleModeChange(`grade${grade}` as LearningMode);
              }
            }} 
          />
        </div>
      </main>
    );
  }

  const isStudyMode = mode.startsWith('study');
  const currentGrade = isStudyMode 
    ? mode.replace('study', '') 
    : mode.replace('grade', '');

  return (
    <main 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-8 relative z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMode(isStudyMode ? 'selectStudy' : 'select')}
            className="text-blue-500 hover:text-blue-600"
          >
            ← 학년 선택으로
          </button>
          <h1 className="text-2xl font-bold text-center">{currentGrade}학년</h1>
        </div>

        <p className="text-sm text-gray-600 text-center mb-4 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>

        {!isStudyMode && (
          <div className="text-sm text-gray-600 text-center mb-4">
            최고 점수: {progress.highScores[mode as keyof typeof progress.highScores]}점
          </div>
        )}

        {isStudyMode ? (
          <StudyMode students={students} mode="study2" />
        ) : (
          <QuizMode 
            students={students} 
            onComplete={(score: number) => handleQuizComplete(parseInt(currentGrade) as 1 | 2 | 3, score)}
            onViewLeaderboard={() => setMode(`leaderboard${currentGrade}` as LearningMode)}
          />
        )}
    </div>
      <Toaster position="bottom-center" />
    </main>
  );
}
