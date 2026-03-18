// Zustand Store for SVA Foundation Progress
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface ModuleProgress {
  completed: boolean;
  score: number;
  attempts: number;
  lastAttempt: Date | null;
  timeSpent: number; // in seconds
  questionsAnswered: number;
  questionsCorrect: number;
}

export interface SVAState {
  // Progress tracking
  modules: Record<string, ModuleProgress>;
  currentModuleId: string | null;
  overallScore: number;
  isProficient: boolean;
  startedAt: Date | null;
  completedAt: Date | null;
  
  // Current session
  currentQuestion: number;
  sessionAnswers: Record<number, { selected: number; correct: boolean }>;
  
  // Actions
  startModule: (moduleId: string) => void;
  completeModule: (moduleId: string, score: number, timeSpent: number) => void;
  updateProgress: (moduleId: string, data: Partial<ModuleProgress>) => void;
  setCurrentQuestion: (index: number) => void;
  recordAnswer: (questionIndex: number, selected: number, correct: boolean) => void;
  resetSession: () => void;
  checkProficiency: () => boolean;
  getTotalProgress: () => number;
  getModuleProgress: (moduleId: string) => ModuleProgress;
  resetAllProgress: () => void;
}

const initialModuleProgress: ModuleProgress = {
  completed: false,
  score: 0,
  attempts: 0,
  lastAttempt: null,
  timeSpent: 0,
  questionsAnswered: 0,
  questionsCorrect: 0,
};

export const useSVAStore = create<SVAState>()(
  persist(
    (set, get) => ({
      // Initial state
      modules: {},
      currentModuleId: null,
      overallScore: 0,
      isProficient: false,
      startedAt: null,
      completedAt: null,
      currentQuestion: 0,
      sessionAnswers: {},

      // Start a new module
      startModule: (moduleId: string) => {
        set((state) => ({
          currentModuleId: moduleId,
          currentQuestion: 0,
          sessionAnswers: {},
          startedAt: state.startedAt || new Date(),
          modules: {
            ...state.modules,
            [moduleId]: {
              ...(state.modules[moduleId] || initialModuleProgress),
              attempts: (state.modules[moduleId]?.attempts || 0) + 1,
            },
          },
        }));
      },

      // Complete a module with score
      completeModule: (moduleId: string, score: number, timeSpent: number) => {
        set((state) => {
          const newModules = {
            ...state.modules,
            [moduleId]: {
              ...state.modules[moduleId],
              completed: score >= 70, // Minimum 70% to complete
              score,
              lastAttempt: new Date(),
              timeSpent: (state.modules[moduleId]?.timeSpent || 0) + timeSpent,
              questionsAnswered: Object.keys(state.sessionAnswers).length,
              questionsCorrect: Object.values(state.sessionAnswers).filter(a => a.correct).length,
            },
          };

          // Calculate overall score (average of completed modules)
          const completedModules = Object.values(newModules).filter(m => m.completed);
          const overallScore = completedModules.length > 0
            ? completedModules.reduce((sum, m) => sum + m.score, 0) / completedModules.length
            : 0;

          // Check if user is proficient (85%+ on module 5)
          const finalModuleScore = newModules['sva-5']?.score || 0;
          const isProficient = finalModuleScore >= 85;

          return {
            modules: newModules,
            overallScore,
            isProficient,
            completedAt: isProficient ? new Date() : state.completedAt,
          };
        });
      },

      // Update module progress
      updateProgress: (moduleId: string, data: Partial<ModuleProgress>) => {
        set((state) => ({
          modules: {
            ...state.modules,
            [moduleId]: {
              ...(state.modules[moduleId] || initialModuleProgress),
              ...data,
            },
          },
        }));
      },

      // Set current question index
      setCurrentQuestion: (index: number) => {
        set({ currentQuestion: index });
      },

      // Record an answer
      recordAnswer: (questionIndex: number, selected: number, correct: boolean) => {
        set((state) => ({
          sessionAnswers: {
            ...state.sessionAnswers,
            [questionIndex]: { selected, correct },
          },
        }));
      },

      // Reset current session
      resetSession: () => {
        set({
          currentQuestion: 0,
          sessionAnswers: {},
        });
      },

      // Check if user is proficient
      checkProficiency: () => {
        const state = get();
        const finalModuleScore = state.modules['sva-5']?.score || 0;
        return finalModuleScore >= 85;
      },

      // Get total progress percentage
      getTotalProgress: () => {
        const state = get();
        const totalModules = 5;
        const completedModules = Object.values(state.modules).filter(m => m.completed).length;
        return (completedModules / totalModules) * 100;
      },

      // Get specific module progress
      getModuleProgress: (moduleId: string) => {
        const state = get();
        return state.modules[moduleId] || initialModuleProgress;
      },

      // Reset all progress (for testing or fresh start)
      resetAllProgress: () => {
        set({
          modules: {},
          currentModuleId: null,
          overallScore: 0,
          isProficient: false,
          startedAt: null,
          completedAt: null,
          currentQuestion: 0,
          sessionAnswers: {},
        });
      },
    }),
    {
      name: 'sva-progress-storage', // LocalStorage key
      storage: createJSONStorage(() => localStorage),
      // Only persist certain fields
      partialize: (state) => ({
        modules: state.modules,
        overallScore: state.overallScore,
        isProficient: state.isProficient,
        startedAt: state.startedAt,
        completedAt: state.completedAt,
      }),
    }
  )
);

// Helper hooks for common use cases
export const useIsProficient = () => useSVAStore((state) => state.isProficient);
export const useCurrentModule = () => useSVAStore((state) => state.currentModuleId);
export const useTotalProgress = () => useSVAStore((state) => state.getTotalProgress());
export const useModuleScore = (moduleId: string) => 
  useSVAStore((state) => state.modules[moduleId]?.score || 0);
