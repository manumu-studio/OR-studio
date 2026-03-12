// SectionWrapper — triggers fade-in animation when section scrolls into viewport
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import type { SectionWrapperProps } from './SectionWrapper.types';
import styles from './SectionWrapper.module.scss';

export function SectionWrapper({
  children,
  id,
  className = '',
  threshold = 0.15,
  triggerOnce = true,
  duration = 0.5,
  disableAnimation = false,
  role = 'region',
  ariaLabel,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const hasAnimated = useRef(false);
  const prefersReduced = useReducedMotion();

  // — Intersection Observer callback
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const entry = entries[0];
      if (!entry) return;

      if (entry.isIntersecting) {
        setIsInView(true);
        if (triggerOnce) {
          hasAnimated.current = true;
        }
      } else if (!triggerOnce && !hasAnimated.current) {
        setIsInView(false);
      }
    },
    [triggerOnce],
  );

  // — Set up IntersectionObserver
  useEffect(() => {
    const element = sectionRef.current;
    if (!element || disableAnimation || prefersReduced) {
      // Show content immediately if animation is disabled or reduced motion preferred
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(handleIntersection, {
      threshold,
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, disableAnimation, prefersReduced, handleIntersection]);

  // — Determine if we should skip animation
  const skipAnimation = disableAnimation || prefersReduced;

  return (
    <motion.section
      ref={sectionRef}
      id={id}
      className={`${styles.sectionWrapper} ${className}`}
      role={role}
      aria-label={ariaLabel}
      initial={skipAnimation ? false : { opacity: 0, y: 40 }}
      animate={
        skipAnimation
          ? { opacity: 1, y: 0 }
          : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
      }
      transition={{ duration: skipAnimation ? 0 : duration, ease: 'easeOut' }}
    >
      {children}
    </motion.section>
  );
}
