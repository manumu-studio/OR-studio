// LandingPageSection types — props for the hero section with auto-rotating images.

import type { Media } from '@/payload-types';

export interface LandingPageSectionProps {
  /** Array of populated Media documents for the carousel */
  images: Media[];
  /** Hero title text from CMS */
  title: string;
  /** Hero subtitle text from CMS */
  subtitle: string;
}
