// Projects seeder — reads v1 JSON data files and creates Project documents in Payload CMS.
// Idempotent: skips projects that already exist (matched by title).
// Depends on: categoryMap (from TASK-002), mediaMap (from TASK-003).

import fs from 'fs';
import path from 'path';
import type { Payload } from 'payload';

/** Converts a string to a URL-safe kebab-case slug. */
const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

/** Base path to v1 data files */
const V1_DATA_BASE =
  '/Users/manumurillo/Documents/Manu Murillo FS projects/OR_Studio/client/public/data';

/** Shape of a single image entry in v1 JSON */
interface V1Image {
  src: string;
  orientation: string;
  width: number;
  height: number;
}

/** Shape of a single project in v1 JSON */
interface V1Project {
  title: string;
  description: string;
  images: V1Image[];
  storyline?: string;
  views?: number;
}

/** Shape of a v1 category data file */
interface V1DataFile {
  category: string;
  projects: Record<string, V1Project>;
}

/** Data file -> category name mapping */
const DATA_FILES: ReadonlyArray<{ filename: string; category: string }> = [
  { filename: 'residentialData.json', category: 'Residential' },
  { filename: 'commercialData.json', category: 'Commercial' },
  { filename: 'officeData.json', category: 'Office' },
  { filename: 'urbanPlanningData.json', category: 'Urban Planning' },
];

/**
 * Resolves a v1 image src path to a Payload media ID using the mediaMap.
 * Returns undefined if the image was not found in the map.
 */
const resolveMediaId = (src: string, mediaMap: Map<string, string>): string | undefined => {
  // Direct match first
  if (mediaMap.has(src)) {
    return mediaMap.get(src);
  }

  // Try matching by filename only (fallback for path variations)
  const filename = path.basename(src);
  for (const [mapPath, id] of mediaMap) {
    if (path.basename(mapPath) === filename) {
      return id;
    }
  }

  return undefined;
};

/**
 * Seeds projects from v1 JSON data files.
 * @param payload - Payload instance
 * @param categoryMap - Map of category name -> Payload category ID (from seedCategories)
 * @param mediaMap - Map of v1 relative path -> Payload media ID (from seedMedia)
 */
export const seedProjects = async (
  payload: Payload,
  categoryMap: Map<string, string>,
  mediaMap: Map<string, string>,
): Promise<void> => {
  let globalOrder = 0;

  for (const { filename, category } of DATA_FILES) {
    const filePath = path.join(V1_DATA_BASE, filename);

    // --- Read and parse v1 JSON
    if (!fs.existsSync(filePath)) {
      console.log(`    [warn] Data file not found: ${filePath}`);
      continue;
    }

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data: V1DataFile = JSON.parse(raw) as V1DataFile;

    // --- Resolve category ID
    const categoryId = categoryMap.get(category);
    if (!categoryId) {
      console.error(
        `    [error] Category "${category}" not found in categoryMap. Skipping ${filename}.`,
      );
      continue;
    }

    console.log(`    Processing ${filename} (${Object.keys(data.projects).length} projects)...`);

    // --- Create each project
    for (const [_key, v1Project] of Object.entries(data.projects)) {
      globalOrder++;

      // --- Idempotency check: skip if project with same title exists
      const existing = await payload.find({
        collection: 'projects',
        where: { title: { equals: v1Project.title } },
        limit: 1,
      });

      if (existing.docs.length > 0) {
        console.log(`      [skip] "${v1Project.title}" already exists`);
        continue;
      }

      // --- Resolve featured image (first image in the array)
      const firstImage = v1Project.images[0];
      const featuredImageId = firstImage ? resolveMediaId(firstImage.src, mediaMap) : undefined;

      if (!featuredImageId) {
        console.warn(
          `      [warn] No featured image found for "${v1Project.title}" (src: ${firstImage?.src ?? 'none'})`,
        );
        continue;
      }

      // --- Resolve gallery images (remaining images)
      const galleryImages = v1Project.images
        .slice(1)
        .map((img) => {
          const mediaId = resolveMediaId(img.src, mediaMap);
          if (!mediaId) {
            console.warn(`      [warn] Gallery image not found: ${img.src}`);
            return null;
          }
          return { image: mediaId };
        })
        .filter((item): item is { image: string } => item !== null);

      // --- Create project document
      try {
        const created = await payload.create({
          collection: 'projects',
          data: {
            title: v1Project.title,
            slug: toSlug(v1Project.title),
            description: v1Project.description || undefined,
            category: categoryId,
            featuredImage: featuredImageId,
            gallery: galleryImages.length > 0 ? galleryImages : undefined,
            order: globalOrder,
            status: 'published',
          },
          draft: false,
        });

        console.log(`      [created] "${v1Project.title}" (${created.id})`);
      } catch (err) {
        console.error(`      [error] Failed to create "${v1Project.title}":`, err);
      }
    }
  }
};
