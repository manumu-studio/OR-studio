// LandingAbout — about page content section with CMS-driven heading, rich text, and image.
// Replaces v1's hard-coded content with Payload global data.

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { RichText } from '@payloadcms/richtext-lexical/react';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import type { LandingAboutProps } from './LandingAbout.types';
import styles from './LandingAbout.module.scss';

// — Framer Motion animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.33, 1, 0.68, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 200 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 1.6, ease: [0.33, 1, 0.68, 1] },
  },
};

// — Reduced motion variants (opacity only)
const fadeOnly = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25, delayChildren: 0.4 },
  },
};

export function LandingAbout({ heading, sectionText, backgroundImage }: LandingAboutProps) {
  const prefersReduced = useReducedMotion();
  const textVariant = prefersReduced ? fadeOnly : fadeUp;
  const imageVariant = prefersReduced ? fadeOnly : fadeInRight;

  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutWrapper}>
        {/* Left block — text content */}
        <motion.div
          className={styles.left}
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 className={styles.heading} variants={textVariant}>
            {heading}
          </motion.h2>

          {sectionText && (
            <motion.div className={styles.richTextBody} variants={textVariant}>
              <RichText data={sectionText as React.ComponentProps<typeof RichText>['data']} />
            </motion.div>
          )}

          <motion.div variants={textVariant}>
            <Link href="/contact" className={styles.contactLink}>
              Contact us
            </Link>
          </motion.div>
        </motion.div>

        {/* Right block — background image */}
        {backgroundImage?.url && (
          <motion.div
            className={styles.right}
            variants={imageVariant}
            initial="hidden"
            animate="visible"
          >
            <div className={styles.imageWrapper}>
              <Image
                loader={cloudinaryLoader}
                src={backgroundImage.url}
                alt={backgroundImage.alt ?? 'About OR Studio'}
                width={backgroundImage.width ?? 1400}
                height={backgroundImage.height ?? 1000}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.bgImage}
                priority
              />
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
