import {
  ABCIErrorKey,
  ABCIResponseBase,
  TM2Error,
} from "@gnolang/tm2-js-client";

/**
 * Amino type URLs of the errors a Gno node can report through
 * `ResponseBase.Error`.
 *
 * The `/vm.*` entries mirror the types registered in
 * gno.land/pkg/sdk/vm/package.go; `/abci.StringError` is the tm2 catch-all
 * used for anything that is not an ABCI error type (a VM panic, most notably).
 */
export enum GnoErrorType {
  INVALID_PKG_PATH = "/vm.InvalidPkgPathError",
  NO_RENDER_DECL = "/vm.NoRenderDeclError",
  PKG_EXIST = "/vm.PkgExistError",
  INVALID_STMT = "/vm.InvalidStmtError",
  INVALID_EXPR = "/vm.InvalidExprError",
  TYPE_CHECK = "/vm.TypeCheckError",
  UNAUTHORIZED_USER = "/vm.UnauthorizedUserError",
  INVALID_PACKAGE = "/vm.InvalidPackageError",
  INVALID_FILE = "/vm.InvalidFileError",
  OBJECT_NOT_FOUND = "/vm.ObjectNotFoundError",
  UNOBSERVED_SEND = "/vm.UnobservedSendError",
  UNSPENDABLE_SEND = "/vm.UnspendableSendError",
  STRING = "/abci.StringError",
}

/**
 * Base class for errors the node reports inside `ResponseBase.Error`.
 *
 * These are application-level failures: the RPC call itself succeeded (the
 * node answered with HTTP 200), but the query was refused. `type` carries the
 * amino type URL so callers can branch on the exact condition without parsing
 * messages, and `log` keeps the untouched `ResponseBase.Log` (a Go stack
 * trace) for debugging.
 */
export class GnoABCIError extends TM2Error {
  /** The amino type URL of the error, e.g. `/vm.NoRenderDeclError` */
  readonly type: string;

  constructor(type: string, message: string, log?: string) {
    super(message, log);

    this.type = type;
    // `/vm.NoRenderDeclError` -> `vm.NoRenderDeclError`, so that
    // `String(err)` reads `vm.NoRenderDeclError: <message>`.
    this.name = type.startsWith("/") ? type.slice(1) : type;
  }
}

/** The requested package path does not exist on chain */
export class InvalidPkgPathError extends GnoABCIError {
  constructor(message = "invalid package path", log?: string) {
    super(GnoErrorType.INVALID_PKG_PATH, message, log);
  }
}

/** The package exists but declares no `Render` function */
export class NoRenderDeclError extends GnoABCIError {
  constructor(message = "render function not declared", log?: string) {
    super(GnoErrorType.NO_RENDER_DECL, message, log);
  }
}

/** The package path is already taken */
export class PkgExistError extends GnoABCIError {
  constructor(message = "package already exists", log?: string) {
    super(GnoErrorType.PKG_EXIST, message, log);
  }
}

/** The submitted statement could not be parsed */
export class InvalidStmtError extends GnoABCIError {
  constructor(message = "invalid statement", log?: string) {
    super(GnoErrorType.INVALID_STMT, message, log);
  }
}

/** The submitted expression could not be parsed */
export class InvalidExprError extends GnoABCIError {
  constructor(message = "invalid expression", log?: string) {
    super(GnoErrorType.INVALID_EXPR, message, log);
  }
}

/**
 * The package did not pass type checking.
 *
 * The node cannot put the individual diagnostics in the error value: it is
 * amino-encoded into the merkle-hashed result, and go/types wording varies
 * across toolchains, so hashing it would break consensus. `vm.ErrTypeCheck`
 * therefore joins them with a newline onto the error's msg trace, which is what
 * `message` is recovered from — {@link errors} just splits it back apart.
 */
export class TypeCheckError extends GnoABCIError {
  /** The individual type-check failures, one per line of the msg trace */
  readonly errors: string[];

  constructor(message?: string, log?: string) {
    super(
      GnoErrorType.TYPE_CHECK,
      message ?? "invalid gno package; type check failed",
      log,
    );

    // Only a recovered msg trace holds diagnostics; the fallback above is the
    // type's own description and is not one.
    this.errors = message
      ? message.split("\n").map(line => line.trim()).filter(line => line.length > 0)
      : [];
  }
}

/** The caller is not allowed to perform the operation */
export class UnauthorizedUserError extends GnoABCIError {
  constructor(message = "unauthorized user", log?: string) {
    super(GnoErrorType.UNAUTHORIZED_USER, message, log);
  }
}

/** The package is malformed or unavailable */
export class InvalidPackageError extends GnoABCIError {
  constructor(message = "invalid package", log?: string) {
    super(GnoErrorType.INVALID_PACKAGE, message, log);
  }
}

/** The requested file is not part of the package */
export class InvalidFileError extends GnoABCIError {
  constructor(message = "file is not available", log?: string) {
    super(GnoErrorType.INVALID_FILE, message, log);
  }
}

/** The referenced object does not exist */
export class ObjectNotFoundError extends GnoABCIError {
  constructor(message = "object not found", log?: string) {
    super(GnoErrorType.OBJECT_NOT_FOUND, message, log);
  }
}

/**
 * A `MsgCall` attached a non-empty send envelope that no executing code ever
 * observed, which would strand the coins in the callee's address.
 */
export class UnobservedSendError extends GnoABCIError {
  constructor(
    message = "coins were sent but the called function never read them",
    log?: string,
  ) {
    super(GnoErrorType.UNOBSERVED_SEND, message, log);
  }
}

