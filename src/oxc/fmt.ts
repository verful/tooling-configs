import { defineConfig } from 'oxfmt'

import { hasPackage, IGNORE_PATTERNS } from './shared.ts'

type OxfmtOptions = Partial<Parameters<typeof defineConfig>[0]>

export function verful(config: OxfmtOptions = {}): ReturnType<typeof defineConfig> {
  return defineConfig({
    trailingComma: 'es5',
    semi: false,
    singleQuote: true,
    useTabs: false,
    quoteProps: 'consistent',
    bracketSpacing: true,
    arrowParens: 'always',
    printWidth: 100,
    sortPackageJson: true,
    sortTailwindcss: hasPackage('tailwindcss'),
    ...config,
    ignorePatterns: [...IGNORE_PATTERNS, ...(config.ignorePatterns ?? [])],
  })
}
