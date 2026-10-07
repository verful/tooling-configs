import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: ['./src/oxc/lint.ts', './src/oxc/fmt.ts', './src/oxc/anti-slop/index.ts'],
  dts: true,
  clean: true,
  format: ['esm'],
  copy: [
    './src/tsconfigs',
    { from: './src/oxc/anti-slop/LICENSE', to: './dist/anti-slop' },
    {
      from: './src/oxc/anti-slop/vendor/eslint-stylistic/LICENSE',
      to: './dist/anti-slop/vendor/eslint-stylistic',
    },
  ],
  deps: {
    neverBundle: ['oxfmt', 'oxlint', '@oxlint/plugins'],
  },
  target: false,
})
