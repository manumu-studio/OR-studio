// HamburgerToggleButton — three animated bars that morph into X on toggle
'use client';

import { motion, type Variants } from 'framer-motion';

import { useNav } from '@/providers/NavProvider';

import type { HamburgerToggleButtonProps } from './HamburgerToggleButton.types';
import styles from './HamburgerToggleButton.module.scss';

export function HamburgerToggleButton({
  gapBetweenLines = 6,
  lineWidth = '30px',
  className = '',
}: HamburgerToggleButtonProps) {
  const { isNavOpen, toggleNav } = useNav();

  // — Animation variants for top line
  const topLineVariants: Variants = {
    closed: { rotate: 0, y: '-50%', top: `calc(50% - ${String(gapBetweenLines)}px)` },
    open: { rotate: 45, y: '-50%', top: '50%' },
  };

  // — Animation variants for middle line
  const middleLineVariants: Variants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  // — Animation variants for bottom line
  const bottomLineVariants: Variants = {
    closed: { rotate: 0, y: '-50%', top: `calc(50% + ${String(gapBetweenLines)}px)` },
    open: { rotate: -45, y: '-50%', top: '50%' },
  };

  const animationState = isNavOpen ? 'open' : 'closed';

  return (
    <button
      type="button"
      className={`${styles.hamburgerButton} ${className}`}
      onClick={toggleNav}
      aria-label={isNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
      aria-expanded={isNavOpen}
      aria-controls="main-navigation"
    >
      {/* Top line */}
      <motion.span
        className={styles.line}
        style={{ width: lineWidth }}
        variants={topLineVariants}
        initial="closed"
        animate={animationState}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Middle line */}
      <motion.span
        className={styles.line}
        style={{ width: lineWidth }}
        variants={middleLineVariants}
        initial="closed"
        animate={animationState}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Bottom line */}
      <motion.span
        className={styles.line}
        style={{ width: lineWidth }}
        variants={bottomLineVariants}
        initial="closed"
        animate={animationState}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </button>
  );
}
