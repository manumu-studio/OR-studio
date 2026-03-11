// Commitlint config — enforces Conventional Commits format
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        'cms',
        'frontend',
        'works',
        'home',
        'contact',
        'about',
        'nav',
        'auth',
        'media',
        'seed',
        'ci',
        'seo',
        'a11y',
        'security',
        'config',
        'styles',
        'deps',
      ],
    ],
    'scope-empty': [1, 'never'],
    'subject-case': [0, 'always'], // disabled — allow product names (Next.js, Payload CMS)
  },
}
