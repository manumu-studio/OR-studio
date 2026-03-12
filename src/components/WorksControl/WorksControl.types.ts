// WorksControl types — props for the Works page client orchestrator.

import type { Category, Media, Project } from '@/payload-types';

export interface WorksControlProps {
  /** All categories from CMS, sorted by order */
  categories: Category[];
  /** Published projects from CMS, sorted by order (with populated relationships) */
  projects: Project[];
}

export interface PopulatedProject extends Omit<Project, 'featuredImage' | 'category' | 'gallery'> {
  featuredImage: Media;
  category: Category;
  gallery?:
    | {
        image: Media;
        id?: string | null;
      }[]
    | null;
}
