// ScrollSections — orchestrates the home page full-viewport scroll experience.
// Renders hero carousel, about banner, and featured work banners in sequence
// with CSS scroll-snap and section navigation arrows (v1 behavior).

'use client';

import { useRef, useCallback, type ReactNode } from 'react';
import type { Media, Project } from '@/payload-types';
import { LandingPageSection } from '@/components/LandingPageSection';
import { AboutBanner } from '@/components/AboutBanner';
import { WorkBanner } from '@/components/WorkBanner';
import { IconButton } from '@/components/IconButton';
import { SectionWrapper } from '@/components/SectionWrapper';
import type { ScrollSectionsProps } from './ScrollSections.types';
import styles from './ScrollSections.module.scss';

// — Type guards for CMS data
function isMedia(obj: unknown): obj is Media {
  return typeof obj === 'object' && obj !== null && 'url' in obj;
}

function isProject(obj: unknown): obj is Project {
  return typeof obj === 'object' && obj !== null && 'title' in obj;
}

export function ScrollSections({ data }: ScrollSectionsProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // — Extract and validate CMS data
  const heroImages = (data.heroImages ?? [])
    .map((item) => {
      const img = item.image;
      if (isMedia(img)) return img;
      return null;
    })
    .filter((img): img is Media => img !== null);

  const heroTitle = data.heroTitle ?? '';
  const heroSubtitle = data.heroSubtitle ?? '';
  const aboutText = data.aboutBanner?.text ?? '';

  const workBanners = (data.workBanners ?? [])
    .map((banner) => {
      const project = isProject(banner.project) ? banner.project : null;
      const bannerImage = isMedia(banner.image) ? banner.image : null;
      if (!project || !bannerImage) return null;
      // Build images array: banner image + project gallery (v1 carousel)
      const galleryImages = (project.gallery ?? [])
        .map((g) => (isMedia(g.image) ? g.image : null))
        .filter((img): img is Media => img !== null && img.id !== bannerImage.id);
      const images = [bannerImage, ...galleryImages];
      return { project, images };
    })
    .filter((b): b is { project: Project; images: Media[] } => b !== null);

  // — Build sections array for indexing
  const sections: { id: string; content: ReactNode }[] = [];

  if (heroImages.length > 0) {
    sections.push({
      id: 'section-hero',
      content: <LandingPageSection images={heroImages} title={heroTitle} subtitle={heroSubtitle} />,
    });
  }

  if (aboutText) {
    sections.push({
      id: 'section-about',
      content: <AboutBanner text={aboutText} />,
    });
  }

  workBanners.forEach((banner, index) => {
    sections.push({
      id: `section-work-${String(index)}`,
      content: <WorkBanner project={banner.project} images={banner.images} index={index} />,
    });
  });

  // — Scroll to a section by ID
  const handleScroll = useCallback((targetId: string) => {
    const target = document.getElementById(targetId);
    target?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {sections.map((section, index) => {
        const isLast = index === sections.length - 1;
        const nextIndex = isLast ? 0 : index + 1;
        const nextSection = sections[nextIndex];
        if (!nextSection) return null;
        const arrowDirection = isLast ? 'up' : 'down';

        return (
          <SectionWrapper
            key={section.id}
            id={section.id}
            className={styles.section}
            duration={0.8}
            ariaLabel={isLast ? 'Last section' : `Section ${index + 1}`}
          >
            {section.content}

            {/* Section navigation arrow (v1 behavior — IconButton positions itself) */}
            <IconButton
              direction={arrowDirection}
              onClick={() => handleScroll(nextSection.id)}
              ariaLabel={isLast ? 'Scroll to top' : 'Scroll to next section'}
              width={3}
              height={3}
            />
          </SectionWrapper>
        );
      })}
    </div>
  );
}
