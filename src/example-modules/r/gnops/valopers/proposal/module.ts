import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/gnops/valopers/proposal";

type NewValidatorProposalRequestReturn = [unknown];
type ProposeNewInstructionsProposalRequestReturn = [unknown];
type ProposeNewMinFeeProposalRequestReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
	return {
		async NewValidatorProposalRequest(params: { address_XXX: string }, height?: number):Promise<NewValidatorProposalRequestReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewValidatorProposalRequest("${params.address_XXX}")`, height);
			return parseGnoReturns(result) as NewValidatorProposalRequestReturn;
		},
		async ProposeNewInstructionsProposalRequest(params: { newInstructions: string }, height?: number):Promise<ProposeNewInstructionsProposalRequestReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `ProposeNewInstructionsProposalRequest("${params.newInstructions}")`, height);
			return parseGnoReturns(result) as ProposeNewInstructionsProposalRequestReturn;
		},
		async ProposeNewMinFeeProposalRequest(params: { newMinFee: bigint }, height?: number):Promise<ProposeNewMinFeeProposalRequestReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `ProposeNewMinFeeProposalRequest(${params.newMinFee})`, height);
			return parseGnoReturns(result) as ProposeNewMinFeeProposalRequestReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async NewValidatorProposalRequest(params: { address_XXX: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewValidatorProposalRequestReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewValidatorProposalRequest",
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
			return parseGnoReturns(result) as NewValidatorProposalRequestReturn;
		},
		async ProposeNewInstructionsProposalRequest(params: { newInstructions: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<ProposeNewInstructionsProposalRequestReturn> {
			const resp = await wallet.callMethod(
				realm,
				"ProposeNewInstructionsProposalRequest",
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
			return parseGnoReturns(result) as ProposeNewInstructionsProposalRequestReturn;
		},
		async ProposeNewMinFeeProposalRequest(params: { newMinFee: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<ProposeNewMinFeeProposalRequestReturn> {
			const resp = await wallet.callMethod(
				realm,
				"ProposeNewMinFeeProposalRequest",
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
			return parseGnoReturns(result) as ProposeNewMinFeeProposalRequestReturn;
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
		realm: { realms: { r: { gnops: { valopers: { proposal: new RealmModule(wallet) } } } } }
	}
}

export default Realm;
