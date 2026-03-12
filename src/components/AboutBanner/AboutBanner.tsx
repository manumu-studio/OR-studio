// AboutBanner — full-viewport about teaser with dark background, centered text,
// and "More about us" link. V1 design: no background image, clean and minimal.

'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useReducedMotion } from 'framer-motion';

import type { AboutBannerProps } from './AboutBanner.types';
import styles from './AboutBanner.module.scss';

export function AboutBanner({ text }: AboutBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const shouldReduceMotion = useReducedMotion();

  return (
    <section ref={sectionRef} className={styles.section} aria-label="About OR Studio">
      <motion.div
        className={styles.content}
        initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
        animate={
          isInView
            ? { opacity: 1, y: 0 }
            : shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 40 }
        }
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
      >
        <p className={styles.text}>{text}</p>

        <Link href="/about" className={styles.button}>
          More about us
        </Link>
      </motion.div>
    </section>
  );
}
