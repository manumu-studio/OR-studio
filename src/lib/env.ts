// Environment variable validation using Zod.
// Validates lazily on first access — avoids failing during Next.js build's static page collection
// when MONGODB_URI and other vars may not be available. Extended by future packets as new vars are added.

import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | null = null;

function getEnv(): Env {
  if (cached) return cached;

  // During Next.js build's static page collection, env vars may be unavailable.
  // Return placeholders so the config can load; real validation happens at runtime.
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    cached = {
      MONGODB_URI: 'mongodb://localhost:27017/build',
      PAYLOAD_SECRET: 'build-placeholder',
      CLOUDINARY_CLOUD_NAME: 'build',
      CLOUDINARY_API_KEY: 'build',
      CLOUDINARY_API_SECRET: 'build',
    };
    return cached;
  }

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const formatted = result.error.flatten().fieldErrors;
    const message = Object.entries(formatted)
      .map(
        ([key, errors]) =>
          `  ${key}: ${Array.isArray(errors) ? errors.join(', ') : String(errors)}`,
      )
      .join('\n');

    throw new Error(`❌ Invalid environment variables:\n${message}`);
  }

  cached = result.data;
  return cached;
}

export const env = new Proxy({} as Env, {
  get(_, prop: string) {
    return getEnv()[prop as keyof Env];
  },
});
