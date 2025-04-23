'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { Student } from '@/types/student';
import toast from 'react-hot-toast';

interface QuizModeProps {
  students: Student[];
  onComplete: (score: number) => void;
  onViewLeaderboard: () => void;
}

export default function QuizMode({ students, onComplete, onViewLeaderboard }: QuizModeProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<{
    correctStudent: Student;
    options: Student[];
  }[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const calculateScore = (correct: number, total: number) => {
    return Math.round((correct / total) * 100);
  };

  const generateQuizQuestions = useCallback(() => {
    const allQuestions = [];
    const usedStudents = new Set<number>();
    
    while (usedStudents.size < students.length) {
      const availableStudents = students.filter(s => !usedStudents.has(s.id));
      const correctStudent = availableStudents[Math.floor(Math.random() * availableStudents.length)];
      usedStudents.add(correctStudent.id);

      const otherStudents = students.filter(s => s.id !== correctStudent.id);
      const wrongOptions = otherStudents.sort(() => Math.random() - 0.5).slice(0, 3);
      
      const options = [...wrongOptions, correctStudent].sort(() => Math.random() - 0.5);

      allQuestions.push({
        correctStudent,
        options,
      });
    }

    return allQuestions;
  }, [students]);

  useEffect(() => {
    const questions = generateQuizQuestions();
    setQuizQuestions(questions);
  }, [generateQuizQuestions]);

  const handleAnswer = (selectedStudent: Student) => {
    if (selectedAnswer !== null) return; // 이미 답을 선택했으면 무시

    setSelectedAnswer(selectedStudent.name);
    const isCorrect = selectedStudent.id === quizQuestions[currentQuestion].correctStudent.id;

    if (isCorrect) {
      toast.success('정답입니다!');
      setCorrectAnswers(prev => prev + 1);
    } else {
      toast.error(`틀렸습니다. 정답은 ${quizQuestions[currentQuestion].correctStudent.name}입니다.`);
    }

    // 잠시 후 다음 문제로 이동
    setTimeout(() => {
      if (currentQuestion === students.length - 1) {
        // 마지막 문제인 경우
        const score = calculateScore(
          isCorrect ? correctAnswers + 1 : correctAnswers,
          students.length
        );
        setFinalScore(score);
        setIsQuizComplete(true);
        onComplete(score);
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
      }
    }, 1500);
  };

  if (isQuizComplete) {
    return (
      <div className="text-center space-y-6">
        <h2 className="text-2xl font-bold mb-4">퀴즈 완료!</h2>
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="text-4xl font-bold text-blue-600 mb-4">{finalScore}점</div>
          <p className="text-lg text-gray-600 mb-4">
            총 {students.length}문제 중 {correctAnswers}개 정답
          </p>
          {finalScore === 100 && (
            <div className="text-2xl text-yellow-500 mb-4">
              🏆 만점 달성! 축하합니다! 🏆
            </div>
          )}
          {finalScore < 50 && (
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-4">
              <div className="text-lg text-blue-800 mb-3">
                <span className="font-semibold">💝 선생님! 조금 더 노력해볼까요? 💝</span>
              </div>
              <div className="relative w-full max-w-md mx-auto my-4 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/your-name-poster.jpg"
                  alt="너의 이름은 포스터"
                  width={400}
                  height={566}
                  className="w-full h-auto"
                />
              </div>
              <div className="text-blue-700 space-y-2">
                <p>🌱 우리 아이들의 이름을 외우는 건 정말 특별한 일이에요!</p>
                <p>✨ 아이들은 선생님이 자신의 이름을 기억할 때 더 행복해진답니다</p>
                <p>🎯 학습 모드에서 차근차근 복습해보시는 건 어떨까요?</p>
              </div>
              <div className="mt-4 text-sm text-blue-600 text-center">
                <p>💌 우리 아이들을 위한 선생님의 노력을 응원합니다!</p>
              </div>
            </div>
          )}
        </div>
        <div className="space-y-3">
          <button
            onClick={onViewLeaderboard}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2"
          >
            <span>👑</span>
            <span>명예의 전당</span>
            <span>🏆</span>
          </button>
        </div>
      </div>
    );
  }

  if (quizQuestions.length === 0) {
    return <div className="text-center">문제를 준비중입니다...</div>;
  }

  const currentQuizQuestion = quizQuestions[currentQuestion];
  const currentScore = calculateScore(correctAnswers, students.length);

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <div className="mb-2">
          <span className="text-lg font-bold">{currentQuestion + 1}</span>
          <span className="text-gray-500">/{students.length}</span>
        </div>
        <div className="text-xl mb-2">이 학생의 이름은 무엇인가요?</div>
        <div className="relative w-48 h-48 mx-auto rounded-lg overflow-hidden">
          <Image
            src={currentQuizQuestion.correctStudent.image}
            alt="학생 사진"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {currentQuizQuestion.options.map((student) => (
          <button
            key={student.id}
            onClick={() => handleAnswer(student)}
            disabled={selectedAnswer !== null}
            className={`p-3 rounded-lg text-white font-semibold transition-colors ${
              selectedAnswer === null
                ? 'bg-blue-500 hover:bg-blue-600'
                : selectedAnswer === student.name
                ? student.id === currentQuizQuestion.correctStudent.id
                  ? 'bg-green-500'
                  : 'bg-red-500'
                : student.id === currentQuizQuestion.correctStudent.id
                ? 'bg-green-500'
                : 'bg-blue-500'
            }`}
          >
            {student.name}
          </button>
        ))}
      </div>

      <div className="text-center text-lg font-bold text-blue-600">
        현재 점수: {currentScore}점 (맞춘 개수: {correctAnswers}개)
      </div>
    </div>
  );
} 