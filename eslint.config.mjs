import globals from 'globals';
import pluginJs from '@eslint/js';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config} */
const config = [
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  ...tsEslint.configs.recommended,
  {
    ignores: ['bin/**/*'],
  },
  {
    languageOptions: { globals: globals.browser, parser: tsParser },
    rules: {
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-async-promise-executor': 'warn',
      '@typescript-eslint/no-unused-vars': 'off', // covered by typescript no-unused-*
    },
  },
];

export default config;
