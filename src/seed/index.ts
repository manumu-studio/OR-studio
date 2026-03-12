// Seed orchestrator — runs all seeders in dependency order to populate Payload CMS.
// Usage: pnpm seed
// Order: categories -> media -> projects -> globals (each depends on the previous).

import './polyfill';
import { getPayload } from 'payload';
import config from '@payload-config';
import { seedCategories } from './categories';
import { seedMedia } from './media';
import { seedProjects } from './projects';
import { seedGlobals } from './globals';

const seed = async (): Promise<void> => {
  console.log('--- OR Studio Seed Script ---\n');

  const payload = await getPayload({ config });

  // --- Step 1: Categories (no dependencies)
  console.log('[1/4] Seeding categories...');
  const categoryMap = await seedCategories(payload);
  console.log(`  -> ${categoryMap.size} categories ready.\n`);

  // --- Step 2: Media (no dependencies, but slowest step)
  console.log('[2/4] Seeding media (this may take a while)...');
  const mediaMap = await seedMedia(payload);
  console.log(`  -> ${mediaMap.size} media documents ready.\n`);

  // --- Step 3: Projects (depends on categories + media)
  console.log('[3/4] Seeding projects...');
  await seedProjects(payload, categoryMap, mediaMap);
  console.log('  -> Projects seeded.\n');

  // --- Step 4: Globals (depends on media + projects)
  console.log('[4/4] Seeding globals...');
  await seedGlobals(payload, mediaMap);
  console.log('  -> Globals seeded.\n');

  console.log('--- Seed complete! ---');
};

(async () => {
  try {
    await seed();
    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
})();
