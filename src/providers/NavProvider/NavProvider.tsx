// NavProvider — manages navigation open/close state across the frontend
'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import type { NavContextValue, NavProviderProps } from './NavProvider.types';

const NavContext = createContext<NavContextValue | null>(null);

export function NavProvider({ children }: NavProviderProps) {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const pathname = usePathname();

  // Close nav on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [pathname]);

  const toggleNav = useCallback(() => {
    setIsNavOpen((prev) => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  const value: NavContextValue = {
    isNavOpen,
    toggleNav,
    closeNav,
  };

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
}

/**
 * Hook to consume NavProvider context.
 * Throws if used outside of a NavProvider.
 */
export function useNav(): NavContextValue {
  const context = useContext(NavContext);
  if (context === null) {
    throw new Error('useNav must be used within a NavProvider');
  }
  return context;
}
