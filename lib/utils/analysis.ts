'use client';

import { useMemo } from 'react';
import type { WritingAnalysis } from '@/types';

export function analyzeWriting(text: string): WritingAnalysis {
  const trimmed = text.trim();
  if (!trimmed) {
    return { wordCount: 0, sentenceCount: 0, avgSentenceLength: 0, charCount: 0, paragraphCount: 0, feedback: 'Start writing to see real-time feedback.' };
  }
  const words      = trimmed.split(/\s+/).filter(Boolean);
  const sentences  = (trimmed.match(/[.!?]+/g) ?? []).length;
  const paragraphs = trimmed.split(/\n\n+/).filter((p) => p.trim()).length;
  const avgLen     = sentences > 0 ? Math.round(words.length / sentences) : 0;

  let feedback = '';
  if (words.length < 30) {
    feedback = '📝 Good start! Develop your idea further — aim for at least 100 words.';
  } else if (words.length < 80) {
    feedback = `✅ ${words.length} words written — keep going! Target at least 150 words.`;
  } else if (words.length < 150) {
    feedback = avgLen > 25
      ? `⚠️ Sentences averaging ${avgLen} words is quite long. Try breaking some up.`
      : `👍 Great progress! Sentence length (${avgLen} words avg) is in the ideal range.`;
  } else {
    if (avgLen > 25) feedback = `📊 Excellent length! Watch sentence length — averaging ${avgLen} words.`;
    else if (paragraphs < 3) feedback = `🌟 ${words.length} words! Consider breaking into at least 3 paragraphs.`;
    else feedback = `🌟 Outstanding! ${words.length} words, ${paragraphs} paragraphs, ${avgLen} avg sentence length.`;
  }

  return { wordCount: words.length, sentenceCount: sentences, avgSentenceLength: avgLen, charCount: trimmed.length, paragraphCount: paragraphs, feedback };
}

export function useWritingAnalysis(text: string): WritingAnalysis {
  return useMemo(() => analyzeWriting(text), [text]);
}

export function scorePronunciation(target: string, spoken: string) {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z\s]/g, '').trim();
  const tWords = norm(target).split(/\s+/).filter(Boolean);
  const sWords = norm(spoken).split(/\s+/).filter(Boolean);

  let matches = 0;
  tWords.forEach((w) => { if (sWords.includes(w)) matches++; });
  const accuracy = Math.min(100, Math.round((matches / tWords.length) * 100));

  const lengthRatio = Math.min(sWords.length, tWords.length) / Math.max(sWords.length, tWords.length || 1);
  const fluency = Math.min(100, Math.round(lengthRatio * 80 + Math.random() * 20));

  const tNorm = norm(target);
  const sNorm = norm(spoken);
  let charMatches = 0;
  for (let i = 0; i < Math.min(tNorm.length, sNorm.length); i++) {
    if (tNorm[i] === sNorm[i]) charMatches++;
  }
  const clarity = Math.min(100, Math.round((charMatches / Math.max(tNorm.length, sNorm.length, 1)) * 100));
  const overall = Math.round((accuracy + fluency + clarity) / 3);

  return { accuracy, fluency, clarity, overall };
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export function calcWPM(wordCount: number, seconds: number): number {
  if (seconds < 5) return 0;
  return Math.round(wordCount / (seconds / 60));
}
