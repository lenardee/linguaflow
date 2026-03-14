'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LISTENING_TRACKS } from '@/lib/data/tracks';
import { useSpeechSynthesis } from '@/lib/hooks/useSpeechSynthesis';
import { useUserStore } from '@/lib/store/userStore';
import { formatTime } from '@/lib/utils/analysis';
import { cn } from '@/lib/utils/cn';
import { useToast } from '@/lib/hooks/useToast';
import type { ComprehensionQuestion } from '@/types';

function QuestionItem({ q, selected, revealed, onSelect }: { q: ComprehensionQuestion; selected: number | null; revealed: boolean; onSelect: (i: number) => void }) {
  return (
    <div className="p-4 border-b border-brand-cream-2 last:border-b-0">
      <p className="text-[15px] font-semibold mb-3">{q.question}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => (
          <button
            key={i} disabled={revealed} onClick={() => onSelect(i)}
            className={cn(
              'text-left px-4 py-2.5 rounded-xl border-2 text-[15px] transition-all',
              revealed && i === q.correctIndex ? 'border-brand-green bg-brand-green-lt text-brand-green font-semibold' :
              revealed && selected === i && i !== q.correctIndex ? 'border-red-400 bg-red-50 text-red-700' :
              selected === i ? 'border-navy-600 bg-blue-50' :
              'border-brand-cream-2 bg-brand-cream hover:border-navy-400'
            )}
          >{opt}</button>
        ))}
      </div>
    </div>
  );
}

