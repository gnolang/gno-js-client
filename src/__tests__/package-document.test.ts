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
  type PackageDocumentation,
} from "../index.js";
import {
  nodeResponse,
  TestGnoProvider,
} from "./helpers.js";

// gnovm/pkg/doc/json_doc.go: declarations; amino/json_encode.go encodes Go int as strings.
const document: PackageDocumentation = {
  package_path: "gno.land/r/test/docs",
  package_line: "package docs // import \"gno.land/r/test/docs\"",
  package_doc: "Package documentation",
  imports: ["std"],
  bugs: null,
  values: [
    {
      signature: "const Answer = 42",
      const: true,
      doc: "An answer",
      file: "docs.gno",
      line: "3",
      values: [
        {
          name: "Answer",
          doc: "",
          type: "int",
        },
      ],
    },
  ],
  funcs: [
    {
      type: "",
      name: "Set",
      crossing: true,
      signature: "func Set(cur realm, value int)",
      doc: "Sets a value",
      params: [
        {
          name: "cur",
          type: "realm",
          doc: "",
        },
        {
          name: "value",
          type: "int",
          doc: "",
        },
      ],
      results: null,
    },
  ],
  types: [
    {
      name: "Record",
      type: "struct { Value int }",
      doc: "A record",
      alias: false,
      kind: "struct",
      fields: [
        {
          name: "Value",
          type: "int",
          doc: "The value",
        },
      ],
    },
    {
      name: "Reader",
      type: "interface { Record; Get() int }",
      doc: "",
      alias: false,
      kind: "interface",
      inter_elems: [
        {
          type: "Record",
        },
        {
          method: {
            type: "Reader",
            name: "Get",
            crossing: false,
            signature: "Get() int",
            doc: "",
            params: null,
            results: [
              {
                name: "",
                type: "int",
                doc: "",
              },
            ],
          },
        },
      ],
    },
  ],
};

describe("getPackageDocument", () => {
  test.each([undefined, 0, 7])("returns raw documentation JSON at height %s", async (height) => {
    let forwarded: AbciQueryParams | undefined;
    const provider: GnoProvider = new TestGnoProvider({
      abciQuery: async (params: AbciQueryParams) => {
        forwarded = params;
        return nodeResponse(undefined, "", JSON.stringify(document));
      },
    } as unknown as Tm2Client);

    expect(await provider.getPackageDocument("gno.land/r/test/docs", height)).toEqual(document);
    expect(forwarded).toEqual({
      path: "vm/qdoc",
      data: new TextEncoder().encode("gno.land/r/test/docs"),
      height: height ?? 0,
      prove: false,
    });
  });

  test("preserves null lists and omitted optional fields", async () => {
    const minimal: PackageDocumentation = {
      package_path: "gno.land/r/test/empty",
      package_line: "package empty",
      package_doc: "",
      bugs: null,
      values: null,
      funcs: null,
      types: null,
    };
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(undefined, "", JSON.stringify(minimal)),
    } as unknown as Tm2Client);

    expect(await provider.getPackageDocument(minimal.package_path)).toEqual(minimal);
  });

  test("rejects malformed JSON", async () => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse(undefined, "", "invalid JSON"),
    } as unknown as Tm2Client);

    await expect(provider.getPackageDocument("gno.land/r/test/docs")).rejects.toThrow(SyntaxError);
  });

  test("preserves InvalidPkgPathError for a missing package", async () => {
    const provider = new TestGnoProvider({
      abciQuery: async () => nodeResponse({
        "@type": "/vm.InvalidPkgPathError",
      }),
    } as unknown as Tm2Client);

    await expect(provider.getPackageDocument("gno.land/r/missing"))
      .rejects.toBeInstanceOf(InvalidPkgPathError);
  });
});
