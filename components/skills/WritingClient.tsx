'use client';

import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { WRITING_PROMPTS } from '@/lib/data/prompts';
import { useWritingAnalysis } from '@/lib/utils/analysis';
import { useUserStore } from '@/lib/store/userStore';
import { cn } from '@/lib/utils/cn';
import { useToast } from '@/lib/hooks/useToast';

export function WritingClient() {
  const [promptIdx, setPromptIdx]     = useState(0);
  const [text, setText]               = useState('');
  const [timerActive, setTimerActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [savedCount, setSavedCount]   = useState(0);
  const timerRef                      = useRef<ReturnType<typeof setInterval> | null>(null);

  const analysis = useWritingAnalysis(text);
  const prompt   = WRITING_PROMPTS[promptIdx];
  const addXP    = useUserStore((s) => s.addXP);
  const addWords = useUserStore((s) => s.addWrittenWords);
  const save     = useUserStore((s) => s.saveWritingSession);
  const increment = useUserStore((s) => s.incrementSession);
  const { toast } = useToast();

  const timerPct = Math.round((secondsLeft / 300) * 100);

  const toggleTimer = useCallback(() => {
    if (timerActive) {
      clearInterval(timerRef.current!);
      setTimerActive(false);
    } else {
      setTimerActive(true);
      timerRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            clearInterval(timerRef.current!);
            setTimerActive(false);
            toast("⏰ Time's up! Great session!", 'success');
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
  }, [timerActive, toast]);

  function newPrompt() {
    clearInterval(timerRef.current!);
    setPromptIdx((i) => (i + 1) % WRITING_PROMPTS.length);
    setText('');
    setTimerActive(false);
    setSecondsLeft(300);
    toast('New prompt loaded!', 'info');
  }

  function saveSession() {
    if (analysis.wordCount < 10) { toast('Write at least 10 words first!', 'warning'); return; }
    const xp = Math.min(Math.round(analysis.wordCount * 0.2) + 20, 150);
    addXP(xp, 'writing');
    addWords(analysis.wordCount);
    increment('writing');
    save({ promptId: prompt.id, text, wordCount: analysis.wordCount, savedAt: new Date().toISOString() });
    setSavedCount((c) => c + 1);
    toast(`Saved! +${xp} XP 🎉`, 'success');
  }

  return (
    <div className="min-h-full">
      <div className="sticky top-0 z-10 bg-brand-cream border-b border-brand-cream-2 px-5 py-5">
        <h1 className="font-display text-[28px] font-bold text-navy-600">✍️ Writing</h1>
        <p className="text-[15px] text-muted-foreground mt-0.5">Express yourself with timed prompts</p>
      </div>

      {/* Prompt card */}
      <div className="mx-4 mt-4">
        <motion.div
          key={prompt.id}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl p-5 relative overflow-hidden shadow-m"
        >
          <span aria-hidden className="absolute right-2 top-[-24px] font-display text-[110px] text-white/[0.06] leading-none pointer-events-none">&quot;</span>
          <p className="font-code text-[10px] text-white/60 tracking-widest uppercase mb-2">📌 Writing Prompt</p>
          <p className="font-display text-[19px] italic text-white leading-snug">{prompt.text}</p>
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="font-code text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">{prompt.level}</span>
            <span className="font-code text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">{prompt.type}</span>
            <span className="font-code text-[11px] px-2.5 py-1 rounded-full bg-white/15 text-white/80">Target: {prompt.targetWords} words</span>
            <button
              onClick={newPrompt}
              className="ml-auto text-[13px] font-semibold bg-white/20 text-white border border-white/30 rounded-full px-3 py-1 hover:bg-white/30 transition-colors"
            >
              ↺ New Prompt
            </button>
          </div>
        </motion.div>
      </div>

      {/* Timer bar */}
      <div className="mx-4 mt-3 h-1 bg-brand-cream-2 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-[width] duration-1000"
          style={{ width: `${timerPct}%`, background: timerPct < 25 ? 'var(--orange,#C9541C)' : 'linear-gradient(90deg,#3A6B47,#C9541C)' }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap">
        <span className="font-code text-[12px] text-muted-foreground bg-brand-cream-2 rounded-full px-2.5 py-1">{analysis.wordCount} words</span>
        <span className="font-code text-[12px] text-muted-foreground bg-brand-cream-2 rounded-full px-2.5 py-1">{analysis.sentenceCount} sentences</span>
        <span className="font-code text-[12px] text-muted-foreground bg-brand-cream-2 rounded-full px-2.5 py-1">{analysis.charCount} chars</span>
        <div className="ml-auto flex gap-2">
          <button
            onClick={toggleTimer}
            className={cn('text-[13px] font-semibold rounded-full px-3.5 py-1.5 transition-colors', timerActive ? 'bg-brand-orange text-white' : 'bg-brand-green text-white hover:bg-brand-green-hov')}
          >
            {timerActive ? `⏱ ${Math.floor(secondsLeft / 60)}:${String(secondsLeft % 60).padStart(2, '0')}` : '⏱ 5 min'}
          </button>
          <button
            onClick={() => { if (text.trim().length < 20 || window.confirm('Clear your writing?')) setText(''); }}
            className="text-[13px] font-semibold rounded-full px-3.5 py-1.5 bg-navy-600 text-white hover:bg-navy-500 transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Textarea */}
      <textarea
        className="w-[calc(100%-2rem)] mx-4 min-h-[200px] p-4 resize-y border-2 border-brand-cream-2 rounded-2xl font-body text-[17px] leading-[1.8] text-foreground bg-white focus:outline-none focus:border-navy-600 transition-colors shadow-s placeholder:text-muted-foreground"
        placeholder={`Begin writing here...\n\nAim for at least ${prompt.targetWords} words.`}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      {/* Live analysis */}
      <div className="mx-4 mt-3 bg-white rounded-2xl p-4 shadow-s border border-brand-cream-2">
        <h3 className="font-display text-[17px] font-bold text-navy-600 mb-3">Live Analysis</h3>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { value: analysis.wordCount, label: 'Words' },
            { value: analysis.sentenceCount, label: 'Sentences' },
            { value: analysis.avgSentenceLength, label: 'Avg Len' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center p-3 bg-brand-cream rounded-xl">
              <div className="font-display text-[24px] font-bold text-navy-600">{value}</div>
              <div className="font-code text-[11px] text-muted-foreground uppercase tracking-wide mt-0.5">{label}</div>
            </div>
          ))}
        </div>
        <p className="text-[14px] text-muted-foreground leading-relaxed">{analysis.feedback}</p>
      </div>

      {/* Tips */}
      {prompt.tips.length > 0 && (
        <div className="mx-4 mt-3 bg-brand-gold-lt rounded-2xl p-4 border border-amber-200">
          <p className="font-code text-[11px] text-brand-gold tracking-widest uppercase mb-2">💡 Tips for this prompt</p>
          <ul className="space-y-1.5">
            {prompt.tips.map((tip, i) => (
              <li key={i} className="text-[14px] text-foreground flex gap-2">
                <span className="text-brand-gold mt-0.5">•</span>{tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Save button */}
      <div className="px-4 mt-4 mb-6">
        <button
          onClick={saveSession}
          className="w-full py-3.5 rounded-2xl text-[16px] font-bold transition-all bg-brand-orange text-white hover:bg-brand-orange-hov shadow-m hover:shadow-l hover:-translate-y-0.5"
        >
          💾 Save &amp; Earn XP
          {savedCount > 0 && (
            <span className="ml-2 font-code text-[12px] bg-white/20 rounded-full px-2 py-0.5">Saved {savedCount}×</span>
          )}
        </button>
      </div>
    </div>
  );
}
