// Seed bootstrap — loads .env and File polyfill before any Payload imports.
import 'dotenv/config';
import { File as NodeFile } from 'node:buffer';
if (typeof globalThis.File === 'undefined') {
  (globalThis as unknown as { File: typeof NodeFile }).File = NodeFile;
}
