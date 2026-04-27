// Auto-generated module for gno.land/r/gnoland/wugnot — DO NOT EDIT
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

const realm = "gno.land/r/gnoland/wugnot";

type RenderReturn = [string];
type TotalSupplyReturn = [bigint];
type BalanceOfReturn = [bigint];
type AllowanceReturn = [bigint];

const queryClient = (wallet: GnoWallet) => {
  return {
    async Deposit(height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, "Deposit()", height);
      return;
    },
    async Withdraw(params: {
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Withdraw(${params.amount})`, height);
      return;
    },
    async Render(params: {
      path: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
    async TotalSupply(height?: number): Promise<TotalSupplyReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "TotalSupply()", height);
      return _parseGnoReturns(result) as TotalSupplyReturn;
    },
    async BalanceOf(params: {
      owner: string
    }, height?: number): Promise<BalanceOfReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `BalanceOf("${params.owner}")`, height);
      return _parseGnoReturns(result) as BalanceOfReturn;
    },
    async Allowance(params: {
      owner: string
      spender: string
    }, height?: number): Promise<AllowanceReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Allowance("${params.owner}","${params.spender}")`, height);
      return _parseGnoReturns(result) as AllowanceReturn;
    },
    async Transfer(params: {
      to: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Transfer("${params.to}",${params.amount})`, height);
      return;
    },
    async Approve(params: {
      spender: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Approve("${params.spender}",${params.amount})`, height);
      return;
    },
    async TransferFrom(params: {
      from: string
      to: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `TransferFrom("${params.from}","${params.to}",${params.amount})`, height);
      return;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async Deposit(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Deposit",
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
    async Withdraw(params: {
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Withdraw",
        [String(params.amount)],
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
    async TotalSupply(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<TotalSupplyReturn> {
      const resp = await wallet.callMethod(
        realm,
        "TotalSupply",
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
      return _parseGnoReturns(result) as TotalSupplyReturn;
    },
    async BalanceOf(params: {
      owner: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<BalanceOfReturn> {
      const resp = await wallet.callMethod(
        realm,
        "BalanceOf",
        [String(params.owner)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as BalanceOfReturn;
    },
    async Allowance(params: {
      owner: string
      spender: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<AllowanceReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Allowance",
        [String(params.owner), String(params.spender)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as AllowanceReturn;
    },
    async Transfer(params: {
      to: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Transfer",
        [String(params.to), String(params.amount)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Approve(params: {
      spender: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Approve",
        [String(params.spender), String(params.amount)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async TransferFrom(params: {
      from: string
      to: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "TransferFrom",
        [String(params.from), String(params.to), String(params.amount)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
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
          gnoland: {
            wugnot: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
