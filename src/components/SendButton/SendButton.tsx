// SendButton — animated submit button with arrow icon.
// Expands on hover/focus to reveal action. Respects prefers-reduced-motion.

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { SendButtonProps } from './SendButton.types';
import { SendButtonIcon } from './SendButtonIcon';
import { containerVariants, arrowVariants } from './SendButton.motion';
import styles from './SendButton.module.scss';

export function SendButton({
  label = 'Send',
  direction = 'up',
  sizeRem = 2.5,
  expandedWidthRem = 7,
  submit = true,
  onClick,
  disabled = false,
  isSubmitting = false,
  forceExpanded = false,
  className,
}: SendButtonProps) {
  const prefersReduced = useReducedMotion();
  const buttonType = submit ? 'submit' : 'button';
  const ariaLabel = isSubmitting ? 'Sending...' : label;

  const variants = prefersReduced ? undefined : containerVariants(expandedWidthRem, sizeRem);
  const iconVariants = prefersReduced ? undefined : arrowVariants;

  return (
    <motion.button
      type={buttonType}
      className={`${styles.sendButton} ${className ?? ''}`}
      disabled={disabled || isSubmitting}
      aria-label={ariaLabel}
      onClick={onClick}
      style={{ height: `clamp(2rem, 6vw, ${sizeRem}rem)` }}
      initial="rest"
      animate={forceExpanded ? 'expand' : 'rest'}
      variants={variants}
      whileHover={prefersReduced ? undefined : 'expand'}
      whileFocus={prefersReduced ? undefined : 'expand'}
    >
      {/* Focus ring for WCAG 2.4.7 */}
      <span className={styles.focusRing} aria-hidden="true" />

      <span className={styles.content}>
        <motion.span className={styles.iconWrap} variants={iconVariants} aria-hidden="true">
          <SendButtonIcon direction={direction} />
        </motion.span>
      </span>
    </motion.button>
  );
}
