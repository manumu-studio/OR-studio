// Payload CMS config — MongoDB, Users, Media (Cloudinary), Lexical editor. Configures collections, plugins, and database.
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage';
import { buildConfig } from 'payload';

import { Media } from '@/collections/Media';
import { Users } from '@/collections/Users';
import { env } from '@/lib/env';
import { getCloudinaryAdapter } from '@/lib/cloudinary-adapter';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    autoLogin:
      process.env.NODE_ENV === 'development'
        ? { email: 'dev@orstudio.com', password: 'password' }
        : false,
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: env.PAYLOAD_SECRET,
  serverURL:
    process.env.NEXT_PUBLIC_SERVER_URL ||
    process.env.PAYLOAD_PUBLIC_SERVER_URL ||
    process.env.SERVER_URL ||
    'http://localhost:3000',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: env.MONGODB_URI,
  }),
  sharp,
  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: getCloudinaryAdapter({
            cloudName: env.CLOUDINARY_CLOUD_NAME,
            apiKey: env.CLOUDINARY_API_KEY,
            apiSecret: env.CLOUDINARY_API_SECRET,
            folder: 'or-studio',
          }),
          disableLocalStorage: true,
        },
      },
    }),
  ],
});
