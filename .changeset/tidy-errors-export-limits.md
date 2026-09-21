---
"@gnolang/gno-js-client": patch
---

Add typed handling for the `ExportSizeExceededError` and `ExportDepthExceededError` VM errors (`/vm.ExportSizeExceededError`, `/vm.ExportDepthExceededError`). These are returned when a query result exceeds the node's encoded-size or traversal-depth cap, and previously fell through to the generic `GnoABCIError`.
