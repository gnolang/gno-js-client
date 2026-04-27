// Auto-generated module for gno.land/r/demo/defi/grc20reg — DO NOT EDIT
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

const realm = "gno.land/r/demo/defi/grc20reg";

type GetReturn = [unknown];
type MustGetReturn = [unknown];
type RenderReturn = [string];
type GetRegistryReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
  return {
    async Register(params: {
      token: unknown
      slug: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Register(${params.token},"${params.slug}")`, height);
      return;
    },
    async Get(params: {
      key: string
    }, height?: number): Promise<GetReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Get("${params.key}")`, height);
      return _parseGnoReturns(result) as GetReturn;
    },
    async MustGet(params: {
      key: string
    }, height?: number): Promise<MustGetReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `MustGet("${params.key}")`, height);
      return _parseGnoReturns(result) as MustGetReturn;
    },
    async Render(params: {
      path: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
    async GetRegistry(height?: number): Promise<GetRegistryReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetRegistry()", height);
      return _parseGnoReturns(result) as GetRegistryReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Register(params: {
      token: unknown
      slug: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Register",
        [String(params.token), String(params.slug)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Get(params: {
      key: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Get",
        [String(params.key)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as GetReturn;
    },
    async MustGet(params: {
      key: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<MustGetReturn> {
      const resp = await wallet.callMethod(
        realm,
        "MustGet",
        [String(params.key)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as MustGetReturn;
    },
    async Render(params: {
      path: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<RenderReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Render",
        [String(params.path)],
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
    async GetRegistry(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetRegistryReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetRegistry",
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
      return _parseGnoReturns(result) as GetRegistryReturn;
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
          demo: {
            defi: {
              grc20reg: new RealmModule(wallet),
            },
          },
        },
      },
    },
  };
};

export default Realm;
