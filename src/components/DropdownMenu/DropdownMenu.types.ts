// DropdownMenu types — props for the mobile category filter dropdown.

import type { Category } from '@/payload-types';

export interface DropdownMenuProps {
  /** Full list of categories from CMS */
  categories: Category[];
  /** Currently active category ID, or null for "All" */
  activeCategory: string | null;
  /** Callback when user selects a category (null = "All") */
  onCategoryChange: (categoryId: string | null) => void;
}
