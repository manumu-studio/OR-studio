// About page — Server Component that fetches AboutPage global from Payload CMS
// and passes heading, rich text body, and background image to LandingAbout.

import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Media } from '@/payload-types';
import { LandingAbout } from '@/components/LandingAbout';

/** Force dynamic rendering — avoids MongoDB connection during build (CI has no DB). */
export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: 'About | OR Studio',
    description:
      'Learn about OR Studio — designing spaces that reflect your story through architectural visualization and animation.',
  };
}

export default async function AboutPage() {
  const payload = await getPayload({ config: configPromise });

  // — Fetch AboutPage global (heading, sectionText richText, background image)
  const aboutPageData = await payload.findGlobal({
    slug: 'about-page',
    depth: 1,
  });

  // — Extract background image if populated
  const backgroundImage =
    aboutPageData.backgroundImage && typeof aboutPageData.backgroundImage === 'object'
      ? (aboutPageData.backgroundImage as Media)
      : null;

  return (
    <LandingAbout
      heading={aboutPageData.heading}
      sectionText={aboutPageData.sectionText ?? null}
      backgroundImage={backgroundImage}
    />
  );
}
