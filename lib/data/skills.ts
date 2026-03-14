import type { SkillMeta } from '@/types';

export const SKILLS: SkillMeta[] = [
  { id: 'reading',   label: 'Reading',   emoji: '📖', color: '#1A2744', lightColor: '#D6DDED', href: '/reading' },
  { id: 'writing',   label: 'Writing',   emoji: '✍️',  color: '#C9541C', lightColor: '#FDE8DC', href: '/writing' },
  { id: 'listening', label: 'Listening', emoji: '🎧', color: '#3A6B47', lightColor: '#D8EDE0', href: '/listening' },
  { id: 'speaking',  label: 'Speaking',  emoji: '🎤', color: '#5B3F7A', lightColor: '#E5DCF0', href: '/speaking' },
];

export const XP_REWARDS = {
  readingComplete: 30,
  readingPerfect: 50,
  writingSave: 20,
  listeningComplete: 25,
  speakingAttempt: 10,
  speakingGoodScore: 30,
  speakingExcellentScore: 50,
} as const;
