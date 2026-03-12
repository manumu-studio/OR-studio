// IconButton types — props for the reusable icon button

export type IconButtonVariant = 'default' | 'ghost' | 'outline';

export interface IconButtonProps {
  /** Icon content (ReactNode — SVG, emoji, component) */
  icon: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Accessible label (required for icon-only buttons) */
  ariaLabel: string;
  /** Additional CSS class */
  className?: string;
  /** Visual variant */
  variant?: IconButtonVariant;
  /** Disabled state */
  disabled?: boolean;
  /** Button width in rem. Default: 2.5 */
  width?: number;
  /** Button height in rem. Default: 2.5 */
  height?: number;
}
