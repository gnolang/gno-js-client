---
"@gnolang/gno-js-client": patch
---

Drop the direct `@gnolang/tm2-rpc` runtime dependency by importing `Tm2Client` from `@gnolang/tm2-js-client` 3.2.0 or later. Keep `@gnolang/tm2-rpc` only as a dev dependency for a test type.