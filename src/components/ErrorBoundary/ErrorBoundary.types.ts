// ErrorBoundary types — props and internal state for the error boundary component

export interface ErrorBoundaryProps {
  /** Child components to wrap */
  children: React.ReactNode;
  /** Optional custom fallback UI to render when an error is caught */
  fallback?: React.ReactNode;
}

export interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The caught error, if any */
  error: Error | null;
}
