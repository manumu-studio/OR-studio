// Frontend root layout — wraps all public-facing pages with fonts, providers, and navigation
import type { Metadata } from 'next';

import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Header } from '@/components/Header';
import { LogoPreloader } from '@/components/LogoPreloader';
import { NavProvider } from '@/providers/NavProvider';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: {
    default: 'OR Studio',
    template: '%s | OR Studio',
  },
  description:
    'Architectural visualization studio specializing in photorealistic 3D renders, animations, and immersive visual experiences for architecture and real estate.',
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className={styles.skipToContent}>
        Skip to content
      </a>
      <ErrorBoundary>
        <NavProvider>
          <LogoPreloader />
          <Header />
          <main id="main-content">{children}</main>
        </NavProvider>
      </ErrorBoundary>
    </>
  );
}
