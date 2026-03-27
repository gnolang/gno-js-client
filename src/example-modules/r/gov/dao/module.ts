import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/gov/dao";

type RenderReturn = [string];
type MustCreateProposalReturn = [bigint];
type ExecuteProposalReturn = [boolean];
type CreateProposalReturn = [bigint, unknown];
type VoteOnProposalReturn = [unknown];
type MustGetProposalReturn = [unknown];
type GetProposalReturn = [unknown, unknown];
type AllowedDAOsReturn = [unknown];
type InAllowedDAOsReturn = [boolean];
type NewProposalRequestReturn = [unknown];
type NewProposalRequestWithFilterReturn = [unknown];
type NewProposalsReturn = [unknown];
type NewSimpleExecutorReturn = [unknown];
type NewSafeExecutorReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
	return {
		async Render(params: { p: string }, height?: number):Promise<RenderReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.p}")`, height);
			return parseGnoReturns(result) as RenderReturn;
		},
		async MustCreateProposal(params: { r: unknown }, height?: number):Promise<MustCreateProposalReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `MustCreateProposal(${params.r})`, height);
			return parseGnoReturns(result) as MustCreateProposalReturn;
		},
		async ExecuteProposal(params: { pid: bigint }, height?: number):Promise<ExecuteProposalReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `ExecuteProposal(${params.pid})`, height);
			return parseGnoReturns(result) as ExecuteProposalReturn;
		},
		async CreateProposal(params: { r: unknown }, height?: number):Promise<CreateProposalReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `CreateProposal(${params.r})`, height);
			return parseGnoReturns(result) as CreateProposalReturn;
		},
		async MustVoteOnProposal(params: { r: unknown }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `MustVoteOnProposal(${params.r})`, height);
		},
		async VoteOnProposal(params: { r: unknown }, height?: number):Promise<VoteOnProposalReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `VoteOnProposal(${params.r})`, height);
			return parseGnoReturns(result) as VoteOnProposalReturn;
		},
		async MustVoteOnProposalSimple(params: { pid: bigint; option: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `MustVoteOnProposalSimple(${params.pid},"${params.option}")`, height);
		},
		async MustGetProposal(params: { pid: bigint }, height?: number):Promise<MustGetProposalReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `MustGetProposal(${params.pid})`, height);
			return parseGnoReturns(result) as MustGetProposalReturn;
		},
		async GetProposal(params: { pid: bigint }, height?: number):Promise<GetProposalReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetProposal(${params.pid})`, height);
			return parseGnoReturns(result) as GetProposalReturn;
		},
		async UpdateImpl(params: { r: unknown }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `UpdateImpl(${params.r})`, height);
		},
		async AllowedDAOs(height?: number):Promise<AllowedDAOsReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `AllowedDAOs()`, height);
			return parseGnoReturns(result) as AllowedDAOsReturn;
		},
		async InAllowedDAOs(params: { pkg: string }, height?: number):Promise<InAllowedDAOsReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `InAllowedDAOs("${params.pkg}")`, height);
			return parseGnoReturns(result) as InAllowedDAOsReturn;
		},
		async NewProposalRequest(params: { title: string; description: string }, height?: number):Promise<NewProposalRequestReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewProposalRequest("${params.title}","${params.description}")`, height);
			return parseGnoReturns(result) as NewProposalRequestReturn;
		},
		async NewProposalRequestWithFilter(params: { title: string; description: string }, height?: number):Promise<NewProposalRequestWithFilterReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewProposalRequestWithFilter("${params.title}","${params.description}")`, height);
			return parseGnoReturns(result) as NewProposalRequestWithFilterReturn;
		},
		async NewProposals(height?: number):Promise<NewProposalsReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewProposals()`, height);
			return parseGnoReturns(result) as NewProposalsReturn;
		},
		async NewSimpleExecutor(params: { callback: unknown; description: string }, height?: number):Promise<NewSimpleExecutorReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewSimpleExecutor(${params.callback},"${params.description}")`, height);
			return parseGnoReturns(result) as NewSimpleExecutorReturn;
		},
		async NewSafeExecutor(height?: number):Promise<NewSafeExecutorReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewSafeExecutor()`, height);
			return parseGnoReturns(result) as NewSafeExecutorReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async Render(params: { p: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<RenderReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Render",
				[String(params.p)],
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
		},
		async MustCreateProposal(params: { r: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<MustCreateProposalReturn> {
			const resp = await wallet.callMethod(
				realm,
				"MustCreateProposal",
				[String(params.r)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as MustCreateProposalReturn;
		},
		async ExecuteProposal(params: { pid: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<ExecuteProposalReturn> {
			const resp = await wallet.callMethod(
				realm,
				"ExecuteProposal",
				[String(params.pid)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as ExecuteProposalReturn;
		},
		async CreateProposal(params: { r: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<CreateProposalReturn> {
			const resp = await wallet.callMethod(
				realm,
				"CreateProposal",
				[String(params.r)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as CreateProposalReturn;
		},
		async MustVoteOnProposal(params: { r: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"MustVoteOnProposal",
				[String(params.r)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async VoteOnProposal(params: { r: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<VoteOnProposalReturn> {
			const resp = await wallet.callMethod(
				realm,
				"VoteOnProposal",
				[String(params.r)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as VoteOnProposalReturn;
		},
		async MustVoteOnProposalSimple(params: { pid: bigint; option: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"MustVoteOnProposalSimple",
				[String(params.pid), String(params.option)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async MustGetProposal(params: { pid: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<MustGetProposalReturn> {
			const resp = await wallet.callMethod(
				realm,
				"MustGetProposal",
				[String(params.pid)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as MustGetProposalReturn;
		},
		async GetProposal(params: { pid: bigint }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetProposalReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetProposal",
				[String(params.pid)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as GetProposalReturn;
		},
		async UpdateImpl(params: { r: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"UpdateImpl",
				[String(params.r)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async AllowedDAOs(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<AllowedDAOsReturn> {
			const resp = await wallet.callMethod(
				realm,
				"AllowedDAOs",
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
			return parseGnoReturns(result) as AllowedDAOsReturn;
		},
		async InAllowedDAOs(params: { pkg: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<InAllowedDAOsReturn> {
			const resp = await wallet.callMethod(
				realm,
				"InAllowedDAOs",
				[String(params.pkg)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as InAllowedDAOsReturn;
		},
		async NewProposalRequest(params: { title: string; description: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewProposalRequestReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewProposalRequest",
				[String(params.title), String(params.description)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewProposalRequestReturn;
		},
		async NewProposalRequestWithFilter(params: { title: string; description: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewProposalRequestWithFilterReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewProposalRequestWithFilter",
				[String(params.title), String(params.description)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewProposalRequestWithFilterReturn;
		},
		async NewProposals(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewProposalsReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewProposals",
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
			return parseGnoReturns(result) as NewProposalsReturn;
		},
		async NewSimpleExecutor(params: { callback: unknown; description: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewSimpleExecutorReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewSimpleExecutor",
				[String(params.callback), String(params.description)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewSimpleExecutorReturn;
		},
		async NewSafeExecutor(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewSafeExecutorReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewSafeExecutor",
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
			return parseGnoReturns(result) as NewSafeExecutorReturn;
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
		realm: { realms: { r: { gov: { dao: new RealmModule(wallet) } } } }
	}
}

export default Realm;
