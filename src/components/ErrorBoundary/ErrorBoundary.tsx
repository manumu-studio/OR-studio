// ErrorBoundary — catches runtime errors in the component tree and renders a fallback UI
'use client';

import { Component } from 'react';

import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    // Log error details for debugging in development (intentional — per project standards)
    /* eslint-disable-next-line no-console */
    console.error('[ErrorBoundary] Caught error:', error);
    /* eslint-disable-next-line no-console */
    console.error('[ErrorBoundary] Component stack:', errorInfo.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          role="alert"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '50vh',
            padding: '2rem',
            textAlign: 'center',
            color: 'var(--text-color, #fff)',
          }}
        >
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Something went wrong</h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.7 }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer',
              border: '1px solid var(--border-default, rgba(255,255,255,0.35))',
              borderRadius: '8px',
              background: 'transparent',
              color: 'inherit',
            }}
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
