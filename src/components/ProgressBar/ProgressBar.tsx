// ProgressBar — carousel progress segment that animates 0→100% when active.
'use client';

import { motion } from 'framer-motion';

import type { ProgressBarProps } from './ProgressBar.types';
import styles from './ProgressBar.module.scss';

export function ProgressBar({
  isActive,
  duration,
  onClick,
  ariaLabel = 'Progress bar',
}: ProgressBarProps) {
  const animateWidth = isActive ? '100%' : '0%';
  const transition = isActive
    ? { duration: duration / 1000, ease: 'linear' as const }
    : { duration: 0 };

  return (
    <div
      className={styles.progressWrapper}
      onClick={onClick}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className={styles.progressBar}
        initial={{ width: '0%' }}
        animate={{ width: animateWidth }}
        transition={transition}
      />
    </div>
  );
}
