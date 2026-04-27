// Auto-generated module for gno.land/r/sys/users/init — DO NOT EDIT
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

const realm = "gno.land/r/sys/users/init";

const queryClient = (wallet: GnoWallet) => {
  return {
    async Bootstrap(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "Bootstrap()", height);
      return;
    },
    async RegisterUser(params: {
      name: string
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `RegisterUser("${params.name}","${params.addr}")`, height);
      return;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Bootstrap(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Bootstrap",
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
    async RegisterUser(params: {
      name: string
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "RegisterUser",
        [String(params.name), String(params.addr)],
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
          sys: {
            users: {
              init: new RealmModule(wallet),
            },
          },
        },
      },
    },
  };
};

export default Realm;
