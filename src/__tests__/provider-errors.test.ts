import {
  adaptAbciQueryResponse,
} from "@gnolang/tm2-js-client";
import {
  AbciQueryResponse,
} from "@gnolang/tm2-rpc";
import {
  describe, expect, test,
} from "vitest";

import {
  assertNoABCIError,
  constructGnoError,
  GnoABCIError,
  GnoErrorType,
  InvalidPackageError,
  InvalidPkgPathError,
  NoRenderDeclError,
  parseABCIErrorLog,
  StringError,
  TypeCheckError,
} from "../index.js";

// Payloads below are verbatim `ResponseBase` values captured from a live node.

// vm/qrender on "gno.land/r/does/not/exist"
const invalidPkgPathLog = `--= Error =--
Data: vm.InvalidPkgPathError{abciError:vm.abciError{}}
Msg Traces:
    0  /gnoroot/gno.land/pkg/sdk/vm/errors.go:58 - package not found: gno.land/r/does/not/exist
Stack Trace:
    0  /gnoroot/tm2/pkg/errors/errors.go:93
    1  /gnoroot/gno.land/pkg/sdk/vm/errors.go:58
... 17 more lines elided`;

// vm/qrender on a package that declares no Render function. Nothing wrapped
// this error, so the log is only the Go dump of the value.
const noRenderDeclLog = "vm.NoRenderDeclError{abciError:vm.abciError{}}";

// vm/qeval on an expression that panics inside the VM. The panic text spans
// several lines, all of them part of the same msg trace.
const panicMessage = `VM panic: not enough arguments in call to Sprintf
--- preprocess stack ---
stack 0: package gno.land/p/nt/ufmt/v0:0:0`;

const panicLog = `--= Error =--
Data: &errors.errorString{s:"not enough arguments in call to Sprintf"}
Msg Traces:
    0  /gnoroot/tm2/pkg/errors/errors.go:103 - ${panicMessage}
Stack Trace:
    0  /gnoroot/tm2/pkg/errors/errors.go:93`;

// A wrapped error that never captured a stack trace: the msg trace block is
// closed by the error footer instead.
const footerTerminatedLog = `--= Error =--
Data: vm.InvalidPkgPathError{}
Msg Traces:
    0  /gnoroot/errors.go:58 - package not found
--= /Error =--`;

// vm/qeval on a package that does not type check. vm.ErrTypeCheck joins the
// individual diagnostics with a newline onto a single msg trace — the error
// value itself carries none of them (they are merkle-hashed into the result,
// and go/types wording varies across toolchains).
const typeCheckLog = `--= Error =--
Data: vm.TypeCheckError{abciError:vm.abciError{}}
Msg Traces:
    0  /gnoroot/gno.land/pkg/sdk/vm/errors.go:118 - main.gno:4:2: undefined: foo
main.gno:5:6: undefined: bar
Stack Trace:
    0  /gnoroot/tm2/pkg/errors/errors.go:93`;

// auth/accounts/<master>/session/<addr> for a session that does not exist. The
// auth module raises std.ErrSessionNotFound, so this never reaches the client as
// an empty payload.
const sessionNotFoundLog = `--= Error =--
Data: std.SessionNotFoundError{abciError:std.abciError{}}
Msg Traces:
    0  /gnoroot/tm2/pkg/std/errors.go:148 - session not found
Stack Trace:
    0  /gnoroot/tm2/pkg/errors/errors.go:93`;

/**
 * Builds the raw RPC response a node sends, so a test can drive the same
 * `adaptAbciQueryResponse` path the provider uses instead of handing
 * `assertNoABCIError` an already-adapted object.
 * @param {object} [error] the amino-encoded `ResponseBase.error`
 * @param {string} [log] the raw `ResponseBase.log`
 */
const nodeResponse = (
  error?: Record<string, unknown>,
  log = "",
): AbciQueryResponse => {
  return {
    responseBase: {
      error: error as AbciQueryResponse["responseBase"]["error"],
      data: new Uint8Array(),
      events: [],
      log,
      info: "",
    },
    key: new Uint8Array(),
    value: new Uint8Array(),
    height: 0,
  };
};

/** Runs a raw node response through the provider's adapt-then-assert path */
const assertNodeResponse = (
  error?: Record<string, unknown>,
  log = "",
): void => {
  assertNoABCIError(
    adaptAbciQueryResponse(nodeResponse(error, log)).response.ResponseBase,
  );
};

describe("parseABCIErrorLog", () => {
  test("extracts the first msg trace", () => {
    expect(parseABCIErrorLog(invalidPkgPathLog))
      .toBe("package not found: gno.land/r/does/not/exist");
  });

  test("keeps a multi-line msg trace whole", () => {
    expect(parseABCIErrorLog(panicLog)).toBe(panicMessage);
  });

  test("returns undefined when the log carries no msg trace", () => {
    expect(parseABCIErrorLog(noRenderDeclLog)).toBeUndefined();
    expect(parseABCIErrorLog("")).toBeUndefined();
    expect(parseABCIErrorLog(undefined)).toBeUndefined();
  });

  test("stops at the error footer when there is no stack trace", () => {
    expect(parseABCIErrorLog(footerTerminatedLog)).toBe("package not found");
  });
});

