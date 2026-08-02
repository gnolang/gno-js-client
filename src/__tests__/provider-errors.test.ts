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

  test("exposes the individual failures of a TypeCheckError", () => {
    const error = constructGnoError({
      "@type": GnoErrorType.TYPE_CHECK,
      // The node sends an array here, outside of the declared string map.
      errors: ["main.gno:4:2: undefined: foo"],
    } as never);

    expect(error).toBeInstanceOf(TypeCheckError);
    expect((error as TypeCheckError).errors).toEqual(["main.gno:4:2: undefined: foo"]);
    expect(error.message).toContain("main.gno:4:2: undefined: foo");
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
});

describe("assertNoABCIError", () => {
  test("throws the typed error when the node reported one", () => {
    expect(() => assertNoABCIError({
      Error: {
        "@type": GnoErrorType.INVALID_PACKAGE,
      },
      Data: null,
      Events: null,
      Log: "",
      Info: "",
    })).toThrow(InvalidPackageError);
  });

  test("passes through a successful response", () => {
    expect(() => assertNoABCIError({
      Error: null,
      Data: "",
      Events: null,
      Log: "",
      Info: "",
    })).not.toThrow();
  });
});
