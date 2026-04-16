import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, PenTool, Sparkles, ChevronRight, Volume2, CheckCircle2 } from 'lucide-react';
import { DayLesson, UserProgress } from '../types';
import { Flashcard } from './Flashcard';
import { QuizView } from './QuizView';
import { AITutor } from './AITutor';
import { toggleLearnedItem, getProgress } from '../utils';
import { speakText } from '../services/geminiService';

interface LessonViewProps {
  lesson: DayLesson;
  onBack: () => void;
  onComplete: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ lesson, onBack, onComplete }) => {
  const [view, setView] = useState<'intro' | 'vocabulary' | 'phrases' | 'quiz'>('intro');
  const [vocabIndex, setVocabIndex] = useState(0);
  const [userProgress, setUserProgress] = useState<UserProgress>(getProgress());

  const handleToggleLearned = (id: string, type: 'vocab' | 'phrase') => {
    const newProgress = toggleLearnedItem(id, type);
    setUserProgress(newProgress);
  };

  const nextVocab = () => {
    if (vocabIndex < lesson.vocabulary.length - 1) {
      setVocabIndex(v => v + 1);
    } else {
      setView('phrases');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <ArrowLeft size={24} className="text-slate-600" />
          </button>
          <div className="text-center">
            <p className="text-[10px] font-bold font-mono text-orange-500 uppercase tracking-widest mb-0.5">DAY {lesson.day}</p>
            <h1 className="font-bold text-slate-800 tracking-tight text-sm sm:text-base">{lesson.title}</h1>
          </div>
          <div className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center font-bold text-sm">
            {lesson.day}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-12">
        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <Sparkles size={48} className="text-orange-500" />
              </div>
              <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Ready to learn?</h2>
              <p className="text-slate-500 mb-10 leading-relaxed font-medium">In this lesson, we'll cover {lesson.vocabulary.length} words and several key phrases to help you master {lesson.category.toLowerCase()}.</p>
              
              <div className="grid grid-cols-1 gap-4 text-left mb-10">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 group hover:border-orange-200 transition-all cursor-pointer" onClick={() => setView('vocabulary')}>
                  <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Learn Vocabulary</h3>
                    <p className="text-sm text-slate-500">Interactive flashcards for core words</p>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100 flex items-center gap-4 group hover:border-orange-200 transition-all cursor-pointer" onClick={() => setView('quiz')}>
                  <div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                    <PenTool size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800">Quick Quiz</h3>
                    <p className="text-sm text-slate-500">Test your knowledge immediately</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setView('vocabulary')}
                className="w-full bg-orange-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-orange-600 transition-colors shadow-xl shadow-orange-100"
              >
                START LESSON <ChevronRight size={24} />
              </button>
            </motion.div>
          )}

          {view === 'vocabulary' && (
            <motion.div
              key="vocabulary"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col items-center"
            >
              <div className="text-center mb-8 w-full">
                <p className="text-orange-500 font-bold font-mono text-xs uppercase tracking-[0.2em] mb-2">Word {vocabIndex + 1} of {lesson.vocabulary.length}</p>
                <div className="flex gap-1 justify-center mb-8">
                  {lesson.vocabulary.map((_, i) => (
                    <div 
                      key={i} 
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === vocabIndex ? 'w-8 bg-orange-500' : 'w-2 bg-slate-200'}`} 
                    />
                  ))}
                </div>
              </div>

              <Flashcard 
                item={lesson.vocabulary[vocabIndex]} 
                isLearned={userProgress.learnedVocabIds.includes(lesson.vocabulary[vocabIndex].id)}
                onToggleLearned={(id) => handleToggleLearned(id, 'vocab')}
              />

              <button
                onClick={nextVocab}
                className="w-full max-w-sm mt-8 bg-slate-800 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-900 transition-colors"
              >
                {vocabIndex < lesson.vocabulary.length - 1 ? 'NEXT WORD' : 'CONTINUE TO PHRASES'}
              </button>
            </motion.div>
          )}

          {view === 'phrases' && (
            <motion.div
              key="phrases"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-8 tracking-tight">Key Phrases</h2>
              {lesson.phrases.map((phrase) => {
                const isLearned = userProgress.learnedPhraseIds.includes(phrase.id);
                return (
                  <div key={phrase.id} className="bg-white p-6 rounded-3xl border border-slate-100 group hover:border-orange-200 transition-colors relative">
                    <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => speakText(phrase.spanish)}
                        className="p-2 bg-orange-50 text-orange-500 rounded-full hover:bg-orange-100"
                      >
                        <Volume2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleToggleLearned(phrase.id, 'phrase')}
                        className={`p-2 rounded-full transition-colors ${isLearned ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold text-orange-500 mb-1 pr-16">{phrase.spanish}</h3>
                    <p className="text-slate-600 font-medium">{phrase.english}</p>
                  </div>
                );
              })}
              <button
                onClick={() => setView('quiz')}
                className="w-full mt-10 bg-orange-500 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-orange-100"
              >
                READY FOR THE QUIZ?
              </button>
            </motion.div>
          )}

          {view === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <QuizView questions={lesson.quiz} onComplete={onComplete} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      
      <AITutor />
    </div>
  );
};
