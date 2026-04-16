import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, Trophy, ListRestart } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  
  // For matching type
  const [pairs, setPairs] = useState<{ left: string, right: string }[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    if (currentQuestion.type === 'match') {
      const options = currentQuestion.options; // Format: "Spanish:English"
      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      // Logic for matching UI (simplified for now)
    }
  }, [currentIndex]);

  const handleOptionSelect = (option: string) => {
    if (isCorrect !== null) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);

    setTimeout(() => {
      moveToNext();
    }, 1500);
  };

  const moveToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setIsCorrect(null);
      setSelectedLeft(null);
      setMatchedPairs([]);
    } else {
      setShowResult(true);
    }
  };

  if (showResult) {
    return (
      <motion.div 
        className="text-center p-8 bg-white rounded-3xl shadow-xl max-w-md mx-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <Trophy size={64} className="mx-auto text-yellow-500 mb-4" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Lesson Complete!</h2>
        <p className="text-slate-500 mb-6 font-medium">You scored {score} out of {questions.length}</p>
        <button
          onClick={onComplete}
          className="w-full bg-orange-500 text-white font-bold py-4 rounded-2xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
        >
          Return to Dashboard
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto w-full px-4 sm:px-0">
      <div className="mb-8 overflow-hidden h-2 bg-slate-100 rounded-full">
        <motion.div 
          className="h-full bg-orange-500"
          initial={{ width: 0 }}
          animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-orange-50"
        >
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-400 font-mono text-xs block tracking-widest uppercase">Question {currentIndex + 1} of {questions.length}</span>
            <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-tighter">{currentQuestion.type.replace('-', ' ')}</span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-8 leading-tight">{currentQuestion.question}</h3>

          {currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'fill-blank' ? (
            <div className="space-y-3 sm:space-y-4">
              {currentQuestion.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  disabled={isCorrect !== null}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl font-semibold border-2 transition-all duration-200 text-sm sm:text-base
                    ${selectedOption === option 
                      ? (isCorrect ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700')
                      : 'bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50 text-slate-700'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {selectedOption === option && (
                      isCorrect ? <CheckCircle2 size={24} className="text-green-500" /> : <XCircle size={24} className="text-red-500" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
               {/* Simplified Matching for Demo */}
               <p className="text-sm text-slate-500 italic mb-4">Select the correct translation to match</p>
               <div className="grid grid-cols-1 gap-2">
                 {currentQuestion.options.map((option) => (
                   <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    disabled={isCorrect !== null}
                    className={`w-full text-left p-4 rounded-xl font-semibold border-2 transition-all duration-200
                      ${selectedOption === option 
                        ? (isCorrect ? 'bg-green-50 border-green-500 text-green-700' : 'bg-red-50 border-red-500 text-red-700')
                        : 'bg-white border-slate-100 hover:border-orange-200 text-slate-700'
                      }
                    `}
                   >
                     {option}
                   </button>
                 ))}
               </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
