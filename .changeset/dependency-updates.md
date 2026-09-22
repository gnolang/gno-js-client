---
"@gnolang/gno-js-client": minor
---

Update `@gnolang/tm2-js-client` to `^3.1.1`, `@gnolang/tm2-rpc` to `^2.0.2` and `@cosmjs/ledger-amino` to 0.39.0, along with `@bufbuild/protobuf`, protobufjs, yargs and the build and test toolchain.

This fixes validator address decoding in `status`, `validators`, `genesis` and `dumpConsensusState`, which threw `RangeError: limit: expected safe integer, got Infinity` for anyone whose install resolved `@scure/base` to 2.3.0 or later — currently every fresh install. It also picks up tm2-rpc 2.x's decoding fixes for `broadcastTxSync`/`broadcastTxAsync` responses and for transactions that emit events without a `pkg_path`, such as the `/bank.TransferEvent` emitted on every ugnot transfer.

Inherited from tm2-js-client 3.1.x, and so visible on `GnoJSONRPCProvider` and `GnoWSProvider`:

- ABCI errors from balance, account and gas price queries now reject with the node's typed error and log, instead of returning a fallback value or failing to parse.
- `getGasPrice()` is implemented against `auth/gasprice`; it used to reject with `not supported`. It returns `{ amount, denom, gas }`, or `null` when the chain has no minimum gas price configured. Its return type changed from `Promise<number>`, which breaks code typed against the old signature — though no code could have read a value before, since the call always rejected.
- `getTransaction` is now declared on the `Provider` interface.