export function ListeningClient() {
  const [trackIdx, setTrackIdx]   = useState(0);
  const [answers, setAnswers]     = useState<Record<string, number>>({});
  const [revealed, setRevealed]   = useState(false);
  const [elapsed, setElapsed]     = useState(0);
  const [speed, setSpeed]         = useState(1);
  const [hasEnded, setHasEnded]   = useState(false);
  const timerRef                  = useRef<ReturnType<typeof setInterval> | null>(null);

  const { speak, stop, isSpeaking, pause, resume, isPaused, currentWordIndex } = useSpeechSynthesis();
  const addXP     = useUserStore((s) => s.addXP);
  const increment = useUserStore((s) => s.incrementSession);
  const { toast } = useToast();

  const track    = LISTENING_TRACKS[trackIdx];
  const words    = track.transcript.split(' ');
  const progress = Math.min((elapsed / track.estimatedDuration) * 100, 100);

  useEffect(() => {
    if (isSpeaking && !isPaused) {
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      clearInterval(timerRef.current!);
    }
    return () => clearInterval(timerRef.current!);
  }, [isSpeaking, isPaused]);

  // Detect track end
  useEffect(() => {
    if (!isSpeaking && elapsed > 5 && !hasEnded) {
      setHasEnded(true);
      addXP(20, 'listening');
      increment('listening');
      toast('Listening complete! +20 XP 🎧', 'success');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpeaking]);

  function loadTrack(idx: number) {
    stop();
    setTrackIdx(idx);
    setAnswers({});
    setRevealed(false);
    setElapsed(0);
    setHasEnded(false);
  }

  function togglePlay() {
    if (isSpeaking) {
      isPaused ? resume() : pause();
    } else {
      setElapsed(0);
      setHasEnded(false);
      speak(track.transcript, speed);
    }
  }

  function checkAnswers() {
    let correct = 0;
    track.questions.forEach((q) => { if (answers[q.id] === q.correctIndex) correct++; });
    const score = Math.round((correct / track.questions.length) * 100);
    setRevealed(true);
    const xp = score >= 66 ? 25 : 10;
    addXP(xp, 'listening');
    toast(`${correct}/${track.questions.length} correct! +${xp} XP`, score >= 66 ? 'success' : 'info');
  }

  const SPEEDS = [0.75, 1, 1.25, 1.5];

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-brand-cream border-b border-brand-cream-2 px-5 py-5">
        <h1 className="font-display text-[28px] font-bold text-navy-600">🎧 Listening</h1>
        <p className="text-[15px] text-muted-foreground mt-0.5">Listen carefully &amp; answer questions</p>
      </div>

      {/* Track selector */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {LISTENING_TRACKS.map((t, i) => (
          <button key={t.id} onClick={() => loadTrack(i)}
            className={cn('flex-shrink-0 px-4 py-2 rounded-full border-2 text-[14px] font-semibold transition-all',
              i === trackIdx ? 'border-brand-green bg-brand-green text-white' : 'border-brand-cream-2 bg-white text-muted-foreground hover:border-brand-green'
            )}
          >{t.level} · {t.topic}</button>
        ))}
      </div>

      {/* Player */}
      <div className="mx-4 bg-white rounded-2xl shadow-m overflow-hidden border border-brand-cream-2">
        <div className="bg-gradient-to-br from-brand-green to-[#2D5C3F] px-5 pt-6 pb-5 text-center relative overflow-hidden">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(255,255,255,.08)_0%,transparent_60%)]" />
          {/* Wave bars */}
          <div className="flex items-center justify-center gap-1.5 mb-4">
            {[16, 28, 40, 52, 40, 28, 16].map((h, i) => (
              <div
                key={i}
                className="w-1 rounded-sm bg-white/60"
                style={{
                  height: h,
                  animation: isSpeaking && !isPaused ? `wave 0.8s ease-in-out infinite` : 'none',
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <h2 className="font-display text-[22px] font-bold text-white">{track.title}</h2>
          <p className="text-[13px] text-white/70 mt-1">{track.topic}</p>
          <div className="flex justify-center gap-2 mt-4">
            {SPEEDS.map((s) => (
              <button key={s} onClick={() => setSpeed(s)}
                className={cn('font-code text-[12px] px-3 py-1 rounded-full border transition-all',
                  speed === s ? 'bg-white/20 border-white text-white' : 'border-white/30 text-white/70 hover:border-white/60'
                )}
              >{s}×</button>
            ))}
          </div>
        </div>

        {/* Transport */}
        <div className="flex items-center justify-center gap-4 py-4 border-b border-brand-cream-2">
          <button onClick={() => { stop(); setElapsed(0); setHasEnded(false); }} className="w-11 h-11 rounded-full bg-brand-cream-2 flex items-center justify-center text-[18px] hover:bg-brand-cream transition-colors">⏮</button>
          <button onClick={togglePlay} className="w-14 h-14 rounded-full bg-navy-600 flex items-center justify-center text-[22px] text-white shadow-m hover:bg-navy-500 transition-colors">
            {isSpeaking && !isPaused ? '⏸' : '▶'}
          </button>
          <button onClick={() => { stop(); setElapsed(0); setHasEnded(false); speak(track.transcript, speed); }} className="w-11 h-11 rounded-full bg-brand-cream-2 flex items-center justify-center text-[18px] hover:bg-brand-cream transition-colors">↺</button>
        </div>

        {/* Progress */}
        <div className="px-5 pt-3 pb-1">
          <div className="h-1 bg-brand-cream-2 rounded-full overflow-hidden">
            <div className="h-full bg-brand-green rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="font-code text-[11px] text-muted-foreground">{formatTime(elapsed)}</span>
            <span className="font-code text-[11px] text-muted-foreground">{formatTime(track.estimatedDuration)}</span>
          </div>
        </div>

        {/* Transcript */}
        <div className="px-5 pb-4 max-h-[180px] overflow-y-auto text-[17px] leading-[1.85] text-foreground">
          {isSpeaking || currentWordIndex >= 0 ? (
            words.map((word, i) => (
              <span key={i} className={cn('transition-all duration-100', i === currentWordIndex && 'bg-brand-green-lt text-brand-green font-semibold rounded px-0.5')}>
                {word}{' '}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground italic">Press play to begin. The transcript will highlight as audio plays.</span>
          )}
        </div>
      </div>

      {/* Comprehension */}
      <div className="mx-4 mt-4 mb-6 bg-white rounded-2xl overflow-hidden shadow-s border border-brand-cream-2">
        <div className="px-5 py-3.5 bg-brand-green">
          <h3 className="font-display text-[17px] text-white font-bold">📝 Listening Comprehension</h3>
        </div>
        {track.questions.map((q) => (
          <QuestionItem key={q.id} q={q} selected={answers[q.id] ?? null} revealed={revealed}
            onSelect={(i) => { if (!revealed) setAnswers((a) => ({ ...a, [q.id]: i })); }}
          />
        ))}
        <div className="px-5 py-4 border-t border-brand-cream-2">
          <button
            onClick={checkAnswers}
            disabled={revealed || Object.keys(answers).length < track.questions.length}
            className="px-5 py-2.5 rounded-full text-[15px] font-semibold bg-brand-green text-white hover:bg-brand-green-hov transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >Check Answers</button>
        </div>
      </div>
    </div>
  );
}
