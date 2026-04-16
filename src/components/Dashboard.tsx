import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Star, CheckCircle2, Lock, ChevronRight, GraduationCap, ChevronLeft } from 'lucide-react';
import { UserProgress, DayLesson } from '../types';

interface DashboardProps {
  progress: UserProgress;
  curriculum: DayLesson[];
  onSelectDay: (day: number) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ progress, curriculum, onSelectDay }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const lessonsPerPage = 10;
  const totalPages = Math.ceil(curriculum.length / lessonsPerPage);

  const currentLevel = Math.floor(progress.completedDays.length / 5);
  const nextMilestone = (currentLevel + 1) * 5;
  const progressPercentage = (progress.completedDays.length / 100) * 100;
  const totalLearned = progress.learnedVocabIds.length + progress.learnedPhraseIds.length;

  const startIndex = currentPage * lessonsPerPage;
  const visibleLessons = curriculum.slice(startIndex, startIndex + lessonsPerPage);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Stats Header */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 bg-orange-500 rounded-bl-2xl text-white">
            <Flame size={14} fill="currentColor" />
          </div>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase mb-1">STREAK</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{progress.streak} <span className="text-[10px] sm:text-sm font-medium text-slate-400">Days</span></p>
        </div>
        
        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 bg-yellow-400 rounded-bl-2xl text-white">
            <Star size={14} fill="currentColor" />
          </div>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase mb-1">POINTS</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{progress.points}</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 bg-blue-500 rounded-bl-2xl text-white">
            <CheckCircle2 size={14} fill="currentColor" />
          </div>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase mb-1">PROGRESS</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{progress.completedDays.length}/100</p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-2 bg-green-500 rounded-bl-2xl text-white">
            <GraduationCap size={14} />
          </div>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase mb-1">LEARNED</p>
          <p className="text-2xl sm:text-3xl font-black text-slate-800">{totalLearned}</p>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Your Journey</h2>
          <span className="text-orange-600 font-bold font-mono text-sm">{Math.round(progressPercentage)}% COMPLETE</span>
        </div>
        <div className="h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <motion.div 
            className="h-full bg-gradient-to-r from-orange-500 to-orange-400"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <p className="text-slate-500 font-bold text-sm">Showing Days {startIndex + 1}-{Math.min(startIndex + lessonsPerPage, curriculum.length)}</p>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="flex items-center gap-1 px-3 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-500">
            {currentPage + 1} / {totalPages}
          </div>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-xl bg-white border border-slate-100 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {visibleLessons.map((lesson) => {
            const isCompleted = progress.completedDays.includes(lesson.day);
            const isNext = lesson.day === (progress.completedDays.length + 1);
            const isLocked = !isCompleted && !isNext && lesson.day > (progress.completedDays.length + 1);

            return (
              <motion.button
                key={lesson.day}
                whileHover={isLocked ? {} : { scale: 1.02 }}
                whileTap={isLocked ? {} : { scale: 0.98 }}
                onClick={() => !isLocked && onSelectDay(lesson.day)}
                className={`text-left p-6 rounded-3xl border-2 transition-all duration-300 flex items-center justify-between
                  ${isCompleted ? 'bg-white border-green-100 shadow-sm' : 
                    isNext ? 'bg-white border-orange-500 shadow-lg shadow-orange-100 ring-4 ring-orange-50' : 
                    'bg-slate-50 border-slate-100 opacity-60 grayscale cursor-not-allowed'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg
                    ${isCompleted ? 'bg-green-100 text-green-600' : 
                      isNext ? 'bg-orange-500 text-white' : 
                      'bg-slate-200 text-slate-400'}
                  `}>
                    {lesson.day}
                  </div>
                  <div>
                    <p className={`text-xs font-bold font-mono uppercase tracking-widest mb-1
                      ${isCompleted ? 'text-green-500' : 
                        isNext ? 'text-orange-500' : 
                        'text-slate-400'}
                    `}>
                      {lesson.category}
                    </p>
                    <h3 className="font-bold text-slate-800">{lesson.title}</h3>
                  </div>
                </div>
                
                <div className={isCompleted ? 'text-green-500' : isNext ? 'text-orange-500' : 'text-slate-400'}>
                  {isCompleted ? <CheckCircle2 size={24} /> : 
                    isLocked ? <Lock size={20} /> : 
                    <ChevronRight size={24} />}
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
