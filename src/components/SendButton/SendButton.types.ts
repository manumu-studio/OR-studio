// SendButton types — animated submit button with directional arrow icon.

export type ArrowDirection = 'up' | 'down' | 'left' | 'right';

export interface SendButtonProps {
  /** Button label for accessibility */
  readonly label?: string;
  /** Arrow icon direction */
  readonly direction?: ArrowDirection;
  /** Button diameter in rem */
  readonly sizeRem?: number;
  /** Expanded width on hover in rem */
  readonly expandedWidthRem?: number;
  /** Whether this is a submit button */
  readonly submit?: boolean;
  /** Click handler */
  readonly onClick?: () => void;
  /** Whether the button is disabled */
  readonly disabled?: boolean;
  /** Whether the form is currently submitting */
  readonly isSubmitting?: boolean;
  /** Force the expanded (hover) state */
  readonly forceExpanded?: boolean;
  /** Additional CSS class name */
  readonly className?: string;
}
