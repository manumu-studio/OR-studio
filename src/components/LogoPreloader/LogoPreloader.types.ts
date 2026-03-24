// LogoPreloader types — props for the full-screen logo preloader

export interface LogoPreloaderProps {
  /** Total preloader duration in seconds (default: 2.5) */
  duration?: number;
  /** Logo size in px (default: 100) */
  logoSize?: number;
  /** Additional CSS class */
  className?: string;
}
