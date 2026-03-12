// AnimatedLogo types — props for the SVG stroke-animation logo

export interface AnimatedLogoProps {
  /** Logo width in px (height is proportional at 150/125 ratio) */
  size?: number;
  /** Stroke outline color */
  stroke?: string;
  /** Interior fill color */
  fill?: string;
  /** Stroke width */
  strokeWidth?: number;
  /** Enable line-draw animation on mount */
  animate?: boolean;
  /** Enable fill reveal after stroke animation */
  animateFill?: boolean;
  /** Use geometric precision rendering */
  highRes?: boolean;
  /** Additional CSS class */
  className?: string;
}
