import { defineConfig } from 'oxlint'
import { fileURLToPath } from 'node:url'
import type { OxlintConfig } from 'oxlint'

import { hasPackage, IGNORE_PATTERNS } from './shared.ts'

export interface VerfulOxlintConfig {
  /**
   * Enable AdonisJS lint rules
   *
   * Enabled by default if `@adonisjs/core` is detected in dependencies
   */
  adonisjs?: boolean

  /**
   * Enable the anti-slop rules
   *
   * @see https://github.com/dmmulroy/anti-slop
   * @default false
   */
  antiSlop?: boolean

  /**
   * Enable import sorting via eslint-plugin-perfectionist
   *
   * @default true
   */
  perfectionist?: boolean

  /**
   * Enable React lint rules
   *
   * Enabled by default if `react` is detected in dependencies
   */
  react?: boolean

  /**
   * Enable type aware rules. Requires `oxlint-tsgolint` to be installed.
   *
   * @see https://oxc.rs/docs/guide/usage/linter/type-aware.html
   * @default false
   */
  typeAware?: boolean
}

/**
 * JS plugins are resolved relative to the user's config file, so resolve
 * them from here to load the versions bundled as our dependencies
 */
function resolvePlugin(name: string) {
  return fileURLToPath(import.meta.resolve(name))
}

function javascriptPreset() {
  return defineConfig({
    rules: {
      'prefer-const': 'error',
      'no-unused-vars': 'warn',
      'no-constant-condition': 'warn',
      'no-debugger': 'error',
      'no-cond-assign': ['error', 'always'],
      'no-array-constructor': 'error',
      'no-unreachable': 'error',
      'one-var': ['error', 'never'],
      'eqeqeq': ['error', 'always'],
      'no-caller': 'error',
      'no-control-regex': 'error',
      'no-duplicate-case': 'error',
      'no-eval': 'error',
      'no-ex-assign': 'error',
      'no-extra-boolean-cast': 'error',
      'no-fallthrough': 'error',
      'no-inner-declarations': 'error',
      'no-invalid-regexp': ['error', { allowConstructorFlags: ['u', 'y'] }],
      'no-proto': 'error',
      'no-regex-spaces': 'error',
      'no-self-compare': 'error',
      'no-sparse-arrays': 'error',
      'object-shorthand': ['error', 'always', { avoidQuotes: true, ignoreConstructors: false }],
      'no-unsafe-negation': 'error',
      'no-new-wrappers': 'error',
      'no-self-assign': 'error',
      'no-this-before-super': 'error',
      'no-else-return': 'error',
      'no-with': 'error',
      'no-unsafe-finally': 'error',
      'use-isnan': 'error',
      'valid-typeof': ['error', { requireStringLiterals: true }],
      'curly': ['error', 'all'],
      'yoda': 'error',
      'no-nested-ternary': 'error',
      'capitalized-comments': [
        'error',
        'always',
        {
          line: {
            ignorePattern: '.*',
            ignoreInlineComments: true,
            ignoreConsecutiveComments: true,
          },
        },
      ],
    },
  })
}

function importsPreset() {
  return defineConfig({
    rules: {
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-duplicates': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/newline-after-import': 'error',
    },
  })
}

function jsdocPreset() {
  return defineConfig({
    rules: {
      'jsdoc/check-access': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-returns-description': 'warn',
    },
  })
}

function nodePreset() {
  return defineConfig({
    rules: {
      'node/handle-callback-err': ['error', '^(err|error)$'],
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-path-concat': 'error',
    },
  })
}

function unicornPreset() {
  return defineConfig({
    rules: {
      'unicorn/filename-case': ['error', { case: 'snakeCase' }],
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
    },
  })
}

