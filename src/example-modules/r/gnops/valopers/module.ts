import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/gnops/valopers";

type AuthReturn = [unknown];
type NewInstructionsProposalCallbackReturn = [unknown];
type NewMinFeeProposalCallbackReturn = [unknown];
type GetByAddrReturn = [unknown];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
	return {
		async Auth(height?: number):Promise<AuthReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Auth()`, height);
			return parseGnoReturns(result) as AuthReturn;
		},
		async NewInstructionsProposalCallback(params: { newInstructions: string }, height?: number):Promise<NewInstructionsProposalCallbackReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewInstructionsProposalCallback("${params.newInstructions}")`, height);
			return parseGnoReturns(result) as NewInstructionsProposalCallbackReturn;
		},
		async NewMinFeeProposalCallback(params: { newMinFee: bigint }, height?: number):Promise<NewMinFeeProposalCallbackReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewMinFeeProposalCallback(${params.newMinFee})`, height);
			return parseGnoReturns(result) as NewMinFeeProposalCallbackReturn;
		},
		async AddToAuthList(params: { address_XXX: string; member: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `AddToAuthList("${params.address_XXX}","${params.member}")`, height);
		},
		async DeleteFromAuthList(params: { address_XXX: string; member: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `DeleteFromAuthList("${params.address_XXX}","${params.member}")`, height);
		},
		async Register(params: { moniker: string; description: string; serverType: string; address_XXX: string; pubKey: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Register("${params.moniker}","${params.description}","${params.serverType}","${params.address_XXX}","${params.pubKey}")`, height);
		},
		async UpdateMoniker(params: { address_XXX: string; moniker: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `UpdateMoniker("${params.address_XXX}","${params.moniker}")`, height);
		},
		async UpdateDescription(params: { address_XXX: string; description: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `UpdateDescription("${params.address_XXX}","${params.description}")`, height);
		},
		async UpdateKeepRunning(params: { address_XXX: string; keepRunning: boolean }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `UpdateKeepRunning("${params.address_XXX}",${params.keepRunning})`, height);
		},
		async UpdateServerType(params: { address_XXX: string; serverType: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `UpdateServerType("${params.address_XXX}","${params.serverType}")`, height);
		},
		async GetByAddr(params: { address_XXX: string }, height?: number):Promise<GetByAddrReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetByAddr("${params.address_XXX}")`, height);
			return parseGnoReturns(result) as GetByAddrReturn;
		},
		async Render(params: { fullPath: string }, height?: number):Promise<RenderReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.fullPath}")`, height);
			return parseGnoReturns(result) as RenderReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async Auth(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<AuthReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Auth",
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
			return parseGnoReturns(result) as AuthReturn;
		},
		async NewInstructionsProposalCallback(params: { newInstructions: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewInstructionsProposalCallbackReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewInstructionsProposalCallback",
				[String(params.newInstructions)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewInstructionsProposalCallbackReturn;
		},
		async NewMinFeeProposalCallback(params: { newMinFee: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewMinFeeProposalCallbackReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewMinFeeProposalCallback",
				[String(params.newMinFee)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewMinFeeProposalCallbackReturn;
		},
		async AddToAuthList(params: { address_XXX: string; member: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"AddToAuthList",
				[String(params.address_XXX), String(params.member)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async DeleteFromAuthList(params: { address_XXX: string; member: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"DeleteFromAuthList",
				[String(params.address_XXX), String(params.member)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async Register(params: { moniker: string; description: string; serverType: string; address_XXX: string; pubKey: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"Register",
				[String(params.moniker), String(params.description), String(params.serverType), String(params.address_XXX), String(params.pubKey)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async UpdateMoniker(params: { address_XXX: string; moniker: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"UpdateMoniker",
				[String(params.address_XXX), String(params.moniker)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async UpdateDescription(params: { address_XXX: string; description: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"UpdateDescription",
				[String(params.address_XXX), String(params.description)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async UpdateKeepRunning(params: { address_XXX: string; keepRunning: boolean }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"UpdateKeepRunning",
				[String(params.address_XXX), String(params.keepRunning)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async UpdateServerType(params: { address_XXX: string; serverType: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"UpdateServerType",
				[String(params.address_XXX), String(params.serverType)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async GetByAddr(params: { address_XXX: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetByAddrReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetByAddr",
				[String(params.address_XXX)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as GetByAddrReturn;
		},
		async Render(params: { fullPath: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<RenderReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Render",
				[String(params.fullPath)],
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
		realm: { realms: { r: { gnops: { valopers: new RealmModule(wallet) } } } }
	}
}

export default Realm;
