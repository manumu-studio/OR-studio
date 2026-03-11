// Root layout — wraps all routes
import type { ReactNode } from 'react';

import '@/styles/globals.scss';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
