// WorkBanner types — props for the featured project showcase section with carousel.

import type { Media, Project } from '@/payload-types';

export interface WorkBannerProps {
  /** Featured project (populated from CMS) */
  project: Project;
  /** Images for carousel: banner image + project gallery (v1 behavior) */
  images: Media[];
  /** Index used for staggered animation delay */
  index: number;
}
