import { UserProgress } from './types';

const STORAGE_KEY = 'habla30_progress';

const DEFAULT_PROGRESS: UserProgress = {
  completedDays: [],
  streak: 0,
  lastCompletedDate: null,
  points: 0,
  learnedVocabIds: [],
  learnedPhraseIds: [],
};

export const getProgress = (): UserProgress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return DEFAULT_PROGRESS;
  try {
    const parsed = JSON.parse(stored);
    return {
      ...DEFAULT_PROGRESS,
      ...parsed
    };
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = (progress: UserProgress) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

export const completeDay = (day: number) => {
  const progress = getProgress();
  if (progress.completedDays.includes(day)) return progress;

  const today = new Date().toISOString().split('T')[0];
  let newStreak = progress.streak;

  if (progress.lastCompletedDate) {
    const lastDate = new Date(progress.lastCompletedDate);
    const currDate = new Date(today);
    const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      newStreak += 1;
    } else if (diffDays > 1) {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  const newProgress: UserProgress = {
    ...progress,
    completedDays: [...progress.completedDays, day],
    streak: newStreak,
    lastCompletedDate: today,
    points: progress.points + 100,
  };

  saveProgress(newProgress);
  return newProgress;
};

export const toggleLearnedItem = (id: string, type: 'vocab' | 'phrase') => {
  const progress = getProgress();
  const field = type === 'vocab' ? 'learnedVocabIds' : 'learnedPhraseIds';
  const currentList = progress[field];
  
  const newList = currentList.includes(id) 
    ? currentList.filter(i => i !== id)
    : [...currentList, id];

  const newProgress = {
    ...progress,
    [field]: newList
  };
  
  saveProgress(newProgress);
  return newProgress;
};
