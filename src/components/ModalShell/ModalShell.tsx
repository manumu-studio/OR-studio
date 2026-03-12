// ModalShell — accessible modal dialog with focus trap, scroll lock, and animations.
// Complete rewrite of v1 ModalShell — fixes WCAG 2.1 critical: missing focus trap.
// Renders via React Portal to document.body.

'use client';

import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import type { ModalShellProps } from './ModalShell.types';
import { useModalShell } from './useModalShell';
import styles from './ModalShell.module.scss';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const getContentVariants = (reduceMotion: boolean) => ({
  hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
  visible: reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 },
  exit: reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 },
});

export function ModalShell({ isOpen, onClose, ariaLabel, children }: ModalShellProps) {
  const { modalRef, handleKeyDown } = useModalShell({ isOpen, onClose });
  const shouldReduceMotion = useReducedMotion();

  const contentVariants = getContentVariants(shouldReduceMotion ?? false);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
          onClick={onClose}
          aria-hidden="true"
        >
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            tabIndex={-1}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0.1 : 0.25,
              ease: 'easeOut',
            }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
            className={styles.modal}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
