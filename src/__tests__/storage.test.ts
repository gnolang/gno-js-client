import {
  type AbciQueryParams,
  type Tm2Client,
} from "@gnolang/tm2-js-client";
import {
  describe,
  expect,
  test,
} from "vitest";

import {
  type GnoProvider,
  InvalidPkgPathError,
} from "../index.js";
import {
  nodeResponse,
  TestGnoProvider,
} from "./helpers.js";

describe("getRealmStorage", () => {
  test.each([undefined, 0, 7])("queries storage without losing uint64 precision at height %s", async (height) => {
    let forwarded: AbciQueryParams | undefined;
    const provider: GnoProvider = new TestGnoProvider({
      abciQuery: async (params: AbciQueryParams) => {
        forwarded = params;
        return nodeResponse(undefined, "", "storage: 18446744073709551615, deposit: 9223372036854775807");
      },
    } as unknown as Tm2Client);

    expect(await provider.getRealmStorage("gno.land/r/test/storage", height)).toEqual({
      storage: 18446744073709551615n,
      deposit: 9223372036854775807n,
    });
    expect(forwarded).toEqual({
      path: "vm/qstorage",
      data: new TextEncoder().encode("gno.land/r/test/storage"),
      height: height ?? 0,
      prove: false,
    });
  });

  test.each(["", "{}", "storage: -1, deposit: 0", "storage: 1, deposit: invalid"])("rejects malformed storage: '%s'", async (data) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(undefined, "", data),
    } as unknown as Tm2Client);

    await expect(provider.getRealmStorage("gno.land/r/test/storage"))
      .rejects.toThrow("Invalid vm/qstorage response");
  });

  test("preserves InvalidPkgPathError for a missing realm", async () => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse({
        "@type": "/vm.InvalidPkgPathError",
      }),
    } as unknown as Tm2Client);

    await expect(provider.getRealmStorage("gno.land/r/missing"))
      .rejects.toBeInstanceOf(InvalidPkgPathError);
  });
});

describe("getStoragePrice", () => {
  test.each([undefined, 0, 7])("parses the JSON coin parameter at height %s", async (height) => {
    let forwarded: AbciQueryParams | undefined;
    const provider: GnoProvider = new TestGnoProvider({
      abciQuery: async (params: AbciQueryParams) => {
        forwarded = params;
        return nodeResponse(undefined, "", "\"9223372036854775807ugnot\"");
      },
    } as unknown as Tm2Client);

    expect(await provider.getStoragePrice(height)).toEqual({
      denom: "ugnot",
      amount: "9223372036854775807",
    });
    expect(forwarded).toEqual({
      path: "params/vm:p:storage_price",
      data: new Uint8Array(),
      height: height ?? 0,
      prove: false,
    });
  });

  test.each(["null", "{}", "\"\"", "\"0ugnot\"", "\"invalid\"", "\"9223372036854775808ugnot\""])("rejects an invalid price: %s", async (data) => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(undefined, "", data),
    } as unknown as Tm2Client);

    await expect(provider.getStoragePrice()).rejects.toThrow();
  });
});
