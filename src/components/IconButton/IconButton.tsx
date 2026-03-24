// IconButton — positioned icon button with built-in arrow/zoom (v1 port)
'use client';

import type { IconButtonProps } from './IconButton.types';
import styles from './IconButton.module.scss';

export function IconButton({
  direction = 'down',
  onClick,
  ariaLabel,
  className = '',
  disabled = false,
  width = 2.5,
  height = 2.5,
  icon,
}: IconButtonProps) {
  const directionClass = direction ? (styles[direction] ?? '') : '';
  const computedAriaLabel = ariaLabel ?? (direction === 'close' ? 'Close' : `Scroll ${direction}`);

  const renderContent = () => {
    if (icon) return icon;
    if (direction === 'close') {
      return (
        <span className={styles.zoomSymbol} aria-hidden="true">
          ×
        </span>
      );
    }
    return <span className={styles.arrowIcon} aria-hidden="true" />;
  };

  return (
    <button
      type="button"
      className={`${styles.iconButton} ${directionClass} ${className}`.trim()}
      style={
        {
          '--button-width': `${String(width)}rem`,
          '--button-height': `${String(height)}rem`,
        } as React.CSSProperties
      }
      disabled={disabled}
      aria-label={computedAriaLabel}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {renderContent()}
    </button>
  );
}
