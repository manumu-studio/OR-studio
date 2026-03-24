// ContactPage global — contact page heading, subtitle, and background image.
// Singleton: one document, queried via payload.findGlobal({ slug: 'contact-page' }).
import type { GlobalConfig } from 'payload';

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    description: 'Contact page content: heading, subtitle, and background image.',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'headerText',
      type: 'text',
      required: true,
      label: 'Page Heading',
      admin: {
        placeholder: "e.g., Let's Get Started!",
      },
    },
    {
      name: 'subtitleText',
      type: 'text',
      label: 'Subtitle',
      admin: {
        placeholder: 'Subheading displayed below the main title',
      },
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
    },
  ],
};
