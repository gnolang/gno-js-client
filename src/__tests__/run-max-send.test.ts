import {
  TransactionEndpoint,
} from "@gnolang/tm2-js-client";
import {
  describe, expect, test, vi,
} from "vitest";

import {
  decodeTxMessages,
  GnoWallet,
  MsgEndpoint,
  MsgRun,
} from "../index.js";

describe("run max send", () => {
  const caller = "g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5";
  const gnoPackage = {
    name: "main",
    path: "",
    files: [],
  };

  test.each(["", "1000ugnot"])("matches Go amino JSON with max_send '%s'", (maxSend) => {
    // upstream/master:gno.land/pkg/sdk/vm/msgs.go: MsgRun omits empty max_send; std/memfile.go omits empty type/info.
    expect(decodeTxMessages([
      {
        type_url: MsgEndpoint.MSG_RUN,
        value: MsgRun.encode(MsgRun.create({
          caller,
          package: gnoPackage,
          max_send: maxSend,
        })).finish(),
      },
    ])).toEqual([
      {
        "@type": "/vm.m_run",
        caller: "g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5",
        send: "",
        max_deposit: "",
        package: {
          name: "main",
          path: "",
        },
        ...(maxSend
          ? {
            max_send: "1000ugnot",
          }
          : {
          }),
      },
    ]);
  });

  test("passes executePackage maxSend to MsgRun", async () => {
    const wallet = new GnoWallet();
    vi.spyOn(wallet, "getAddress").mockResolvedValue(caller);
    const signSpy = vi.spyOn(wallet, "signTransaction").mockImplementation(async tx => tx);
    vi.spyOn(wallet, "sendTransaction").mockResolvedValue({
    } as never);
    await wallet.executePackage(
      gnoPackage,
      TransactionEndpoint.BROADCAST_TX_COMMIT,
      undefined,
      undefined,
      undefined,
      new Map([["ugnot", 1000]]),
    );

    const tx = signSpy.mock.calls[0][0];
    expect(tx.messages[0].type_url).toBe(MsgEndpoint.MSG_RUN);
    expect(MsgRun.decode(tx.messages[0].value)).toEqual({
      caller,
      package: gnoPackage,
      send: "",
      max_deposit: "",
      max_send: "1000ugnot",
    });
  });
});
