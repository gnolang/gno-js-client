import { TransactionEndpoint, TxFee } from '@gnolang/tm2-js-client';
import { GnoWallet } from '@gnolang/gno-js-client';
import { parseGnoReturns } from '@gnolang/gno-js-client/bin/wallet/helpers';

const realm = 'gno.land/r/sys/params';

type NewSetFeeCollectorRequestReturn = [unknown];
type NewSysParamStringPropRequestReturn = [unknown];
type NewSysParamInt64PropRequestReturn = [unknown];
type NewSysParamUint64PropRequestReturn = [unknown];
type NewSysParamBoolPropRequestReturn = [unknown];
type NewSysParamBytesPropRequestReturn = [unknown];
type NewSysParamStringsPropRequestReturn = [unknown];
type NewSysParamStringsPropRequestWithTitleReturn = [unknown];
type NewSysParamStringsPropRequestAddWithTitleReturn = [unknown];
type NewSysParamStringsPropRequestRemoveWithTitleReturn = [unknown];
type ProposeUnlockTransferRequestReturn = [unknown];
type ProposeLockTransferRequestReturn = [unknown];
type ProposeAddUnrestrictedAcctsRequestReturn = [unknown];
type ProposeRemoveUnrestrictedAcctsRequestReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
  return {
    async NewSetFeeCollectorRequest(
      params: { addr: string },
      height?: number
    ): Promise<NewSetFeeCollectorRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSetFeeCollectorRequest("${params.addr}")`,
          height
        );
      return parseGnoReturns(result) as NewSetFeeCollectorRequestReturn;
    },
    async NewSysParamStringPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: string;
      },
      height?: number
    ): Promise<NewSysParamStringPropRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamStringPropRequest("${params.module}","${params.submodule}","${params.name}","${params.value}")`,
          height
        );
      return parseGnoReturns(result) as NewSysParamStringPropRequestReturn;
    },
    async NewSysParamInt64PropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: bigint;
      },
      height?: number
    ): Promise<NewSysParamInt64PropRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamInt64PropRequest("${params.module}","${params.submodule}","${params.name}",${params.value})`,
          height
        );
      return parseGnoReturns(result) as NewSysParamInt64PropRequestReturn;
    },
    async NewSysParamUint64PropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: bigint;
      },
      height?: number
    ): Promise<NewSysParamUint64PropRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamUint64PropRequest("${params.module}","${params.submodule}","${params.name}",${params.value})`,
          height
        );
      return parseGnoReturns(result) as NewSysParamUint64PropRequestReturn;
    },
    async NewSysParamBoolPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: boolean;
      },
      height?: number
    ): Promise<NewSysParamBoolPropRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamBoolPropRequest("${params.module}","${params.submodule}","${params.name}",${params.value})`,
          height
        );
      return parseGnoReturns(result) as NewSysParamBoolPropRequestReturn;
    },
    async NewSysParamBytesPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: unknown;
      },
      height?: number
    ): Promise<NewSysParamBytesPropRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamBytesPropRequest("${params.module}","${params.submodule}","${params.name}",${params.value})`,
          height
        );
      return parseGnoReturns(result) as NewSysParamBytesPropRequestReturn;
    },
    async NewSysParamStringsPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: unknown;
      },
      height?: number
    ): Promise<NewSysParamStringsPropRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamStringsPropRequest("${params.module}","${params.submodule}","${params.name}",${params.value})`,
          height
        );
      return parseGnoReturns(result) as NewSysParamStringsPropRequestReturn;
    },
    async NewSysParamStringsPropRequestWithTitle(
      params: {
        module: string;
        submodule: string;
        name: string;
        title: string;
        value: unknown;
      },
      height?: number
    ): Promise<NewSysParamStringsPropRequestWithTitleReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamStringsPropRequestWithTitle("${params.module}","${params.submodule}","${params.name}","${params.title}",${params.value})`,
          height
        );
      return parseGnoReturns(
        result
      ) as NewSysParamStringsPropRequestWithTitleReturn;
    },
    async NewSysParamStringsPropRequestAddWithTitle(
      params: {
        module: string;
        submodule: string;
        name: string;
        title: string;
        value: unknown;
      },
      height?: number
    ): Promise<NewSysParamStringsPropRequestAddWithTitleReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamStringsPropRequestAddWithTitle("${params.module}","${params.submodule}","${params.name}","${params.title}",${params.value})`,
          height
        );
      return parseGnoReturns(
        result
      ) as NewSysParamStringsPropRequestAddWithTitleReturn;
    },
    async NewSysParamStringsPropRequestRemoveWithTitle(
      params: {
        module: string;
        submodule: string;
        name: string;
        title: string;
        value: unknown;
      },
      height?: number
    ): Promise<NewSysParamStringsPropRequestRemoveWithTitleReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `NewSysParamStringsPropRequestRemoveWithTitle("${params.module}","${params.submodule}","${params.name}","${params.title}",${params.value})`,
          height
        );
      return parseGnoReturns(
        result
      ) as NewSysParamStringsPropRequestRemoveWithTitleReturn;
    },
    async ProposeUnlockTransferRequest(
      height?: number
    ): Promise<ProposeUnlockTransferRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `ProposeUnlockTransferRequest()`, height);
      return parseGnoReturns(result) as ProposeUnlockTransferRequestReturn;
    },
    async ProposeLockTransferRequest(
      height?: number
    ): Promise<ProposeLockTransferRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(realm, `ProposeLockTransferRequest()`, height);
      return parseGnoReturns(result) as ProposeLockTransferRequestReturn;
    },
    async ProposeAddUnrestrictedAcctsRequest(
      params: { addrs: unknown },
      height?: number
    ): Promise<ProposeAddUnrestrictedAcctsRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `ProposeAddUnrestrictedAcctsRequest(${params.addrs})`,
          height
        );
      return parseGnoReturns(
        result
      ) as ProposeAddUnrestrictedAcctsRequestReturn;
    },
    async ProposeRemoveUnrestrictedAcctsRequest(
      params: { addrs: unknown },
      height?: number
    ): Promise<ProposeRemoveUnrestrictedAcctsRequestReturn> {
      const result = await wallet
        .getProvider()
        .evaluateExpression(
          realm,
          `ProposeRemoveUnrestrictedAcctsRequest(${params.addrs})`,
          height
        );
      return parseGnoReturns(
        result
      ) as ProposeRemoveUnrestrictedAcctsRequestReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async NewSetFeeCollectorRequest(
      params: { addr: string },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSetFeeCollectorRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSetFeeCollectorRequest',
        [String(params.addr)],
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
      return parseGnoReturns(result) as NewSetFeeCollectorRequestReturn;
    },
    async NewSysParamStringPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: string;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamStringPropRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamStringPropRequest',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.value),
        ],
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
      return parseGnoReturns(result) as NewSysParamStringPropRequestReturn;
    },
    async NewSysParamInt64PropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: bigint;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamInt64PropRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamInt64PropRequest',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.value),
        ],
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
      return parseGnoReturns(result) as NewSysParamInt64PropRequestReturn;
    },
    async NewSysParamUint64PropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: bigint;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamUint64PropRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamUint64PropRequest',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.value),
        ],
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
      return parseGnoReturns(result) as NewSysParamUint64PropRequestReturn;
    },
    async NewSysParamBoolPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: boolean;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamBoolPropRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamBoolPropRequest',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.value),
        ],
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
      return parseGnoReturns(result) as NewSysParamBoolPropRequestReturn;
    },
    async NewSysParamBytesPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: unknown;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamBytesPropRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamBytesPropRequest',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.value),
        ],
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
      return parseGnoReturns(result) as NewSysParamBytesPropRequestReturn;
    },
    async NewSysParamStringsPropRequest(
      params: {
        module: string;
        submodule: string;
        name: string;
        value: unknown;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamStringsPropRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamStringsPropRequest',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.value),
        ],
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
      return parseGnoReturns(result) as NewSysParamStringsPropRequestReturn;
    },
    async NewSysParamStringsPropRequestWithTitle(
      params: {
        module: string;
        submodule: string;
        name: string;
        title: string;
        value: unknown;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamStringsPropRequestWithTitleReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamStringsPropRequestWithTitle',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.title),
          String(params.value),
        ],
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
      return parseGnoReturns(
        result
      ) as NewSysParamStringsPropRequestWithTitleReturn;
    },
    async NewSysParamStringsPropRequestAddWithTitle(
      params: {
        module: string;
        submodule: string;
        name: string;
        title: string;
        value: unknown;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamStringsPropRequestAddWithTitleReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamStringsPropRequestAddWithTitle',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.title),
          String(params.value),
        ],
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
      return parseGnoReturns(
        result
      ) as NewSysParamStringsPropRequestAddWithTitleReturn;
    },
    async NewSysParamStringsPropRequestRemoveWithTitle(
      params: {
        module: string;
        submodule: string;
        name: string;
        title: string;
        value: unknown;
      },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<NewSysParamStringsPropRequestRemoveWithTitleReturn> {
      const resp = await wallet.callMethod(
        realm,
        'NewSysParamStringsPropRequestRemoveWithTitle',
        [
          String(params.module),
          String(params.submodule),
          String(params.name),
          String(params.title),
          String(params.value),
        ],
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
      return parseGnoReturns(
        result
      ) as NewSysParamStringsPropRequestRemoveWithTitleReturn;
    },
    async ProposeUnlockTransferRequest(
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<ProposeUnlockTransferRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'ProposeUnlockTransferRequest',
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
      return parseGnoReturns(result) as ProposeUnlockTransferRequestReturn;
    },
    async ProposeLockTransferRequest(
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<ProposeLockTransferRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'ProposeLockTransferRequest',
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
      return parseGnoReturns(result) as ProposeLockTransferRequestReturn;
    },
    async ProposeAddUnrestrictedAcctsRequest(
      params: { addrs: unknown },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<ProposeAddUnrestrictedAcctsRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'ProposeAddUnrestrictedAcctsRequest',
        [String(params.addrs)],
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
      return parseGnoReturns(
        result
      ) as ProposeAddUnrestrictedAcctsRequestReturn;
    },
    async ProposeRemoveUnrestrictedAcctsRequest(
      params: { addrs: unknown },
      funds: Map<string, number>,
      maxDeposit: Map<string, number>,
      fee: TxFee
    ): Promise<ProposeRemoveUnrestrictedAcctsRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        'ProposeRemoveUnrestrictedAcctsRequest',
        [String(params.addrs)],
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
      return parseGnoReturns(
        result
      ) as ProposeRemoveUnrestrictedAcctsRequestReturn;
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
    realm: { realms: { r: { sys: { params: new RealmModule(wallet) } } } },
  };
};

export default Realm;
