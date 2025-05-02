import type { UserConfig } from '@commitlint/types';

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'chore',
        'revert',
      ],
    ],
    'subject-full-stop': [0],
    'subject-case': [0],
    "header-max-length": [2, "always", 200], 
    "body-max-length": [2, "always", 500],
    "body-max-line-length": [2, "always", 200],
    'scope-case': [0],
  },
};

export default config;