// Environment variable validation using Zod.
// Validates required vars at startup — fails fast with clear error messages.
// Extended by future packets as new env vars are added.

import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  PAYLOAD_SECRET: z.string().min(1, 'PAYLOAD_SECRET is required'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
});

export type Env = z.infer<typeof envSchema>;

function validateEnv(): Env {
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

  return result.data;
}

export const env = validateEnv();
