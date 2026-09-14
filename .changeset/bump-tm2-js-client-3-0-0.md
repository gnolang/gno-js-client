---
"@gnolang/gno-js-client": major
---

Bump `@gnolang/tm2-js-client` to `^3.0.0`. Transactions are now signed with the fee rendered as `{"amount":[{"amount","denom"}],"gas"}` ([gnolang/gno#6173](https://github.com/gnolang/gno/pull/6173)), the shape the Ledger Cosmos app accepts, so `GnoWallet.fromLedger` can sign again. This changes the signed bytes for every signer: nodes without gnolang/gno#6173 reject transactions signed by this version. `gas_fee` must be a single `<amount><denom>` coin (e.g. `1000000ugnot`); other values now throw when the transaction is signed.
