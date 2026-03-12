// Contact page — Server Component that fetches ContactPage global and SiteSettings
// from Payload CMS and passes them to the ContactSection client component.

import type { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import type { Media } from '@/payload-types';
import { ContactSection } from '@/components/ContactSection';

/** Force dynamic rendering — avoids MongoDB connection during build (CI has no DB). */
export const dynamic = 'force-dynamic';

export function generateMetadata(): Metadata {
  return {
    title: 'Contact | OR Studio',
    description:
      'Get in touch with OR Studio to bring your architectural vision to life. Contact us today!',
  };
}

export default async function ContactPage() {
  const payload = await getPayload({ config: configPromise });

  // — Fetch ContactPage global (heading, subtitle, background image)
  const contactPageData = await payload.findGlobal({
    slug: 'contact-page',
    depth: 1,
  });

  // — Fetch SiteSettings global (contactEmail for form destination)
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
  });

  // — Extract background image if populated
  const backgroundImage =
    contactPageData.backgroundImage && typeof contactPageData.backgroundImage === 'object'
      ? (contactPageData.backgroundImage as Media)
      : null;

  return (
    <ContactSection
      headerText={contactPageData.headerText}
      subtitleText={contactPageData.subtitleText ?? null}
      backgroundImage={backgroundImage}
      contactEmail={siteSettings.contactEmail}
    />
  );
}
