// Media collection — central upload type for all images.
// Stored in Cloudinary via cloud-storage plugin. Referenced by Projects, Globals, etc.

import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    description: 'All images uploaded here are stored in Cloudinary CDN.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  upload: {
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 120, height: 80, position: 'centre' },
      { name: 'card', width: 600, height: 400, position: 'centre' },
      { name: 'hero', width: 1920, height: 1080, position: 'centre' },
      { name: 'gallery', width: 1400, height: 900, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Alt text for accessibility (required)',
      },
    },
    {
      name: 'caption',
      type: 'text',
      required: false,
    },
    {
      name: 'orientation',
      type: 'select',
      required: false,
      options: [
        { label: 'Landscape', value: 'landscape' },
        { label: 'Portrait', value: 'portrait' },
        { label: 'Square', value: 'square' },
      ],
    },
  ],
};
