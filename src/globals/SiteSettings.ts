// SiteSettings global — site-wide branding, contact email, social links, and navigation.
// Singleton: one document, queried via payload.findGlobal({ slug: 'site-settings' }).
import type { GlobalConfig } from 'payload';

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    description: 'Site-wide settings: branding, contact email, social links, and navigation.',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    // — Branding
    {
      name: 'siteName',
      type: 'text',
      required: true,
      defaultValue: 'OR Studio',
      label: 'Site Name',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Site Logo',
    },

    // — Contact
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
      label: 'Contact Email',
      admin: {
        description: 'Destination email for contact form submissions.',
      },
    },

    // — Social links
    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Media Links',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      fields: [
        {
          name: 'platform',
          type: 'text',
          required: true,
          label: 'Platform',
          admin: {
            placeholder: 'e.g., Instagram, LinkedIn, Behance',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          admin: {
            placeholder: 'https://...',
          },
        },
      ],
    },

    // — Navigation
    {
      name: 'navLinks',
      type: 'array',
      label: 'Navigation Links',
      labels: {
        singular: 'Nav Link',
        plural: 'Nav Links',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            placeholder: 'e.g., Works, About, Contact',
          },
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          admin: {
            placeholder: 'e.g., /works, /about',
          },
        },
        {
          name: 'order',
          type: 'number',
          required: true,
          defaultValue: 0,
          label: 'Display Order',
        },
      ],
    },
  ],
};
