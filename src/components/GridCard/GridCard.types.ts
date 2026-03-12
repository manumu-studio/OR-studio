// GridCard types — props for the project image card.

import type { Media } from '@/payload-types';

export interface GridCardProps {
  /** Populated Media document from Payload (must have url and alt) */
  image: Media;
  /** Project title displayed on hover */
  title: string;
  /** Click handler — typically opens lightbox */
  onClick: () => void;
}
