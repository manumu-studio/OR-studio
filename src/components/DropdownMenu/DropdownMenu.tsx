// DropdownMenu — mobile category filter with toggle and animated dropdown.
// Visible below 768px. Closes on selection and on click outside.

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DropdownMenuProps } from './DropdownMenu.types';
import styles from './DropdownMenu.module.scss';

export function DropdownMenu({ categories, activeCategory, onCategoryChange }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeLabel =
    activeCategory === null
      ? 'All'
      : (categories.find((cat) => cat.id === activeCategory)?.name ?? 'All');

  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const handleSelect = useCallback(
    (categoryId: string | null) => {
      onCategoryChange(categoryId);
      setIsOpen(false);
    },
    [onCategoryChange],
  );

  const options = [
    { id: null, label: 'All' },
    ...categories.map((cat) => ({ id: cat.id, label: cat.name })),
  ];

  return (
    <div ref={containerRef} className={styles.container}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={styles.toggle}
      >
        <span>{activeLabel}</span>
        <span
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            aria-label="Filter by category"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={styles.dropdown}
          >
            {options.map((option) => {
              const isActive = activeCategory === option.id;
              return (
                <li key={option.id ?? 'all'} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
