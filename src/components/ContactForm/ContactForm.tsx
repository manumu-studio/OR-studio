// ContactForm — wires DynamicForm with the contact Zod schema and Server Action.
// Defines field configuration and passes the SendButton as custom submit.

'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { DynamicForm } from '@/components/DynamicForm';
import type { FieldConfig } from '@/components/DynamicForm';
import { SendButton } from '@/components/SendButton';
import { contactFormSchema } from '@/lib/schemas/contactFormSchema';
import { submitContactForm } from '@/app/(frontend)/contact/actions';
import type { ContactFormProps } from './ContactForm.types';
import styles from './ContactForm.module.scss';

// — Field configurations for the contact form
const CONTACT_FIELDS: readonly FieldConfig[] = [
  {
    name: 'firstName',
    label: 'First Name',
    type: 'text',
    required: true,
    autoComplete: 'given-name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
    type: 'text',
    required: true,
    autoComplete: 'family-name',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    autoComplete: 'email',
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    required: true,
    autoComplete: 'tel',
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
  },
] as const;

export function ContactForm({ contactEmail }: ContactFormProps) {
  const prefersReduced = useReducedMotion();

  // — Wrap Server Action to pass contactEmail context
  // The Server Action reads contactEmail from SiteSettings directly,
  // but we keep the prop for potential future use (e.g., override).
  void contactEmail;

  const variants = prefersReduced
    ? undefined
    : {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      };

  return (
    <motion.div
      className={styles.contactForm}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
    >
      <DynamicForm
        schema={contactFormSchema}
        fields={CONTACT_FIELDS}
        action={submitContactForm}
        successMessage="Thank you for your message! We will get back to you soon."
        renderSubmitButton={({ isSubmitting, isDisabled }) => (
          <SendButton
            label="Send"
            direction="up"
            submit
            isSubmitting={isSubmitting}
            disabled={isDisabled}
          />
        )}
      />
    </motion.div>
  );
}
