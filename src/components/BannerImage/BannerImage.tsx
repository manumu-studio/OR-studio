// BannerImage — full-viewport background image with fade-in animation.
// Uses next/image fill layout with Cloudinary loader for optimized delivery.

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import type { BannerImageProps } from './BannerImage.types';
import styles from './BannerImage.module.scss';

export function BannerImage({ image, alt, priority = false, className }: BannerImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const imageUrl = image.url ?? '';
  const altText = alt ?? image.alt ?? 'Architectural visualization';

  return (
    <div className={`${styles.container} ${className ?? ''}`}>
      <motion.div
        className={styles.imageWrapper}
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
      >
        <Image
          loader={cloudinaryLoader}
          src={imageUrl}
          alt={altText}
          fill
          sizes="100vw"
          priority={priority}
          className={styles.image}
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>
    </div>
  );
}
