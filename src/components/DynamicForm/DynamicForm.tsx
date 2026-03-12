// DynamicForm — form component driven by Zod schema with Server Action submission.
// Replaces v1's Yup-based DynamicForm. Uses react-hook-form + @hookform/resolvers/zod.

'use client';

import { useActionState, useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, useReducedMotion } from 'framer-motion';
import type { z } from 'zod';
import { FloatingLabelInput } from '@/components/FloatingLabelInput';
import { PhoneInput } from '@/components/PhoneInput';
import type { DynamicFormProps, ActionResult } from './DynamicForm.types';
import styles from './DynamicForm.module.scss';

export function DynamicForm({
  schema,
  fields,
  action,
  successMessage = 'Thank you! Your message has been sent.',
  renderSubmitButton,
  onSuccess,
  className,
}: DynamicFormProps) {
  type FormValues = z.infer<typeof schema>;
  const prefersReduced = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);

  // — Server Action state (React 19 useActionState)
  const [actionState, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    action,
    null,
  );

  // — react-hook-form for client-side validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
  });

  // — Sync server-side field errors to react-hook-form
  useEffect(() => {
    if (actionState?.status === 'error' && actionState.fieldErrors) {
      for (const [field, messages] of Object.entries(actionState.fieldErrors)) {
        if (messages && messages.length > 0) {
          setError(field as keyof FormValues, {
            type: 'server',
            message: messages[0],
          });
        }
      }
    }
  }, [actionState, setError]);

  // — Reset form on success
  useEffect(() => {
    if (actionState?.status === 'success') {
      reset();
      onSuccess?.();
    }
  }, [actionState, reset, onSuccess]);

  // — Submit handler: validate client-side, then submit via Server Action
  const onSubmit = useCallback(() => {
    const formEl = formRef.current;
    if (!formEl) return;
    const formData = new FormData(formEl);
    formAction(formData);
  }, [formAction]);

  // — Determine submission state for UI
  const isSubmitting = isPending;
  const isSuccess = actionState?.status === 'success';
  const isError = actionState?.status === 'error';

  // — Animation variants
  const fieldVariants = prefersReduced
    ? undefined
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      };

  // — Separate name fields (first row) from other fields
  const { nameFields, otherFields } = useMemo(() => {
    const nameFields = fields.filter(
      (f) => f.name.toLowerCase().includes('first') || f.name.toLowerCase().includes('last'),
    );
    const otherFields = fields.filter(
      (f) => !f.name.toLowerCase().includes('first') && !f.name.toLowerCase().includes('last'),
    );
    return { nameFields, otherFields };
  }, [fields]);

  // — Render a single field
  const renderField = useCallback(
    (field: (typeof fields)[number]) => {
      const fieldError = errors[field.name as keyof FormValues];
      const errorValue =
        fieldError && typeof fieldError === 'object' && 'message' in fieldError
          ? (fieldError.message as string)
          : undefined;

      if (field.type === 'tel') {
        return (
          <PhoneInput
            key={field.name}
            name={field.name}
            label={field.label}
            register={register}
            error={errorValue}
            disabled={isSubmitting}
            required={field.required}
          />
        );
      }

      return (
        <FloatingLabelInput
          key={field.name}
          name={field.name}
          label={field.label}
          type={field.type}
          register={register}
          error={errorValue}
          disabled={isSubmitting}
          required={field.required}
          autoComplete={field.autoComplete}
        />
      );
    },
    [register, errors, isSubmitting],
  );

  const formClass = [styles.dynamicForm, className ?? ''].filter(Boolean).join(' ');

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      className={formClass}
      aria-label="Contact form"
      aria-busy={isSubmitting}
      noValidate
    >
      {/* Honeypot field — hidden from users, catches bots */}
      <div className={styles.honeypot} aria-hidden="true">
        <input type="text" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Name row (first + last name side by side) */}
      {nameFields.length > 0 && (
        <motion.div
          className={styles.nameRow}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {nameFields.map(renderField)}
        </motion.div>
      )}

      {/* Other fields */}
      {otherFields.map((field, index) => (
        <motion.div
          key={field.name}
          variants={fieldVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
        >
          {renderField(field)}
        </motion.div>
      ))}

      {/* Submit button */}
      <motion.div
        className={styles.submitRow}
        variants={fieldVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.3, delay: 0.2 + otherFields.length * 0.1 }}
      >
        {renderSubmitButton ? (
          renderSubmitButton({
            isSubmitting,
            isSuccess,
            isDisabled: isSubmitting,
          })
        ) : (
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        )}
      </motion.div>

      {/* Status messages */}
      {isSuccess && (
        <motion.div
          className={styles.successMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="status"
          aria-live="polite"
        >
          {successMessage}
        </motion.div>
      )}

      {isError && actionState?.message && (
        <motion.div
          className={styles.errorMessage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          role="alert"
          aria-live="assertive"
        >
          {actionState.message}
        </motion.div>
      )}

      {/* A11y live region for screen readers */}
      <div className={styles.srOnly} role="status" aria-live="polite">
        {isSubmitting
          ? 'Sending your message...'
          : isSuccess
            ? successMessage
            : isError
              ? `Error: ${actionState?.message ?? ''}`
              : ''}
      </div>
    </form>
  );
}
