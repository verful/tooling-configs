import type { ConfigItem } from '../types.js'
import perfectionistPlugin from 'eslint-plugin-perfectionist'

export async function perfectionist(): Promise<ConfigItem[]> {
  return [
    {
      name: 'verful:perfectionist',
      plugins: {
        // @ts-expect-error
        perfectionist: perfectionistPlugin,
      },
      rules: {
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'line-length',
            order: 'asc',

            internalPattern: ['@/**', '#*/**'],
            groups: [
              // Import 'foo.js' or import 'foo.css'
              ['side-effect', 'side-effect-style'],

              // Packages and node
              ['builtin', 'external', 'builtin-type', 'external-type'],

              // Others
              [
                'internal-type',
                'internal',
                'parent-type',
                'sibling-type',
                'index-type',
                'parent',
                'sibling',
                'index',
                'style',
                'object',
                'unknown',
              ],
            ],
          },
        ],
        'perfectionist/sort-enums': ['error', { type: 'line-length', order: 'asc' }],
      },
    },
  ]
}
