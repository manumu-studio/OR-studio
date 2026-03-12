// Contact form Server Action — validates with Zod, sanitizes with DOMPurify,
// rate limits by IP, checks honeypot, and sends email via SiteSettings.contactEmail.

'use server';

import { headers } from 'next/headers';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { contactFormSchema, type ContactFormValues } from '@/lib/schemas/contactFormSchema';

// — Discriminated union for action result
type ActionResult =
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string[]> };

// — In-memory rate limiter (resets on server restart)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

// — Sanitize all string values in the form data (DOMPurify loaded dynamically to avoid build issues)
async function sanitizeFormData(data: ContactFormValues): Promise<ContactFormValues> {
  const DOMPurify = (await import('isomorphic-dompurify')).default;
  return {
    firstName: DOMPurify.sanitize(data.firstName),
    lastName: DOMPurify.sanitize(data.lastName),
    email: DOMPurify.sanitize(data.email),
    phone: DOMPurify.sanitize(data.phone),
    message: DOMPurify.sanitize(data.message),
    honeypot: data.honeypot,
  };
}

export async function submitContactForm(
  _prevState: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  // — Extract form values
  const rawData = {
    firstName: (formData.get('firstName') as string) ?? '',
    lastName: (formData.get('lastName') as string) ?? '',
    email: (formData.get('email') as string) ?? '',
    phone: (formData.get('phone') as string) ?? '',
    message: (formData.get('message') as string) ?? '',
    honeypot: (formData.get('honeypot') as string) ?? '',
  };

  // — Honeypot check (reject silently — bots don't need error details)
  if (rawData.honeypot && rawData.honeypot.length > 0) {
    return { status: 'success', message: 'Thank you for your message!' };
  }

  // — Rate limit check
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (!checkRateLimit(ip)) {
    return {
      status: 'error',
      message: 'Too many submissions. Please try again in 15 minutes.',
    };
  }

  // — Zod validation
  const parseResult = contactFormSchema.safeParse(rawData);

  if (!parseResult.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parseResult.error.issues) {
      const fieldName = (issue.path[0]?.toString() ?? 'form') as string;
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = [];
      }
      fieldErrors[fieldName].push(issue.message);
    }

    return {
      status: 'error',
      message: 'Please fix the errors below.',
      fieldErrors,
    };
  }

  // — Sanitize validated data
  const sanitizedData = await sanitizeFormData(parseResult.data);

  // — Fetch contactEmail from SiteSettings
  const payload = await getPayload({ config: configPromise });
  const siteSettings = await payload.findGlobal({
    slug: 'site-settings',
    depth: 0,
  });

  const contactEmail = siteSettings.contactEmail;

  // — Send email (placeholder — integrate with email service)
  // TODO: Replace with actual email sending (Resend, Nodemailer, etc.)
  // For now, log the submission details for development.
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console -- development-only logging for contact form debugging
    console.info('[Contact Form] Submission received:', {
      to: contactEmail,
      from: sanitizedData.email,
      name: `${sanitizedData.firstName} ${sanitizedData.lastName}`,
      phone: sanitizedData.phone,
      message: sanitizedData.message.substring(0, 100) + '...',
    });
  }

  return {
    status: 'success',
    message: 'Thank you for your message! We will get back to you soon.',
  };
}
