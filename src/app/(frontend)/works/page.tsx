// Works page — Server Component that fetches categories and published projects
// from Payload CMS and passes them to the WorksControl client orchestrator.

import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Category, Project } from '@/payload-types';
import { WorksControl } from '@/components/WorksControl';

/** Force dynamic rendering — avoids MongoDB connection during build (CI has no DB). */
export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: 'Works | OR Studio',
    description:
      'Explore our portfolio of architectural visualization projects — residential, commercial, and interior design renders by OR Studio.',
  };
}

type WorksPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const payload = await getPayload({ config: configPromise });

  const categoriesResult = await payload.find({
    collection: 'categories',
    sort: 'order',
    limit: 100,
  });

  const projectsResult = await payload.find({
    collection: 'projects',
    where: {
      status: { equals: 'published' },
    },
    sort: 'order',
    limit: 100,
    depth: 2,
  });

  const resolvedParams = await searchParams;
  const initialCategorySlug = resolvedParams.category ?? null;

  return (
    <WorksControl
      categories={categoriesResult.docs as Category[]}
      projects={projectsResult.docs as Project[]}
      initialCategorySlug={initialCategorySlug}
    />
  );
}
