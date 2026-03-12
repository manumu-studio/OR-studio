// WorksControl — client orchestrator for the Works page.
// Manages category filtering, project selection, lightbox state, and URL sync with category slug.

'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { WorksControlProps, PopulatedProject } from './WorksControl.types';
import type { Media } from '@/payload-types';
import { CategoryTabs } from '@/components/CategoryTabs';
import { DropdownMenu } from '@/components/DropdownMenu';
import { WorksGrid } from '@/components/WorksGrid';
import { ModalShell } from '@/components/ModalShell';
import { LightboxGallery } from '@/components/LightboxGallery';
import styles from './WorksControl.module.scss';

export function WorksControl({
  categories,
  projects,
  initialCategorySlug = null,
}: WorksControlProps) {
  const router = useRouter();
  const pathname = usePathname();

  // — Resolve initial category ID from slug (only valid slugs from CMS)
  const initialCategoryId = useMemo(() => {
    if (!initialCategorySlug) return null;
    const match = categories.find(
      (cat) => cat.slug.toLowerCase() === initialCategorySlug.toLowerCase(),
    );
    return match?.id ?? null;
  }, [categories, initialCategorySlug]);

  const [activeCategory, setActiveCategory] = useState<string | null>(initialCategoryId);

  // — Sync state from URL on mount / when initialCategorySlug changes (e.g. client nav)
  useEffect(() => {
    setActiveCategory(initialCategoryId);
  }, [initialCategoryId]);

  // — Update URL when category changes (slug-based for shareable links)
  const handleCategoryChange = useCallback(
    (categoryId: string | null) => {
      setActiveCategory(categoryId);
      const slug =
        categoryId === null ? null : (categories.find((c) => c.id === categoryId)?.slug ?? null);
      const url = slug ? `${pathname}?category=${slug}` : pathname;
      router.replace(url, { scroll: false });
    },
    [categories, pathname, router],
  );
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
          onCategoryChange={handleCategoryChange}
        />
        <DropdownMenu
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
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
