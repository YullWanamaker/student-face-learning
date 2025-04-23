'use client';

import { useState, useEffect } from 'react';
import { Student } from '@/types/student';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Image from 'next/image';

interface StudyModeProps {
  students: Student[];
  mode: string;
}

export default function StudyMode({ students, mode }: StudyModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showName, setShowName] = useState(mode === 'study1');

  const currentStudent = students[currentIndex];

  useEffect(() => {
    setShowName(mode === 'study1');
  }, [mode]);

  const handleNext = () => {
    if (currentIndex < students.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setShowName(mode === 'study1');
      }, 300);
    } else {
      toast.success('모든 학생을 학습했습니다!');
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setTimeout(() => {
        setCurrentIndex((prev) => prev - 1);
        setShowName(mode === 'study1');
      }, 300);
    }
  };

  const toggleName = () => {
    if (mode === 'study2') {
      setShowName((prev) => !prev);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start p-4">
      <div className="relative w-full max-w-md aspect-square mb-2">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <div className="relative w-full h-full">
              <Image
                src={currentStudent.image}
                alt={currentStudent.name}
                fill
                className="object-cover rounded-lg shadow-lg"
                onClick={toggleName}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-2 text-center">
        <AnimatePresence mode="wait">
          {showName && (
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-2xl font-bold text-gray-800"
            >
              {currentStudent.name}
            </motion.h2>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === students.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50"
        >
          다음
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-500">
        {currentIndex + 1} / {students.length}
      </div>
    </div>
  );
} 