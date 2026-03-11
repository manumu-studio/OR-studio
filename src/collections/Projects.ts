// Projects collection — portfolio work items with images, category, and publication status.
// Core content type for the Works page. References Media (images) and Categories.

import type { Access, CollectionConfig } from 'payload';

/** Converts a string to a URL-safe kebab-case slug. */
const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

// Public users only see published projects; authenticated users see all
const readAccess: Access = ({ req }) => {
  if (req.user) return true;
  return { status: { equals: 'published' as const } };
};

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'order'],
    description: 'Portfolio projects displayed on the Works page.',
  },
  defaultSort: 'order',
  access: {
    read: readAccess,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.title && !data.slug) {
          return { ...data, slug: toSlug(data.title) };
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated from title',
      },
    },
    {
      name: 'category',
      type: 'relationship',
      relationTo: 'categories',
      required: true,
      admin: {
        description: 'Assign to one category (Residential, Commercial, etc.)',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Primary display image (shown in grid cards and hero)',
      },
    },
    {
      name: 'gallery',
      type: 'array',
      admin: {
        description: 'Additional images shown in the lightbox gallery',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'order',
      type: 'number',
      required: true,
      defaultValue: 0,
      admin: {
        description: 'Display order within category (lower = first)',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        description: 'Only published projects are visible on the site',
      },
    },
  ],
};
