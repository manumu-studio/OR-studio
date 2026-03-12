// Categories seeder — creates the 4 project categories with display order.
// Idempotent: skips categories that already exist (matched by name).

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

/** Category name -> display order */
const CATEGORIES: ReadonlyArray<{ name: string; order: number }> = [
  { name: 'Residential', order: 1 },
  { name: 'Urban Planning', order: 2 },
  { name: 'Commercial', order: 3 },
  { name: 'Office', order: 4 },
];

/**
 * Seeds project categories into Payload CMS.
 * @returns Map of category name -> Payload document ID
 */
export const seedCategories = async (payload: Payload): Promise<Map<string, string>> => {
  const categoryMap = new Map<string, string>();

  for (const category of CATEGORIES) {
    // --- Idempotency check: skip if category already exists
    const existing = await payload.find({
      collection: 'categories',
      where: { name: { equals: category.name } },
      limit: 1,
    });

    if (existing.docs.length > 0) {
      const doc = existing.docs[0];
      if (doc) {
        categoryMap.set(category.name, String(doc.id));
        console.log(`    [skip] Category "${category.name}" already exists (${doc.id})`);
      }
      continue;
    }

    // --- Create new category
    const created = await payload.create({
      collection: 'categories',
      data: {
        name: category.name,
        slug: toSlug(category.name),
        order: category.order,
      },
      draft: false,
    });

    categoryMap.set(category.name, String(created.id));
    console.log(`    [created] Category "${category.name}" (${created.id})`);
  }

  return categoryMap;
};
