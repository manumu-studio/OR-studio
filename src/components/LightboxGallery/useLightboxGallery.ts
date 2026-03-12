// useLightboxGallery — manages gallery navigation, keyboard controls, and touch gestures.

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const SWIPE_THRESHOLD = 50;

interface UseLightboxGalleryOptions {
  totalImages: number;
  initialIndex: number;
}

export function useLightboxGallery({ totalImages, initialIndex }: UseLightboxGalleryOptions) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalImages - 1));
  }, [totalImages]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < totalImages - 1 ? prev + 1 : 0));
  }, [totalImages]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        goToPrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        goToNext();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext]);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (touch) {
      touchStartX.current = touch.clientX;
    }
  }, []);

  const handleTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      if (touchStartX.current === null) return;

      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX.current;
      touchStartX.current = null;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    },
    [goToNext, goToPrevious],
  );

  return {
    currentIndex,
    goToPrevious,
    goToNext,
    handleTouchStart,
    handleTouchEnd,
  };
}
