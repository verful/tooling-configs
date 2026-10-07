<div align="center">
  <img src="https://github.com/verful/tooling-configs/raw/main/.github/banner.png" width="1200px">
</div>

## Features

- Shared presets for [OXC](https://oxc.rs/) tools ([oxlint](https://oxc.rs/docs/guide/usage/linter) + [oxfmt](https://oxc.rs/docs/guide/usage/formatter))
- Designed to work with React, Typescript, JSX, Node, AdonisJS out of the box
- Sorts `package.json` keys and Tailwind CSS classes when formatting
- Optional [anti-slop](https://github.com/dmmulroy/anti-slop) rules
- Super easy to use ( one line of code )
- TypeScript configuration presets

## Usage

> [!IMPORTANT]
>
> - ESLint and Prettier are no longer supported. Use version `1.6.0` if you still need them.
> - New/updated rules will not be considered as breaking changes. Only API changes will be considered as breaking changes.

### Install

```bash
pnpm add -D oxlint oxfmt @verful/tooling-configs
```

### oxlint

```ts
// oxlint.config.ts
import { verful } from '@verful/tooling-configs/oxc/lint'

export default verful({
  // Your options here
})
```

> `verful()` returns a root config, so don't put it in another config's `extends`: oxlint doesn't inherit `ignorePatterns` and `plugins` through `extends`.

Options:

| Option          | Type      | Default                             | Description                                                                                                   |
| --------------- | --------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `adonisjs`      | `boolean` | `true` if `@adonisjs/core` is a dep | Enable AdonisJS-specific rules                                                                                |
| `antiSlop`      | `boolean` | `false`                             | Enable the [anti-slop](#anti-slop) rules                                                                      |
| `react`         | `boolean` | `true` if `react` is a dep          | Enable React and React hooks rules                                                                            |
| `perfectionist` | `boolean` | `true`                              | Enable import and enum sorting via perfectionist                                                              |
| `typeAware`     | `boolean` | `false`                             | Enable [type aware rules](https://oxc.rs/docs/guide/usage/linter/type-aware.html). Requires `oxlint-tsgolint` |

Pass your own oxlint config as the second argument. Its `rules`, `overrides` and `extends` take precedence over the preset, and `ignorePatterns` and `plugins` are added to the preset's:

```ts
export default verful(
  { typeAware: true },
  {
    ignorePatterns: ['generated/**'],
    rules: {
      'no-unused-vars': 'off',
    },
  }
)
```

### anti-slop

`verful({ antiSlop: true })` enables the opinionated rules from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop), which reject low-evidence TypeScript patterns such as `unknown` parameters, `typeof` narrowing, unjustified type assertions and adjacent `filter().map()` passes. See the [upstream rule list](https://github.com/dmmulroy/anti-slop#rules) for details. The rules are vendored in this package, and every rule can be turned off in your config's `rules` object.

To use the plugins without the preset:

```ts
import { defineConfig } from 'oxlint'

export default defineConfig({
  jsPlugins: [{ name: 'anti-slop', specifier: '@verful/tooling-configs/oxc/anti-slop' }],
  rules: {
    'anti-slop/no-array-filter-map': 'error',
  },
})
```

### oxfmt

```ts
// oxfmt.config.ts
import { verful } from '@verful/tooling-configs/oxc/fmt'

export default verful()
```

You can override any option:

```ts
export default verful({ printWidth: 120, semi: true })
```

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "format": "oxfmt --write ."
  }
}
```

### Tsconfig

Node ( ESM ) :

```json
{
  "extends": "@verful/tooling-configs/tsconfigs/tsconfig.node",
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./build"
  }
}
```

React :

```json
{
  "extends": "@verful/tooling-configs/tsconfigs/tsconfig.react",
  "compilerOptions": {
    "rootDir": "./",
    "outDir": "./build"
  }
}
```
