import { RuleTester } from 'oxlint/plugins-dev'

import { preferLinkRouteRule } from './prefer_link_route.ts'

const tester = new RuleTester({ languageOptions: { parserOptions: { lang: 'tsx' } } })
const error = { messageId: 'hardCodedUrl' }

tester.run('adonisjs/prefer-link-route', preferLinkRouteRule, {
  valid: [
    '<Link route="users.show" routeParams={{ id: 1 }}>User</Link>',
    '<Form route="users.store">{() => null}</Form>',
    '<Link href={urlFor("posts.index", [], { qs: { page: 2 } })}>Next</Link>',
    '<Link href={crumb.href}>Crumb</Link>',
    '<a href="https://adonisjs.com">Docs</a>',
    '<ui.Link href="/users">Users</ui.Link>',
  ],
  invalid: [
    { code: '<Link href="/users">Users</Link>', errors: [error] },
    { code: '<Link href={"/users"}>Users</Link>', errors: [error] },
    { code: '<Link href={`/users/${id}`}>User</Link>', errors: [error] },
    { code: '<Form action="/users">{() => null}</Form>', errors: [error] },
  ],
})
