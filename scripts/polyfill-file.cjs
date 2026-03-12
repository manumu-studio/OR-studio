// File polyfill for Node.js build — must run before any other code
const { File } = require('node:buffer');
if (typeof globalThis.File === 'undefined') {
  globalThis.File = File;
}
