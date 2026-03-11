// Frontend root layout — wraps all public-facing pages
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OR Studio',
  description: 'Architectural visualization studio',
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
