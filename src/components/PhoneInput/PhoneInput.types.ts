// PhoneInput types — phone number input with country code dropdown.

import type { FieldValues, Path, UseFormRegister, FieldError } from 'react-hook-form';

/** Country data for the dropdown */
export interface Country {
  readonly code: string;
  readonly name: string;
  readonly dialCode: string;
  readonly flag: string;
}

/** PhoneInput props */
export interface PhoneInputProps<TValues extends FieldValues> {
  /** Field name bound to react-hook-form */
  readonly name: Path<TValues>;
  /** Label text */
  readonly label: string;
  /** Placeholder text */
  readonly placeholder?: string;
  /** react-hook-form register function */
  readonly register: UseFormRegister<TValues>;
  /** Error message string or FieldError object */
  readonly error?: string | FieldError;
  /** Whether the input is disabled */
  readonly disabled?: boolean;
  /** Whether the field is required */
  readonly required?: boolean;
  /** Maximum input length */
  readonly maxLength?: number;
}

/** Default countries list — most common first, then alphabetical */
export const DEFAULT_COUNTRIES: readonly Country[] = [
  {
    code: 'US',
    name: 'United States',
    dialCode: '+1',
    flag: '\u{1F1FA}\u{1F1F8}',
  },
  { code: 'ES', name: 'Spain', dialCode: '+34', flag: '\u{1F1EA}\u{1F1F8}' },
  {
    code: 'PH',
    name: 'Philippines',
    dialCode: '+63',
    flag: '\u{1F1F5}\u{1F1ED}',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    dialCode: '+44',
    flag: '\u{1F1EC}\u{1F1E7}',
  },
  { code: 'CA', name: 'Canada', dialCode: '+1', flag: '\u{1F1E8}\u{1F1E6}' },
  {
    code: 'AU',
    name: 'Australia',
    dialCode: '+61',
    flag: '\u{1F1E6}\u{1F1FA}',
  },
  { code: 'DE', name: 'Germany', dialCode: '+49', flag: '\u{1F1E9}\u{1F1EA}' },
  { code: 'FR', name: 'France', dialCode: '+33', flag: '\u{1F1EB}\u{1F1F7}' },
  { code: 'IT', name: 'Italy', dialCode: '+39', flag: '\u{1F1EE}\u{1F1F9}' },
  { code: 'JP', name: 'Japan', dialCode: '+81', flag: '\u{1F1EF}\u{1F1F5}' },
  { code: 'MX', name: 'Mexico', dialCode: '+52', flag: '\u{1F1F2}\u{1F1FD}' },
  { code: 'BR', name: 'Brazil', dialCode: '+55', flag: '\u{1F1E7}\u{1F1F7}' },
  { code: 'IN', name: 'India', dialCode: '+91', flag: '\u{1F1EE}\u{1F1F3}' },
  { code: 'CN', name: 'China', dialCode: '+86', flag: '\u{1F1E8}\u{1F1F3}' },
  {
    code: 'KR',
    name: 'South Korea',
    dialCode: '+82',
    flag: '\u{1F1F0}\u{1F1F7}',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    dialCode: '+971',
    flag: '\u{1F1E6}\u{1F1EA}',
  },
  {
    code: 'SA',
    name: 'Saudi Arabia',
    dialCode: '+966',
    flag: '\u{1F1F8}\u{1F1E6}',
  },
  {
    code: 'AR',
    name: 'Argentina',
    dialCode: '+54',
    flag: '\u{1F1E6}\u{1F1F7}',
  },
  {
    code: 'CO',
    name: 'Colombia',
    dialCode: '+57',
    flag: '\u{1F1E8}\u{1F1F4}',
  },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '\u{1F1E8}\u{1F1F1}' },
] as const;

export const DEFAULT_COUNTRY: Country = {
  code: 'US',
  name: 'United States',
  dialCode: '+1',
  flag: '\u{1F1FA}\u{1F1F8}',
};

/** Get error message from string or FieldError */
export function getPhoneErrorMessage(err: string | FieldError | undefined): string {
  if (!err) return '';
  if (typeof err === 'string') return err;
  return err.message ?? 'Invalid phone number';
}
