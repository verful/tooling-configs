import { isPackageExists } from 'local-pkg'

export const hasTypeScript = isPackageExists('typescript')

export const hasReact = isPackageExists('react')

export const hasAdonisjs = isPackageExists('@adonisjs/core')
