import { defineRule } from '@oxlint/plugins'

const COMPONENTS = new Set(['Link', 'Form'])
const URL_ATTRIBUTES = new Set(['href', 'action'])

/**
 * Inertia `Link` and `Form` from `@adonisjs/inertia/react` take a named
 * route. A hard-coded URL breaks silently when the route changes
 */
export const preferLinkRouteRule = defineRule({
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow hard-coded URLs in Inertia `Link` and `Form`; use the `route` prop',
    },
    messages: {
      hardCodedUrl:
        'Do not pass a hard-coded URL to `{{attribute}}` on `<{{component}}>`. Use `route="name"` with `routeParams` so the link follows route changes.',
    },
  },
  createOnce(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.type !== 'JSXIdentifier' || !COMPONENTS.has(node.name.name)) {
          return
        }

        for (const attribute of node.attributes) {
          if (attribute.type !== 'JSXAttribute' || attribute.name.type !== 'JSXIdentifier') {
            continue
          }
          if (!URL_ATTRIBUTES.has(attribute.name.name)) {
            continue
          }

          const value = attribute.value
          const expression = value?.type === 'JSXExpressionContainer' ? value.expression : value
          const isHardCoded =
            expression?.type === 'Literal' || expression?.type === 'TemplateLiteral'

          if (isHardCoded) {
            context.report({
              node: attribute,
              messageId: 'hardCodedUrl',
              data: { attribute: attribute.name.name, component: node.name.name },
            })
          }
        }
      },
    }
  },
})
