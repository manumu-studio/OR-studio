// LogoPreloader — full-screen animated logo shown on first visit per session
'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { AnimatedLogo } from '@/components/AnimatedLogo';

import type { LogoPreloaderProps } from './LogoPreloader.types';
import styles from './LogoPreloader.module.scss';

// — Session storage key to track if preloader has been shown
const PRELOADER_SHOWN_KEY = 'or-preloader-shown';

export function LogoPreloader({
  duration = 2.5,
  logoSize = 100,
  className = '',
}: LogoPreloaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // Only show preloader on first visit per session
    const alreadyShown = sessionStorage.getItem(PRELOADER_SHOWN_KEY);
    if (alreadyShown) return;

    sessionStorage.setItem(PRELOADER_SHOWN_KEY, 'true');
    setIsVisible(true);

    // Reduced motion: shorter display (500ms static logo, then fade)
    // Normal motion: full animation duration
    const displayTime = prefersReduced ? 500 : duration * 1000;

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, displayTime);

    return () => window.clearTimeout(timer);
  }, [duration, prefersReduced]);

  // — Lock body scroll while preloader is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={`${styles.preloaderContainer} ${className}`}
          role="status"
          aria-label="Loading"
          aria-live="polite"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReduced ? 0.3 : 0.8,
            ease: 'easeInOut',
          }}
        >
          <AnimatedLogo
            size={logoSize}
            stroke="#ffffff"
            fill="#ffffff"
            strokeWidth={1.5}
            animate={!prefersReduced}
            animateFill={!prefersReduced}
            highRes
            className={styles.logo}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
