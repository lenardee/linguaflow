'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { READING_PASSAGES } from '@/lib/data/passages';
import { useUserStore } from '@/lib/store/userStore';
import { formatTime, calcWPM } from '@/lib/utils/analysis';
import { cn } from '@/lib/utils/cn';
import { useToast } from '@/lib/hooks/useToast';
import type { ComprehensionQuestion } from '@/types';

const LEVEL_COLORS: Record<string, string> = {
  A2: 'bg-green-100 text-green-800',
  B1: 'bg-blue-100 text-blue-800',
  B2: 'bg-orange-100 text-orange-800',
  C1: 'bg-purple-100 text-purple-800',
};

function QuestionItem({
  q, selectedIndex, revealed, onSelect,
}: {
  q: ComprehensionQuestion; selectedIndex: number | null; revealed: boolean; onSelect: (i: number) => void;
}) {
  return (
    <div className="p-4 border-b border-brand-cream-2 last:border-b-0">
      <p className="text-[15px] font-semibold text-foreground mb-3">{q.question}</p>
      <div className="flex flex-col gap-2">
        {q.options.map((opt, i) => {
          const isSelected = selectedIndex === i;
          const isCorrect  = revealed && i === q.correctIndex;
          const isWrong    = revealed && isSelected && i !== q.correctIndex;
          return (
            <button
              key={i}
              disabled={revealed}
              onClick={() => onSelect(i)}
              className={cn(
                'text-left px-4 py-2.5 rounded-xl border-2 text-[15px] transition-all duration-150',
                isCorrect  ? 'border-brand-green bg-brand-green-lt text-brand-green font-semibold' :
                isWrong    ? 'border-red-400 bg-red-50 text-red-700' :
                isSelected ? 'border-navy-600 bg-blue-50' :
                'border-brand-cream-2 bg-brand-cream hover:border-navy-400'
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReadingClient() {
  const [activeIdx, setActiveIdx]     = useState(0);
  const [answers, setAnswers]         = useState<Record<string, number>>({});
  const [revealed, setRevealed]       = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [seconds, setSeconds]         = useState(0);
  const [showVocab, setShowVocab]     = useState<{ word: string; def: string } | null>(null);
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null);

  const addXP            = useUserStore((s) => s.addXP);
  const saveResult       = useUserStore((s) => s.saveReadingResult);
  const incrementSession = useUserStore((s) => s.incrementSession);
  const { toast }        = useToast();

  const passage = READING_PASSAGES[activeIdx];

  function toggleTimer() {
    if (timerActive) {
      clearInterval(timerRef.current!);
      setTimerActive(false);
    } else {
      setTimerActive(true);
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    }
  }

  function loadPassage(idx: number) {
    clearInterval(timerRef.current!);
    setActiveIdx(idx);
    setAnswers({});
    setRevealed(false);
    setTimerActive(false);
    setSeconds(0);
  }

  function checkAnswers() {
    let correct = 0;
    passage.questions.forEach((q) => { if (answers[q.id] === q.correctIndex) correct++; });
    const total = passage.questions.length;
    const score = Math.round((correct / total) * 100);
    setRevealed(true);
    const xp = score === 100 ? 50 : score >= 66 ? 30 : 10;
    addXP(xp, 'reading');
    incrementSession('reading');
    saveResult({ passageId: passage.id, answers, score, completedAt: new Date().toISOString() });
    toast(`${correct}/${total} correct! +${xp} XP`, score === 100 ? 'success' : 'info');
  }

  const handleBodyClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.vocab) {
      setShowVocab({ word: target.dataset.vocab, def: target.dataset.def ?? '' });
      setTimeout(() => setShowVocab(null), 3000);
    }
  }, []);

  const wpm = calcWPM(passage.wordCount, seconds);

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-brand-cream border-b border-brand-cream-2 px-5 py-5">
        <h1 className="font-display text-[28px] font-bold text-navy-600">📖 Reading</h1>
        <p className="text-[15px] text-muted-foreground mt-0.5">Read passages &amp; test your comprehension</p>
      </div>

      {/* Passage selector */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto scrollbar-hide">
        {READING_PASSAGES.map((p, i) => (
          <button
            key={p.id}
            onClick={() => loadPassage(i)}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full border-2 text-[14px] font-semibold transition-all',
              i === activeIdx
                ? 'border-navy-600 bg-navy-600 text-white'
                : 'border-brand-cream-2 bg-white text-muted-foreground hover:border-navy-400'
            )}
          >
            {p.level} · {p.topic}
          </button>
        ))}
      </div>

      {/* Passage card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={passage.id}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="mx-4 bg-white rounded-2xl shadow-m overflow-hidden border border-brand-cream-2"
        >
          <div className="px-5 pt-5 pb-4 border-b border-brand-cream-2">
            <div className="flex flex-wrap gap-2 items-center">
              <span className={cn('font-code text-[11px] px-2.5 py-1 rounded-full font-medium', LEVEL_COLORS[passage.level] ?? 'bg-gray-100 text-gray-600')}>{passage.level}</span>
              <span className="font-code text-[11px] px-2.5 py-1 rounded-full bg-brand-orange-lt text-brand-orange font-medium">{passage.topic}</span>
              <span className="font-code text-[11px] px-2.5 py-1 rounded-full bg-brand-green-lt text-brand-green font-medium">~{passage.wordCount} words</span>
            </div>
            <h2 className="font-display text-[20px] font-bold text-navy-600 mt-3 leading-snug">{passage.title}</h2>
          </div>

          <div
            className="passage-body px-5 py-5"
            onClick={handleBodyClick}
            dangerouslySetInnerHTML={{ __html: passage.bodyHtml }}
          />

          {/* Timer bar */}
          <div className="flex items-center gap-3 px-5 py-3 bg-brand-cream border-t border-brand-cream-2">
            <span className="text-[14px] text-muted-foreground">⏱</span>
            <span className="font-code text-[20px] font-medium text-navy-600">{formatTime(seconds)}</span>
            <button
              onClick={toggleTimer}
              className={cn('px-4 py-1.5 rounded-full text-[13px] font-semibold transition-colors', timerActive ? 'bg-brand-orange text-white' : 'bg-navy-600 text-white')}
            >
              {timerActive ? 'Stop' : seconds > 0 ? 'Resume' : 'Start'}
            </button>
            {wpm > 0 && <span className="ml-auto font-code text-[12px] text-muted-foreground">~{wpm} WPM</span>}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Vocab tooltip */}
      <AnimatePresence>
        {showVocab && (
          <motion.div
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="fixed bottom-[calc(var(--nav-height,72px)+16px)] left-4 right-4 z-50 bg-navy-600 text-white px-4 py-3 rounded-xl shadow-l text-[14px]"
          >
            <span className="font-semibold">{showVocab.word}:</span> {showVocab.def}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Comprehension */}
      <div className="mx-4 mt-4 mb-6 bg-white rounded-2xl overflow-hidden shadow-s border border-brand-cream-2">
        <div className="px-5 py-3.5 bg-navy-600">
          <h3 className="font-display text-[17px] text-white font-bold">📝 Comprehension Check</h3>
        </div>
        {passage.questions.map((q) => (
          <QuestionItem
            key={q.id} q={q}
            selectedIndex={answers[q.id] ?? null}
            revealed={revealed}
            onSelect={(idx) => { if (!revealed) setAnswers((prev) => ({ ...prev, [q.id]: idx })); }}
          />
        ))}
        <div className="px-5 py-4 flex items-center gap-4 border-t border-brand-cream-2">
          <button
            onClick={checkAnswers}
            disabled={revealed || Object.keys(answers).length < passage.questions.length}
            className="px-5 py-2.5 rounded-full text-[15px] font-semibold bg-navy-600 text-white hover:bg-navy-500 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Answers
          </button>
          {revealed && (
            <span className="font-code text-[13px] text-muted-foreground">
              {passage.questions.filter((q) => answers[q.id] === q.correctIndex).length}/{passage.questions.length} correct
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
