import { pluginUnicorn } from '../plugins.js'
import type { ConfigItem } from '../types.js'

export async function unicorn(): Promise<ConfigItem[]> {
  return [
    pluginUnicorn.configs['flat/recommended'],
    {
      name: 'verful:unicorn',
      rules: {
        'unicorn/filename-case': ['error', { case: 'snakeCase' }],
      },
    },
  ]
}
