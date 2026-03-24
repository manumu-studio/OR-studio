// Globals seeder — populates SiteSettings, HomePage, ContactPage, and AboutPage globals.
// Uses payload.updateGlobal() since globals always exist as singletons.
// Safe to run multiple times — overwrites content with seed values.

import path from 'path';
import type { Payload } from 'payload';

/**
 * Resolves a v1 image src path to a Payload media ID using the mediaMap.
 * Returns undefined if not found.
 */
const resolveMediaId = (src: string, mediaMap: Map<string, string>): string | undefined => {
  if (mediaMap.has(src)) {
    return mediaMap.get(src);
  }

  // Fallback: match by filename
  const filename = path.basename(src);
  for (const [mapPath, id] of mediaMap) {
    if (path.basename(mapPath) === filename) {
      return id;
    }
  }

  return undefined;
};

/**
 * Builds a Lexical rich text root node from an array of paragraph strings.
 * Each string becomes a separate paragraph node.
 */
const buildLexicalRichText = (paragraphs: string[]): Record<string, unknown> => ({
  root: {
    children: paragraphs.map((text) => ({
      type: 'paragraph',
      children: [
        {
          type: 'text',
          text,
          format: 0,
          detail: 0,
          mode: 'normal',
          style: '',
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
      textFormat: 0,
      textStyle: '',
    })),
    direction: 'ltr',
    format: '',
    indent: 0,
    type: 'root',
    version: 1,
  },
});

/** Hero carousel image paths from v1 home/HomePictures */
const HERO_IMAGE_PATHS = [
  '/assets/home/HomePictures/Front 3.webp',
  '/assets/home/HomePictures/Front Page 1.webp',
  '/assets/home/HomePictures/Front Page 2.webp',
  '/assets/home/HomePictures/Front Page 5.webp',
];

/**
 * Seeds all 4 CMS globals with initial content.
 * @param payload - Payload instance
 * @param mediaMap - Map of v1 relative path -> Payload media ID (from seedMedia)
 */
export const seedGlobals = async (
  payload: Payload,
  mediaMap: Map<string, string>,
): Promise<void> => {
  // ─── SiteSettings ────────────────────────────────────────
  console.log('    Updating SiteSettings...');

  const logoId = resolveMediaId('/assets/logos/or-white.webp', mediaMap);

  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      siteName: 'OR Studio',
      contactEmail: 'contact@orstudio3d.com',
      ...(logoId ? { logo: logoId } : {}),
      navLinks: [
        { label: 'Home', url: '/', order: 1 },
        { label: 'Works', url: '/works', order: 2 },
        { label: 'About', url: '/about', order: 3 },
        { label: 'Contact', url: '/contact', order: 4 },
      ],
      socialLinks: [{ platform: 'Instagram', url: 'https://instagram.com/orstudio3d' }],
    },
  });

  console.log('    [done] SiteSettings updated.');

  // ─── HomePage ────────────────────────────────────────────
  console.log('    Updating HomePage...');

  // Resolve hero images from v1 HomePictures
  const heroImages = HERO_IMAGE_PATHS.map((src) => {
    const mediaId = resolveMediaId(src, mediaMap);
    if (!mediaId) {
      console.warn(`      [warn] Hero image not found: ${src}`);
      return null;
    }
    return { image: mediaId };
  }).filter((item): item is { image: string } => item !== null);

  // Resolve about banner image (use a hero image as fallback)
  const aboutBannerImageId = heroImages[0]?.image;

  // Query first 3 published projects for workBanners
  const publishedProjects = await payload.find({
    collection: 'projects',
    where: { status: { equals: 'published' } },
    sort: 'order',
    limit: 3,
  });

  const workBanners = publishedProjects.docs
    .map((project) => {
      // Use the project's featured image as the banner image
      const featuredImageId =
        typeof project.featuredImage === 'string'
          ? project.featuredImage
          : typeof project.featuredImage === 'object' &&
              project.featuredImage !== null &&
              'id' in project.featuredImage
            ? String(project.featuredImage.id)
            : undefined;

      return {
        project: String(project.id),
        image: featuredImageId ?? '',
      };
    })
    .filter((banner) => banner.image !== '');

  await payload.updateGlobal({
    slug: 'home-page',
    data: {
      heroTitle: 'DESIGN DIFFERENT',
      heroSubtitle: 'Architectural Visualization Studio',
      heroImages: heroImages.length > 0 ? heroImages : undefined,
      aboutBanner: {
        text: 'We are a creative studio specialized in architectural visualization. We bring your projects to life through photorealistic 3D rendering, helping architects and developers showcase their vision before construction begins.',
        linkLabel: 'More about us',
        linkUrl: '/about',
        ...(aboutBannerImageId ? { image: aboutBannerImageId } : {}),
      },
      workBanners: workBanners.length > 0 ? workBanners : undefined,
    },
  });

  console.log('    [done] HomePage updated.');

  // ─── ContactPage ─────────────────────────────────────────
  console.log('    Updating ContactPage...');

  await payload.updateGlobal({
    slug: 'contact-page',
    data: {
      headerText: "Let's Get Started!",
      subtitleText: 'Ready to transform your architectural ideas into stunning visuals?',
    },
  });

  console.log('    [done] ContactPage updated.');

  // ─── AboutPage ───────────────────────────────────────────
  console.log('    Updating AboutPage...');

  const aboutText = buildLexicalRichText([
    'OR Studio is a creative studio specialized in architectural visualization, bringing projects to life through photorealistic 3D rendering.',
    'We help architects, developers, and designers showcase their vision before construction begins. Our team combines technical expertise with artistic vision to create compelling visual narratives.',
    'From residential developments to large-scale urban planning projects, we deliver high-quality visualizations that communicate the essence of every design.',
  ]);

  await payload.updateGlobal({
    slug: 'about-page',
    data: {
      heading: 'Designing spaces that reflect your story',
      sectionText: aboutText,
    },
  });

  console.log('    [done] AboutPage updated.');
};
