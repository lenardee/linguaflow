'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SpeechSynthesisHookResult } from '@/types';

export function useSpeechSynthesis(): SpeechSynthesisHookResult {
  const [isSpeaking, setIsSpeaking]             = useState(false);
  const [isPaused, setIsPaused]                 = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(-1);
  const isSupported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => { if (isSupported) window.speechSynthesis.cancel(); };
  }, [isSupported]);

  const speak = useCallback((text: string, rate = 1) => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text);
    u.rate = rate; u.pitch = 1; u.lang = 'en-US'; u.volume = 1;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Samantha') || v.name.includes('Google US') || v.name.includes('Alex'))
    );
    if (preferred) u.voice = preferred;

    u.onboundary = (event: SpeechSynthesisEvent) => {
      if (event.name === 'word') {
        const words = text.split(/\s+/);
        let cum = 0;
        for (let i = 0; i < words.length; i++) {
          cum += words[i].length + 1;
          if (cum > event.charIndex) { setCurrentWordIndex(i); break; }
        }
      }
    };

    u.onstart = () => { setIsSpeaking(true); setIsPaused(false); setCurrentWordIndex(0); };
    u.onend   = () => { setIsSpeaking(false); setIsPaused(false); setCurrentWordIndex(-1); };
    u.onerror = () => { setIsSpeaking(false); setIsPaused(false); setCurrentWordIndex(-1); };

    window.speechSynthesis.speak(u);
  }, [isSupported]);

  const stop = useCallback(() => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false); setIsPaused(false); setCurrentWordIndex(-1);
  }, [isSupported]);

  const pause = useCallback(() => {
    if (!isSupported || !isSpeaking) return;
    window.speechSynthesis.pause(); setIsPaused(true);
  }, [isSupported, isSpeaking]);

  const resume = useCallback(() => {
    if (!isSupported || !isPaused) return;
    window.speechSynthesis.resume(); setIsPaused(false);
  }, [isSupported, isPaused]);

  return { speak, stop, pause, resume, isSpeaking, isPaused, isSupported, currentWordIndex };
}
