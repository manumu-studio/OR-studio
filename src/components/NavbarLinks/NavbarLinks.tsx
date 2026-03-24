// NavbarLinks — navigation link list with stagger animations and active-state styling
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import { useNav } from '@/providers/NavProvider';

import type { NavbarLinksProps, NavItem } from './NavbarLinks.types';
import styles from './NavbarLinks.module.scss';

// — Static nav items (CMS-driven navigation wired in a later packet)
const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Works', href: '/works' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

// — Framer Motion variants for stagger animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
} as const;

export function NavbarLinks({ className = '' }: NavbarLinksProps) {
  const pathname = usePathname();
  const { closeNav } = useNav();

  return (
    <motion.ul
      className={`${styles.navList} ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;

        return (
          <motion.li
            key={item.label}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            variants={itemVariants}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={item.href}
              className={styles.navLink}
              onClick={closeNav}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}
