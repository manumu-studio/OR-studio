// WorksGridItem types — props for the animated grid item wrapper.

import type { ReactNode } from 'react';

export interface WorksGridItemProps {
  /** Grid item content (typically a GridCard) */
  children: ReactNode;
  /** Index in the grid — used for stagger delay calculation */
  index: number;
}
