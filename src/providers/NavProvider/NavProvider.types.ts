// NavProvider types — context value and provider props

export interface NavContextValue {
  /** Whether the mobile navigation overlay is open */
  isNavOpen: boolean;
  /** Toggle navigation open/closed */
  toggleNav: () => void;
  /** Close navigation (convenience for link clicks, Escape key, etc.) */
  closeNav: () => void;
}

export interface NavProviderProps {
  children: React.ReactNode;
}
