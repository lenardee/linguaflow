'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SkillId, UserStats, ComprehensionResult, WritingSession, SpeakingAttempt, SkillProgress } from '@/types';

interface UserStoreState {
  stats: UserStats;
  readingHistory:  ComprehensionResult[];
  writingHistory:  WritingSession[];
  speakingHistory: SpeakingAttempt[];
}

interface UserStoreActions {
  addXP: (amount: number, skill: SkillId) => void;
  updateStreak: () => void;
  incrementSession: (skill: SkillId) => void;
  addWrittenWords: (count: number) => void;
  addMinutes: (minutes: number) => void;
  saveReadingResult: (result: ComprehensionResult) => void;
  saveWritingSession: (session: WritingSession) => void;
  saveSpeakingAttempt: (attempt: SpeakingAttempt) => void;
}

type UserStore = UserStoreState & UserStoreActions;

const defaultSkill = (): SkillProgress => ({ xp: 0, level: 1, sessionsCompleted: 0 });

const defaultStats = (): UserStats => ({
  totalXP: 0, streak: 0, lastVisitDate: '',
  totalWords: 0, totalMinutes: 0, totalSessions: 0,
  skills: { reading: defaultSkill(), writing: defaultSkill(), listening: defaultSkill(), speaking: defaultSkill() },
});

function computeLevel(xp: number): number {
  return Math.floor(xp / 200) + 1;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      stats: defaultStats(),
      readingHistory: [],
      writingHistory: [],
      speakingHistory: [],

      addXP: (amount, skill) => set((s) => {
        const curr = s.stats.skills[skill];
        const newXP = curr.xp + amount;
        return { stats: { ...s.stats, totalXP: s.stats.totalXP + amount, skills: { ...s.stats.skills, [skill]: { ...curr, xp: newXP, level: computeLevel(newXP) } } } };
      }),

      updateStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const { lastVisitDate, streak } = get().stats;
        if (lastVisitDate === today) return;
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().split('T')[0];
        const newStreak = lastVisitDate === yesterday ? streak + 1 : 1;
        set((s) => ({ stats: { ...s.stats, streak: newStreak, lastVisitDate: today } }));
      },

      incrementSession: (skill) => set((s) => ({
        stats: { ...s.stats, totalSessions: s.stats.totalSessions + 1, skills: { ...s.stats.skills, [skill]: { ...s.stats.skills[skill], sessionsCompleted: s.stats.skills[skill].sessionsCompleted + 1 } } },
      })),

      addWrittenWords: (count) => set((s) => ({ stats: { ...s.stats, totalWords: s.stats.totalWords + count } })),
      addMinutes: (minutes) => set((s) => ({ stats: { ...s.stats, totalMinutes: s.stats.totalMinutes + minutes } })),
      saveReadingResult: (result) => set((s) => ({ readingHistory: [result, ...s.readingHistory].slice(0, 50) })),
      saveWritingSession: (session) => set((s) => ({ writingHistory: [session, ...s.writingHistory].slice(0, 30) })),
      saveSpeakingAttempt: (attempt) => set((s) => ({ speakingHistory: [attempt, ...s.speakingHistory].slice(0, 50) })),
    }),
    {
      name: 'linguaflow-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectTotalXP       = (s: UserStore) => s.stats.totalXP;
export const selectStreak        = (s: UserStore) => s.stats.streak;
export const selectTotalSessions = (s: UserStore) => s.stats.totalSessions;
export const selectTotalWords    = (s: UserStore) => s.stats.totalWords;
export const selectTotalMinutes  = (s: UserStore) => s.stats.totalMinutes;
export const selectSkillProgress = (skill: SkillId) => (s: UserStore) => s.stats.skills[skill];
