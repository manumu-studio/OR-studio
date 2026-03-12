// BannerImage types — props for the full-viewport background image.

import type { Media } from '@/payload-types';

export interface BannerImageProps {
  /** Populated Media document from Payload */
  image: Media;
  /** Alt text override (falls back to Media alt field) */
  alt?: string;
  /** Whether this image is above the fold (enables priority loading) */
  priority?: boolean;
  /** Additional CSS class for the container */
  className?: string;
}
