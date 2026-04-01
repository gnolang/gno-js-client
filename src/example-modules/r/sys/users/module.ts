// Auto-generated module for gno.land/r/sys/users — DO NOT EDIT
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

const realm = "gno.land/r/sys/users";

type ProposeNewControllerReturn = [unknown];
type ProposeControllerRemovalReturn = [unknown];
type ProposeControllerAdditionAndRemovalReturn = [unknown];
type NewErrNotWhitelistedReturn = [unknown];
type RenderReturn = [string];
type RegisterUserReturn = [unknown];
type ResolveNameReturn = [unknown, boolean];
type ResolveAddressReturn = [unknown];
type ResolveAnyReturn = [unknown, boolean];
type GetReadonlyAddrStoreReturn = [unknown];
type GetReadOnlyNameStoreReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
  return {
    async AddControllerAtGenesis(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AddControllerAtGenesis("${params.addr}")`, height);
      return;
    },
    async ProposeNewController(params: {
      addr: string
    }, height?: number): Promise<ProposeNewControllerReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ProposeNewController("${params.addr}")`, height);
      return _parseGnoReturns(result) as ProposeNewControllerReturn;
    },
    async ProposeControllerRemoval(params: {
      addr: string
    }, height?: number): Promise<ProposeControllerRemovalReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ProposeControllerRemoval("${params.addr}")`, height);
      return _parseGnoReturns(result) as ProposeControllerRemovalReturn;
    },
    async ProposeControllerAdditionAndRemoval(params: {
      toAdd: string
      toRemove: string
    }, height?: number): Promise<ProposeControllerAdditionAndRemovalReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ProposeControllerAdditionAndRemoval("${params.toAdd}","${params.toRemove}")`, height);
      return _parseGnoReturns(result) as ProposeControllerAdditionAndRemovalReturn;
    },
    async NewErrNotWhitelisted(height?: number): Promise<NewErrNotWhitelistedReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "NewErrNotWhitelisted()", height);
      return _parseGnoReturns(result) as NewErrNotWhitelistedReturn;
    },
    async Render(params: {
      arg_0: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.arg_0}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
    async RegisterUser(params: {
      name: string
      address_XXX: string
    }, height?: number): Promise<RegisterUserReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `RegisterUser("${params.name}","${params.address_XXX}")`, height);
      return _parseGnoReturns(result) as RegisterUserReturn;
    },
    async ResolveName(params: {
      name: string
    }, height?: number): Promise<ResolveNameReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ResolveName("${params.name}")`, height);
      return _parseGnoReturns(result) as ResolveNameReturn;
    },
    async ResolveAddress(params: {
      addr: string
    }, height?: number): Promise<ResolveAddressReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ResolveAddress("${params.addr}")`, height);
      return _parseGnoReturns(result) as ResolveAddressReturn;
    },
    async ResolveAny(params: {
      input: string
    }, height?: number): Promise<ResolveAnyReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ResolveAny("${params.input}")`, height);
      return _parseGnoReturns(result) as ResolveAnyReturn;
    },
    async GetReadonlyAddrStore(height?: number): Promise<GetReadonlyAddrStoreReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetReadonlyAddrStore()", height);
      return _parseGnoReturns(result) as GetReadonlyAddrStoreReturn;
    },
    async GetReadOnlyNameStore(height?: number): Promise<GetReadOnlyNameStoreReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetReadOnlyNameStore()", height);
      return _parseGnoReturns(result) as GetReadOnlyNameStoreReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async AddControllerAtGenesis(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AddControllerAtGenesis",
        [String(params.addr)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async ProposeNewController(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ProposeNewControllerReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ProposeNewController",
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
      return _parseGnoReturns(result) as ProposeNewControllerReturn;
    },
    async ProposeControllerRemoval(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ProposeControllerRemovalReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ProposeControllerRemoval",
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
      return _parseGnoReturns(result) as ProposeControllerRemovalReturn;
    },
    async ProposeControllerAdditionAndRemoval(params: {
      toAdd: string
      toRemove: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ProposeControllerAdditionAndRemovalReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ProposeControllerAdditionAndRemoval",
        [String(params.toAdd), String(params.toRemove)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as ProposeControllerAdditionAndRemovalReturn;
    },
    async NewErrNotWhitelisted(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewErrNotWhitelistedReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewErrNotWhitelisted",
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
      return _parseGnoReturns(result) as NewErrNotWhitelistedReturn;
    },
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
    async RegisterUser(params: {
      name: string
      address_XXX: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<RegisterUserReturn> {
      const resp = await wallet.callMethod(
        realm,
        "RegisterUser",
        [String(params.name), String(params.address_XXX)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as RegisterUserReturn;
    },
    async ResolveName(params: {
      name: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ResolveNameReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ResolveName",
        [String(params.name)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as ResolveNameReturn;
    },
    async ResolveAddress(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ResolveAddressReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ResolveAddress",
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
      return _parseGnoReturns(result) as ResolveAddressReturn;
    },
    async ResolveAny(params: {
      input: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ResolveAnyReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ResolveAny",
        [String(params.input)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as ResolveAnyReturn;
    },
    async GetReadonlyAddrStore(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetReadonlyAddrStoreReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetReadonlyAddrStore",
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
      return _parseGnoReturns(result) as GetReadonlyAddrStoreReturn;
    },
    async GetReadOnlyNameStore(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetReadOnlyNameStoreReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetReadOnlyNameStore",
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
      return _parseGnoReturns(result) as GetReadOnlyNameStoreReturn;
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
            users: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
