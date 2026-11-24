import type {
  TypedValueJSON,
} from "../types/vm.js";
import {
  toRecord,
} from "./provider.utility.js";

/**
 * The `PrimitiveType` bit flags (`1 << iota`) that gnovm defines in
 * {@link https://github.com/gnolang/gno/blob/d0cbe58c32b8464d593c96bb601790244f4b8e7b/gnovm/pkg/gnolang/types.go#L146-L171 | gnovm/pkg/gnolang/types.go},
 * written as the decimal strings amino JSON sends in `T.value`.
 * Only the typed kinds are listed, since the untyped and `DataByte` kinds never reach `vm/qeval_json`.
 */
const PrimitiveType = {
  Bool: "4",
  String: "16",
  Int: "32",
  Int8: "64",
  Int16: "128",
  Int32: "512", // rune
  Int64: "1024",
  Uint: "2048",
  Uint8: "4096", // byte
  Uint16: "16384",
  Uint32: "32768",
  Uint64: "65536",
  Float32: "131072",
  Float64: "262144",
} as const;

export type GnoPrimitiveValue = boolean | string | number | bigint | null;

export class UnsupportedTypedValueError extends Error {
  readonly typedValue: TypedValueJSON;

  constructor(typedValue: TypedValueJSON) {
    super("Unsupported TypedValue");
    this.name = "UnsupportedTypedValueError";
    this.typedValue = typedValue;
  }
}

/**
 * Decodes bool to boolean, string/address to string, int/int64/uint/uint64 to bigint,
 * smaller integers and floats to number, and nil to null.
 * Unsupported values throw UnsupportedTypedValueError.
 * Check the result's `@error` and decode only the values preceding the error result.
 */
export const decodeTypedValue = (tv: TypedValueJSON): GnoPrimitiveValue => {
  if (tv.T === undefined && tv.V === undefined && tv.N === undefined) {
    return null;
  }

  const type = toRecord(tv.T);
  // `address` is the uverse declared type over string, so it decodes as one.
  const flag = type["@type"] === "/gno.PrimitiveType"
    ? type.value
    : type["@type"] === "/gno.RefType" && type.ID === ".uverse.address"
      ? PrimitiveType.String
      : undefined;
  if (flag === undefined) {
    throw new UnsupportedTypedValueError(tv);
  }

  if (flag === PrimitiveType.String) {
    // TODO: invalid UTF-8 arrives as U+FFFD from the node, so the original bytes are lost.
    const value = tv.V === undefined ? "" : toRecord(tv.V).value;
    if (typeof value === "string") {
      return value;
    }
    throw new UnsupportedTypedValueError(tv);
  }

  // A missing N is the all-zero value. Bad base64 falls through to the length check.
  let decoded = "\0".repeat(8);
  if (tv.N !== undefined) {
    try {
      decoded = atob(tv.N);
    }
    catch {
      decoded = "";
    }
  }
  if (decoded.length !== 8) {
    throw new UnsupportedTypedValueError(tv);
  }
  return readPrimitiveValue(flag, Uint8Array.from(decoded, char => char.charCodeAt(0)), tv);
};

const readPrimitiveValue = (
  flag: unknown,
  bytes: Uint8Array,
  tv: TypedValueJSON,
): boolean | number | bigint => {
  const view = new DataView(bytes.buffer);
  switch (flag) {
    case PrimitiveType.Bool:
      return view.getUint8(0) !== 0;
    case PrimitiveType.Int:
    case PrimitiveType.Int64:
      return view.getBigInt64(0, true);
    case PrimitiveType.Int8:
      return view.getInt8(0);
    case PrimitiveType.Int16:
      return view.getInt16(0, true);
    case PrimitiveType.Int32:
      return view.getInt32(0, true);
    case PrimitiveType.Uint:
    case PrimitiveType.Uint64:
      return view.getBigUint64(0, true);
    case PrimitiveType.Uint8:
      return view.getUint8(0);
    case PrimitiveType.Uint16:
      return view.getUint16(0, true);
    case PrimitiveType.Uint32:
      return view.getUint32(0, true);
    case PrimitiveType.Float32:
      return view.getFloat32(0, true);
    case PrimitiveType.Float64:
      return view.getFloat64(0, true);
    default:
      throw new UnsupportedTypedValueError(tv);
  }
};
