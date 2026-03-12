// Media seeder — reads v1 image files and uploads them to Payload CMS (Cloudinary).
// Idempotent: skips images that already exist (matched by filename).
// This is the slowest seed step — each image is uploaded to Cloudinary via the storage adapter.

import fs from 'fs';
import path from 'path';
import type { Payload } from 'payload';

/** Base path to v1 assets */
const V1_ASSETS_BASE =
  '/Users/manumurillo/Documents/Manu Murillo FS projects/OR_Studio/client/public/assets';

/** Directories to process (relative to V1_ASSETS_BASE) */
const ASSET_DIRS = [
  'home/HomePictures',
  'home/EvenYehuda',
  'home/Hevron8PenthouseRooftop',
  'home/City69',
  'home/Bazel64',
  'home/Herzog',
  'home/HomePictures2',
  'works/categories/Residential',
  'works/categories/Commercial',
  'works/categories/Office',
  'logos',
];

/** Image extensions to process */
const IMAGE_EXTENSIONS = new Set(['.webp', '.jpg', '.jpeg', '.png', '.svg']);

/** Derives alt text from filename: remove extension, replace separators, title case */
const filenameToAlt = (filename: string): string => {
  const base = path.basename(filename, path.extname(filename));
  return base
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

/** Maps file extension to MIME type */
const getMimeType = (ext: string): string => {
  const mimeMap: Record<string, string> = {
    '.webp': 'image/webp',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
  };
  return mimeMap[ext] ?? 'image/jpeg';
};

/**
 * Recursively collects all image file paths from a directory.
 * Skips directories with spaces in their names (duplicates of camelCase versions).
 */
const collectImageFiles = (dirPath: string): string[] => {
  const files: string[] = [];

  if (!fs.existsSync(dirPath)) {
    console.log(`    [warn] Directory not found: ${dirPath}`);
    return files;
  }

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // Skip directories with spaces (duplicate of camelCase)
      if (entry.name.includes(' ')) {
        continue;
      }
      files.push(...collectImageFiles(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (IMAGE_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
};

/**
 * Seeds media documents from v1 image files.
 * @returns Map of original relative path (e.g., "/assets/home/HomePictures/Front 3.webp") -> Payload media ID
 */
export const seedMedia = async (payload: Payload): Promise<Map<string, string>> => {
  const mediaMap = new Map<string, string>();

  // --- Collect all image files from configured directories
  const allFiles: string[] = [];
  for (const dir of ASSET_DIRS) {
    const fullDir = path.join(V1_ASSETS_BASE, dir);
    allFiles.push(...collectImageFiles(fullDir));
  }

  console.log(`    Found ${allFiles.length} image files to process.`);

  let created = 0;
  let skipped = 0;

  for (const filePath of allFiles) {
    const filename = path.basename(filePath);

    // --- Build the relative path key (matches v1 JSON src references)
    const assetsPart = filePath.split('/assets')[1];
    const relativePath = assetsPart ? `/assets${assetsPart}` : filePath;

    // --- Idempotency check: skip if media with same filename exists
    const existing = await payload.find({
      collection: 'media',
      where: { filename: { equals: filename } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const doc = existing.docs[0];
      if (doc) {
        mediaMap.set(relativePath, String(doc.id));
      }
      skipped++;
      continue;
    }

    // --- Read file and create media document
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    const mimetype = getMimeType(ext);
    const alt = filenameToAlt(filename);

    try {
      const media = await payload.create({
        collection: 'media',
        data: { alt },
        file: {
          data: buffer,
          mimetype,
          name: filename,
          size: buffer.length,
        },
      });

      mediaMap.set(relativePath, String(media.id));
      created++;

      // Log progress every 10 images
      if (created % 10 === 0) {
        console.log(`    [progress] ${created} images uploaded...`);
      }
    } catch (err) {
      console.error(`    [error] Failed to upload "${filename}":`, err);
    }
  }

  console.log(`    [done] Created: ${created}, Skipped: ${skipped}`);
  return mediaMap;
};
