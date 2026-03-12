// ContactSection — full contact page wrapper with background image, header, and form.
// Receives CMS data from the Contact page Server Component.

'use client';

import Image from 'next/image';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import { ContactHeader } from '@/components/ContactHeader';
import { ContactForm } from '@/components/ContactForm';
import type { ContactSectionProps } from './ContactSection.types';
import styles from './ContactSection.module.scss';

export function ContactSection({
  headerText,
  subtitleText,
  backgroundImage,
  contactEmail,
}: ContactSectionProps) {
  return (
    <section className={styles.contactSection}>
      {/* Background image (CMS-driven) */}
      {backgroundImage?.url && (
        <div className={styles.backgroundWrapper} aria-hidden="true">
          <Image
            loader={cloudinaryLoader}
            src={backgroundImage.url}
            alt=""
            fill
            sizes="100vw"
            className={styles.backgroundImage}
            priority
          />
        </div>
      )}

      <div className={styles.content}>
        <ContactHeader title={headerText} subtitle={subtitleText} />
        <ContactForm contactEmail={contactEmail} />
      </div>
    </section>
  );
}
