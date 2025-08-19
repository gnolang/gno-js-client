<h2 align="center">⚛️ GNO JS/TS Client ⚛️</h2>

## Overview

`@gnolang/gno-js-client` is a JavaScript/TypeScript client implementation for Gno chains. It is an extension of the
[tm2-js-client](https://github.com/gnolang/tm2-js-client), but with Gno-specific functionality.

## Key Features

- Provides the ability to interact with Gno Realms / Packages
- Easy interaction with VM-specific ABCI queries

## Requirements

This project uses [Bun](https://bun.sh/). If you haven't installed Bun yet, you can get it from [bun.com/get](https://bun.com/get).

## Installation

To install `@gnolang/gno-js-client`, use your preferred package manager:

```bash
bun add @gnolang/gno-js-client
```

```bash
npm install @gnolang/gno-js-client
```

```bash
yarn add @gnolang/gno-js-client
```

## Testing

This project uses [Bun](https://bun.sh/) for testing. To run the tests:

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test --watch

# Run tests with coverage
bun test --coverage
```

## Documentation

For the sake of keeping the README short and sweet, you can find the documentation and usage examples
for the package [here](https://docs.gno.land/reference/gno-js-client/).
