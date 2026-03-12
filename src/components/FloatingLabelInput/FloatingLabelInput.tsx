// FloatingLabelInput — text input with CSS floating label animation.
// Integrates with react-hook-form via register. Supports text, email, textarea types.

'use client';

import { useId, useMemo } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { FloatingLabelInputProps } from './FloatingLabelInput.types';
import { getErrorMessage } from './FloatingLabelInput.types';
import styles from './FloatingLabelInput.module.scss';

export function FloatingLabelInput<TValues extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder = ' ',
  register,
  error,
  disabled = false,
  autoComplete,
  id,
  required = false,
  className,
}: FloatingLabelInputProps<TValues>) {
  const autoId = useId();
  const controlId = id ?? `${name.replace(/\./g, '-')}-${autoId}`;
  const errorMessage = useMemo(() => getErrorMessage(error), [error]);

  // — Determine inputMode for mobile keyboards
  const inputMode = useMemo(() => {
    switch (type) {
      case 'email':
        return 'email' as const;
      case 'tel':
        return 'tel' as const;
      case 'number':
        return 'numeric' as const;
      case 'url':
        return 'url' as const;
      default:
        return undefined;
    }
  }, [type]);

  // — Container class names
  const containerClass = [
    styles.floatingLabelInput,
    errorMessage ? styles.invalid : '',
    disabled ? styles.disabled : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');

  // — Common props shared between input and textarea
  const registerProps = register(name);

  return (
    <div className={containerClass}>
      {type === 'textarea' ? (
        <textarea
          {...registerProps}
          id={controlId}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          rows={4}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={errorMessage ? `${controlId}-error` : undefined}
          aria-required={required || undefined}
        />
      ) : (
        <input
          {...registerProps}
          id={controlId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={errorMessage ? `${controlId}-error` : undefined}
          aria-required={required || undefined}
        />
      )}

      {/* Label MUST come after the control for the CSS + sibling selector to work */}
      <label htmlFor={controlId}>
        {label}
        {required && (
          <span className={styles.requiredIndicator} aria-label="required">
            *
          </span>
        )}
      </label>

      {/* Error message — always rendered for consistent layout */}
      <div
        id={`${controlId}-error`}
        className={styles.errorText}
        role={errorMessage ? 'alert' : 'status'}
        aria-live="polite"
      >
        {errorMessage}
      </div>
    </div>
  );
}
