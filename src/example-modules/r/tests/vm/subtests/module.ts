import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/tests/vm/subtests";

type GetCurrentRealmReturn = [unknown];
type GetPreviousRealmReturn = [unknown];
type CallIsOriginCallReturn = [boolean];

const queryClient = (wallet: GnoWallet) => {
	return {
		async GetCurrentRealm(height?: number):Promise<GetCurrentRealmReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetCurrentRealm()`, height);
			return parseGnoReturns(result) as GetCurrentRealmReturn;
		},
		async GetPreviousRealm(height?: number):Promise<GetPreviousRealmReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetPreviousRealm()`, height);
			return parseGnoReturns(result) as GetPreviousRealmReturn;
		},
		async Exec(params: { fn: unknown }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Exec(${params.fn})`, height);
		},
		async CallAssertOriginCall(height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `CallAssertOriginCall()`, height);
		},
		async CallIsOriginCall(height?: number):Promise<CallIsOriginCallReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `CallIsOriginCall()`, height);
			return parseGnoReturns(result) as CallIsOriginCallReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async GetCurrentRealm(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetCurrentRealmReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetCurrentRealm",
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
			return parseGnoReturns(result) as GetCurrentRealmReturn;
		},
		async GetPreviousRealm(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetPreviousRealmReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetPreviousRealm",
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
			return parseGnoReturns(result) as GetPreviousRealmReturn;
		},
		async Exec(params: { fn: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"Exec",
				[String(params.fn)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async CallAssertOriginCall(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"CallAssertOriginCall",
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
		async CallIsOriginCall(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<CallIsOriginCallReturn> {
			const resp = await wallet.callMethod(
				realm,
				"CallIsOriginCall",
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
			return parseGnoReturns(result) as CallIsOriginCallReturn;
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
		realm: { realms: { r: { tests: { vm: { subtests: new RealmModule(wallet) } } } } }
	}
}

export default Realm;
