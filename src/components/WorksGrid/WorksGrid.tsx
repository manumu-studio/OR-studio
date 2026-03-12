// WorksGrid — responsive CSS Grid layout for project cards.
// Delegates animation to WorksGridItem wrappers.

'use client';

import { AnimatePresence } from 'framer-motion';
import type { WorksGridProps } from './WorksGrid.types';
import { WorksGridItem } from '@/components/WorksGridItem';
import { GridCard } from '@/components/GridCard';
import styles from './WorksGrid.module.scss';

export function WorksGrid({ projects, onProjectClick }: WorksGridProps) {
  if (projects.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No projects found in this category.</p>
      </div>
    );
  }

  return (
    <div className={styles.grid} role="list">
      <AnimatePresence mode="wait">
        {projects.map((project, index) => (
          <WorksGridItem key={project.id} index={index}>
            <div role="listitem">
              <GridCard
                image={project.featuredImage}
                title={project.title}
                onClick={() => onProjectClick(project)}
              />
            </div>
          </WorksGridItem>
        ))}
      </AnimatePresence>
    </div>
  );
}
