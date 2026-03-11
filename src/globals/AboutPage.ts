// AboutPage global — about page heading, rich text body, and background image.
// Singleton: one document, queried via payload.findGlobal({ slug: 'about-page' }).
import type { GlobalConfig } from 'payload';

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  admin: {
    description: 'About page content: heading, body text, and background image.',
  },
  access: {
    read: () => true,
    update: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Page Heading',
      admin: {
        placeholder: 'e.g., Designing spaces that reflect your story',
      },
    },
    {
      name: 'sectionText',
      type: 'richText',
      label: 'Body Content',
      admin: {
        description:
          'Main body text for the about page. Supports paragraphs, bold, italic, links, and lists.',
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
