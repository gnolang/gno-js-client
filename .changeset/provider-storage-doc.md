---
"@gnolang/gno-js-client": minor
---

Add `getRealmStorage` (`vm/qstorage`), `getStoragePrice` (`params/vm:p:storage_price`), and `getPackageDocument` (`vm/qdoc`), with optional query heights.
Storage and deposit use `bigint` to preserve uint64 precision, consistent with the existing 64-bit typed value decoder. Storage prices use the existing `TxSignCoin` shape (`{ denom, amount }`, with a decimal string amount). Package documentation preserves the node's raw JSON fields, including null lists and omitted optional fields.
Malformed storage responses and invalid price parameters reject. Node errors retain their existing typed error mapping.

Breaking for custom `GnoProvider` implementations: the interface now requires `getRealmStorage`, `getStoragePrice`, and `getPackageDocument`. Providers extending `BaseGnoProvider` inherit them and need no change.
