// LightboxGallery types — props for the full-screen image gallery.

import type { Media } from '@/payload-types';

export interface LightboxGalleryProps {
  /** Array of populated Media documents to display */
  images: Media[];
  /** Starting image index (defaults to 0) */
  initialIndex?: number;
  /** Callback to close the lightbox (forwarded to close button) */
  onClose: () => void;
}

export type SwipeDirection = 'left' | 'right' | null;
