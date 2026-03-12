// ProgressBar types — time-based linear progress indicator.

export interface ProgressBarProps {
  /** Whether the progress animation is running */
  readonly isActive: boolean;
  /** Animation duration in milliseconds */
  readonly duration: number;
  /** Optional click handler */
  readonly onClick?: () => void;
  /** Additional CSS class name */
  readonly className?: string;
  /** Accessible label */
  readonly ariaLabel?: string;
  /** Light variant for hero/overlay (white track + fill) */
  readonly variant?: 'default' | 'light';
}
