// CategoryTabs — horizontal tab bar for filtering projects by category (desktop).
// Uses Framer Motion layoutId for animated underline indicator.

'use client';

import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { CategoryTabsProps } from './CategoryTabs.types';
import styles from './CategoryTabs.module.scss';

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;

    event.preventDefault();
    const tabList = tabListRef.current;
    if (!tabList) return;

    const tabs = Array.from(tabList.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const currentIndex = tabs.findIndex((tab) => tab === document.activeElement);

    let nextIndex: number;
    if (event.key === 'ArrowRight') {
      nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
    }

    tabs[nextIndex]?.focus();
  }, []);

  const allTabs = [
    { id: null, label: 'All' },
    ...categories.map((cat) => ({ id: cat.id, label: cat.name })),
  ];

  return (
    <div
      ref={tabListRef}
      role="tablist"
      aria-label="Filter projects by category"
      className={styles.tabList}
    >
      {allTabs.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id ?? 'all'}
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onCategoryChange(tab.id)}
            onKeyDown={handleKeyDown}
            className={`${styles.tab} ${isActive ? styles.active : ''}`}
          >
            {tab.label}
            {isActive && (
              <motion.span
                layoutId="category-underline"
                className={styles.underline}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
