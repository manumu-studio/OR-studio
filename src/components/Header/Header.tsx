// Header — main navigation bar with logo, links (desktop), hamburger (mobile), and nav overlay
'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { AnimatedLogo } from '@/components/AnimatedLogo';
import { HamburgerToggleButton } from '@/components/HamburgerToggleButton';
import { NavbarLinks } from '@/components/NavbarLinks';
import { useNav } from '@/providers/NavProvider';

import type { HeaderProps } from './Header.types';
import styles from './Header.module.scss';

export function Header({ className = '' }: HeaderProps) {
  const { isNavOpen, closeNav } = useNav();
  const navRef = useRef<HTMLElement>(null);

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
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Logo — hides when nav overlay is open (v1 behavior) */}
      <div className={styles.logoContainer}>
        {!isNavOpen && <AnimatedLogo size={50} strokeWidth={1} />}
      </div>

      {/* Desktop navigation links (hidden on mobile via CSS) */}
      <nav className={styles.desktopNav} aria-label="Main navigation">
        <NavbarLinks />
      </nav>

      {/* Hamburger button (hidden on desktop via CSS) */}
      <div className={styles.mobileControls}>
        <HamburgerToggleButton gapBetweenLines={6} lineWidth="28px" />
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence mode="wait">
        {isNavOpen && (
          <motion.nav
            id="main-navigation"
            ref={navRef}
            className={styles.navOverlay}
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            aria-label="Mobile navigation"
          >
            <NavbarLinks />
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
