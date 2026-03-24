// LightboxGallery — full-screen image gallery with navigation, gestures, and a11y.
// Renders inside ModalShell. Uses next/image with Cloudinary loader.

'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import type { LightboxGalleryProps } from './LightboxGallery.types';
import { useLightboxGallery } from './useLightboxGallery';
import styles from './LightboxGallery.module.scss';

const getSlideVariants = (reduceMotion: boolean) => ({
  enter: (direction: number) =>
    reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? 100 : -100 },
  center: reduceMotion ? { opacity: 1 } : { opacity: 1, x: 0 },
  exit: (direction: number) =>
    reduceMotion ? { opacity: 0 } : { opacity: 0, x: direction > 0 ? -100 : 100 },
});

export function LightboxGallery({ images, initialIndex = 0, onClose }: LightboxGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const directionRef = useRef(0);
  const { currentIndex, goToPrevious, goToNext, handleTouchStart, handleTouchEnd } =
    useLightboxGallery({
      totalImages: images.length,
      initialIndex,
    });

  const currentImage = images[currentIndex];
  const slideVariants = getSlideVariants(shouldReduceMotion ?? false);

  const handlePrevious = () => {
    directionRef.current = -1;
    goToPrevious();
  };

  const handleNext = () => {
    directionRef.current = 1;
    goToNext();
  };

  if (!currentImage) return null;

  return (
    <div className={styles.gallery} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <button
        type="button"
        onClick={onClose}
        className={styles.closeButton}
        aria-label="Close gallery"
      >
        ✕
      </button>

      <div className={styles.counter} aria-live="polite">
        {currentIndex + 1} / {images.length}
      </div>

      <div className={styles.imageContainer}>
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={currentImage.id}
            custom={directionRef.current}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.3,
              ease: 'easeInOut',
            }}
            className={styles.imageWrapper}
          >
            <Image
              loader={cloudinaryLoader}
              src={currentImage.url ?? ''}
              alt={currentImage.alt ?? `Gallery image ${currentIndex + 1}`}
              width={currentImage.width ?? 1200}
              height={currentImage.height ?? 800}
              sizes="95vw"
              priority
              className={styles.image}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrevious}
            className={`${styles.navButton} ${styles.navPrevious}`}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={handleNext}
            className={`${styles.navButton} ${styles.navNext}`}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
