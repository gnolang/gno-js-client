import {
  Tx,
} from "@gnolang/tm2-js-client";
import {
  describe, expect, test, vi,
} from "vitest";

import {
  decodeTxMessages,
  defaultTxFee,
  GnoJSONRPCProvider,
  GnoWallet,
  MsgCall,
  MsgEndpoint,
} from "../index.js";

describe("transaction signing", () => {
  const signOptions = {
    accountNumber: "42",
    sequence: "7",
  };

  const newWallet = async (): Promise<GnoWallet> => {
    const wallet = await GnoWallet.createRandom();
    wallet.connect({
      getStatus: vi.fn().mockResolvedValue({
        node_info: {
          network: "dev",
        },
      }),
    } as unknown as GnoJSONRPCProvider);

    return wallet;
  };

  const callTx = (gasFee: string): Tx => ({
    messages: [
      {
        type_url: MsgEndpoint.MSG_CALL,
        value: MsgCall.encode({
          caller: "g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5",
          send: "",
          max_deposit: "",
          pkg_path: "gno.land/r/tests/vm",
          func: "Echo",
          args: ["hello"],
        }).finish(),
      },
    ],
    fee: {
      gas_wanted: 60000n,
      gas_fee: gasFee,
    },
    memo: "gno-js-client",
    signatures: [],
  });

  test("signs the fee in the amount/gas shape", async () => {
    const wallet = await newWallet();
    const signSpy = vi.spyOn(wallet.getSigner(), "signData");

    await wallet.signTransaction(callTx(defaultTxFee), decodeTxMessages, signOptions);

    // Pinned to tx.GetSignBytes("dev", 42, 7) for the same tx on gnolang/gno master (gnolang/gno#6173)
    const expected
      = "{\"account_number\":\"42\",\"chain_id\":\"dev\",\"fee\":{\"amount\":[{\"amount\":\"1000000\",\"denom\":\"ugnot\"}],\"gas\":\"60000\"},\"memo\":\"gno-js-client\",\"msgs\":[{\"@type\":\"/vm.m_call\",\"args\":[\"hello\"],\"caller\":\"g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5\",\"func\":\"Echo\",\"max_deposit\":\"\",\"pkg_path\":\"gno.land/r/tests/vm\",\"send\":\"\"}],\"sequence\":\"7\"}";
    const signBytes = signSpy.mock.calls[0][0];
    expect(Buffer.from(signBytes).toString("utf8")).toBe(expected);
  });

  test("rejects a gas_fee without a denomination", async () => {
    const wallet = await newWallet();

    await expect(
      wallet.signTransaction(callTx("1000000"), decodeTxMessages, signOptions),
    ).rejects.toThrow("invalid coin format");
  });
});
