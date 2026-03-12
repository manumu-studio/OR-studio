// SectionWrapper types — props for the intersection-observer animated section

export interface SectionWrapperProps {
  /** Section content */
  children: React.ReactNode;
  /** HTML id attribute */
  id?: string;
  /** Additional CSS class */
  className?: string;
  /** Intersection Observer threshold (0-1). Default: 0.15 */
  threshold?: number;
  /** Only trigger animation once. Default: true */
  triggerOnce?: boolean;
  /** Animation duration in seconds. Default: 0.5 */
  duration?: number;
  /** Disable animation entirely. Default: false */
  disableAnimation?: boolean;
  /** ARIA role. Default: 'region' */
  role?: React.AriaRole;
  /** ARIA label */
  ariaLabel?: string;
}
