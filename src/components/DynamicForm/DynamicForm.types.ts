// DynamicForm types — generic form component driven by a Zod schema.

import type { ReactNode } from 'react';
import type { z } from 'zod';

/** Submission state machine */
export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

/** Server Action result — matches the discriminated union from actions.ts */
export type ActionResult =
  | { status: 'success'; message: string }
  | {
      status: 'error';
      message: string;
      fieldErrors?: Record<string, string[]>;
    };

/** Field configuration for dynamic rendering */
export interface FieldConfig {
  /** Field name (must match a key in the Zod schema) */
  readonly name: string;
  /** Display label */
  readonly label: string;
  /** Input type */
  readonly type: 'text' | 'email' | 'tel' | 'textarea';
  /** Whether the field is required */
  readonly required: boolean;
  /** HTML autocomplete attribute */
  readonly autoComplete?: string;
}

/** DynamicForm props */
export interface DynamicFormProps {
  /** Zod schema for validation */
  readonly schema: z.ZodObject<z.ZodRawShape>;
  /** Field configurations for rendering */
  readonly fields: readonly FieldConfig[];
  /** Server Action to call on submit */
  readonly action: (prevState: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  /** Success message override */
  readonly successMessage?: string;
  /** Custom submit button renderer */
  readonly renderSubmitButton?: (props: {
    isSubmitting: boolean;
    isSuccess: boolean;
    isDisabled: boolean;
  }) => ReactNode;
  /** Callback after successful submission */
  readonly onSuccess?: () => void;
  /** Additional CSS class name */
  readonly className?: string;
}
