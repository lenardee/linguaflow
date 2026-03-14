export type SkillId = 'reading' | 'writing' | 'listening' | 'speaking';
export type CefrLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
export type WritingType = 'Opinion' | 'Narrative' | 'Descriptive' | 'Argumentative' | 'Creative' | 'Report';

export interface SkillMeta {
  id: SkillId;
  label: string;
  emoji: string;
  color: string;
  lightColor: string;
  href: string;
}

export interface VocabWord {
  word: string;
  definition: string;
}

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export interface ReadingPassage {
  id: string;
  title: string;
  level: CefrLevel;
  topic: string;
  wordCount: number;
  bodyHtml: string;
  vocab: VocabWord[];
  questions: ComprehensionQuestion[];
}

export interface WritingPrompt {
  id: string;
  text: string;
  level: CefrLevel;
  type: WritingType;
  targetWords: number;
  tips: string[];
}

export interface WritingAnalysis {
  wordCount: number;
  sentenceCount: number;
  avgSentenceLength: number;
  charCount: number;
  paragraphCount: number;
  feedback: string;
}

export interface ListeningTrack {
  id: string;
  title: string;
  topic: string;
  level: CefrLevel;
  transcript: string;
  estimatedDuration: number;
  questions: ComprehensionQuestion[];
}

export interface SpeakingSentence {
  id: string;
  text: string;
  difficulty: CefrLevel;
  tip: string;
  focusAreas: string[];
}

export interface PronunciationScore {
  accuracy: number;
  fluency: number;
  clarity: number;
  overall: number;
}

export interface SkillProgress {
  xp: number;
  level: number;
  sessionsCompleted: number;
}

export interface UserStats {
  totalXP: number;
  streak: number;
  lastVisitDate: string;
  totalWords: number;
  totalMinutes: number;
  totalSessions: number;
  skills: Record<SkillId, SkillProgress>;
}

export interface ComprehensionResult {
  passageId: string;
  answers: Record<string, number>;
  score: number;
  completedAt: string;
}

export interface WritingSession {
  promptId: string;
  text: string;
  wordCount: number;
  savedAt: string;
}

export interface SpeakingAttempt {
  sentenceId: string;
  transcript: string;
  scores: PronunciationScore;
  recordedAt: string;
}

export interface SpeechRecognitionHookResult {
  transcript: string;
  interimTranscript: string;
  isListening: boolean;
  isSupported: boolean;
  startListening: () => void;
  stopListening: () => void;
  resetTranscript: () => void;
  error: string | null;
}

export interface SpeechSynthesisHookResult {
  speak: (text: string, rate?: number) => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
  isSpeaking: boolean;
  isPaused: boolean;
  isSupported: boolean;
  currentWordIndex: number;
}
