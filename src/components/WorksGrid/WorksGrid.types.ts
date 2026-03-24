// WorksGrid types — props for the responsive project grid.

import type { PopulatedProject } from '@/components/WorksControl/WorksControl.types';

export interface WorksGridProps {
  /** Filtered projects to display */
  projects: PopulatedProject[];
  /** Callback when a project card is clicked */
  onProjectClick: (project: PopulatedProject) => void;
}