/**
 * A `MsgAddPackage` attached coins to a pure `p/` package. Such a package has
 * no realm identity, so it could never spend them.
 */
export class UnspendableSendError extends GnoABCIError {
  constructor(
    message = "coins cannot be sent to a pure package; nothing could ever spend them",
    log?: string,
  ) {
    super(GnoErrorType.UNSPENDABLE_SEND, message, log);
  }
}

/**
 * A failure the node could not express as a typed ABCI error — most commonly
 * a VM panic. The message is the panic text.
 */
export class StringError extends GnoABCIError {
  constructor(message = "unknown error", log?: string) {
    super(GnoErrorType.STRING, message, log);
  }
}

/**
 * Extracts the human-readable message out of a `ResponseBase.Log`.
 *
 * tm2 renders wrapped errors as:
 *
 * ```
 * --= Error =--
 * Data: vm.InvalidPkgPathError{...}
 * Msg Traces:
 *     0  /gnoroot/gno.land/pkg/sdk/vm/errors.go:58 - package not found: gno.land/r/does/not/exist
 * Stack Trace:
 *     ...
 * ```
 *
 * The first msg trace is the innermost — and most specific — message, so that
 * is what gets surfaced. Errors that were never wrapped have no `Msg Traces:`
 * block at all (the log is just the Go dump of the error value), in which case
 * there is nothing to extract.
 * @param {string} [log] the raw `ResponseBase.Log`
 * @returns {string | undefined} the extracted message, if any
 */
export const parseABCIErrorLog = (log?: string): string | undefined => {
  if (!log) {
    return undefined;
  }

  const tracesAt = log.indexOf("Msg Traces:");
  if (tracesAt < 0) {
    return undefined;
  }

  let traces = log.slice(tracesAt + "Msg Traces:".length);

  // The block is terminated by the stack trace, or by the error footer when
  // the error carries no stack trace.
  for (const terminator of ["\nStack Trace:", "\n--= /Error =--"]) {
    const end = traces.indexOf(terminator);
    if (end >= 0) {
      traces = traces.slice(0, end);
    }
  }

  // Trace entries look like `    0  <file>:<line> - <msg>`, and <msg> may
  // itself span several lines (VM panics embed their own stack).
  const lines = traces.split("\n");
  const first = lines.findIndex(line => /^\s*\d+\s+\S+ - /.test(line));
  if (first < 0) {
    return undefined;
  }

  const message = [lines[first].replace(/^\s*\d+\s+\S+ - /, "")];
  for (const line of lines.slice(first + 1)) {
    if (/^\s*\d+\s+\S+ - /.test(line)) {
      break;
    }
    message.push(line);
  }

  return message.join("\n").trim() || undefined;
};

/**
 * Builds the appropriate error for a populated `ResponseBase.Error`.
 *
 * The node reports VM-level failures with HTTP 200 and a null `Data`, so the
 * only way to tell a missing package from a package without a `Render` is to
 * read this object; the message is recovered from the error value itself when
 * it carries one, and from the log otherwise.
 * @param {object} error the `ResponseBase.Error` object
 * @param {string} [log] the accompanying `ResponseBase.Log`
 * @returns {GnoABCIError} the typed error
 */
export const constructGnoError = (
  error: NonNullable<ABCIResponseBase["Error"]>,
  log?: string,
): GnoABCIError => {
  const raw = error as Record<string, unknown>;
  const type = String(raw[ABCIErrorKey] ?? "");

  // `/abci.StringError` carries its message inline; every other type gets it
  // from the wrapped-error log.
  const value = typeof raw.value === "string" && raw.value.length > 0
    ? raw.value
    : undefined;
  const message = value ?? parseABCIErrorLog(log);

  switch (type) {
    case GnoErrorType.INVALID_PKG_PATH:
      return new InvalidPkgPathError(message, log);
    case GnoErrorType.NO_RENDER_DECL:
      return new NoRenderDeclError(message, log);
    case GnoErrorType.PKG_EXIST:
      return new PkgExistError(message, log);
    case GnoErrorType.INVALID_STMT:
      return new InvalidStmtError(message, log);
    case GnoErrorType.INVALID_EXPR:
      return new InvalidExprError(message, log);
    case GnoErrorType.TYPE_CHECK:
      return new TypeCheckError(message, log);
    case GnoErrorType.UNAUTHORIZED_USER:
      return new UnauthorizedUserError(message, log);
    case GnoErrorType.INVALID_PACKAGE:
      return new InvalidPackageError(message, log);
    case GnoErrorType.INVALID_FILE:
      return new InvalidFileError(message, log);
    case GnoErrorType.OBJECT_NOT_FOUND:
      return new ObjectNotFoundError(message, log);
    case GnoErrorType.UNOBSERVED_SEND:
      return new UnobservedSendError(message, log);
    case GnoErrorType.UNSPENDABLE_SEND:
      return new UnspendableSendError(message, log);
    case GnoErrorType.STRING:
      return new StringError(message, log);
    default:
      return new GnoABCIError(
        type || "unknown",
        message ?? `unknown error: ${type || JSON.stringify(error)}`,
        log,
      );
  }
};

/**
 * Throws the matching {@link GnoABCIError} when the node reported a failure.
 *
 * VM failures come back as a regular HTTP 200 response with `Data: null`, so
 * this has to be called before any attempt to read the payload — otherwise the
 * caller only sees an uninitialized response and loses the actual cause.
 * @param {ABCIResponseBase} responseBase the `ResponseBase` of the ABCI response
 */
export const assertNoABCIError = (responseBase: ABCIResponseBase): void => {
  if (responseBase.Error) {
    throw constructGnoError(responseBase.Error, responseBase.Log);
  }
};
