// Cloudinary adapter for @payloadcms/plugin-cloud-storage.
// Handles upload, delete, URL generation, and static file serving for Media collection.

import { createReadStream } from 'fs';
import { Readable } from 'stream';
import { v2 as cloudinary } from 'cloudinary';
import type { Adapter } from '@payloadcms/plugin-cloud-storage/types';

export interface CloudinaryAdapterConfig {
  cloudName: string;
  apiKey: string;
  apiSecret: string;
  folder: string;
}

function getPublicIdFromUrl(url: string): string | null {
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/);
  return match?.[1] ?? null;
}

export const getCloudinaryAdapter =
  (config: CloudinaryAdapterConfig): Adapter =>
  ({ prefix }) => {
    const folder = prefix ?? config.folder;

    cloudinary.config({
      cloud_name: config.cloudName,
      api_key: config.apiKey,
      api_secret: config.apiSecret,
    });

    return {
      name: 'cloudinary',
      handleUpload: async ({ data, file }) => {
        const uploadPromise = new Promise<{ secure_url: string }>((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder,
              resource_type: 'image',
            },
            (err, result) => {
              if (err) reject(err);
              else if (result?.secure_url) resolve({ secure_url: result.secure_url });
              else reject(new Error('Upload failed'));
            },
          );

          const input = file.tempFilePath
            ? createReadStream(file.tempFilePath)
            : Readable.from(file.buffer);
          input.pipe(stream);
        });

        const result = await uploadPromise;
        return {
          ...data,
          url: result.secure_url,
        };
      },
      handleDelete: async ({ doc, filename }) => {
        const url = (doc as { url?: string }).url;
        const publicId =
          (url ? getPublicIdFromUrl(url) : null) ?? `${folder}/${filename.replace(/\.[^.]+$/, '')}`;

        if (publicId) {
          await cloudinary.uploader.destroy(publicId, { resource_type: 'image' });
        }
      },
      generateURL: ({ filename, prefix: urlPrefix }) => {
        const path = [urlPrefix ?? folder, filename].filter(Boolean).join('/');
        return `https://res.cloudinary.com/${config.cloudName}/image/upload/${path}`;
      },
      staticHandler: async (_req, { doc, params }) => {
        const url = (doc as { url?: string })?.url;
        if (url) {
          return Response.redirect(url, 302);
        }
        const generatedUrl = `https://res.cloudinary.com/${config.cloudName}/image/upload/${folder}/${params.filename}`;
        return Response.redirect(generatedUrl, 302);
      },
    };
  };
