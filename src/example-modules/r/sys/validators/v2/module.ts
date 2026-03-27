import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/sys/validators/v2";

type GetChangesReturn = [unknown];
type NewPropRequestReturn = [unknown];
type IsValidatorReturn = [boolean];
type GetValidatorReturn = [unknown];
type GetValidatorsReturn = [unknown];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
	return {
		async GetChanges(params: { from: bigint }, height?: number):Promise<GetChangesReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetChanges(${params.from})`, height);
			return parseGnoReturns(result) as GetChangesReturn;
		},
		async NewPropRequest(params: { changesFn: unknown; title: string; description: string }, height?: number):Promise<NewPropRequestReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewPropRequest(${params.changesFn},"${params.title}","${params.description}")`, height);
			return parseGnoReturns(result) as NewPropRequestReturn;
		},
		async IsValidator(params: { addr: string }, height?: number):Promise<IsValidatorReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `IsValidator("${params.addr}")`, height);
			return parseGnoReturns(result) as IsValidatorReturn;
		},
		async GetValidator(params: { addr: string }, height?: number):Promise<GetValidatorReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetValidator("${params.addr}")`, height);
			return parseGnoReturns(result) as GetValidatorReturn;
		},
		async GetValidators(height?: number):Promise<GetValidatorsReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetValidators()`, height);
			return parseGnoReturns(result) as GetValidatorsReturn;
		},
		async Render(params: { arg_0: string }, height?: number):Promise<RenderReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.arg_0}")`, height);
			return parseGnoReturns(result) as RenderReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async GetChanges(params: { from: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetChangesReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetChanges",
				[String(params.from)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as GetChangesReturn;
		},
		async NewPropRequest(params: { changesFn: unknown; title: string; description: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewPropRequestReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewPropRequest",
				[String(params.changesFn), String(params.title), String(params.description)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewPropRequestReturn;
		},
		async IsValidator(params: { addr: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<IsValidatorReturn> {
			const resp = await wallet.callMethod(
				realm,
				"IsValidator",
				[String(params.addr)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as IsValidatorReturn;
		},
		async GetValidator(params: { addr: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetValidatorReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetValidator",
				[String(params.addr)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as GetValidatorReturn;
		},
		async GetValidators(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetValidatorsReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetValidators",
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
			return parseGnoReturns(result) as GetValidatorsReturn;
		},
		async Render(params: { arg_0: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<RenderReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Render",
				[String(params.arg_0)],
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
		realm: { realms: { r: { sys: { validators: { v2: new RealmModule(wallet) } } } } }
	}
}

export default Realm;
