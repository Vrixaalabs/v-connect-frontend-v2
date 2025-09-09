import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import { globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
  globalIgnores(['dist', 'node_modules', '*.js', '*.d.ts', 'scripts', 'cdk', 'vite.config.ts']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      // 'unused-imports': unusedImports,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-case-declarations': 'off',
      '@typescript-eslint/react-refresh/only-export-components': 'off',

      // TypeScript specific rules - Strict typing
      // '@typescript-eslint/no-unused-vars': 'off', // Use unused-imports plugin instead
      // 'unused-imports/no-unused-imports': 'error',
      // 'unused-imports/no-unused-vars': [
      //   'error',
      //   {
      //     vars: 'all',
      //     varsIgnorePattern: '^_',
      //     args: 'after-used',
      //     argsIgnorePattern: '^_',
      //   },
      // ],
      // '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/explicit-function-return-type': 'off', // Too strict for React components
      // '@typescript-eslint/explicit-module-boundary-types': 'off', // Too strict for React components

      // '@typescript-eslint/prefer-nullish-coalescing': 'error',
      // '@typescript-eslint/prefer-optional-chain': 'error',
      // '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      // '@typescript-eslint/no-floating-promises': 'error',
      // '@typescript-eslint/await-thenable': 'error',
      // '@typescript-eslint/no-misused-promises': 'error',
      // '@typescript-eslint/require-await': 'error',
      // '@typescript-eslint/no-unsafe-assignment': 'error',
      // '@typescript-eslint/no-unsafe-call': 'error',
      // '@typescript-eslint/no-unsafe-member-access': 'error',
      // '@typescript-eslint/no-unsafe-return': 'error',
      // '@typescript-eslint/restrict-template-expressions': 'error',
      // '@typescript-eslint/unbound-method': 'error',
      // '@typescript-eslint/no-non-null-assertion': 'error', // Make non-null assertions errors

      // // React specific rules
      // 'react-hooks/exhaustive-deps': 'error',
      // 'react-hooks/rules-of-hooks': 'error',
      // 'react-refresh/only-export-components': 'warn',

      // // General rules
      // 'no-console': 'error',
      // 'no-debugger': 'error',
      // 'no-unused-vars': 'off', // Use TypeScript version instead
      // 'prefer-const': 'error',
      // 'no-var': 'error',
      // 'no-unreachable': 'error',
      // 'no-constant-condition': 'error',
      // 'no-duplicate-imports': 'error',
      // 'no-unused-expressions': 'error',
      // 'no-sequences': 'error',
      // 'no-eval': 'error',
      // 'no-implied-eval': 'error',
      // 'no-new-func': 'error',
      // 'no-script-url': 'error',
      // 'no-throw-literal': 'error',
      // 'no-unmodified-loop-condition': 'error',
      // 'no-useless-call': 'error',
      // 'no-useless-concat': 'error',
      // 'no-useless-return': 'error',
      // 'prefer-promise-reject-errors': 'error',
      // 'require-await': 'off', // Use TypeScript version

      // // Code quality
      // // complexity: ['warn', 15],
      // // 'max-lines-per-function': ['warn', 300], // More reasonable for React components
      // // 'max-params': ['warn', 5],
      // // 'max-depth': ['warn', 4],
      // // 'max-lines': ['warn', 800], // More reasonable for complex components
      // // 'max-nested-callbacks': ['warn', 5],
      // // 'max-statements': ['warn', 50],
      // // 'max-len': ['warn', { code: 150, ignoreUrls: true, ignoreStrings: true }], // Slightly longer lines

      // // Best practices
      // eqeqeq: ['error', 'always'],
      // curly: ['error', 'all'],
      // 'no-empty': 'error',
      // 'no-empty-function': 'error',
      // 'no-extra-bind': 'error',
      // 'no-extra-label': 'error',
      // 'no-extra-semi': 'error',
      // 'no-func-assign': 'error',
      // 'no-import-assign': 'error',
      // 'no-inner-declarations': 'error',
      // 'no-irregular-whitespace': 'error',
      // 'no-loss-of-precision': 'error',
      // 'no-misleading-character-class': 'error',
      // 'no-obj-calls': 'error',
      // 'no-prototype-builtins': 'error',
      // 'no-redeclare': 'error',
      // 'no-regex-spaces': 'error',
      // 'no-self-assign': 'error',
      // 'no-self-compare': 'error',
      // 'no-setter-return': 'error',
      // 'no-sparse-arrays': 'error',
      // 'no-template-curly-in-string': 'error',
      // 'no-unexpected-multiline': 'error',
      // 'no-unreachable-loop': 'error',
      // 'no-unsafe-finally': 'error',
      // 'no-unsafe-negation': 'error',
      // 'no-unsafe-optional-chaining': 'error',
      // 'use-isnan': 'error',
      // 'valid-typeof': 'error',
    },
  },
  {
    files: ['**/__tests__/**/*.ts', '**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx', '**/*.spec.tsx'],
    rules: {
      // 'no-console': 'off',
      // '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/explicit-function-return-type': 'off',
      // 'max-lines-per-function': 'off',
      // complexity: 'off',
      // '@typescript-eslint/no-unsafe-assignment': 'off',
      // '@typescript-eslint/no-unsafe-call': 'off',
      // '@typescript-eslint/no-unsafe-member-access': 'off',
      // '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    files: ['src/config/**/*.ts', 'src/lib/config.ts'],
    rules: {
      // '@typescript-eslint/no-explicit-any': 'error',
      // 'max-lines': 'off',
    },
  },
  {
    files: ['src/graphql/**/*.ts', 'src/store/**/*.ts'],
    rules: {
      // '@typescript-eslint/no-explicit-any': 'error',
      // '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]);
