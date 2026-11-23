---
"@gnolang/gno-js-client": minor
---

Add `MsgRun.max_send` ([gnolang/gno#6504](https://github.com/gnolang/gno/pull/6504)) and an optional trailing `maxSend` argument to `GnoWallet.executePackage`. On nodes with gnolang/gno#6504, a run may send at most `max_send` coins out of the caller's account. If `max_send` is empty, the run cannot send any coins out of that account.
