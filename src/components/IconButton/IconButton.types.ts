// IconButton types — props for positioned icon buttons with arrow/zoom variants

export type IconButtonDirection = 'up' | 'down' | 'left' | 'right' | 'zoomIn' | 'zoomOut' | 'close';

export interface IconButtonProps {
  /** Direction for positioning and built-in arrow/zoom icon */
  direction?: IconButtonDirection;
  /** Click handler */
  onClick?: () => void;
  /** Accessible label (required for icon-only buttons) */
  ariaLabel?: string;
  /** Additional CSS class */
  className?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Button width in rem. Default: 2.5 */
  width?: number;
  /** Button height in rem. Default: 2.5 */
  height?: number;
  /** Custom icon (overrides built-in arrow/zoom when direction is set) */
  icon?: React.ReactNode;
}
