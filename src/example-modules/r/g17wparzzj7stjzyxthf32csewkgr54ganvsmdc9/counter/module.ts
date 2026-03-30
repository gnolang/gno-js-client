import { TransactionEndpoint, TxFee } from '@gnolang/tm2-js-client';
import { GnoWallet } from '@gnolang/gno-js-client';
import { parseGnoReturns } from '@gnolang/gno-js-client/bin/wallet/helpers';

const realm = 'gno.land/r/g17wparzzj7stjzyxthf32csewkgr54ganvsmdc9/counter';

type IncrementReturn = [bigint];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async Increment(
      params: { change: bigint },
      height?: number
    ): Promise<IncrementReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `Increment(${params.change})`, height);
      return parseGnoReturns(result) as IncrementReturn;
    },
    async Render(
      params: { arg_0: string },
      height?: number
    ): Promise<RenderReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `Render("${params.arg_0}")`, height);
      return parseGnoReturns(result) as RenderReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Increment(
      params: { change: bigint },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<IncrementReturn> {
      const resp = await wallet.callMethod(
        realm,
        'Increment',
        [String(params.change)],
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
      return parseGnoReturns(result) as IncrementReturn;
    },
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
          g17wparzzj7stjzyxthf32csewkgr54ganvsmdc9: {
            counter: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
