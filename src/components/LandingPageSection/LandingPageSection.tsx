// LandingPageSection — hero section with auto-rotating background images.
// Images cycle every 4s with crossfade transitions. Pauses on hover/focus for a11y.
// Title/subtitle entrance animations (v1): scaleX line, fade-in + slide-up.

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import { useLandingCarousel } from './useLandingCarousel';
import type { LandingPageSectionProps } from './LandingPageSection.types';
import styles from './LandingPageSection.module.scss';

export function LandingPageSection({ images, title, subtitle }: LandingPageSectionProps) {
  const { currentIndex, pause, resume } = useLandingCarousel(images.length);
  const shouldReduceMotion = useReducedMotion();
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);
  const currentImage = images[currentIndex];

  if (!currentImage) return null;

  const imageUrl = currentImage.url ?? '';
  const altText = currentImage.alt ?? 'OR Studio architectural visualization';

  const handleImageLoad = () => {
    if (!firstImageLoaded) setFirstImageLoaded(true);
  };

  return (
    <section
      className={styles.hero}
      tabIndex={0}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      aria-label="Hero showcase"
    >
      <div className={styles.imageContainer}>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            className={styles.imageWrapper}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.2, ease: 'easeInOut' }}
          >
            <Image
              loader={cloudinaryLoader}
              src={imageUrl}
              alt={altText}
              fill
              sizes="100vw"
              priority={currentIndex === 0}
              className={styles.image}
              onLoad={handleImageLoad}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {firstImageLoaded && (
        <motion.div className={styles.content} initial={false} animate={{ opacity: 1 }}>
          <motion.div
            className={styles.titleLine}
            initial={shouldReduceMotion ? false : { scaleX: 0 }}
            animate={shouldReduceMotion ? false : { scaleX: 1 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 1.5, ease: 'easeOut' }}
          />
          <motion.h1
            className={styles.title}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { delay: 0.5, duration: 1, ease: 'easeOut' }
            }
          >
            {title}
          </motion.h1>
          <motion.p
            className={styles.subtitle}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 50 }}
            animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
            transition={
              shouldReduceMotion ? { duration: 0 } : { delay: 1, duration: 1, ease: 'easeOut' }
            }
          >
            {subtitle}
          </motion.p>
        </motion.div>
      )}
    </section>
  );
}
