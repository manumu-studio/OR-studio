// HamburgerToggleButton — three animated bars that morph into X on toggle
'use client';

import { motion, type Variants } from 'framer-motion';

import { useMediaQuery } from '@/lib/useMediaQuery';
import { useNav } from '@/providers/NavProvider';

import type { HamburgerToggleButtonProps } from './HamburgerToggleButton.types';
import styles from './HamburgerToggleButton.module.scss';

export function HamburgerToggleButton({
  gapBetweenLines,
  lineWidth: _lineWidth,
  className = '',
}: HamburgerToggleButtonProps) {
  const { isNavOpen, toggleNav } = useNav();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const gap = gapBetweenLines ?? (isMobile ? 6 : 8);

  // — v1 pattern: top in style (plain CSS), Framer only for rotate + y + opacity
  const topLineVariants: Variants = {
    closed: { rotate: 0, x: '-50%', y: '-50%' },
    open: { rotate: 45, x: '-50%', y: '-50%' },
  };

  const middleLineVariants: Variants = {
    closed: { opacity: 1, x: '-50%', y: '-50%' },
    open: { opacity: 0, x: '-50%', y: '-50%' },
  };

  const bottomLineVariants: Variants = {
    closed: { rotate: 0, x: '-50%', y: '-50%' },
    open: { rotate: -45, x: '-50%', y: '-50%' },
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
      {/* Top line — v1: top in style, Framer for rotate + y; width from CSS (responsive) */}
      <motion.span
        className={styles.line}
        style={{
          top: isNavOpen ? '50%' : `calc(50% - ${gap}px)`,
        }}
        variants={topLineVariants}
        initial="closed"
        animate={animationState}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Middle line — v1: no top (centers naturally), Framer for opacity only */}
      <motion.span
        className={styles.line}
        style={{ top: '50%' }}
        variants={middleLineVariants}
        initial="closed"
        animate={animationState}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />

      {/* Bottom line — v1: top in style, Framer for rotate + y */}
      <motion.span
        className={styles.line}
        style={{
          top: isNavOpen ? '50%' : `calc(50% + ${gap}px)`,
        }}
        variants={bottomLineVariants}
        initial="closed"
        animate={animationState}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      />
    </button>
  );
}
