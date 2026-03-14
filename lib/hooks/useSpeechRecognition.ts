'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { SpeechRecognitionHookResult } from '@/types';

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface ISpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  onstart: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => ISpeechRecognition;
    webkitSpeechRecognition?: new () => ISpeechRecognition;
  }
}

export function useSpeechRecognition(lang = 'en-US'): SpeechRecognitionHookResult {
  const [transcript, setTranscript]               = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isListening, setIsListening]             = useState(false);
  const [error, setError]                         = useState<string | null>(null);
  const recognitionRef                            = useRef<ISpeechRecognition | null>(null);

  const isSupported =
    typeof window !== 'undefined' &&
    !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    const recognition = new SR();
    recognition.continuous     = false;
    recognition.interimResults = true;
    recognition.lang           = lang;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => { setIsListening(true); setError(null); };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let final = ''; let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) final += r[0].transcript;
        else interim += r[0].transcript;
      }
      if (final) setTranscript((p) => p + final);
      setInterimTranscript(interim);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      setIsListening(false);
      const msgs: Record<string, string> = {
        'not-allowed': 'Microphone access denied. Enable it in browser settings.',
        'no-speech':   'No speech detected. Please try again.',
        'network':     'Network error. Check your connection.',
      };
      setError(msgs[event.error] ?? `Error: ${event.error}`);
    };

    recognition.onend = () => { setIsListening(false); setInterimTranscript(''); };

    recognitionRef.current = recognition;
    return () => { recognition.abort(); };
  }, [lang]);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isListening) return;
    setTranscript(''); setInterimTranscript(''); setError(null);
    try { recognitionRef.current.start(); } catch { setError('Could not start. Please try again.'); }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (!recognitionRef.current || !isListening) return;
    recognitionRef.current.stop();
  }, [isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript(''); setInterimTranscript(''); setError(null);
  }, []);

  return { transcript, interimTranscript, isListening, isSupported, startListening, stopListening, resetTranscript, error };
}
