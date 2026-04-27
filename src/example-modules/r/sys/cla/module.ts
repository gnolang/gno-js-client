// Auto-generated module for gno.land/r/sys/cla — DO NOT EDIT
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

const realm = "gno.land/r/sys/cla";

type ProposeNewCLAReturn = [unknown];
type HasValidSignatureReturn = [boolean];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async ProposeNewCLA(params: {
      newHash: string
      newURL: string
    }, height?: number): Promise<ProposeNewCLAReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ProposeNewCLA("${params.newHash}","${params.newURL}")`, height);
      return _parseGnoReturns(result) as ProposeNewCLAReturn;
    },
    async Sign(params: {
      hash: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Sign("${params.hash}")`, height);
      return;
    },
    async HasValidSignature(params: {
      addr: string
    }, height?: number): Promise<HasValidSignatureReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `HasValidSignature("${params.addr}")`, height);
      return _parseGnoReturns(result) as HasValidSignatureReturn;
    },
    async Render(params: {
      path: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async ProposeNewCLA(params: {
      newHash: string
      newURL: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ProposeNewCLAReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ProposeNewCLA",
        [String(params.newHash), String(params.newURL)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as ProposeNewCLAReturn;
    },
    async Sign(params: {
      hash: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Sign",
        [String(params.hash)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async HasValidSignature(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<HasValidSignatureReturn> {
      const resp = await wallet.callMethod(
        realm,
        "HasValidSignature",
        [String(params.addr)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as HasValidSignatureReturn;
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
            cla: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
