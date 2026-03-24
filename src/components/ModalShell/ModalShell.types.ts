// ModalShell types — props for the accessible modal dialog overlay.

import type { ReactNode } from 'react';

export interface ModalShellProps {
  /** Whether the modal is currently open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Accessible label describing the modal content */
  ariaLabel: string;
  /** Modal content */
  children: ReactNode;
}
