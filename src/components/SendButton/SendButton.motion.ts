// SendButton motion variants — spring animations for expand/collapse.

import type { Variants } from 'framer-motion';

export function containerVariants(expandedWidthRem: number, sizeRem: number): Variants {
  return {
    rest: {
      width: `${sizeRem}rem`,
      transition: { type: 'spring', stiffness: 300, damping: 26 },
    },
    expand: {
      width: `${expandedWidthRem}rem`,
      transition: { type: 'spring', stiffness: 260, damping: 22 },
    },
  };
}

export const arrowVariants: Variants = {
  rest: { opacity: 1, x: 0, transition: { duration: 0.12 } },
  expand: { opacity: 0, x: -4, transition: { duration: 0.14 } },
};
