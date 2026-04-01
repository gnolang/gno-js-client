// Auto-generated module for gno.land/r/g1q8txq2r5rxwkzu00l64j8d596tjc5p2t0uwf4e/helloworld — DO NOT EDIT
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

const realm = "gno.land/r/g1q8txq2r5rxwkzu00l64j8d596tjc5p2t0uwf4e/helloworld";

type GetCounterReturn = [bigint];
type HelloReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async Increment(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "Increment()", height);
      return;
    },
    async GetCounter(height?: number): Promise<GetCounterReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetCounter()", height);
      return _parseGnoReturns(result) as GetCounterReturn;
    },
    async Hello(height?: number): Promise<HelloReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "Hello()", height);
      return _parseGnoReturns(result) as HelloReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Increment(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Increment",
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
    async GetCounter(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetCounterReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetCounter",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as GetCounterReturn;
    },
    async Hello(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<HelloReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Hello",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as HelloReturn;
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
          g1q8txq2r5rxwkzu00l64j8d596tjc5p2t0uwf4e: {
            helloworld: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
