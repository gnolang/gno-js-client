---
"@gnolang/gno-js-client": patch
---

Fix the signing payloads of `MsgCreateSession` and `MsgRevokeSession` to match the node's Amino JSON encoding. Previously, these transactions failed signature verification in three cases:

- Empty `spend_limit` and zero `spend_period` values were included instead of omitted, causing `createSession` to fail with its default arguments.
- Non-secp256k1 session keys were signed using `{type_url, value}`. `/tm.PubKeyEd25519` and `/tm.PubKeyMultisig` keys are now encoded in Amino format, and unsupported key types are rejected before signing.
- `spendLimit` was signed without normalization. It is now trimmed, sorted by denom, and stripped of leading zeros to match the node's `ParseCoins` behavior.
