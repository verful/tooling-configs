import { interopDefault } from '../utils.js'
import type { ConfigItem } from '../types.js'
import { GLOB_JS, GLOB_JSX, GLOB_TSX } from '../globs.js'

export async function react(): Promise<ConfigItem[]> {
  const [pluginReact] = await Promise.all([
    // @ts-expect-error missing types
    interopDefault(import('eslint-plugin-react')),
  ] as const)

  return [
    {
      name: 'verful:react',
      files: [GLOB_JS, GLOB_JSX, GLOB_TSX],

      plugins: { react: pluginReact },
      languageOptions: {
        parserOptions: {
          ecmaFeatures: { jsx: true },
          sourceType: 'module',
        },
      },
      rules: {
        ...pluginReact.configs.recommended.rules,
        ...pluginReact.configs['jsx-runtime'].rules,
        'react/hook-use-state': ['error'],
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ]
}
