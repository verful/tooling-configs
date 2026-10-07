# Upstream

Vendored from [dmmulroy/anti-slop](https://github.com/dmmulroy/anti-slop) `src/` (without the opt-in `effect/` rules) under the MIT license (see `LICENSE`).

- Revision: `c44ef22ca116d0ba62a3ff663a0bd13a3f3fa40b` (2026-09-10)

Files are kept as close to upstream as possible and are excluded from this repo's oxlint/oxfmt runs so updates can be diffed against upstream.

## Local patches

- `shared/dictionary-types.ts`: `unsafeMembers[0]` -> `(unsafeMembers[0] ?? null)` to satisfy `noUncheckedIndexedAccess`.