function typescriptPreset() {
  return defineConfig({
    rules: {
      'typescript/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],
      'no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
      'typescript/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
      'typescript/prefer-ts-expect-error': 'error',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-redeclare': 'error',
      'no-dupe-class-members': 'error',
      'no-loss-of-precision': 'error',
      'typescript/consistent-type-definitions': 'off',
      'typescript/consistent-indexed-object-style': 'off',
      'typescript/explicit-function-return-type': 'off',
      'typescript/no-explicit-any': 'off',
      'typescript/parameter-properties': 'off',
      'typescript/no-empty-interface': 'off',
      'typescript/no-empty-function': 'off',
      'typescript/no-non-null-assertion': 'off',
      'typescript/explicit-module-boundary-types': 'off',
      'typescript/no-namespace': 'off',
      'typescript/triple-slash-reference': 'off',
    },
    overrides: [
      {
        files: ['**/*.{ts,mts,cts,tsx}'],
        rules: {
          'typescript/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        },
      },
      {
        files: ['**/*.{test,spec}.{ts,tsx}'],
        rules: {
          'typescript/ban-ts-comment': 'off',
          'typescript/prefer-ts-expect-error': 'off',
        },
      },
    ],
  })
}

function typeAwarePreset() {
  return defineConfig({
    rules: {
      'typescript/await-thenable': 'error',
      'typescript/no-floating-promises': 'error',
      'typescript/no-for-in-array': 'error',
      'typescript/no-implied-eval': 'error',
      'typescript/no-misused-promises': 'error',
      'typescript/only-throw-error': 'error',
      'typescript/no-unnecessary-type-assertion': 'error',
      'typescript/no-unsafe-argument': 'error',
      'typescript/no-unsafe-assignment': 'error',
      'typescript/no-unsafe-call': 'error',
      'typescript/no-unsafe-member-access': 'error',
      'typescript/no-unsafe-return': 'error',
      'typescript/restrict-plus-operands': 'error',
      'typescript/restrict-template-expressions': 'error',
      'typescript/unbound-method': 'error',
    },
  })
}

function reactPreset() {
  return defineConfig({
    rules: {
      'react/rules-of-hooks': 'error',
      'react/exhaustive-deps': 'warn',
      'react/hook-use-state': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  })
}

/**
 * Resolve a plugin shipped by this package. Points at the `.ts` sources when
 * running from `src` and at the built `.mjs` files when running from `dist`
 */
function resolveLocalPlugin(path: string) {
  const extension = import.meta.url.endsWith('.ts') ? '.ts' : '.mjs'
  return fileURLToPath(new URL(`${path}${extension}`, import.meta.url))
}

function antiSlopPreset() {
  return defineConfig({
    jsPlugins: [{ name: 'anti-slop', specifier: resolveLocalPlugin('./anti-slop/index') }],
    rules: {
      'oxc/no-accumulating-spread': 'error',
      'anti-slop/no-array-filter-map': 'error',
      'anti-slop/no-reduce-accumulator-copy': 'error',
      'anti-slop/no-chained-type-assertions': 'error',
      'anti-slop/no-conditional-empty-object-spread': 'error',
      'anti-slop/no-known-value-widening': 'error',
      'anti-slop/no-module-mocking': 'error',
      'anti-slop/no-object-parameters': 'error',
      'anti-slop/no-reflect-apply': 'error',
      'anti-slop/no-reflect-get': 'error',
      'anti-slop/no-runtime-typeof': 'error',
      'anti-slop/no-shape-in-symbol-names': 'error',
      'anti-slop/no-unknown-parameters': 'error',
      'anti-slop/no-unknown-returns': 'error',
      'anti-slop/no-unknown-type-aliases': 'error',
      'anti-slop/no-unsafe-dictionary-type': 'error',
      'anti-slop/no-widen-then-assert': 'error',
      'anti-slop/require-readable-spacing': 'error',
      'anti-slop/require-safety-comment-for-type-assertion': 'error',
    },
  })
}

function adonisjsPreset() {
  return defineConfig({
    jsPlugins: [resolvePlugin('@adonisjs/eslint-plugin')],
    rules: {
      '@adonisjs/prefer-lazy-controller-import': 'error',
      '@adonisjs/prefer-lazy-listener-import': 'error',
    },
  })
}

function perfectionistPreset() {
  return defineConfig({
    jsPlugins: [resolvePlugin('eslint-plugin-perfectionist')],
    rules: {
      'perfectionist/sort-imports': [
        'error',
        {
          type: 'line-length',
          order: 'asc',
          internalPattern: ['^@/.*', '^#.*/.*'],
          groups: [
            // Import 'foo.js' or import 'foo.css'
            ['side-effect', 'side-effect-style'],

            // Packages and node
            ['builtin', 'external'],

            // Others
            ['internal', 'subpath', 'parent', 'sibling', 'index', 'style', 'unknown'],
          ],
        },
      ],
      'perfectionist/sort-enums': ['error', { type: 'line-length', order: 'asc' }],
    },
  })
}

/**
 * Returns a root oxlint config. `ignorePatterns`, `plugins` and `options` are
 * not inherited through `extends`, so they are set at the root and merged with
 * the user config instead
 */
export function verful(
  config: VerfulOxlintConfig = {},
  userConfig: OxlintConfig = {}
): OxlintConfig {
  const {
    adonisjs = hasPackage('@adonisjs/core'),
    antiSlop = false,
    perfectionist = true,
    react = hasPackage('react'),
    typeAware = false,
  } = config

  const plugins: NonNullable<OxlintConfig['plugins']> = [
    'eslint',
    'typescript',
    'unicorn',
    'oxc',
    'import',
    'jsdoc',
    'node',
  ]
  if (react) {
    plugins.push('react', 'react-perf')
  }

  return defineConfig({
    ...userConfig,
    ignorePatterns: [...IGNORE_PATTERNS, ...(userConfig.ignorePatterns ?? [])],
    plugins: [...new Set([...plugins, ...(userConfig.plugins ?? [])])],
    options: { ...(typeAware ? { typeAware: true } : {}), ...userConfig.options },
    extends: [
      javascriptPreset(),
      importsPreset(),
      jsdocPreset(),
      nodePreset(),
      unicornPreset(),
      typescriptPreset(),
      typeAware ? typeAwarePreset() : null,
      react ? reactPreset() : null,
      adonisjs ? adonisjsPreset() : null,
      antiSlop ? antiSlopPreset() : null,
      perfectionist ? perfectionistPreset() : null,
      ...(userConfig.extends ?? []),
    ].filter(Boolean) as OxlintConfig[],
  })
}
