// Spinner types — loading spinner with accessible label.

export type SpinnerSize = 'small' | 'medium' | 'large';

export interface SpinnerProps {
  /** Spinner size preset */
  readonly size?: SpinnerSize;
  /** Custom size override in rem */
  readonly sizeRem?: number;
  /** Border thickness in px */
  readonly thicknessPx?: number;
  /** Whether to wrap in a centered overlay */
  readonly overlay?: boolean;
  /** Accessible label for screen readers */
  readonly label?: string;
  /** Additional CSS class name */
  readonly className?: string;
}

/** Size presets: rem diameter, px thickness */
export const SPINNER_SIZES: Record<SpinnerSize, { size: number; thickness: number }> = {
  small: { size: 0.75, thickness: 1 },
  medium: { size: 1.25, thickness: 2 },
  large: { size: 2, thickness: 3 },
} as const;
