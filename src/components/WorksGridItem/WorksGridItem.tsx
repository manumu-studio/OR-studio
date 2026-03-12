// WorksGridItem — wraps grid children with intersection-based staggered fade-in.
// Uses Framer Motion for animation with prefers-reduced-motion support.

'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { WorksGridItemProps } from './WorksGridItem.types';
import styles from './WorksGridItem.module.scss';

const MAX_STAGGER_DELAY = 0.6;
const STAGGER_INCREMENT = 0.08;

export function WorksGridItem({ children, index }: WorksGridItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const shouldReduceMotion = useReducedMotion();

  const delay = Math.min(index * STAGGER_INCREMENT, MAX_STAGGER_DELAY);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
      animate={isInView ? (shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }) : undefined}
      transition={{
        duration: shouldReduceMotion ? 0.15 : 0.5,
        delay,
        ease: 'easeOut',
      }}
      className={styles.gridItem}
    >
      {children}
    </motion.div>
  );
}
