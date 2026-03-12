// Spinner — CSS-animated loading spinner with accessible label.

'use client';

import { useMemo } from 'react';
import type { SpinnerProps } from './Spinner.types';
import { SPINNER_SIZES } from './Spinner.types';
import styles from './Spinner.module.scss';

export function Spinner({
  size = 'medium',
  sizeRem,
  thicknessPx,
  overlay = false,
  label = 'Loading...',
  className,
}: SpinnerProps) {
  // — Resolve size (custom overrides preset)
  const resolvedSize = useMemo(() => {
    if (sizeRem !== undefined && thicknessPx !== undefined) {
      return { size: sizeRem, thickness: thicknessPx };
    }
    return SPINNER_SIZES[size];
  }, [size, sizeRem, thicknessPx]);

  const cssVars = {
    '--spinner-size': `${resolvedSize.size}rem`,
    '--spinner-thickness': `${resolvedSize.thickness}px`,
  } as React.CSSProperties;

  const spinnerClass = [styles.spinner, className ?? ''].filter(Boolean).join(' ');

  const core = (
    <div
      className={spinnerClass}
      style={cssVars}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <span className={styles.visuallyHidden}>{label}</span>
    </div>
  );

  return overlay ? <div className={styles.overlay}>{core}</div> : core;
}
