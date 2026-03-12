// WorkBanner — full-viewport featured project section with image carousel,
// progress bar, left/right arrows, and link to works page (v1 port).

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { IconButton } from '@/components/IconButton';
import { ProgressBar } from '@/components/ProgressBar';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import type { WorkBannerProps } from './WorkBanner.types';
import styles from './WorkBanner.module.scss';

const AUTOPLAY_MS = 5000;

export function WorkBanner({ project, images, index }: WorkBannerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const updateImageIndex = useCallback(() => {
    if (!isPaused && images.length > 0) {
      setCurrentImageIndex((p) => (p + 1) % images.length);
    }
  }, [images.length, isPaused]);

  const stopAutoPlay = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
  }, []);

  const handleProgressClick = useCallback(
    (idx: number) => {
      setCurrentImageIndex(idx);
      stopAutoPlay();
    },
    [stopAutoPlay],
  );

  const handlePrev = useCallback(() => {
    setCurrentImageIndex((p) => (p - 1 + images.length) % images.length);
    stopAutoPlay();
  }, [images.length, stopAutoPlay]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((p) => (p + 1) % images.length);
    stopAutoPlay();
  }, [images.length, stopAutoPlay]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        event.stopPropagation();
        setCurrentImageIndex((prev) =>
          event.key === 'ArrowRight'
            ? (prev + 1) % images.length
            : (prev - 1 + images.length) % images.length,
        );
        stopAutoPlay();
      }
    },
    [images.length, stopAutoPlay],
  );

  useEffect(() => {
    if (images.length > 1 && !isPaused) {
      intervalRef.current = setInterval(updateImageIndex, AUTOPLAY_MS);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length, isPaused, updateImageIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0]?.clientX ?? null;
    const deltaX = (touchStartX.current ?? 0) - (touchEndX.current ?? 0);
    if (deltaX > 50) {
      handleNext();
    } else if (deltaX < -50) {
      handlePrev();
    }
  };

  if (images.length === 0) return null;

  const currentImage = images[currentImageIndex];
  if (!currentImage) return null;

  return (
    <section
      className={`${styles.section} ${images.length > 1 ? styles.hasCarousel : ''}`}
      aria-label={`Featured: ${project.title}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* — Progress bar (v1, only when multiple images) */}
      {images.length > 1 && (
        <div className={styles.progressContainer}>
          {images.map((_, idx) => (
            <ProgressBar
              key={idx}
              isActive={idx === currentImageIndex}
              duration={5500}
              onClick={() => handleProgressClick(idx)}
              ariaLabel={`Slide ${idx + 1} of ${images.length}`}
            />
          ))}
        </div>
      )}

      {/* — Image carousel */}
      <div className={styles.carouselContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            className={styles.imageWrapper}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={{
              duration: shouldReduceMotion ? 0.15 : 0.3,
              ease: 'easeInOut',
            }}
          >
            {images.length > 1 && (
              <>
                <IconButton
                  direction="left"
                  width={3}
                  height={3}
                  onClick={handlePrev}
                  ariaLabel="Previous image"
                />
                <IconButton
                  direction="right"
                  width={3}
                  height={3}
                  onClick={handleNext}
                  ariaLabel="Next image"
                />
              </>
            )}

            <div className={styles.background}>
              <Image
                loader={cloudinaryLoader}
                src={currentImage.url ?? ''}
                alt={currentImage.alt ?? project.title}
                fill
                sizes="100vw"
                priority={currentImageIndex === 0}
                className={styles.image}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className={styles.overlay} aria-hidden="true" />

      {/* — Content overlay */}
      <motion.div
        className={styles.content}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          shouldReduceMotion
            ? { duration: 0 }
            : { duration: 0.8, ease: 'easeOut', delay: index * 0.15 }
        }
      >
        <h2 className={styles.title}>{project.title}</h2>
        {project.description && <p className={styles.description}>{project.description}</p>}
        <Link href="/works" className={styles.link}>
          View Project
        </Link>
      </motion.div>
    </section>
  );
}
