# Bundling `ni` createRequire conflict reproduction

See `dist/index.mjs` and search `createRequire` to see that there are 2 places where this is imported, resulting in an identifier conflict.

## Issue

tinyexec [contains an import of `createRequire`](https://github.com/tinylibs/tinyexec/blob/f11e42bf5a25b1af9ff84215bb1693da6537d433/tsup.config.ts#L17):

```ts
import { createRequire as __tinyexec_cr } from "node:module";
const require = __tinyexec_cr(import.meta.url);
```

When `ni` generates bundles, the code gets transformed to:

```js
// ni.7b6d0b44.mjs
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
```

When bundling `ni` in a project that _also_ declares a `createRequire` banner:

```js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
//...
import { createRequire } from "node:module";
var require2 = createRequire(import.meta.url);
```

Resulting in the error:

```ascii
Identifier 'createRequire' has already been declared
```

## Building

Run `nr build` / `pnpm build` to generate a new bundle
