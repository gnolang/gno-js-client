import {
  TransactionEndpoint, TxFee,
} from "@gnolang/tm2-js-client";
import {
  ChildProcess, spawn,
} from "child_process";
import {
  afterAll, beforeAll, describe, expect, test,
} from "vitest";

import {
  defaultTxFee,
  GnoJSONRPCProvider,
  GnoWallet,
  MemFile,
  MemPackage,
} from "../index.js";

describe("E2E Tests", () => {
  const txFee: TxFee = {
    gas_wanted: 50000000n,
    gas_fee: defaultTxFee,
  };

  let provider: GnoJSONRPCProvider;
  let gnoWallet: GnoWallet;
  let gnodevProcess: ChildProcess;

  beforeAll(async () => {
    // Start gnodev server
    gnodevProcess = spawn("gnodev", ["local", "-paths", "gno.land/r/tests/vm"]);

    // Wait for server to be ready
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Server startup timeout"));
      }, 30000);

      gnodevProcess.stdout?.on("data", (data) => {
        if (data.toString().includes("node is ready")) {
          clearTimeout(timeout);
          resolve();
        }
      });

      gnodevProcess.stderr?.on("data", (data) => {
        console.error("gnodev error:", data.toString());
      });

      gnodevProcess.on("error", (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    provider = await GnoJSONRPCProvider.create("http://127.0.0.1:26657");

    // Wait for the first block to be committed so status fields are populated
    for (let i = 0; i < 30; i++) {
      try {
        await provider.getBlockNumber();
        break;
      }
      catch {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    // test1 already has an account balance
    gnoWallet = await GnoWallet.fromMnemonic(
      "source bonus chronic canvas draft south burst lottery vacant surface solve popular case indicate oppose farm nothing bullet exhibit title speed wink action roast",
    );
    gnoWallet.connect(provider);
  }, 40000);

  test("MsgCall with omitted empty args list and max_deposit as empty string", async () => {
    await expect(
      gnoWallet.callMethod(
        "gno.land/r/tests/vm",
        "IncCounter",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        undefined,
        undefined,
        txFee,
      ),
    ).resolves.not.toThrow();

    const result = await gnoWallet.callMethod(
      "gno.land/r/tests/vm",
      "Counter",
      [],
      TransactionEndpoint.BROADCAST_TX_COMMIT,
      undefined,
      undefined,
      txFee,
    );

    const data = result.deliver_tx.ResponseBase.Data;
    expect(data).toBeTruthy();
    const decodedData = Buffer.from(data!, "base64").toString();
    expect(decodedData).toBe("(1 int)\n\n");
  });

  test("MemPackage with omitted type and info", async () => {
    const pkgName = "hello" + Math.floor(Math.random() * 1000);
    const gnomodtoml: MemFile = {
      name: "gnomod.toml",
      body:
        "module = \"gno.land/p/g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5/"
        + pkgName
        + "\"\ngno = \"0.9\"\n",
    };
    const hello: MemFile = {
      name: pkgName + ".gno",
      body:
        "package "
        + pkgName
        + "\n\nfunc Hello() string {\n  return \"Hello, world!\"\n}\n",
    };
    const memPackage: MemPackage = {
      name: pkgName,
      path: "gno.land/p/g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5/" + pkgName,
      files: [gnomodtoml, hello],
    };

    await expect(
      gnoWallet.deployPackage(
        memPackage,
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        undefined,
        undefined,
        txFee,
      ),
    ).resolves.not.toThrow();
  });

  afterAll(async () => {
    // Stop gnodev server
    if (gnodevProcess) {
      // Try to exit gracefully
      if (!gnodevProcess.kill("SIGINT")) {
        // Force kill if it doesn't exit
        gnodevProcess.kill("SIGKILL");
      }
    }
  });
});
