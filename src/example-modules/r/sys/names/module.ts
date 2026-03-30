import { TransactionEndpoint, TxFee } from '@gnolang/tm2-js-client';
import { GnoWallet } from '@gnolang/gno-js-client';
import { parseGnoReturns } from '@gnolang/gno-js-client/bin/wallet/helpers';

const realm = 'gno.land/r/sys/names';

type RenderReturn = [string];
type IsAuthorizedAddressForNamespaceReturn = [boolean];
type IsEnabledReturn = [boolean];

const queryClient = (wallet: GnoWallet) => {
  return {
    async Render(
      params: { arg_0: string },
      height?: number
    ): Promise<RenderReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `Render("${params.arg_0}")`, height);
      return parseGnoReturns(result) as RenderReturn;
    },
    async IsAuthorizedAddressForNamespace(
      params: { address_XXX: string; namespace: string },
      height?: number
    ): Promise<IsAuthorizedAddressForNamespaceReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `IsAuthorizedAddressForNamespace("${params.address_XXX}","${params.namespace}")`,
          height
        );
      return parseGnoReturns(result) as IsAuthorizedAddressForNamespaceReturn;
    },
    async Enable(height?: number): Promise<void> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `Enable()`, height);
    },
    async IsEnabled(height?: number): Promise<IsEnabledReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `IsEnabled()`, height);
      return parseGnoReturns(result) as IsEnabledReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Render(
      params: { arg_0: string },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<RenderReturn> {
      const resp = await wallet.callMethod(
        realm,
        'Render',
        [String(params.arg_0)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(
          resp.deliver_tx.ResponseBase.Log ||
            JSON.stringify(resp.deliver_tx.ResponseBase.Error)
        );
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return parseGnoReturns(result) as RenderReturn;
    },
    async IsAuthorizedAddressForNamespace(
      params: { address_XXX: string; namespace: string },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<IsAuthorizedAddressForNamespaceReturn> {
      const resp = await wallet.callMethod(
        realm,
        'IsAuthorizedAddressForNamespace',
        [String(params.address_XXX), String(params.namespace)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(
          resp.deliver_tx.ResponseBase.Log ||
            JSON.stringify(resp.deliver_tx.ResponseBase.Error)
        );
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return parseGnoReturns(result) as IsAuthorizedAddressForNamespaceReturn;
    },
    async Enable(
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        'Enable',
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(
          resp.deliver_tx.ResponseBase.Log ||
            JSON.stringify(resp.deliver_tx.ResponseBase.Error)
        );
      }
    },
    async IsEnabled(
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<IsEnabledReturn> {
      const resp = await wallet.callMethod(
        realm,
        'IsEnabled',
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(
          resp.deliver_tx.ResponseBase.Log ||
            JSON.stringify(resp.deliver_tx.ResponseBase.Error)
        );
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return parseGnoReturns(result) as IsEnabledReturn;
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
    realm: { realms: { r: { sys: { names: new RealmModule(wallet) } } } },
  };
};

export default Realm;
