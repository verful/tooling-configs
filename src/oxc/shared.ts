import { join } from 'node:path'
import { readFileSync } from 'node:fs'

/**
 * Check if a package is listed in the dependencies of the project
 * being linted / formatted
 */
export function hasPackage(name: string) {
  try {
    const pkg = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf8'))
    return [pkg.dependencies, pkg.devDependencies, pkg.peerDependencies].some(
      (deps) => deps && name in deps
    )
  } catch {
    return false
  }
}

export const IGNORE_PATTERNS = [
  '**/node_modules/**',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  // Build folders
  '**/build/**',
  '**/dist/**',
  '**/out/**',
  '**/target/**',
  'public/assets/**',

  '**/output/**',
  '**/coverage/**',
  '**/temp/**',
  '**/fixtures/**',
  '**/.adonisjs/**',
  '**/.next/**',
  '**/.vercel/**',
  '**/.changeset/**',
  '**/.idea/**',
  '**/.output/**',
  '**/.vite-inspect/**',

  '**/CHANGELOG*.md',
  '**/*.min.*',
  '**/LICENSE*',
  '**/__snapshots__/**',
  'routeTree.gen.ts',
]
