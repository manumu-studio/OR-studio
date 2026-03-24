// NavbarLinks types — props and navigation item shape

export interface NavItem {
  /** Display label */
  label: string;
  /** Route path (e.g., '/', '/works') */
  href: string;
}

export interface NavbarLinksProps {
  /** Additional CSS class for the nav list */
  className?: string;
}
