import { TransactionEndpoint, TxFee } from '@gnolang/tm2-js-client';
import { GnoWallet } from '@gnolang/gno-js-client';
import { parseGnoReturns } from '@gnolang/gno-js-client/bin/wallet/helpers';

const realm =
  'gno.land/r/g1hy6zry03hg5d8le9s2w4fxme6236hkgd928dun/boards2/permissions/v1';

type NewReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
  return {
    async SetAdmin(params: { admin: string }, height?: number): Promise<void> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `SetAdmin("${params.admin}")`, height);
    },
    async SetOpenAccountAmount(
      params: { amount: bigint },
      height?: number
    ): Promise<void> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `SetOpenAccountAmount(${params.amount})`,
          height
        );
    },
    async New(params: { owner: string }, height?: number): Promise<NewReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `New("${params.owner}")`, height);
      return parseGnoReturns(result) as NewReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async SetAdmin(
      params: { admin: string },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        'SetAdmin',
        [String(params.admin)],
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
    async SetOpenAccountAmount(
      params: { amount: bigint },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        'SetOpenAccountAmount',
        [String(params.amount)],
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
    async New(
      params: { owner: string },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewReturn> {
      const resp = await wallet.callMethod(
        realm,
        'New',
        [String(params.owner)],
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
      return parseGnoReturns(result) as NewReturn;
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
          g1hy6zry03hg5d8le9s2w4fxme6236hkgd928dun: {
            boards2: { permissions: { v1: new RealmModule(wallet) } },
          },
        },
      },
    },
  };
};

export default Realm;
