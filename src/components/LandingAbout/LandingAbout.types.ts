// LandingAbout types — about page content section.

import type { Media } from '@/payload-types';

/** Payload Lexical rich text structure (serialized JSON) */
export type LexicalRichText = {
  readonly root: {
    readonly children: readonly unknown[];
    readonly direction: string | null;
    readonly format: string;
    readonly indent: number;
    readonly type: string;
    readonly version: number;
  };
};

export interface LandingAboutProps {
  /** Page heading from AboutPage global */
  readonly heading: string;
  /** Rich text body content (Lexical JSON) from AboutPage global */
  readonly sectionText: LexicalRichText | null;
  /** Background image from AboutPage global (populated Media or null) */
  readonly backgroundImage: Media | null;
}
