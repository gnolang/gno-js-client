import {
  type AbciQueryParams,
  type Tm2Client,
  UnknownRequestError,
} from "@gnolang/tm2-js-client";
import {
  describe,
  expect,
  test,
} from "vitest";

import {
  type EvalJSONResult,
  type GnoProvider,
  InvalidPkgPathError,
} from "../index.js";
import {
  nodeResponse,
  TestGnoProvider,
} from "./helpers.js";

const intValue = {
  T: {
    "@type": "/gno.PrimitiveType",
    value: "32",
  },
  N: "KgAAAAAAAAA=",
};
const stringValue = {
  T: {
    "@type": "/gno.PrimitiveType",
    value: "16",
  },
  V: {
    "@type": "/gno.StringValue",
    value: "hello",
  },
};
const oneValue = {
  T: intValue.T,
  N: "AQAAAAAAAAA=",
};

describe("evaluateExpressionJSON", () => {
  test.each([undefined, 0, 7])("forwards the query with height %s", async (height) => {
    let forwarded: AbciQueryParams | undefined;
    const provider: GnoProvider = new TestGnoProvider({
      abciQuery: async (params: AbciQueryParams) => {
        forwarded = params;
        return nodeResponse(undefined, "", JSON.stringify({
          results: [],
        }));
      },
    } as unknown as Tm2Client);

    await provider.evaluateExpressionJSON("gno.land/r/test/json", "GetMulti()", height);

    expect(forwarded).toEqual({
      path: "vm/qeval_json",
      data: new TextEncoder().encode("gno.land/r/test/json.GetMulti()"),
      height: height ?? 0,
      prove: false,
    });
  });

  test.each<{
    name: string
    result: EvalJSONResult
  }>([
    {
      name: "GetMulti",
      result: {
        results: [stringValue, intValue],
      },
    },
    {
      name: "a returned error",
      result: {
        results: [
          oneValue,
          // `errors.New("bad")` as the node returns it (captured from QueryEvalJSON)
          {
            T: {
              "@type": "/gno.PointerType",
              Elt: {
                "@type": "/gno.RefType",
                ID: "errors.errorString",
              },
            },
            V: {
              "@type": "/gno.PointerValue",
              TV: null,
              Base: {
                "@type": "/gno.HeapItemValue",
                ObjectInfo: {
                  ID: "0db98e7192fc2589b348ef5628ebd34f65b53e2c:0",
                  ModTime: "0",
                  RefCount: "0",
                  LastObjectSize: "0",
                },
                Value: {
                  T: {
                    "@type": "/gno.RefType",
                    ID: "errors.errorString",
                  },
                  V: {
                    "@type": "/gno.StructValue",
                    ObjectInfo: {
                      ID: "0db98e7192fc2589b348ef5628ebd34f65b53e2c:0",
                      ModTime: "0",
                      RefCount: "0",
                      LastObjectSize: "0",
                    },
                    Fields: [
                      {
                        T: stringValue.T,
                        V: {
                          "@type": "/gno.StringValue",
                          value: "bad",
                        },
                      },
                    ],
                  },
                },
              },
              Index: "0",
            },
          },
        ],
        "@error": "bad",
      },
    },
  ])("preserves raw TypedValue JSON for $name", async ({
    result,
  }) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(undefined, "", JSON.stringify(result)),
    } as unknown as Tm2Client);

    expect(await provider.evaluateExpressionJSON("gno.land/r/test/json", "GetMulti()"))
      .toEqual(result);
  });

  test.each(["", "[]", "{}"])("rejects a response with no results array: '%s'", async (data) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(undefined, "", data),
    } as unknown as Tm2Client);

    await expect(provider.evaluateExpressionJSON("gno.land/r/test/json", "GetMulti()"))
      .rejects.toThrow("vm/qeval_json response has no results array");
  });

  test.each([
    {
      error: {
        "@type": "/vm.InvalidPkgPathError",
      },
      ErrorClass: InvalidPkgPathError,
      message: "invalid package path",
    },
    {
      error: {
        "@type": "/std.UnknownRequestError",
      },
      ErrorClass: UnknownRequestError,
      message: "unknown request",
      log: "unknown vm query endpoint qeval_json in vm/qeval_json",
    },
  ])("maps the node error to $ErrorClass.name", async ({
    error: nodeError,
    ErrorClass,
    message,
    log,
  }) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(nodeError, log),
    } as unknown as Tm2Client);

    const error = await provider.evaluateExpressionJSON("gno.land/r/test/json", "GetMulti()")
      .then(() => null, (thrown: unknown) => thrown);

    expect(error).toBeInstanceOf(ErrorClass);
    expect(error).toHaveProperty("message", message);
  });
});
