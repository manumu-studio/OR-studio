// ContactHeader — heading and subtitle for the contact page.
// Content is CMS-driven via the ContactPage global.

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ContactHeaderProps } from './ContactHeader.types';
import styles from './ContactHeader.module.scss';

export function ContactHeader({ title, subtitle }: ContactHeaderProps) {
  const prefersReduced = useReducedMotion();

  const variants = prefersReduced
    ? undefined
    : {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      className={styles.contactHeader}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <h2 className={styles.title}>{title}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </motion.div>
  );
}
