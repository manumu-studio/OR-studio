// ProgressBar types — props for the carousel progress indicator.

export interface ProgressBarProps {
  /** Whether this segment is currently active (animates 0→100%) */
  isActive: boolean;
  /** Animation duration in ms when active */
  duration: number;
  /** Click handler to jump to this slide */
  onClick?: () => void;
  /** Accessible label */
  ariaLabel?: string;
}
