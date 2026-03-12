// Contact form Zod validation schema — shared by server action and client form.
// Must live in a non–'use server' file so the schema reaches the client intact.

import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be under 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be under 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[+0-9\s\-()]+$/, 'Please enter a valid phone number'),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be under 2000 characters'),
  honeypot: z.string().max(0, 'Bot detected').optional(),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
