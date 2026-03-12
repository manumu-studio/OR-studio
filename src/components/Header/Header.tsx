// Header — navigation bar with logo and hamburger toggle (full-screen overlay nav at all sizes)
'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AnimatedLogo } from '@/components/AnimatedLogo';
import { HamburgerToggleButton } from '@/components/HamburgerToggleButton';
import { NavbarLinks } from '@/components/NavbarLinks';
import { useMediaQuery } from '@/lib/useMediaQuery';
import { useNav } from '@/providers/NavProvider';

import type { HeaderProps } from './Header.types';
import styles from './Header.module.scss';

export function Header({ className = '' }: HeaderProps) {
  const { isNavOpen, closeNav } = useNav();
  const navRef = useRef<HTMLElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // — Close nav on Escape key
  useEffect(() => {
    function handleEsc(e: KeyboardEvent): void {
      if (e.key === 'Escape' && isNavOpen) {
        closeNav();
      }
    }
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isNavOpen, closeNav]);

  // — Lock body scroll when nav overlay is open
  useEffect(() => {
    document.body.style.overflow = isNavOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavOpen]);

  return (
    <motion.header
      className={`${styles.header} ${className}`}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1 }}
    >
      {/* Logo — hides when nav overlay is open (v1 behavior) */}
      <div className={styles.logoContainer}>
        {!isNavOpen && <AnimatedLogo size={isMobile ? 32 : 48} strokeWidth={1} />}
      </div>

      {/* Hamburger button — always visible at all screen sizes (v1 behavior) */}
      <div className={styles.hamburgerContainer}>
        <HamburgerToggleButton />
      </div>

      {/* Full-screen nav overlay with backdrop blur */}
      <AnimatePresence mode="wait">
        {isNavOpen && (
          <motion.nav
            id="main-navigation"
            ref={navRef}
            className={styles.navOverlay}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            aria-label="Main navigation"
          >
            <NavbarLinks />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
