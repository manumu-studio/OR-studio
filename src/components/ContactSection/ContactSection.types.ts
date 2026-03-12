// ContactSection types — contact page wrapper with CMS content.

import type { Media } from '@/payload-types';

export interface ContactSectionProps {
  /** Page heading from ContactPage global */
  readonly headerText: string;
  /** Optional subtitle from ContactPage global */
  readonly subtitleText: string | null;
  /** Background image from ContactPage global (populated Media or null) */
  readonly backgroundImage: Media | null;
  /** Contact email from SiteSettings */
  readonly contactEmail: string;
}
