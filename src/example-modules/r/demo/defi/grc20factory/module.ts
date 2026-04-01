// Auto-generated module for gno.land/r/demo/defi/grc20factory — DO NOT EDIT
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

const realm = "gno.land/r/demo/defi/grc20factory";

type BankReturn = [unknown];
type TotalSupplyReturn = [bigint];
type HasAddrReturn = [boolean];
type BalanceOfReturn = [bigint];
type AllowanceReturn = [bigint];
type ListTokensReturn = [unknown];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async New(params: {
      name: string
      symbol: string
      decimals: bigint
      initialMint: bigint
      faucet: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `New("${params.name}","${params.symbol}",${params.decimals},${params.initialMint},${params.faucet})`, height);
      return;
    },
    async NewWithAdmin(params: {
      name: string
      symbol: string
      decimals: bigint
      initialMint: bigint
      faucet: bigint
      admin: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `NewWithAdmin("${params.name}","${params.symbol}",${params.decimals},${params.initialMint},${params.faucet},"${params.admin}")`, height);
      return;
    },
    async Bank(params: {
      symbol: string
    }, height?: number): Promise<BankReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Bank("${params.symbol}")`, height);
      return _parseGnoReturns(result) as BankReturn;
    },
    async TotalSupply(params: {
      symbol: string
    }, height?: number): Promise<TotalSupplyReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `TotalSupply("${params.symbol}")`, height);
      return _parseGnoReturns(result) as TotalSupplyReturn;
    },
    async HasAddr(params: {
      symbol: string
      owner: string
    }, height?: number): Promise<HasAddrReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `HasAddr("${params.symbol}","${params.owner}")`, height);
      return _parseGnoReturns(result) as HasAddrReturn;
    },
    async BalanceOf(params: {
      symbol: string
      owner: string
    }, height?: number): Promise<BalanceOfReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `BalanceOf("${params.symbol}","${params.owner}")`, height);
      return _parseGnoReturns(result) as BalanceOfReturn;
    },
    async Allowance(params: {
      symbol: string
      owner: string
      spender: string
    }, height?: number): Promise<AllowanceReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Allowance("${params.symbol}","${params.owner}","${params.spender}")`, height);
      return _parseGnoReturns(result) as AllowanceReturn;
    },
    async Transfer(params: {
      symbol: string
      to: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Transfer("${params.symbol}","${params.to}",${params.amount})`, height);
      return;
    },
    async Approve(params: {
      symbol: string
      spender: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Approve("${params.symbol}","${params.spender}",${params.amount})`, height);
      return;
    },
    async TransferFrom(params: {
      symbol: string
      from: string
      to: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `TransferFrom("${params.symbol}","${params.from}","${params.to}",${params.amount})`, height);
      return;
    },
    async Faucet(params: {
      symbol: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Faucet("${params.symbol}")`, height);
      return;
    },
    async Mint(params: {
      symbol: string
      to: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Mint("${params.symbol}","${params.to}",${params.amount})`, height);
      return;
    },
    async Burn(params: {
      symbol: string
      from: string
      amount: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Burn("${params.symbol}","${params.from}",${params.amount})`, height);
      return;
    },
    async DropInstanceOwnership(params: {
      symbol: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `DropInstanceOwnership("${params.symbol}")`, height);
      return;
    },
    async TransferInstanceOwnership(params: {
      symbol: string
      newOwner: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `TransferInstanceOwnership("${params.symbol}","${params.newOwner}")`, height);
      return;
    },
    async ListTokens(params: {
      pageNumber: bigint
      pageSize: bigint
    }, height?: number): Promise<ListTokensReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `ListTokens(${params.pageNumber},${params.pageSize})`, height);
      return _parseGnoReturns(result) as ListTokensReturn;
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
    async New(params: {
      name: string
      symbol: string
      decimals: bigint
      initialMint: bigint
      faucet: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "New",
        [String(params.name), String(params.symbol), String(params.decimals), String(params.initialMint), String(params.faucet)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async NewWithAdmin(params: {
      name: string
      symbol: string
      decimals: bigint
      initialMint: bigint
      faucet: bigint
      admin: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "NewWithAdmin",
        [String(params.name), String(params.symbol), String(params.decimals), String(params.initialMint), String(params.faucet), String(params.admin)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Bank(params: {
      symbol: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<BankReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Bank",
        [String(params.symbol)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as BankReturn;
    },
    async TotalSupply(params: {
      symbol: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<TotalSupplyReturn> {
      const resp = await wallet.callMethod(
        realm,
        "TotalSupply",
        [String(params.symbol)],
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
    async HasAddr(params: {
      symbol: string
      owner: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<HasAddrReturn> {
      const resp = await wallet.callMethod(
        realm,
        "HasAddr",
        [String(params.symbol), String(params.owner)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as HasAddrReturn;
    },
    async BalanceOf(params: {
      symbol: string
      owner: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<BalanceOfReturn> {
      const resp = await wallet.callMethod(
        realm,
        "BalanceOf",
        [String(params.symbol), String(params.owner)],
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
      symbol: string
      owner: string
      spender: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<AllowanceReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Allowance",
        [String(params.symbol), String(params.owner), String(params.spender)],
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
      symbol: string
      to: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Transfer",
        [String(params.symbol), String(params.to), String(params.amount)],
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
      symbol: string
      spender: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Approve",
        [String(params.symbol), String(params.spender), String(params.amount)],
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
      symbol: string
      from: string
      to: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "TransferFrom",
        [String(params.symbol), String(params.from), String(params.to), String(params.amount)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Faucet(params: {
      symbol: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Faucet",
        [String(params.symbol)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Mint(params: {
      symbol: string
      to: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Mint",
        [String(params.symbol), String(params.to), String(params.amount)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Burn(params: {
      symbol: string
      from: string
      amount: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Burn",
        [String(params.symbol), String(params.from), String(params.amount)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async DropInstanceOwnership(params: {
      symbol: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "DropInstanceOwnership",
        [String(params.symbol)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async TransferInstanceOwnership(params: {
      symbol: string
      newOwner: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "TransferInstanceOwnership",
        [String(params.symbol), String(params.newOwner)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async ListTokens(params: {
      pageNumber: bigint
      pageSize: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<ListTokensReturn> {
      const resp = await wallet.callMethod(
        realm,
        "ListTokens",
        [String(params.pageNumber), String(params.pageSize)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as ListTokensReturn;
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
          demo: {
            defi: {
              grc20factory: new RealmModule(wallet),
            },
          },
        },
      },
    },
  };
};

export default Realm;
