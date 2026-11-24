import {
  type AbciQueryParams,
  type Tm2Client,
  UnknownRequestError,
} from "@gnolang/tm2-js-client";
import {
  type AbciQueryResponse,
} from "@gnolang/tm2-rpc";
import {
  describe, expect, test,
} from "vitest";

import {
  BaseGnoProvider,
  type EvalJSONResult,
  ExportSizeExceededError,
  type GnoProvider,
  InvalidPkgPathError,
  StringError,
} from "../index.js";

const nodeResponse = (
  result: EvalJSONResult | string,
  error?: Record<string, unknown>,
  log = "",
): AbciQueryResponse => ({
  responseBase: {
    error: error as AbciQueryResponse["responseBase"]["error"],
    data: new TextEncoder().encode(typeof result === "string" ? result : JSON.stringify(result)),
    events: [],
    log,
    info: "",
  },
  key: new Uint8Array(),
  value: new Uint8Array(),
  height: 0,
});

class TestGnoProvider extends BaseGnoProvider {
  constructor(client: Tm2Client) {
    super(client);
  }
}

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
        return nodeResponse({
          results: [],
        });
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
      name: "GetInt",
      result: {
        results: [intValue],
      },
    },
    {
      name: "GetString",
      result: {
        results: [stringValue],
      },
    },
    {
      name: "GetMulti",
      result: {
        results: [stringValue, intValue],
      },
    },
    {
      name: "GetStruct",
      result: {
        results: [
          {
            T: {
              "@type": "/gno.RefType",
              ID: "gno.land/r/test/json.User",
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
                    value: "alice",
                  },
                },
                {
                  T: intValue.T,
                  N: "HgAAAAAAAAA=",
                },
              ],
            },
          },
        ],
      },
    },
    {
      name: "a returned error",
      result: {
        results: [
          oneValue,
          {
            V: {
              "@type": "/gno.StringValue",
              value: "bad",
            },
          },
        ],
        "@error": "bad",
      },
    },
    {
      name: "a nil error",
      result: {
        results: [
          oneValue,
          {
          },
        ],
      },
    },
    {
      name: "no return values",
      result: {
        results: [],
      },
    },
    {
      name: "a zero value without N",
      result: {
        results: [
          {
            T: {
              "@type": "/gno.PrimitiveType",
              value: "4",
            },
          },
        ],
      },
    },
  ])("preserves raw TypedValue JSON for $name", async ({
    result,
  }) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(result),
    } as unknown as Tm2Client);

    expect(await provider.evaluateExpressionJSON("gno.land/r/test/json", "GetMulti()"))
      .toEqual(result);
  });

  test.each(["", "[]", "{}"])("rejects a response with no results array: '%s'", async (data) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(data),
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
        "@type": "/vm.ExportSizeExceededError",
      },
      ErrorClass: ExportSizeExceededError,
      message: "export size limit exceeded",
    },
    {
      error: {
        "@type": "/abci.StringError",
        value: "kaboom",
      },
      ErrorClass: StringError,
      message: "kaboom",
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
    error: nodeError, ErrorClass, message, log,
  }) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse({
        results: [],
      }, nodeError, log),
    } as unknown as Tm2Client);

    const error = await provider.evaluateExpressionJSON("gno.land/r/test/json", "GetMulti()")
      .then(() => null, (thrown: unknown) => thrown);

    expect(error).toBeInstanceOf(ErrorClass);
    expect(error).toHaveProperty("message", message);
  });
});
