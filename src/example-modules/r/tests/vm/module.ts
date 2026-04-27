// Auto-generated module for gno.land/r/tests/vm — DO NOT EDIT
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

const realm = "gno.land/r/tests/vm";

type RenderReturn = [string];
type GetZeroTypeReturn = [unknown];
type GetAbsReturn = [unknown];
type AbsAddReturn = [unknown];
type CounterReturn = [bigint];
type CurrentRealmPathReturn = [string];
type InitOriginCallerReturn = [string];
type CallIsOriginCallReturn = [boolean];
type CallSubtestsIsOriginCallReturn = [boolean];
type GetPreviousRealmReturn = [unknown];
type GetRSubtestsPreviousRealmReturn = [unknown];
type IsCallerSubPathReturn = [boolean];
type IsCallerParentPathReturn = [boolean];
type HasCallerSameNamespaceReturn = [boolean];

const queryClient = (wallet: GnoWallet) => {
  return {
    async AddStringer(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "AddStringer()", height);
      return;
    },
    async Render(params: {
      path: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
    async GetZeroType(height?: number): Promise<GetZeroTypeReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetZeroType()", height);
      return _parseGnoReturns(result) as GetZeroTypeReturn;
    },
    async GetAbs(height?: number): Promise<GetAbsReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetAbs()", height);
      return _parseGnoReturns(result) as GetAbsReturn;
    },
    async AbsAdd(height?: number): Promise<AbsAddReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "AbsAdd()", height);
      return _parseGnoReturns(result) as AbsAddReturn;
    },
    async IncCounter(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "IncCounter()", height);
      return;
    },
    async Counter(height?: number): Promise<CounterReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "Counter()", height);
      return _parseGnoReturns(result) as CounterReturn;
    },
    async CurrentRealmPath(height?: number): Promise<CurrentRealmPathReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "CurrentRealmPath()", height);
      return _parseGnoReturns(result) as CurrentRealmPathReturn;
    },
    async InitOriginCaller(height?: number): Promise<InitOriginCallerReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "InitOriginCaller()", height);
      return _parseGnoReturns(result) as InitOriginCallerReturn;
    },
    async CallAssertOriginCall(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "CallAssertOriginCall()", height);
      return;
    },
    async CallIsOriginCall(height?: number): Promise<CallIsOriginCallReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "CallIsOriginCall()", height);
      return _parseGnoReturns(result) as CallIsOriginCallReturn;
    },
    async CallSubtestsAssertOriginCall(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "CallSubtestsAssertOriginCall()", height);
      return;
    },
    async CallSubtestsIsOriginCall(height?: number): Promise<CallSubtestsIsOriginCallReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "CallSubtestsIsOriginCall()", height);
      return _parseGnoReturns(result) as CallSubtestsIsOriginCallReturn;
    },
    async ModifyTestRealmObject(params: {
      t: unknown
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModifyTestRealmObject(${params.t})`, height);
      return;
    },
    async InitTestNodes(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "InitTestNodes()", height);
      return;
    },
    async ModTestNodes(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "ModTestNodes()", height);
      return;
    },
    async PrintTestNodes(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "PrintTestNodes()", height);
      return;
    },
    async GetPreviousRealm(height?: number): Promise<GetPreviousRealmReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetPreviousRealm()", height);
      return _parseGnoReturns(result) as GetPreviousRealmReturn;
    },
    async GetRSubtestsPreviousRealm(height?: number): Promise<GetRSubtestsPreviousRealmReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetRSubtestsPreviousRealm()", height);
      return _parseGnoReturns(result) as GetRSubtestsPreviousRealmReturn;
    },
    async Exec(params: {
      fn: unknown
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Exec(${params.fn})`, height);
      return;
    },
    async ExecSwitch(params: {
      fn: unknown
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ExecSwitch(${params.fn})`, height);
      return;
    },
    async IsCallerSubPath(height?: number): Promise<IsCallerSubPathReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "IsCallerSubPath()", height);
      return _parseGnoReturns(result) as IsCallerSubPathReturn;
    },
    async IsCallerParentPath(height?: number): Promise<IsCallerParentPathReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "IsCallerParentPath()", height);
      return _parseGnoReturns(result) as IsCallerParentPathReturn;
    },
    async HasCallerSameNamespace(height?: number): Promise<HasCallerSameNamespaceReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "HasCallerSameNamespace()", height);
      return _parseGnoReturns(result) as HasCallerSameNamespaceReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async AddStringer(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AddStringer",
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
    async GetZeroType(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetZeroTypeReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetZeroType",
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
      return _parseGnoReturns(result) as GetZeroTypeReturn;
    },
    async GetAbs(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetAbsReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetAbs",
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
      return _parseGnoReturns(result) as GetAbsReturn;
    },
    async AbsAdd(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<AbsAddReturn> {
      const resp = await wallet.callMethod(
        realm,
        "AbsAdd",
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
      return _parseGnoReturns(result) as AbsAddReturn;
    },
    async IncCounter(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "IncCounter",
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
    async Counter(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CounterReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Counter",
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
      return _parseGnoReturns(result) as CounterReturn;
    },
    async CurrentRealmPath(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CurrentRealmPathReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CurrentRealmPath",
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
      return _parseGnoReturns(result) as CurrentRealmPathReturn;
    },
    async InitOriginCaller(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<InitOriginCallerReturn> {
      const resp = await wallet.callMethod(
        realm,
        "InitOriginCaller",
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
      return _parseGnoReturns(result) as InitOriginCallerReturn;
    },
    async CallAssertOriginCall(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "CallAssertOriginCall",
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
    async CallIsOriginCall(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CallIsOriginCallReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CallIsOriginCall",
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
      return _parseGnoReturns(result) as CallIsOriginCallReturn;
    },
    async CallSubtestsAssertOriginCall(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "CallSubtestsAssertOriginCall",
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
    async CallSubtestsIsOriginCall(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CallSubtestsIsOriginCallReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CallSubtestsIsOriginCall",
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
      return _parseGnoReturns(result) as CallSubtestsIsOriginCallReturn;
    },
    async ModifyTestRealmObject(params: {
      t: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModifyTestRealmObject",
        [String(params.t)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async InitTestNodes(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "InitTestNodes",
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
    async ModTestNodes(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModTestNodes",
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
    async PrintTestNodes(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "PrintTestNodes",
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
    async GetPreviousRealm(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetPreviousRealmReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetPreviousRealm",
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
      return _parseGnoReturns(result) as GetPreviousRealmReturn;
    },
    async GetRSubtestsPreviousRealm(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetRSubtestsPreviousRealmReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetRSubtestsPreviousRealm",
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
      return _parseGnoReturns(result) as GetRSubtestsPreviousRealmReturn;
    },
    async Exec(params: {
      fn: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Exec",
        [String(params.fn)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async ExecSwitch(params: {
      fn: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ExecSwitch",
        [String(params.fn)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IsCallerSubPath(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsCallerSubPathReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsCallerSubPath",
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
      return _parseGnoReturns(result) as IsCallerSubPathReturn;
    },
    async IsCallerParentPath(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsCallerParentPathReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsCallerParentPath",
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
      return _parseGnoReturns(result) as IsCallerParentPathReturn;
    },
    async HasCallerSameNamespace(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<HasCallerSameNamespaceReturn> {
      const resp = await wallet.callMethod(
        realm,
        "HasCallerSameNamespace",
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
      return _parseGnoReturns(result) as HasCallerSameNamespaceReturn;
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
          tests: {
            vm: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
