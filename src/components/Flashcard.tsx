import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCw, Volume2, CheckCircle2 } from 'lucide-react';
import { VocabularyItem } from '../types';
import { speakText } from '../services/geminiService';

interface FlashcardProps {
  item: VocabularyItem;
  isLearned: boolean;
  onToggleLearned: (id: string) => void;
}

export const Flashcard: React.FC<FlashcardProps> = ({ item, isLearned, onToggleLearned }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpeaking(true);
    await speakText(item.spanish);
    setIsSpeaking(false);
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleLearned(item.id);
  };

  return (
    <div className="perspective-1000 w-full max-w-sm h-72 mx-auto mb-8 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="relative w-full h-full transition-all duration-500 preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 border-2 border-orange-50">
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={handleSpeak}
              className={`p-2 rounded-full transition-colors ${isSpeaking ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-500 hover:bg-orange-100'}`}
            >
              <Volume2 size={20} />
            </button>
            <button 
              onClick={handleToggle}
              className={`p-2 rounded-full transition-colors ${isLearned ? 'bg-green-500 text-white' : 'bg-slate-50 text-slate-300 hover:bg-slate-100'}`}
            >
              <CheckCircle2 size={20} />
            </button>
          </div>
          
          <span className="text-orange-500 font-medium text-sm mb-4 uppercase tracking-widest font-mono">Spanish</span>
          <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">{item.spanish}</h2>
          <div className="flex items-center text-gray-400 text-xs font-mono">
            <RotateCw size={14} className="mr-2" />
            CLICK TO FLIP
          </div>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-orange-500 rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 text-white rotate-y-180"
        >
          <span className="text-orange-200 font-medium text-sm mb-4 uppercase tracking-widest font-mono">English</span>
          <h2 className="text-3xl font-bold text-center mb-4">{item.english}</h2>
          <div className="w-full h-px bg-white/20 my-4" />
          <div className="text-center">
            <p className="italic text-orange-50 mb-1">"{item.exampleSpanish}"</p>
            <p className="text-orange-100 text-sm">{item.exampleEnglish}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
