export type Category = 
  | 'Greetings & Introductions'
  | 'Daily Life'
  | 'Travel & Transport'
  | 'Food & Dining'
  | 'Family & People'
  | 'Work & School'
  | 'Common Verbs'
  | 'Essential Phrases';

export interface VocabularyItem {
  id: string;
  spanish: string;
  english: string;
  exampleSpanish: string;
  exampleEnglish: string;
}

export interface Phrase {
  id: string;
  spanish: string;
  english: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  type: 'multiple-choice' | 'match' | 'fill-blank';
}

export interface DayLesson {
  day: number;
  title: string;
  category: Category;
  vocabulary: VocabularyItem[];
  phrases: Phrase[];
  quiz: QuizQuestion[];
}

export interface UserProgress {
  completedDays: number[];
  streak: number;
  lastCompletedDate: string | null; // ISO string
  points: number;
  learnedVocabIds: string[];
  learnedPhraseIds: string[];
}
