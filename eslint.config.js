const js = require('@eslint/js');
const globals = require('globals');

const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');

const prettierConfig = require('eslint-config-prettier');

module.exports = [
  {
    ignores: ['dist/**']
  },

  // Equivalent of "eslint:recommended"
  js.configs.recommended,

  // TypeScript-specific configuration.
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.json'],
        sourceType: 'module',
        ecmaVersion: 2021
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest
      }
    },
    plugins: {
      '@typescript-eslint': tsPlugin
    },
    rules: {
      // Equivalent of "plugin:@typescript-eslint/recommended"
      ...tsPlugin.configs.recommended.rules,

      // Project-specific override.
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  },

  // Equivalent of "prettier" in `extends` (disables conflicting stylistic rules)
  prettierConfig
];

