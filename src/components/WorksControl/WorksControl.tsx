// WorksControl — client orchestrator for the Works page.
// Manages category filtering, project selection, and lightbox state.

'use client';

import { useState, useMemo, useCallback } from 'react';
import type { WorksControlProps, PopulatedProject } from './WorksControl.types';
import type { Media } from '@/payload-types';
import { CategoryTabs } from '@/components/CategoryTabs';
import { DropdownMenu } from '@/components/DropdownMenu';
import { WorksGrid } from '@/components/WorksGrid';
import { ModalShell } from '@/components/ModalShell';
import { LightboxGallery } from '@/components/LightboxGallery';
import styles from './WorksControl.module.scss';

export function WorksControl({ categories, projects }: WorksControlProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<PopulatedProject | null>(null);

  const filteredProjects = useMemo(() => {
    const populated = projects as PopulatedProject[];
    if (activeCategory === null) return populated;

    return populated.filter((project) => {
      const categoryId =
        typeof project.category === 'string' ? project.category : project.category.id;
      return categoryId === activeCategory;
    });
  }, [projects, activeCategory]);

  const handleProjectClick = useCallback((project: PopulatedProject) => {
    setSelectedProject(project);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const galleryImages: Media[] = useMemo(() => {
    if (!selectedProject) return [];

    const images: Media[] = [selectedProject.featuredImage];
    if (selectedProject.gallery) {
      for (const item of selectedProject.gallery) {
        if (typeof item.image !== 'string') {
          images.push(item.image);
        }
      }
    }
    return images;
  }, [selectedProject]);

  return (
    <section className={styles.worksSection}>
      <div className={styles.controls}>
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        <DropdownMenu
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <WorksGrid projects={filteredProjects} onProjectClick={handleProjectClick} />

      <ModalShell
        isOpen={selectedProject !== null}
        onClose={handleCloseLightbox}
        ariaLabel={selectedProject ? `${selectedProject.title} gallery` : 'Project gallery'}
      >
        {selectedProject && (
          <LightboxGallery images={galleryImages} onClose={handleCloseLightbox} />
        )}
      </ModalShell>
    </section>
  );
}
