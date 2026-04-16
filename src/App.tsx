import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { LessonView } from './components/LessonView';
import { CURRICULUM } from './data/curriculum';
import { getProgress, completeDay } from './utils';
import { UserProgress } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { Languages } from 'lucide-react';

export default function App() {
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const load = async () => {
      const p = getProgress();
      // Ensure we don't show empty flash if data is loading
      setProgress(p);
      setTimeout(() => setIsLoading(false), 800);
    };
    load();
  }, []);

  const handleDaySelect = (day: number) => {
    setSelectedDay(day);
  };

  const handleLessonComplete = () => {
    if (selectedDay) {
      const newProgress = completeDay(selectedDay);
      setProgress(newProgress);
      setSelectedDay(null);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-10 text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-20 h-20 bg-orange-500 rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl shadow-orange-200"
        >
          <Languages size={40} />
        </motion.div>
        <h1 className="text-2xl font-black text-slate-800 mb-2">Habla 100</h1>
        <p className="text-slate-400 font-mono text-sm uppercase tracking-widest">Preparing your journey...</p>
      </div>
    );
  }

  const handleBack = () => {
    setProgress(getProgress());
    setSelectedDay(null);
  };

  const activeLesson = CURRICULUM.find(l => l.day === selectedDay);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {!selectedDay ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -50 }}
          >
            <nav className="bg-white border-b border-slate-100 py-6 px-10">
              <div className="max-w-2xl mx-auto flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white">
                  <Languages size={24} />
                </div>
                <div>
                  <h1 className="text-xl font-black text-slate-800 leading-none">Habla 100</h1>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mt-1">Spanish Mastery</p>
                </div>
              </div>
            </nav>
            <Dashboard 
              progress={progress!} 
              curriculum={CURRICULUM} 
              onSelectDay={handleDaySelect} 
            />
          </motion.div>
        ) : (
          <motion.div
            key="lesson"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
          >
            {activeLesson && (
              <LessonView 
                lesson={activeLesson} 
                onBack={handleBack} 
                onComplete={handleLessonComplete}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