describe("constructGnoError", () => {
  test("maps a missing package to InvalidPkgPathError", () => {
    const error = constructGnoError({
      "@type": GnoErrorType.INVALID_PKG_PATH,
    }, invalidPkgPathLog);

    expect(error).toBeInstanceOf(InvalidPkgPathError);
    expect(error.type).toBe("/vm.InvalidPkgPathError");
    expect(error.name).toBe("vm.InvalidPkgPathError");
    expect(error.message).toBe("package not found: gno.land/r/does/not/exist");
    expect(error.log).toBe(invalidPkgPathLog);
  });

  test("maps a missing Render to NoRenderDeclError", () => {
    const error = constructGnoError({
      "@type": GnoErrorType.NO_RENDER_DECL,
    }, noRenderDeclLog);

    expect(error).toBeInstanceOf(NoRenderDeclError);
    expect(error.type).toBe("/vm.NoRenderDeclError");
    // No msg trace to extract, so the type's own description is used.
    expect(error.message).toBe("render function not declared");
    expect(error.log).toBe(noRenderDeclLog);
  });

  test("the two are distinguishable", () => {
    const missing = constructGnoError({
      "@type": GnoErrorType.INVALID_PKG_PATH,
    }, invalidPkgPathLog);
    const noRender = constructGnoError({
      "@type": GnoErrorType.NO_RENDER_DECL,
    }, noRenderDeclLog);

    expect(missing).not.toBeInstanceOf(NoRenderDeclError);
    expect(noRender).not.toBeInstanceOf(InvalidPkgPathError);
    expect(missing.message).not.toBe(noRender.message);
  });

  test("prefers the inline value of an /abci.StringError", () => {
    const error = constructGnoError({
      "@type": GnoErrorType.STRING,
      value: "VM panic: not enough arguments in call to Sprintf",
    }, panicLog);

    expect(error).toBeInstanceOf(StringError);
    expect(error.message).toBe("VM panic: not enough arguments in call to Sprintf");
  });

  test("splits the msg trace of a TypeCheckError into its diagnostics", () => {
    const error = constructGnoError({
      "@type": GnoErrorType.TYPE_CHECK,
    }, typeCheckLog);

    expect(error).toBeInstanceOf(TypeCheckError);
    expect((error as TypeCheckError).errors).toEqual(["main.gno:4:2: undefined: foo", "main.gno:5:6: undefined: bar"]);
  });

  test("a TypeCheckError without a msg trace exposes no diagnostics", () => {
    const error = constructGnoError({
      "@type": GnoErrorType.TYPE_CHECK,
    });

    expect((error as TypeCheckError).errors).toEqual([]);
    expect(error.message).toBe("invalid gno package; type check failed");
  });

  test("maps every known type to a dedicated class", () => {
    for (const type of Object.values(GnoErrorType)) {
      const error = constructGnoError({
        "@type": type,
      });

      expect(error.type).toBe(type);
      expect(error.constructor).not.toBe(GnoABCIError);
      expect(error.message).not.toBe("");
    }
  });

  test("falls back to a generic error on an unknown type", () => {
    const error = constructGnoError({
      "@type": "/vm.SomethingNewError",
    });

    expect(error).toBeInstanceOf(GnoABCIError);
    expect(error.type).toBe("/vm.SomethingNewError");
    expect(error.message).toBe("unknown error: /vm.SomethingNewError");
  });

  // The session queries reach the auth module, whose failures are `/std.*` —
  // tm2's domain, not this package's, so they are deliberately not given
  // classes here. They still carry the node's type and message.
  test("keeps type and message for a /std.* error owned by tm2", () => {
    const error = constructGnoError({
      "@type": "/std.SessionNotFoundError",
    }, sessionNotFoundLog);

    expect(error).toBeInstanceOf(GnoABCIError);
    expect(error.type).toBe("/std.SessionNotFoundError");
    expect(error.name).toBe("std.SessionNotFoundError");
    expect(error.message).toBe("session not found");
  });
});

// These drive the whole path a real query takes — raw RPC response,
// `adaptAbciQueryResponse`, then the check the provider performs — rather than
// handing `assertNoABCIError` an object built by hand.
describe("assertNoABCIError, over an adapted node response", () => {
  test("throws the typed error when the node reported one", () => {
    expect(() => assertNodeResponse({
      "@type": GnoErrorType.INVALID_PACKAGE,
    })).toThrow(InvalidPackageError);
  });

  test("passes through a successful response", () => {
    expect(() => assertNodeResponse()).not.toThrow();
  });

  test("recovers the message from the log of a wrapped error", () => {
    expect(() => assertNodeResponse({
      "@type": GnoErrorType.INVALID_PKG_PATH,
    }, invalidPkgPathLog))
      .toThrow("package not found: gno.land/r/does/not/exist");
  });

  test("recovers the diagnostics of a TypeCheckError", () => {
    const error = (() => {
      try {
        assertNodeResponse({
          "@type": GnoErrorType.TYPE_CHECK,
        }, typeCheckLog);
      }
      catch (thrown) {
        return thrown as TypeCheckError;
      }
      return null;
    })();

    expect(error).toBeInstanceOf(TypeCheckError);
    expect(error?.errors).toEqual(["main.gno:4:2: undefined: foo", "main.gno:5:6: undefined: bar"]);
  });

  test("the adapter keeps only @type and value, so nothing else may be relied on", () => {
    const {
      Error: adapted,
    } = adaptAbciQueryResponse(nodeResponse({
      "@type": GnoErrorType.TYPE_CHECK,
      value: "",
      // Anything the node might add here is dropped in transit.
      errors: ["main.gno:4:2: undefined: foo"],
    })).response.ResponseBase;

    expect(Object.keys(adapted ?? {
    })).toEqual(["@type", "value"]);
  });
});
