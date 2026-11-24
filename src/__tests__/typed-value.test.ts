import {
  describe, expect, test,
} from "vitest";

import {
  decodeTypedValue,
  type GnoPrimitiveValue,
  type TypedValueJSON,
  UnsupportedTypedValueError,
} from "../index.js";

const primitive = (flag: string, N?: string): TypedValueJSON => ({
  T: {
    "@type": "/gno.PrimitiveType",
    value: flag,
  },
  N,
});

const stringValue = (value: string) => ({
  "@type": "/gno.StringValue",
  value,
});

// Values are verbatim qeval_json output, with at least one case per primitive kind.
describe("decodeTypedValue", () => {
  test.each<[string, TypedValueJSON, GnoPrimitiveValue]>([
    // The node leaves stale upper bytes, so only the type's width is read.
    ["int8 with stale upper bytes", primitive("64", "//////////8="), -1],
    ["uint16 with stale upper bytes", primitive("16384", "//////////8="), 65535],
    ["int16", primitive("128", "/v8AAAAAAAA="), -2],
    ["int32", primitive("512", "/v///wAAAAA="), -2],
    ["uint", primitive("2048", "//////////8="), 18446744073709551615n],
    ["uint8", primitive("4096", "/wAAAAAAAAA="), 255],
    ["uint32", primitive("32768", "/////wAAAAA="), 4294967295],
    ["int64 min", primitive("1024", "AAAAAAAAAIA="), -9223372036854775808n],
    ["uint64 max", primitive("65536", "//////////8="), 18446744073709551615n],
    ["float32 in bytes 0..3", primitive("131072", "AABgQAAAAAA="), 3.5],
    ["float64 -0", primitive("262144", "AAAAAAAAAIA="), -0],
    ["bool", primitive("4", "AQAAAAAAAAA="), true],
    // All-zero N is omitted on the wire.
    ["zero value without N", primitive("32"), 0n],
    [
      "string",
      {
        ...primitive("16"),
        V: stringValue("hello"),
      },
      "hello",
    ],
    ["string without V", primitive("16"), ""],
    [
      "address",
      {
        T: {
          "@type": "/gno.RefType",
          ID: ".uverse.address",
        },
        V: stringValue("g1t2a5cfc8y860kzp6yf7fsnfm3dq0a5dxx5svzy"),
      },
      "g1t2a5cfc8y860kzp6yf7fsnfm3dq0a5dxx5svzy",
    ],
    [
      "nil",
      {
      },
      null,
    ],
  ])("decodes %s", (_name, tv, expected) => {
    expect(decodeTypedValue(tv)).toBe(expected);
  });

  test.each<[string, TypedValueJSON]>([
    // Any declared type, even one over string, needs vm/qtype_json to decode.
    [
      "a declared type",
      {
        T: {
          "@type": "/gno.RefType",
          ID: "gno.land/r/demo/foo.Name",
        },
        V: stringValue("x"),
      },
    ],
    // Stands in for every non-primitive type (pointer, struct, map, ...).
    [
      "a byte slice",
      {
        T: {
          "@type": "/gno.SliceType",
          Elt: primitive("4096").T,
          Vrd: false,
        },
      },
    ],
    // Stands in for the untyped and DataByte flags, which never reach qeval_json.
    ["an unknown primitive flag", primitive("524288")],
    [
      "a value without T",
      {
        V: stringValue("bad"),
      },
    ],
    ["N that is not 8 bytes", primitive("32", "AQ==")],
    ["N that is not base64", primitive("32", "%%%%%%%%%%%%")],
    [
      "a string whose value is not a string",
      {
        ...primitive("16"),
        V: {
          value: 1,
        },
      },
    ],
  ])("rejects %s", (_name, tv) => {
    expect(() => decodeTypedValue(tv)).toThrow(expect.objectContaining({
      name: UnsupportedTypedValueError.name,
      typedValue: tv,
    }));
  });
});
