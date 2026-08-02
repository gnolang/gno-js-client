<h2 align="center">⚛️ GNO JS/TS Client ⚛️</h2>

## Overview

`@gnolang/gno-js-client` is a JavaScript/TypeScript client implementation for Gno chains. It is an extension of the
[tm2-js-client](https://github.com/gnolang/tm2-js-client), but with Gno-specific functionality.

## Key Features

- Provides the ability to interact with Gno Realms / Packages
- Easy interaction with VM-specific ABCI queries

## Installation

To install `@gnolang/gno-js-client`, use your preferred package manager:

```bash
yarn add @gnolang/gno-js-client
```

```bash
npm install @gnolang/gno-js-client
```

## Error handling

VM queries that the node refuses come back as a successful HTTP response with an error
inside it, so the provider raises them as typed errors. Branch on the class — or on
`type`, which holds the amino type URL — instead of matching on messages:

```ts
import { GnoJSONRPCProvider, NoRenderDeclError } from "@gnolang/gno-js-client";

const provider = await GnoJSONRPCProvider.create("https://rpc.gno.land");

try {
  await provider.getRenderOutput("gno.land/p/demo/ufmt", "");
}
catch (err) {
  if (err instanceof NoRenderDeclError) {
    // the package is there, it just declares no Render function
  }
}
```

Every error extends `GnoABCIError` (itself a `TM2Error`) and keeps the node's raw log
under `log`.

## Documentation

For the sake of keeping the README short and sweet, you can find the documentation and usage examples
for the package [here](https://docs.gno.land/reference/gno-js-client/).
