'use client';

import { useState, useEffect } from 'react';
import { LearningMode, UserProgress } from '@/types/student';
import StudyMode from '@/components/StudyMode';
import QuizMode from '@/components/QuizMode';
import Leaderboard from '@/components/Leaderboard';
import { Toaster } from 'react-hot-toast';

const originalStudents = [
  // 1학년 학생들 (grade1 디렉토리)
  { id: 1, name: '김현우', image: '/students/grade1/1학년_김현우.jpg', grade: 1 as const },
  { id: 2, name: '최정후', image: '/students/grade1/1학년_최정후.jpg', grade: 1 as const },
  { id: 3, name: '박지민', image: '/students/grade1/1학년_박지민.jpg', grade: 1 as const },
  { id: 4, name: '김유찬', image: '/students/grade1/1학년_김유찬.jpg', grade: 1 as const },
  { id: 5, name: '김태준', image: '/students/grade1/1학년_김태준.jpg', grade: 1 as const },
  { id: 6, name: '전지언', image: '/students/grade1/1학년_전지언.jpg', grade: 1 as const },
  { id: 7, name: '이하윤', image: '/students/grade1/1학년_이하윤.jpg', grade: 1 as const },
  { id: 8, name: '윤하영', image: '/students/grade1/1학년_윤하영.jpg', grade: 1 as const },
  { id: 9, name: '김하람', image: '/students/grade1/1학년_김하람.jpg', grade: 1 as const },
  { id: 10, name: '김하연H', image: '/students/grade1/1학년_김하연H.jpg', grade: 1 as const },
  { id: 11, name: '황지민', image: '/students/grade1/1학년_황지민.jpg', grade: 1 as const },
  { id: 12, name: '이영광', image: '/students/grade1/1학년_이영광.jpg', grade: 1 as const },
  { id: 13, name: '김승구', image: '/students/grade1/1학년_김승구.jpg', grade: 1 as const },
  { id: 14, name: '김주성', image: '/students/grade1/1학년_김주성.jpg', grade: 1 as const },
  { id: 15, name: '이조은', image: '/students/grade1/1학년_이조은.jpg', grade: 1 as const },
  { id: 16, name: '노진철', image: '/students/grade1/1학년_노진철.jpg', grade: 1 as const },
  { id: 17, name: '오승민', image: '/students/grade1/1학년_오승민.jpg', grade: 1 as const },
  { id: 18, name: '전성현', image: '/students/grade1/1학년_전성현.jpg', grade: 1 as const },
  { id: 19, name: '유은수', image: '/students/grade1/1학년_유은수.jpg', grade: 1 as const },
  { id: 20, name: '구본서', image: '/students/grade1/1학년_구본서.jpg', grade: 1 as const },
  { id: 21, name: '이현준', image: '/students/grade1/1학년_이현준.jpg', grade: 1 as const },
  { id: 22, name: '김동현', image: '/students/grade1/1학년_김동현.jpg', grade: 1 as const },
  { id: 23, name: '김하늘', image: '/students/grade1/1학년_김하늘.jpg', grade: 1 as const },
  { id: 24, name: '임유정', image: '/students/grade1/1학년_임유정.jpg', grade: 1 as const },
  { id: 25, name: '이사랑', image: '/students/grade1/1학년_이사랑.jpg', grade: 1 as const },
  { id: 26, name: '김채연', image: '/students/grade1/1학년_김채연.jpg', grade: 1 as const },
  { id: 27, name: '마지민', image: '/students/grade1/1학년_마지민.jpg', grade: 1 as const },
  { id: 28, name: '김효민', image: '/students/grade1/1학년_김효민.jpg', grade: 1 as const },
  { id: 29, name: '윤지우', image: '/students/grade1/1학년_윤지우.jpg', grade: 1 as const },
  { id: 30, name: '김하연', image: '/students/grade1/1학년_김하연.jpg', grade: 1 as const },
  { id: 31, name: '배주영', image: '/students/grade1/1학년_배주영.jpg', grade: 1 as const },
  { id: 32, name: '김민서', image: '/students/grade1/1학년_김민서.jpg', grade: 1 as const },
  { id: 33, name: '서이안', image: '/students/grade1/1학년_서이안.jpg', grade: 1 as const },
  { id: 34, name: '이재교', image: '/students/grade1/1학년_이재교.jpg', grade: 1 as const },
  { id: 35, name: '장승원', image: '/students/grade1/1학년_장승원.jpg', grade: 1 as const },
  { id: 36, name: '정서린', image: '/students/grade1/1학년_정서린.jpg', grade: 1 as const },
  { id: 37, name: '김소명', image: '/students/grade1/1학년_김소명.jpg', grade: 1 as const },
  { id: 38, name: '강하음', image: '/students/grade1/1학년_강하음.jpg', grade: 1 as const },
  { id: 39, name: '이지수', image: '/students/grade1/1학년_이지수.jpg', grade: 1 as const },
  { id: 40, name: '임정원', image: '/students/grade1/1학년_임정원.jpg', grade: 1 as const },

  // 2학년 학생들 (grade2 디렉토리)
  { id: 41, name: '곽고은', image: '/students/grade2/2학년_곽고은.jpg', grade: 2 as const },
  { id: 42, name: '백솔이', image: '/students/grade2/2학년_백솔이.jpg', grade: 2 as const },
  { id: 43, name: '오유빈', image: '/students/grade2/2학년_오유빈.jpg', grade: 2 as const },
  { id: 44, name: '임서아', image: '/students/grade2/2학년_임서아.jpg', grade: 2 as const },
  { id: 45, name: '조소영', image: '/students/grade2/2학년_조소영.jpg', grade: 2 as const },
  { id: 46, name: '김진결', image: '/students/grade2/2학년_김진결.jpg', grade: 2 as const },
  { id: 47, name: '최시온', image: '/students/grade2/2학년_최시온.jpg', grade: 2 as const },
  { id: 48, name: '이채현', image: '/students/grade2/2학년_이채현.jpg', grade: 2 as const },
  { id: 49, name: '신비한', image: '/students/grade2/2학년_신비한.jpg', grade: 2 as const },
  { id: 50, name: '최민규', image: '/students/grade2/2학년_최민규.jpg', grade: 2 as const },
  { id: 51, name: '황조한', image: '/students/grade2/2학년_황조한.jpg', grade: 2 as const },
  { id: 52, name: '이다니엘', image: '/students/grade2/2학년_이다니엘.jpg', grade: 2 as const },
  { id: 53, name: '서동휘', image: '/students/grade2/2학년_서동휘.jpg', grade: 2 as const },
  { id: 54, name: '박근태', image: '/students/grade2/2학년_박근태.jpg', grade: 2 as const },
  { id: 55, name: '양시온', image: '/students/grade2/2학년_양시온.jpg', grade: 2 as const },
  { id: 56, name: '김예진', image: '/students/grade2/2학년_김예진.jpg', grade: 2 as const },
  { id: 57, name: '이유진', image: '/students/grade2/2학년_이유진.jpg', grade: 2 as const },
  { id: 58, name: '신지현', image: '/students/grade2/2학년_신지현.jpg', grade: 2 as const },
  { id: 59, name: '이예교', image: '/students/grade2/2학년_이예교.jpg', grade: 2 as const },
  { id: 60, name: '황윤하', image: '/students/grade2/2학년_황윤하.jpg', grade: 2 as const },
  { id: 61, name: '이송연', image: '/students/grade2/2학년_이송연.jpg', grade: 2 as const },
  { id: 62, name: '김나경', image: '/students/grade2/2학년_김나경.jpg', grade: 2 as const },
  { id: 63, name: '윤소정', image: '/students/grade2/2학년_윤소정.jpg', grade: 2 as const },
  { id: 64, name: '강이안', image: '/students/grade2/2학년_강이안.jpg', grade: 2 as const },

  // 3학년 학생들 (grade3 디렉토리)
  { id: 65, name: '임소망', image: '/students/grade3/3학년_임소망.jpg', grade: 3 as const },
  { id: 66, name: '김은지', image: '/students/grade3/3학년_김은지.jpg', grade: 3 as const },
  { id: 67, name: '이영은', image: '/students/grade3/3학년_이영은.jpg', grade: 3 as const },
  { id: 68, name: '김예은', image: '/students/grade3/3학년_김예은.jpg', grade: 3 as const },
  { id: 69, name: '신정현', image: '/students/grade3/3학년_신정현.jpg', grade: 3 as const },
  { id: 70, name: '박지후', image: '/students/grade3/3학년_박지후.jpg', grade: 3 as const },
  { id: 71, name: '석정우', image: '/students/grade3/3학년_석정우.jpg', grade: 3 as const },
  { id: 72, name: '전솔민', image: '/students/grade3/3학년_전솔민.jpg', grade: 3 as const },
  { id: 73, name: '김성남', image: '/students/grade3/3학년_김성남.jpg', grade: 3 as const },
  { id: 74, name: '서민준', image: '/students/grade3/3학년_서민준.jpg', grade: 3 as const },
  { id: 75, name: '김지후', image: '/students/grade3/3학년_김지후.jpg', grade: 3 as const },
  { id: 76, name: '이현성', image: '/students/grade3/3학년_이현성.jpg', grade: 3 as const },
  { id: 77, name: '최선호', image: '/students/grade3/3학년_최선호.jpg', grade: 3 as const },
  { id: 78, name: '이승빈', image: '/students/grade3/3학년_이승빈.jpg', grade: 3 as const },
  { id: 79, name: '홍준택', image: '/students/grade3/3학년_홍준택.jpg', grade: 3 as const },
  { id: 80, name: '강제유', image: '/students/grade3/3학년_강제유.jpg', grade: 3 as const },
  { id: 81, name: '여찬', image: '/students/grade3/3학년_여찬.jpg', grade: 3 as const },
  { id: 82, name: '남한결', image: '/students/grade3/3학년_남한결.jpg', grade: 3 as const },
  { id: 83, name: '최원준', image: '/students/grade3/3학년_최원준.jpg', grade: 3 as const },
  { id: 84, name: '김강빈', image: '/students/grade3/3학년_김강빈.jpg', grade: 3 as const },
  { id: 85, name: '배주원', image: '/students/grade3/3학년_배주원.jpg', grade: 3 as const },
  { id: 86, name: '구본주', image: '/students/grade3/3학년_구본주.jpg', grade: 3 as const }
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
  const [mode, setMode] = useState<LearningMode | 'start' | 'select' | 'selectStudy' | 'intro'>('intro');
  const [showContent, setShowContent] = useState(false);
  const [students, setStudents] = useState(originalStudents);
  const [progress, setProgress] = useState<UserProgress>(initialProgress);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(-1);

  const initialLyrics = [
    { text: "나는 교사입니다♥️", time: 3.5 },
    { text: "간주(또로로띠또! 또로로띠띠또~)🎵", time: 5.5 },
    { text: "하나,성경을 묵상하는 말! 씀의 사람, 항상 기도하는 성령의 사람이 되겠습니다.", time: 15.2 },
    { text: "하나,학생들을 사랑하고 학생의 영혼구원을 우선순위로 하겠습니다.", time: 27.5 },
    { text: "경건하고 따뜻한 말과 겸손한 섬김으로 학생들과 동료 교사에게 모범이 되겠습니다.", time: 35.8 },
    { text: "본 예배와 뉴젠 예배에 성실히 참여하고, 교회의 영적 질서에 순종하겠습니다.", time: 45.2 },
    { text: "어떤 상황 속에서도 포기하지 않고 교사의 자리를 지키겠습니다.", time: 53.8 },
    { text: "나는 교사입니다♥️", time: 63.5 }
  ];

  const [lyrics, setLyrics] = useState(initialLyrics);

  // 피크 찾기 함수
  const findPeaks = (data: number[], minThreshold = 0.1): number[] => {
    const peaks: number[] = [];
    for (let i = 1; i < data.length - 1; i++) {
      if (data[i] > minThreshold && data[i] > data[i - 1] && data[i] > data[i + 1]) {
        peaks.push(i / 10);
      }
    }
    return peaks;
  };

  // 가사 동기화
  useEffect(() => {
    if (!audio) return;

    const updateLyrics = () => {
      if (!audio || !lyrics.length) return;
      
      const currentTime = audio.currentTime;
      let newIndex = -1;

      // 현재 시간에 맞는 가사 인덱스 찾기
      for (let i = 0; i < lyrics.length; i++) {
        const lyric = lyrics[i];
        const nextLyric = lyrics[i + 1];
        const nextTime = nextLyric ? nextLyric.time : Infinity;
        
        if (currentTime >= lyric.time && currentTime < nextTime) {
          newIndex = i;
          break;
        }
      }

      if (newIndex !== currentLyricIndex) {
        setCurrentLyricIndex(newIndex);
      }
    };

    audio.addEventListener('timeupdate', updateLyrics);
    audio.addEventListener('play', updateLyrics);
    audio.addEventListener('seeking', updateLyrics);

    return () => {
      audio.removeEventListener('timeupdate', updateLyrics);
      audio.removeEventListener('play', updateLyrics);
      audio.removeEventListener('seeking', updateLyrics);
    };
  }, [audio, lyrics, currentLyricIndex]);

  // LyricsDisplay 컴포넌트 추가
  function LyricsDisplay({ currentLyric, nextLyric }: { currentLyric?: string; nextLyric?: string }) {
    if (!audio || audio.paused) return null;
    
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-black/60 p-1 text-center z-[9999] pointer-events-none">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs text-white/60 mb-0.5">{lyrics[currentLyricIndex - 1]?.text}</div>
          <div className="text-sm font-bold text-white mb-0.5">{currentLyric}</div>
          <div className="text-xs text-white/60 mb-0.5">{nextLyric}</div>
          <div className="text-xs text-white/40">{lyrics[currentLyricIndex + 2]?.text}</div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const initAudio = async () => {
      try {
        const bgAudio = new Audio('/audio/background-music.mp3');
        bgAudio.loop = true;
        bgAudio.volume = 0.5;
        
        const context = new (window.AudioContext || (window as any).webkitAudioContext)();
        const analyserNode = context.createAnalyser();
        analyserNode.fftSize = 2048;
        
        const source = context.createMediaElementSource(bgAudio);
        source.connect(analyserNode);
        analyserNode.connect(context.destination);

        setAudio(bgAudio);
        setAudioContext(context);
        setAnalyser(analyserNode);
      } catch (error) {
        console.error('음악 초기화 중 오류 발생:', error);
      }
    };

    initAudio();

    return () => {
      if (audioContext) {
        audioContext.close();
      }
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const toggleMute = () => {
    if (audio) {
      audio.muted = !audio.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleStartMusic = async () => {
    if (audio && audioContext) {
      try {
        if (audioContext.state === 'suspended') {
          await audioContext.resume();
        }
        await audio.play();
        setCurrentLyricIndex(0);
        setMode('start');
      } catch (error) {
        console.error('음악 재생 실패:', error);
      }
    }
  };

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

  const handleQuizComplete = async (grade: 1 | 2 | 3, score: number) => {
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

    const teacherName = localStorage.getItem('currentTeacher');
    if (teacherName) {
      try {
        const entry = {
          teacherName,
          score,
          date: new Date().toLocaleDateString(),
          grade,
        };

        await fetch('/api/leaderboard', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ grade, entry }),
        });
      } catch (error) {
        console.error('Error updating leaderboard:', error);
      }
    }
  };

  // MusicControl 컴포넌트
  const MusicControl = () => (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-[9999] bg-black/80 p-2 rounded-full shadow-lg hover:bg-black/90 transition-all text-xl border border-black/40"
      title={isMuted ? "음악 켜기" : "음악 끄기"}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );

  if (mode === 'intro') {
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 overflow-y-auto"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {audio && <MusicControl />}
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative">
          <div className="mb-8">
            <img 
              src="/teacher-declaration.jpg" 
              alt="교사 선언문" 
              className="w-full rounded-lg shadow-md"
            />
          </div>
          <button
            onClick={handleStartMusic}
            className="w-full px-8 py-4 bg-blue-500 text-white rounded-lg text-xl font-semibold hover:bg-blue-600 transition-colors"
          >
            교사선언문 들으며 아이들 만나러 가기
          </button>
        </div>
        {currentLyricIndex >= 0 && (
          <LyricsDisplay
            currentLyric={lyrics[currentLyricIndex]?.text}
            nextLyric={lyrics[currentLyricIndex + 1]?.text}
          />
        )}
      </main>
    );
  }

  if (!showContent) {
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 overflow-y-auto"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {audio && <MusicControl />}
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative">
          <h1 className="text-3xl font-bold mb-2 text-black">아이들 얼굴 익히기</h1>
          <p className="text-base text-gray-900 text-center mb-8 px-4 font-medium">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>
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
        {currentLyricIndex >= 0 && (
          <LyricsDisplay
            currentLyric={lyrics[currentLyricIndex]?.text}
            nextLyric={lyrics[currentLyricIndex + 1]?.text}
          />
        )}
      </main>
    );
  }

  if (mode === 'selectStudy') {
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 overflow-y-auto"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {audio && <MusicControl />}
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative my-8">
          <button
            onClick={() => {
              setShowContent(false);
              setMode('start');
            }}
            className="absolute top-4 left-4 text-gray-800 hover:text-gray-900"
          >
            ← 뒤로
          </button>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">학년 선택</h1>
          <p className="text-sm text-gray-800 text-center mb-8 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>
          
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
        {audio && !audio.paused && (
          <LyricsDisplay
            currentLyric={lyrics[currentLyricIndex]?.text}
            nextLyric={lyrics[currentLyricIndex + 1]?.text}
          />
        )}
      </main>
    );
  }

  if (mode === 'select') {
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 overflow-y-auto"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {audio && <MusicControl />}
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative my-8">
          <button
            onClick={() => {
              setShowContent(false);
              setMode('start');
            }}
            className="absolute top-4 left-4 text-gray-800 hover:text-gray-900"
          >
            ← 뒤로
          </button>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">학년 선택</h1>
          <p className="text-sm text-gray-800 text-center mb-8 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>
          
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
        {audio && !audio.paused && (
          <LyricsDisplay
            currentLyric={lyrics[currentLyricIndex]?.text}
            nextLyric={lyrics[currentLyricIndex + 1]?.text}
          />
        )}
      </main>
    );
  }

  if (mode.startsWith('leaderboard')) {
    const grade = parseInt(mode.replace('leaderboard', '')) as 1 | 2 | 3;
    return (
      <main 
        className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 overflow-y-auto"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {audio && <MusicControl />}
        <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-8 text-center relative my-8">
          <button
            onClick={() => setMode('select')}
            className="absolute top-4 left-4 text-gray-800 hover:text-gray-900"
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
        {audio && !audio.paused && (
          <LyricsDisplay
            currentLyric={lyrics[currentLyricIndex]?.text}
            nextLyric={lyrics[currentLyricIndex + 1]?.text}
          />
        )}
      </main>
    );
  }

  const isStudyMode = mode.startsWith('study');
  const currentGrade = isStudyMode 
    ? mode.replace('study', '') 
    : mode.replace('grade', '');

  return (
    <main 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat p-4 fixed inset-0 overflow-y-auto"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {audio && <MusicControl />}
      <div className="max-w-md mx-auto bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-6 mt-8 relative z-10 mb-32">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setMode(isStudyMode ? 'selectStudy' : 'select')}
            className="text-blue-500 hover:text-blue-600"
          >
            ← 학년 선택으로
          </button>
          <h1 className="text-2xl font-bold text-center">{currentGrade}학년</h1>
        </div>

        <p className="text-sm text-gray-800 text-center mb-4 px-4">&ldquo;너희는 먼저 그의 나라와 그의 의를 구하라 그리하면 이 모든 것을 너희에게 더하시리라&rdquo; (마태복음 6:33)</p>

        {!isStudyMode && (
          <div className="text-sm text-gray-800 text-center mb-4">
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
      {audio && !audio.paused && (
        <LyricsDisplay
          currentLyric={lyrics[currentLyricIndex]?.text}
          nextLyric={lyrics[currentLyricIndex + 1]?.text}
        />
      )}
      <Toaster position="bottom-center" />
    </main>
  );
}
