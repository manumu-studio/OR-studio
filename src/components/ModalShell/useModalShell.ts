// useModalShell — manages focus trap, scroll lock, Escape key, and focus restoration.
// Extracted from ModalShell to keep the component file focused on rendering.

'use client';

import { useEffect, useRef, useCallback } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

interface UseModalShellOptions {
  isOpen: boolean;
  onClose: () => void;
}

export function useModalShell({ isOpen, onClose }: UseModalShellOptions) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousActiveElement.current = document.activeElement as HTMLElement | null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const timer = requestAnimationFrame(() => {
      if (!modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      const firstFocusable = focusableElements[0];

      if (firstFocusable) {
        firstFocusable.focus();
      } else {
        modalRef.current.focus();
      }
    });

    return () => cancelAnimationFrame(timer);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) return;

    if (previousActiveElement.current) {
      previousActiveElement.current.focus();
      previousActiveElement.current = null;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

    if (focusableElements.length === 0) {
      event.preventDefault();
      return;
    }

    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    if (!firstFocusable || !lastFocusable) {
      event.preventDefault();
      return;
    }

    if (event.shiftKey && document.activeElement === firstFocusable) {
      event.preventDefault();
      lastFocusable.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastFocusable) {
      event.preventDefault();
      firstFocusable.focus();
    }
  }, []);

  return { modalRef, handleKeyDown };
}
