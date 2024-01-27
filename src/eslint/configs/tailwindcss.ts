import { GLOB_EXCLUDE } from '../globs.js'
import { interopDefault } from '../utils.js'
import type { ConfigItem } from '../types.js'

export async function tailwindcss(): Promise<ConfigItem[]> {
  // @ts-expect-error missing types
  const tailwindPlugin = await interopDefault(import('eslint-plugin-tailwindcss'))

  return [
    {
      name: 'verful:tailwindcss',
      ignores: GLOB_EXCLUDE,
      plugins: {
        tailwindcss: tailwindPlugin as any,
      },
      rules: {
        ...tailwindPlugin.configs.recommended.rules,
      },
      settings: {
        tailwindcss: {
          callees: ['cn'],
        },
      },
    },
  ]
}
