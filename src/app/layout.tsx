// Root layout — wraps all routes with font and global styles
import type { ReactNode } from 'react';
import { Raleway } from 'next/font/google';

import '@/styles/globals.scss';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '900'],
  display: 'swap',
  variable: '--font-raleway',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
