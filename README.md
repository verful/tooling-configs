<div align="center">
  <img src="https://github.com/verful/tooling-configs/raw/main/.github/banner.png" width="1200px">
</div>

## Features

- Designed to work with Prettier, Vue, Typescript, JSX, Node, AdonisJS out of the box
- Lint json files ( TSConfig, package.json )
- Super easy to use ( one line of code )
- [ESLint flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
- Use .gitignore as ignore file

## Usage

> [!IMPORTANT]
> - This config is using the new [ESLint Flat config](https://eslint.org/docs/latest/use/configure/configuration-files-new)
> - New/updated rules will not be considered as breaking changes. Only API changes will be considered as breaking changes.

### Install

```bash
pnpm add -D eslint prettier @verful/tooling-configs
```

### Eslint

```ts
// .eslintrc
import { verful } from '@verful/tooling-configs/eslint'

export default await verful({
  // Your config here
})
```

> You don't need `.eslintignore` as it has been provided by the preset.

### Add script for package.json

For example:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

### Prettier

```json
{
  "prettier": "@verful/tooling-configs/prettier"
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
