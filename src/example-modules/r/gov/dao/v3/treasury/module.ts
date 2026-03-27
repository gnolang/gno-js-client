import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/gov/dao/v3/treasury";

type HistoryReturn = [unknown];
type BalancesReturn = [unknown];
type AddressReturn = [string];
type HasBankerReturn = [boolean];
type ListBankerIDsReturn = [unknown];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
	return {
		async SetTokenKeys(params: { keys: unknown }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `SetTokenKeys(${params.keys})`, height);
		},
		async Send(height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Send()`, height);
		},
		async History(params: { bankerID: string; pageNumber: bigint; pageSize: bigint }, height?: number):Promise<HistoryReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `History("${params.bankerID}",${params.pageNumber},${params.pageSize})`, height);
			return parseGnoReturns(result) as HistoryReturn;
		},
		async Balances(params: { bankerID: string }, height?: number):Promise<BalancesReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Balances("${params.bankerID}")`, height);
			return parseGnoReturns(result) as BalancesReturn;
		},
		async Address(params: { bankerID: string }, height?: number):Promise<AddressReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Address("${params.bankerID}")`, height);
			return parseGnoReturns(result) as AddressReturn;
		},
		async HasBanker(params: { bankerID: string }, height?: number):Promise<HasBankerReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `HasBanker("${params.bankerID}")`, height);
			return parseGnoReturns(result) as HasBankerReturn;
		},
		async ListBankerIDs(height?: number):Promise<ListBankerIDsReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `ListBankerIDs()`, height);
			return parseGnoReturns(result) as ListBankerIDsReturn;
		},
		async Render(params: { path: string }, height?: number):Promise<RenderReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
			return parseGnoReturns(result) as RenderReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async SetTokenKeys(params: { keys: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"SetTokenKeys",
				[String(params.keys)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async Send(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"Send",
				[],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async History(params: { bankerID: string; pageNumber: bigint; pageSize: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<HistoryReturn> {
			const resp = await wallet.callMethod(
				realm,
				"History",
				[String(params.bankerID), String(params.pageNumber), String(params.pageSize)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as HistoryReturn;
		},
		async Balances(params: { bankerID: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<BalancesReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Balances",
				[String(params.bankerID)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as BalancesReturn;
		},
		async Address(params: { bankerID: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<AddressReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Address",
				[String(params.bankerID)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as AddressReturn;
		},
		async HasBanker(params: { bankerID: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<HasBankerReturn> {
			const resp = await wallet.callMethod(
				realm,
				"HasBanker",
				[String(params.bankerID)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as HasBankerReturn;
		},
		async ListBankerIDs(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<ListBankerIDsReturn> {
			const resp = await wallet.callMethod(
				realm,
				"ListBankerIDs",
				[],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as ListBankerIDsReturn;
		},
		async Render(params: { path: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<RenderReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Render",
				[String(params.path)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as RenderReturn;
		}
	}
}

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
		realm: { realms: { r: { gov: { dao: { v3: { treasury: new RealmModule(wallet) } } } } } }
	}
}

export default Realm;
