---
"@gnolang/gno-js-client": minor
---

Add `evaluateExpressionJSON` to query `vm/qeval_json` and return the node's raw amino `TypedValue` JSON (`{ results, "@error"? }`) without decoding values.
Queries against nodes without `qeval_json` reject with `UnknownRequestError`.
