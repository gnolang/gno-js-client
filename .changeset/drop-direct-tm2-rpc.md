---
"@gnolang/gno-js-client": minor
---

Drop the direct `@gnolang/tm2-rpc` runtime dependency by using `Tm2Client` and `constructRequestError` from `@gnolang/tm2-js-client` 3.3.0 or later. Preserve typed Gno and TM2 errors across direct ABCI queries and inherited provider methods.
