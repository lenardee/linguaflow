'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPEAKING_SENTENCES } from '@/lib/data/tracks';
import { useSpeechRecognition } from '@/lib/hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis';
import { scorePronunciation } from '@/lib/utils/analysis';
import { useUserStore } from '@/lib/store/userStore';
import { cn } from '@/lib/utils/cn';
import { useToast } from '@/lib/hooks/useToast';
import type { PronunciationScore } from '@/types';

function ScoreBar({ label, value, color }: { label: string; value: number | null; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-code text-[12px] text-muted-foreground uppercase tracking-wide w-20 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-brand-cream-2 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}, #C9541C)` }}
          initial={{ width: 0 }}
          animate={{ width: value != null ? `${value}%` : '0%' }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
      <span className="font-code text-[14px] font-medium text-navy-600 w-9 text-right">
        {value != null ? `${value}%` : '—'}
      </span>
    </div>
  );
}

export function SpeakingClient() {
  const [idx, setIdx]           = useState(0);
  const [scores, setScores]     = useState<PronunciationScore | null>(null);
  const [attempts, setAttempts] = useState(0);

  const { transcript, isListening, isSupported, startListening, stopListening, resetTranscript, error } = useSpeechRecognition();
  const { speak, isSpeaking }   = useSpeechSynthesis();
  const addXP                   = useUserStore((s) => s.addXP);
  const saveAttempt             = useUserStore((s) => s.saveSpeakingAttempt);
  const increment               = useUserStore((s) => s.incrementSession);
  const { toast }               = useToast();

  const sentence = SPEAKING_SENTENCES[idx];

  function goTo(newIdx: number) {
    stopListening();
    setIdx(newIdx);
    setScores(null);
    resetTranscript();
  }

  function listenToTarget() {
    speak(sentence.text, 0.9);
    toast('🔊 Playing target sentence...', 'info');
  }

  function toggleRecording() {
    if (!isSupported) {
      toast('Speech recognition requires Chrome or Edge.', 'warning');
      return;
    }
    if (isListening) {
      stopListening();
      if (transcript.trim()) {
        const computed = scorePronunciation(sentence.text, transcript);
        setScores(computed);
        setAttempts((a) => a + 1);
        increment('speaking');
        const xp = computed.overall >= 90 ? 50 : computed.overall >= 75 ? 30 : 10;
        addXP(xp, 'speaking');
        saveAttempt({ sentenceId: sentence.id, transcript, scores: computed, recordedAt: new Date().toISOString() });
        const msg =
          computed.overall >= 90 ? `Excellent! ${computed.overall}% overall · +${xp} XP 🌟` :
          computed.overall >= 75 ? `Great job! ${computed.overall}% overall · +${xp} XP 👍` :
          `Keep practicing! ${computed.overall}% overall · +${xp} XP 💪`;
        toast(msg, computed.overall >= 75 ? 'success' : 'info');
      }
    } else {
      resetTranscript();
      setScores(null);
      startListening();
    }
  }

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-brand-cream border-b border-brand-cream-2 px-5 py-5">
        <h1 className="font-display text-[28px] font-bold text-navy-600">🎤 Speaking</h1>
        <p className="text-[15px] text-muted-foreground mt-0.5">Speak clearly — we&apos;re listening</p>
      </div>

      {/* Sentence nav */}
      <div className="flex items-center justify-between px-4 py-3">
        <button onClick={() => goTo(Math.max(0, idx - 1))} disabled={idx === 0}
          className="w-9 h-9 rounded-full border-2 border-brand-cream-2 bg-white flex items-center justify-center text-[16px] disabled:opacity-30 hover:border-navy-600 hover:bg-navy-600 hover:text-white transition-all"
        >←</button>
        <span className="font-code text-[13px] text-muted-foreground">{idx + 1} / {SPEAKING_SENTENCES.length}</span>
        <button onClick={() => goTo(Math.min(SPEAKING_SENTENCES.length - 1, idx + 1))} disabled={idx === SPEAKING_SENTENCES.length - 1}
          className="w-9 h-9 rounded-full border-2 border-brand-cream-2 bg-white flex items-center justify-center text-[16px] disabled:opacity-30 hover:border-navy-600 hover:bg-navy-600 hover:text-white transition-all"
        >→</button>
      </div>

      {/* Main card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="mx-4 bg-white rounded-2xl shadow-m overflow-hidden border border-brand-cream-2"
        >
          <div className="bg-gradient-to-br from-brand-purple to-[#4A2D6E] px-5 pt-6 pb-5 text-center">
            <button
              onClick={toggleRecording}
              className={cn(
                'w-20 h-20 rounded-full border-2 mx-auto mb-4 flex items-center justify-center text-[36px] transition-all duration-200',
                isListening ? 'bg-red-500/30 border-red-400 animate-pulse-ring' : 'bg-white/10 border-white/20 hover:bg-white/20'
              )}
              aria-label={isListening ? 'Stop recording' : 'Start recording'}
            >🎤</button>
            <p className="font-display text-[20px] italic text-white leading-snug px-2">&quot;{sentence.text}&quot;</p>
            <p className="font-code text-[12px] text-white/50 mt-2">{isListening ? '🔴 Recording...' : '[ tap mic to record ]'}</p>
            <p className="font-code text-[11px] text-white/40 mt-1">{sentence.difficulty}</p>
          </div>

          <div className="flex items-center justify-center gap-3 py-4 border-b border-brand-cream-2 flex-wrap px-4">
            <button onClick={listenToTarget} disabled={isSpeaking}
              className="px-4 py-2 rounded-full text-[14px] font-semibold bg-brand-green text-white hover:bg-brand-green-hov transition-colors disabled:opacity-50"
            >🔊 Hear It</button>
            <button onClick={toggleRecording}
              className={cn('px-4 py-2 rounded-full text-[14px] font-semibold border-2 transition-all',
                isListening ? 'border-red-500 bg-red-500 text-white' : 'border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white'
              )}
            >{isListening ? '⏹ Stop' : '🔴 Record'}</button>
            <button onClick={() => goTo(Math.min(SPEAKING_SENTENCES.length - 1, idx + 1))}
              className="px-4 py-2 rounded-full text-[14px] font-semibold bg-brand-cream-2 text-foreground hover:bg-brand-cream transition-colors"
            >Next →</button>
          </div>

          <div className="px-5 py-4">
            <p className="font-code text-[11px] text-muted-foreground uppercase tracking-widest mb-2">Your speech</p>
            <div className="min-h-[48px] p-3 bg-brand-cream rounded-xl border border-brand-cream-2 text-[17px] leading-relaxed">
              {transcript || (
                <span className="text-muted-foreground italic">{error || 'Press Record and speak the sentence above.'}</span>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Scores */}
      <div className="mx-4 mt-4 bg-white rounded-2xl p-5 shadow-s border border-brand-cream-2">
        <h3 className="font-display text-[17px] font-bold text-navy-600 mb-4">Pronunciation Score</h3>
        <div className="space-y-3">
          <ScoreBar label="Accuracy" value={scores?.accuracy ?? null} color="#5B3F7A" />
          <ScoreBar label="Fluency"  value={scores?.fluency  ?? null} color="#5B3F7A" />
          <ScoreBar label="Clarity"  value={scores?.clarity  ?? null} color="#5B3F7A" />
        </div>
        {scores && (
          <div className="mt-4 pt-4 border-t border-brand-cream-2 flex items-center gap-3">
            <span className="font-display text-[28px] font-bold text-navy-600">{scores.overall}%</span>
            <span className="text-[14px] text-muted-foreground">Overall · Attempt {attempts}</span>
          </div>
        )}
      </div>

      {/* Tip */}
      <div className="mx-4 mt-4 mb-6 p-4 bg-brand-gold-lt rounded-2xl border border-amber-200">
        <p className="font-code text-[11px] text-brand-gold uppercase tracking-widest mb-2">💡 Pronunciation Tip</p>
        <p className="text-[15px] text-foreground leading-relaxed">{sentence.tip}</p>
        <div className="flex gap-2 flex-wrap mt-3">
          {sentence.focusAreas.map((area) => (
            <span key={area} className="font-code text-[11px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">{area}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
