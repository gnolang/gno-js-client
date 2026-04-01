// Auto-generated module for gno.land/r/g1lyejwwmxef5tn8nx69saykmgm8rlr4xq9yeh3z/helloworld — DO NOT EDIT
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

const realm = "gno.land/r/g1lyejwwmxef5tn8nx69saykmgm8rlr4xq9yeh3z/helloworld";

type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async Render(params: {
      arg_0: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.arg_0}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Render(params: {
      arg_0: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<RenderReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Render",
        [String(params.arg_0)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as RenderReturn;
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
          g1lyejwwmxef5tn8nx69saykmgm8rlr4xq9yeh3z: {
            helloworld: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
