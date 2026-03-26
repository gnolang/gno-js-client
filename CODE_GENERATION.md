# Realm Module Code Generation

Generate type-safe TypeScript bindings for Gno realms. Each generated module provides a `query` client (read-only `evaluateExpression`) and a `tx` client (on-chain `callMethod`) for every exported function in the realm.

## Quick Start

```bash
# Build the CLI first
yarn build

# Generate a single realm module
npx gno-gen-module --realm /r/gnoland/blog --remote https://rpc.betanet.testnets.gno.land --out ./modules

# Generate all realms under a prefix
npx gno-gen-module --prefix /r/gnoland --remote https://rpc.betanet.testnets.gno.land --out ./modules

# Generate ALL realms on the chain
npx gno-gen-module --remote https://rpc.betanet.testnets.gno.land --out ./modules
```

## CLI Reference

```
npx gno-gen-module [options]

Options:
  --realm   Single realm path (e.g. /r/demo/boards or gno.land/r/demo/boards)
  --prefix  Path prefix — generate modules for all realms under it (e.g. /r/gnoland)
  --remote  JSON-RPC endpoint URL (required)
  --out     Root output directory (default: ".")
  --help    Show help
```

| Mode                     | Behavior                                                                  |
| ------------------------ | ------------------------------------------------------------------------- |
| `--realm /r/demo/boards` | Generate one module for that realm                                        |
| `--prefix /r/gnoland`    | Discover all realms under the prefix via `vm/qpaths` and generate each    |
| _(neither)_              | Discover ALL realms on the chain (`gno.land/r/` prefix) and generate each |

`--realm` and `--prefix` are mutually exclusive.

## Output Structure

Given `--out ./modules`, generating `/r/demo/boards` and `/r/gnoland/blog` produces:

```
modules/
├── index.ts                     # Re-exports all realm factories
├── r/
│   ├── demo/
│   │   └── boards/
│   │       └── module.ts        # Realm module for gno.land/r/demo/boards
│   └── gnoland/
│       └── blog/
│           └── module.ts        # Realm module for gno.land/r/gnoland/blog
```

The `index.ts` re-exports each module with an underscore-joined alias:

```ts
export { default as r_demo_boards } from './r/demo/boards/module';
export { default as r_gnoland_blog } from './r/gnoland/blog/module';
```

## Usage

### Example available at: https://gist.github.com/clockworkgr/a93f8617994f2a0107a158234e3bf93a

### 1. Import realm factories

```ts
import { r_gnoland_blog, r_gnoland_wugnot, r_sys_users } from './modules';
```

### 2. Create an augmented wallet

```ts
import { GnoWallet } from '@gnolang/gno-js-client';

const MyWallet = GnoWallet.addRealm([
  r_gnoland_blog,
  r_gnoland_wugnot,
  r_sys_users,
]);
```

### 3. Instantiate and connect

```ts
const wallet = (await MyWallet.fromMnemonic(
  'your mnemonic here ...'
)) as InstanceType<typeof MyWallet>;
wallet.connect(new GnoJSONRPCProvider('https://rpc.betanet.testnets.gno.land'));
```

> **Note:** The `as InstanceType<typeof MyWallet>` cast is needed because static factory methods (`fromMnemonic`, `createRandom`, etc.) return `Promise<GnoWallet>` — TypeScript doesn't propagate the augmented type through inherited statics.

### 4. Query (read-only)

Queries call `evaluateExpression` — no transaction, no gas, no signing required:

```ts
// Nested dot-syntax mirrors the realm path: wallet.realms.r.<namespace>.<realm>
const [exists] = await wallet.realms.r.gnoland.blog.query.PostExists({
  slug: 'hello',
});
const [balance] = await wallet.realms.r.gnoland.wugnot.query.BalanceOf({
  owner: myAddr,
});
const [name, found] = await wallet.realms.r.sys.users.query.ResolveName({
  name: 'test1',
});
```

An optional `height` parameter is available on every query method to read state at a specific block height.

### 5. Transact (on-chain)

Transaction methods call `callMethod` and return `BroadcastTxCommitResult` containing the tx `hash`, `height`, `check_tx`, and `deliver_tx`:

```ts
const noFunds = new Map<string, number>();
const fee = { gas_wanted: Long.fromNumber(2_000_000), gas_fee: '1000000ugnot' };

const result = await wallet.realms.r.gnoland.wugnot.tx.Transfer(
  { to: 'g1addr...', amount: BigInt(500_000) },
  noFunds, // funds to send with the call
  noFunds, // max storage deposit
  fee
);
console.log('TX hash:', result.hash);
console.log('Block height:', result.height);
```

To extract Gno return values from a transaction response:

```ts
import { parseGnoReturns } from '@gnolang/gno-js-client/bin/wallet/helpers';

const data = atob(result.deliver_tx.ResponseBase.Data as string);
const [returnValue] = parseGnoReturns(data);
```

## Generated Module Anatomy

Each `module.ts` contains:

| Section                 | Purpose                                                                         |
| ----------------------- | ------------------------------------------------------------------------------- |
| **Return type aliases** | e.g. `type GetBalanceReturn = [bigint]` — typed tuples from Gno results         |
| **`queryClient`**       | Read-only methods using `evaluateExpression`                                    |
| **`txClient`**          | Transaction methods using `callMethod`, returning `BroadcastTxCommitResult`     |
| **`RealmModule`**       | Class exposing `.query` and `.tx`                                               |
| **`Realm` factory**     | Default export — returns `{ realm: { realms: { r: { ... } } } }` for `addRealm` |

## Type Mapping

| Gno Type                                                               | TypeScript Type |
| ---------------------------------------------------------------------- | --------------- |
| `string`                                                               | `string`        |
| `bool`                                                                 | `boolean`       |
| `int`, `int64`, `uint`, `uint64`                                       | `bigint`        |
| `int8`–`int32`, `uint8`–`uint32`, `float32`, `float64`, `byte`, `rune` | `number`        |
| `error`                                                                | `string`        |
| Structs, interfaces, other                                             | `unknown`       |

## How `addRealm` and Deep Merge Work

Each generated realm factory returns a nested object mirroring the realm path:

```ts
// gno.land/r/gnoland/blog factory returns:
{
  realm: {
    realms: {
      r: {
        gnoland: {
          blog: new RealmModule(wallet);
        }
      }
    }
  }
}
```

When multiple realms are added via `addRealm([...])`, the wallet constructor uses `deepAssign` (recursive merge of plain objects) instead of `Object.assign` (shallow). This means two realms like `r/gnoland/blog` and `r/gnoland/wugnot` correctly merge under `wallet.realms.r.gnoland` without overwriting each other.

## Edge Cases Handled

- **Unnamed parameters** — The Gno VM returns names like `.arg_0` for unnamed function parameters. These are sanitized to valid identifiers (`arg_0`).
- **VM-injected context parameters** — Parameters with `interface {` types (e.g. `std.Caller`) are filtered out of the generated signatures.
- **Null/empty signatures** — Realms with no exported functions are skipped during batch generation.
- **Batch error resilience** — When generating multiple realms (`--prefix` or default mode), a failure on one realm logs a warning and continues to the next.

## Build Configuration

Generated modules are excluded from the library's TypeScript compilation in `tsconfig.json`:

```json
"exclude": ["./node_modules", "./src/modules", "./modules"]
```

This prevents generated output from interfering with `yarn build`. Generated modules are standalone and import from `@gnolang/gno-js-client` and `@gnolang/tm2-js-client` as external packages.
