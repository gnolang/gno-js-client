import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/gov/dao/v3/memberstore";

type RenderReturn = [string];
type GetReturn = [unknown];
type GetTierReturn = [unknown, boolean];
type GetTierPowerReturn = [number];
type NewChangeTiersRequestReturn = [unknown];
type RenderChartsReturn = [string];
type RenderMembersReturn = [string];
type NewMembersByTierReturn = [unknown];

const queryClient = (wallet: GnoWallet) => {
	return {
		async Render(params: { path: string }, height?: number):Promise<RenderReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
			return parseGnoReturns(result) as RenderReturn;
		},
		async Get(height?: number):Promise<GetReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Get()`, height);
			return parseGnoReturns(result) as GetReturn;
		},
		async GetTier(params: { name: string }, height?: number):Promise<GetTierReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetTier("${params.name}")`, height);
			return parseGnoReturns(result) as GetTierReturn;
		},
		async IterateTiers(params: { fn: unknown }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `IterateTiers(${params.fn})`, height);
		},
		async GetTierPower(params: { tierName: string; members: unknown }, height?: number):Promise<GetTierPowerReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GetTierPower("${params.tierName}",${params.members})`, height);
			return parseGnoReturns(result) as GetTierPowerReturn;
		},
		async NewChangeTiersRequest(params: { tiers: unknown }, height?: number):Promise<NewChangeTiersRequestReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewChangeTiersRequest(${params.tiers})`, height);
			return parseGnoReturns(result) as NewChangeTiersRequestReturn;
		},
		async RenderCharts(params: { members: unknown }, height?: number):Promise<RenderChartsReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `RenderCharts(${params.members})`, height);
			return parseGnoReturns(result) as RenderChartsReturn;
		},
		async RenderMembers(params: { path: string; members: unknown }, height?: number):Promise<RenderMembersReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `RenderMembers("${params.path}",${params.members})`, height);
			return parseGnoReturns(result) as RenderMembersReturn;
		},
		async NewMembersByTier(height?: number):Promise<NewMembersByTierReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `NewMembersByTier()`, height);
			return parseGnoReturns(result) as NewMembersByTierReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
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
		},
		async Get(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetReturn> {
			const resp = await wallet.callMethod(
				realm,
				"Get",
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
			return parseGnoReturns(result) as GetReturn;
		},
		async GetTier(params: { name: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetTierReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetTier",
				[String(params.name)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as GetTierReturn;
		},
		async IterateTiers(params: { fn: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"IterateTiers",
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
		async GetTierPower(params: { tierName: string; members: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GetTierPowerReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GetTierPower",
				[String(params.tierName), String(params.members)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as GetTierPowerReturn;
		},
		async NewChangeTiersRequest(params: { tiers: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewChangeTiersRequestReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewChangeTiersRequest",
				[String(params.tiers)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as NewChangeTiersRequestReturn;
		},
		async RenderCharts(params: { members: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<RenderChartsReturn> {
			const resp = await wallet.callMethod(
				realm,
				"RenderCharts",
				[String(params.members)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as RenderChartsReturn;
		},
		async RenderMembers(params: { path: string; members: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<RenderMembersReturn> {
			const resp = await wallet.callMethod(
				realm,
				"RenderMembers",
				[String(params.path), String(params.members)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
			const result = atob(resp.deliver_tx.ResponseBase.Data as string);
			return parseGnoReturns(result) as RenderMembersReturn;
		},
		async NewMembersByTier(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<NewMembersByTierReturn> {
			const resp = await wallet.callMethod(
				realm,
				"NewMembersByTier",
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
			return parseGnoReturns(result) as NewMembersByTierReturn;
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
		realm: { realms: { r: { gov: { dao: { v3: { memberstore: new RealmModule(wallet) } } } } } }
	}
}

export default Realm;
