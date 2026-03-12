// FloatingLabelInput types — props for the floating label text input.

import type { FieldValues, Path, UseFormRegister, FieldError } from 'react-hook-form';

export type FieldType = 'text' | 'email' | 'tel' | 'textarea' | 'password' | 'number' | 'url';

export interface FloatingLabelInputProps<TValues extends FieldValues> {
  /** Field name bound to react-hook-form */
  readonly name: Path<TValues>;
  /** Label text displayed inside/above the input */
  readonly label: string;
  /** Input type (determines HTML element and inputMode) */
  readonly type?: FieldType;
  /** Placeholder text — defaults to ' ' for :placeholder-shown CSS selector */
  readonly placeholder?: string;
  /** react-hook-form register function */
  readonly register: UseFormRegister<TValues>;
  /** Error message string or FieldError object */
  readonly error?: string | FieldError;
  /** Whether the input is disabled */
  readonly disabled?: boolean;
  /** HTML autocomplete attribute */
  readonly autoComplete?: string;
  /** Custom id (auto-generated if omitted) */
  readonly id?: string;
  /** Whether the field is required (shows * indicator) */
  readonly required?: boolean;
  /** Additional CSS class name */
  readonly className?: string;
}

/** Extract string message from error (string or FieldError) */
export function getErrorMessage(err: string | FieldError | undefined): string {
  if (!err) return '';
  if (typeof err === 'string') return err;
  return err.message ?? 'Invalid input';
}
