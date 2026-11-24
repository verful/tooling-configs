import { eslintCompatPlugin } from '@oxlint/plugins'

import { preferLinkRouteRule } from './rules/prefer_link_route.ts'

/** AdonisJS boundary rules that the official `@adonisjs/eslint-plugin` does not cover */
const adonisjsPlugin = eslintCompatPlugin({
  meta: { name: 'verful-adonisjs' },
  rules: {
    'prefer-link-route': preferLinkRouteRule,
  },
})

export default adonisjsPlugin
