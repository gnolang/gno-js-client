---
"@gnolang/gno-js-client": patch
---

Fix the sign payload of `MsgCreateSession` so it matches the node's amino JSON. An empty `spend_limit` or a zero `spend_period` was signed as `""` or `"0"`, but amino leaves these fields out, so `createSession` failed signature verification with its default arguments.
