---
"@gnolang/gno-js-client": minor
---

Surface the node's ABCI error instead of "ABCI response is not initialized"

A VM-level failure comes back as a successful HTTP response with
`ResponseBase.Error` set and `Data` null, so every one of them was reported as
an uninitialized response — a missing package and a package that declares no
`Render` were indistinguishable, and neither said what had actually happened.

Adds typed errors (`GnoABCIError` and per-type subclasses such as
`InvalidPkgPathError`, `NoRenderDeclError`, `TypeCheckError`) so callers can
branch on the condition with `instanceof` rather than matching on message text,
and recovers the human-readable message from the node's log.

Also stops two callers leaking that same stale message on an empty payload: a
package that exports nothing now returns `[]` from `getFunctionSignatures`, and
a missing session throws `ObjectNotFoundError` naming what was not found.
