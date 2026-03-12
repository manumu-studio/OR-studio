// PhoneInput — phone number input with country code selector dropdown.
// Integrates with react-hook-form via register.

'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import type { FieldValues } from 'react-hook-form';
import type { Country, PhoneInputProps } from './PhoneInput.types';
import { DEFAULT_COUNTRIES, DEFAULT_COUNTRY, getPhoneErrorMessage } from './PhoneInput.types';
import styles from './PhoneInput.module.scss';

export function PhoneInput<TValues extends FieldValues>({
  name,
  label,
  placeholder = ' ',
  register,
  error,
  disabled = false,
  required = false,
  maxLength = 20,
}: PhoneInputProps<TValues>) {
  const autoId = useId();
  const controlId = `${name.replace(/\./g, '-')}-${autoId}`;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const errorMessage = useMemo(() => getPhoneErrorMessage(error), [error]);

  const [selectedCountry, setSelectedCountry] = useState<Country>(DEFAULT_COUNTRY);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // — react-hook-form register
  const registerProps = register(name);

  // — Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // — Close dropdown on Escape
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  }, []);

  // — Select a country
  const handleCountrySelect = useCallback((country: Country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
  }, []);

  // — Container class
  const containerClass = [
    styles.phoneInputContainer,
    errorMessage ? styles.invalid : '',
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass} ref={dropdownRef} onKeyDown={handleKeyDown}>
      {/* Label */}
      <label htmlFor={controlId} className={styles.label}>
        {label}
        {required && <span className={styles.requiredIndicator}>*</span>}
      </label>

      {/* Input row */}
      <div className={styles.inputRow}>
        {/* Country selector button */}
        <button
          type="button"
          className={styles.countrySelector}
          onClick={() => !disabled && setIsDropdownOpen((prev) => !prev)}
          disabled={disabled}
          aria-label={`Select country. Current: ${selectedCountry.name}`}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
        >
          <span className={styles.countryFlag} aria-hidden="true">
            {selectedCountry.flag}
          </span>
          <span className={styles.dialCode} aria-hidden="true">
            {selectedCountry.dialCode}
          </span>
          <span className={styles.chevron} aria-hidden="true" data-open={isDropdownOpen} />
        </button>

        {/* Phone number input */}
        <input
          {...registerProps}
          id={controlId}
          type="tel"
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete="tel"
          aria-invalid={errorMessage ? true : undefined}
          aria-describedby={errorMessage ? `${controlId}-error` : undefined}
          aria-required={required || undefined}
          className={styles.phoneInput}
        />
      </div>

      {/* Country dropdown */}
      {isDropdownOpen && (
        <div className={styles.countryDropdown} role="listbox" aria-label="Country selection">
          {DEFAULT_COUNTRIES.map((country) => (
            <button
              key={country.code}
              type="button"
              className={[
                styles.countryOption,
                country.code === selectedCountry.code ? styles.countryOptionSelected : '',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => handleCountrySelect(country)}
              role="option"
              aria-selected={country.code === selectedCountry.code}
            >
              <span className={styles.countryFlag} aria-hidden="true">
                {country.flag}
              </span>
              <span className={styles.countryName}>{country.name}</span>
              <span className={styles.dialCode}>{country.dialCode}</span>
            </button>
          ))}
        </div>
      )}

      {/* Error message */}
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
