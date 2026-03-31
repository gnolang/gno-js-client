// Auto-generated module for gno.land/r/gov/dao/v3/init — DO NOT EDIT
import {
  GnoWallet,
} from "@gnolang/gno-js-client";
// Imported with leading underscore to avoid linting errors about unused imports in void-returning functions
import {
  parseGnoReturns as _parseGnoReturns,
} from "@gnolang/gno-js-client";
import {
  TransactionEndpoint, TxFee,
} from "@gnolang/tm2-js-client";

const realm = "gno.land/r/gov/dao/v3/init";

const queryClient = (wallet: GnoWallet) => {
  return {
    async Init(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "Init()", height);
      return;
    },
    async InitWithUsers(params: {
      addrs: unknown
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `InitWithUsers(${params.addrs})`, height);
      return;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Init(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Init",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async InitWithUsers(params: {
      addrs: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "InitWithUsers",
        [String(params.addrs)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
  };
};

class RealmModule {
  public query: ReturnType<typeof queryClient>;
  public tx: ReturnType<typeof txClient>;

  constructor(wallet: GnoWallet) {
    this.tx = txClient(wallet);
    this.query = queryClient(wallet);
  }
}

const Realm = (wallet: GnoWallet) => {
  return {
    realm: {
      realms: {
        r: {
          gov: {
            dao: {
              v3: {
                init: new RealmModule(wallet),
              },
            },
          },
        },
      },
    },
  };
};

export default Realm;
