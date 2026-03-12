// useLandingCarousel — manages auto-rotating image index with pause on hover/focus.

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const INTERVAL_MS = 4000;

export function useLandingCarousel(imageCount: number) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  }, [imageCount]);

  useEffect(() => {
    if (isPaused || imageCount <= 1) return;

    intervalRef.current = setInterval(advance, INTERVAL_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advance, isPaused, imageCount]);

  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => setIsPaused(false), []);

  return { currentIndex, pause, resume };
}
