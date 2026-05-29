'use client';

import './intro-motion.css';

import { useCallback, useEffect, useRef, useState } from 'react';

const STORAGE_KEY = 'raptova-intro-seen';
const REPLAY_QUERY_KEY = 'replay-intro';
const FALLBACK_COMPLETE_MS = 5500;

type IntroPhase = 'pending' | 'playing' | 'hidden';

function shouldForceReplay() {
  if (typeof window === 'undefined') {
    return false;
  }

  return new URLSearchParams(window.location.search).get(REPLAY_QUERY_KEY) === '1';
}

function shouldSkipIntro() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const forceReplay = shouldForceReplay();
  let seen = false;

  try {
    seen = sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    // ignore storage errors
  }

  return !forceReplay && (reducedMotion || seen);
}

export default function IntroMotion() {
  const [phase, setPhase] = useState<IntroPhase>('pending');
  const introRef = useRef<HTMLDivElement>(null);
  const fallbackTimerRef = useRef<number | null>(null);

  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  const completeIntro = useCallback(() => {
    clearFallbackTimer();
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    document.body.style.overflow = '';
    setPhase('hidden');
  }, [clearFallbackTimer]);

  const skipIntro = useCallback(() => {
    completeIntro();
  }, [completeIntro]);

  useEffect(() => {
    if (shouldSkipIntro()) {
      setPhase('hidden');
      return;
    }

    setPhase('playing');
    document.body.style.overflow = 'hidden';

    fallbackTimerRef.current = window.setTimeout(() => {
      completeIntro();
    }, FALLBACK_COMPLETE_MS);

    return () => {
      clearFallbackTimer();
      document.body.style.overflow = '';
    };
  }, [clearFallbackTimer, completeIntro]);

  useEffect(() => {
    if (phase !== 'playing') {
      return;
    }

    const intro = introRef.current;
    if (!intro) {
      return;
    }

    const handleAnimationEnd = (event: AnimationEvent) => {
      if (event.target === intro && event.animationName === 'introSampleOut') {
        completeIntro();
      }
    };

    intro.addEventListener('animationend', handleAnimationEnd);

    return () => {
      intro.removeEventListener('animationend', handleAnimationEnd);
    };
  }, [completeIntro, phase]);

  if (phase === 'hidden') {
    return null;
  }

  if (phase === 'pending') {
    return (
      <div className="intro-motion-root" aria-hidden="true">
        <div className="intro-pending" />
      </div>
    );
  }

  return (
    <div className="intro-motion-root">
      <div
        ref={introRef}
        className="intro"
        role="presentation"
        aria-hidden="true"
        onClick={skipIntro}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            skipIntro();
          }
        }}
      >
        <div className="intro-inner">
          <div className="intro-brand">RAPTOVA</div>
          <div className="intro-title">Make Work Move.</div>
          <div className="intro-sub-group copy-ja">
            <div className="intro-sub intro-sub-line1">未来の話で終わらせない。</div>
            <div className="intro-sub intro-sub-line2">目の前にある仕事から変えていく。</div>
          </div>
        </div>
      </div>
    </div>
  );
}
