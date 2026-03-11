// HomePage global — hero carousel, about preview banner, and featured work banners.
// Singleton: one document, queried via payload.findGlobal({ slug: 'home-page' }).
import type { GlobalConfig } from 'payload';

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    description: 'Home page content: hero section, about preview, and featured project banners.',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    // — Hero section
    {
      name: 'heroTitle',
      type: 'text',
      required: true,
      label: 'Hero Title',
      admin: {
        placeholder: 'e.g., DESIGN DIFFERENT',
      },
    },
    {
      name: 'heroSubtitle',
      type: 'text',
      label: 'Hero Subtitle',
      admin: {
        placeholder: 'Tagline displayed below the title',
      },
    },
    {
      name: 'heroImages',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Hero Carousel Images',
      labels: {
        singular: 'Hero Image',
        plural: 'Hero Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Image',
        },
      ],
    },

    // — About preview banner
    {
      name: 'aboutBanner',
      type: 'group',
      label: 'About Preview Banner',
      admin: {
        description: 'About section preview shown on the home page.',
      },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          label: 'About Text',
          admin: {
            placeholder: 'Brief description of OR Studio...',
          },
        },
        {
          name: 'linkLabel',
          type: 'text',
          label: 'CTA Button Label',
          defaultValue: 'More about us',
        },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'CTA Button URL',
          defaultValue: '/about',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Banner Image',
        },
      ],
    },

    // — Featured work banners
    {
      name: 'workBanners',
      type: 'array',
      maxRows: 3,
      label: 'Featured Work Banners',
      labels: {
        singular: 'Work Banner',
        plural: 'Work Banners',
      },
      admin: {
        description: 'Up to 3 featured projects displayed as banners on the home page.',
      },
      fields: [
        {
          name: 'project',
          type: 'relationship',
          relationTo: 'projects',
          required: true,
          label: 'Project',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Banner Image',
        },
      ],
    },
  ],
};
