import { TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "@gnolang/gno-js-client";
import { parseGnoReturns } from "@gnolang/gno-js-client/bin/wallet/helpers";

const realm = "gno.land/r/g19p3yzr3cuhzqa02j0ce6kzvyjqfzwemw3vam0x/gnomaze";

type GenerateSVGReturn = [string];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
	return {
		async GenerateNextLevel(params: { answer: string }, height?: number):Promise<void> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GenerateNextLevel("${params.answer}")`, height);
		},
		async GenerateSVG(params: { p: unknown }, height?: number):Promise<GenerateSVGReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `GenerateSVG(${params.p})`, height);
			return parseGnoReturns(result) as GenerateSVGReturn;
		},
		async Render(params: { path: string }, height?: number):Promise<RenderReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
			return parseGnoReturns(result) as RenderReturn;
		}
	}
}

const txClient = (wallet: GnoWallet) => {
	return {
		async GenerateNextLevel(params: { answer: string }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<void> {
			const resp = await wallet.callMethod(
				realm,
				"GenerateNextLevel",
				[String(params.answer)],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				maxDeposit,
				fee
			);
			if (resp.deliver_tx.ResponseBase.Error) {
				throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
			}
		},
		async GenerateSVG(params: { p: unknown }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee):Promise<GenerateSVGReturn> {
			const resp = await wallet.callMethod(
				realm,
				"GenerateSVG",
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
			return parseGnoReturns(result) as GenerateSVGReturn;
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
		realm: { realms: { r: { g19p3yzr3cuhzqa02j0ce6kzvyjqfzwemw3vam0x: { gnomaze: new RealmModule(wallet) } } } }
	}
}

export default Realm;
