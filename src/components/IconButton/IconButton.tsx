// IconButton — reusable button with icon slot and Framer Motion interactions
'use client';

import { motion } from 'framer-motion';

import type { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.scss';

export function IconButton({
  icon,
  onClick,
  ariaLabel,
  className = '',
  variant = 'default',
  disabled = false,
  width = 2.5,
  height = 2.5,
}: IconButtonProps) {
  const variantClass = styles[variant] ?? '';

  return (
    <motion.button
      type="button"
      className={`${styles.iconButton} ${variantClass} ${disabled ? styles.disabled : ''} ${className}`}
      style={
        {
          '--button-width': `${String(width)}rem`,
          '--button-height': `${String(height)}rem`,
        } as React.CSSProperties
      }
      disabled={disabled}
      aria-label={ariaLabel}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    >
      <span className={styles.iconContent} aria-hidden="true">
        {icon}
      </span>
    </motion.button>
  );
}
