---
"@gnolang/gno-js-client": major
---

Add `MsgRun.max_send` ([gnolang/gno#6504](https://github.com/gnolang/gno/pull/6504)) and an optional trailing `maxSend` argument to `GnoWallet.executePackage`. A run may send at most `max_send` coins out of the caller's account, and none if it is empty.

**Breaking:** `MsgRun.max_send` is required. Build messages with `MsgRun.create(...)` or set `max_send` explicitly (`""` for no sends).

`fundsToCoins` now sorts coins by denom, drops zero amounts and throws on negative ones, so `send`, `max_deposit` and `max_send` encode the way the node expects.
