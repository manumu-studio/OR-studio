// Home page — Server Component that fetches the HomePage global from Payload CMS
// and passes data to the ScrollSections client orchestrator for the landing experience.

import type { Metadata } from 'next';

/** Force dynamic rendering — avoids MongoDB connection during build (CI has no DB). */
export const dynamic = 'force-dynamic';

import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { ScrollSections } from '@/components/ScrollSections';

export const metadata: Metadata = {
  title: 'OR Studio — Architectural Visualization',
  description:
    'Architectural visualization studio specializing in photorealistic 3D renders for residential, commercial, and interior design projects.',
};

export default async function HomePageView() {
  const payload = await getPayload({ config: configPromise });

  const homePageData = await payload.findGlobal({
    slug: 'home-page',
    depth: 2,
  });

  return <ScrollSections data={homePageData} />;
}
