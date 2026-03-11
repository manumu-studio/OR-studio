// Cloudinary image loader for next/image.
// Transforms Cloudinary URLs with auto format, quality, and width params.
// Replaces v1's unoptimized: true with proper CDN-optimized delivery.

import type { ImageLoaderProps } from 'next/image';

export function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const qualityParam = quality ?? 'auto';
  const transforms = `f_auto,q_${qualityParam},w_${width}`;

  const uploadSegment = '/upload/';
  const uploadIndex = src.indexOf(uploadSegment);

  if (uploadIndex === -1) {
    return `${src}?w=${width}&q=${qualityParam}`;
  }

  const beforeUpload = src.slice(0, uploadIndex + uploadSegment.length);
  const afterUpload = src.slice(uploadIndex + uploadSegment.length);

  if (/^v\d+\//.test(afterUpload)) {
    return `${beforeUpload}${transforms}/${afterUpload}`;
  }

  return `${beforeUpload}${transforms},${afterUpload}`;
}

export default cloudinaryLoader;
