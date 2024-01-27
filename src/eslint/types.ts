import type { Linter } from 'eslint'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { FlatESLintConfigItem } from '@antfu/eslint-define-config'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'

export type ConfigItem = FlatESLintConfigItem & {
  name?: string
}

export type UserConfigItem = ConfigItem | Linter.FlatConfig

export type Awaitable<T> = T | Promise<T>

export interface OptionsTypeScriptWithTypes {
  /**
   * When this options is provided, type aware rules will be enabled.
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string | string[]
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Additional parser options for TypeScript.
   */
  parserOptions?: Partial<ParserOptions>
}

export type VerfulOptions = {
  /**
   * If enabled, all files specified in `.gitignore` will be ignored
   * by eslint
   */
  enableGitIgnore?: boolean | FlatGitignoreOptions

  /**
   * Enable AdonisJS lint rules
   *
   * Enabled by default is Adonisjs is detected in dependencies
   */
  adonisjs?: boolean

  /**
   * Enable JSONC lint rules
   * @default true
   */
  jsonc?: boolean

  /**
   * Enable Prettier lint rules
   *
   * @default true
   */
  prettier?: boolean

  /**
   * Enable React lint rules
   *
   * Enabled by default if `react` is detected in dependencies
   */
  react?: boolean

  /**
   * Enable Typescript lint rules
   *
   * Enabled by default if `typescript` is detected in dependencies
   */
  typescript?:
    | boolean
    | ((OptionsTypeScriptWithTypes | OptionsTypeScriptParserOptions) & { typeAwareRules?: boolean })

  /**
   * Enable TailwindCSS lint rules
   *
   * Enabled by default is `tailwindcss` is detected in dependencies
   */
  tailwindcss?: boolean
}
