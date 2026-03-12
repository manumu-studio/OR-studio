// GridCard — clickable project image card with hover overlay.
// Uses next/image with Cloudinary loader for optimized delivery.

'use client';

import Image from 'next/image';
import { cloudinaryLoader } from '@/lib/cloudinary-loader';
import type { GridCardProps } from './GridCard.types';
import styles from './GridCard.module.scss';

export function GridCard({ image, title, onClick }: GridCardProps) {
  const imageUrl = image.url ?? '';
  const altText = image.alt ?? title;

  return (
    <button
      type="button"
      onClick={onClick}
      className={styles.card}
      aria-label={`View ${title} gallery`}
    >
      <div className={styles.imageWrapper}>
        <Image
          loader={cloudinaryLoader}
          src={imageUrl}
          alt={altText}
          width={image.width ?? 800}
          height={image.height ?? 600}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
        />
      </div>
      <div className={styles.overlay}>
        <span className={styles.title}>{title}</span>
      </div>
    </button>
  );
}
