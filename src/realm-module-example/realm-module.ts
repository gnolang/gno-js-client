import { BroadcastTransactionMap, TransactionEndpoint, TxFee } from "@gnolang/tm2-js-client";
import { GnoWallet } from "../wallet";
import { parseGnoReturns } from "../wallet/helpers";

const realm = "/r/demo/boards";
const realmTS= "r_demo_boards";
type GetBoardIDFromNameReturn = [number, boolean]
const queryClient = (wallet: GnoWallet) => {
	return {
		async GetBoardIDFromName(params: { name: string }, height?: number):Promise<GetBoardIDFromNameReturn> {
			const result = await wallet.getProvider().evaluateExpression(realm,`GetBoardIDFromName("${name}")`,height);
			return parseGnoReturns(result) as GetBoardIDFromNameReturn;
		}
	}
}
const txClient = (wallet: GnoWallet) => {
	return {
		async GetBoardIDFromName(params: { name: string }, funds: Map<string,number>, fee: TxFee):Promise<GetBoardIDFromNameReturn> {
			
			const resp = (await wallet.callMethod(
				realm,
				"GetBoardIDFromName",
				[params.name],
				TransactionEndpoint.BROADCAST_TX_COMMIT,
				funds,
				fee
			  ));
			const result = atob(resp.deliver_tx.ResponseBase.Data as string)
			return parseGnoReturns(result) as GetBoardIDFromNameReturn;
		},
	}
}
class RealmModule {
	public query: ReturnType<typeof queryClient>;
	public tx: ReturnType<typeof txClient>;

	constructor(wallet: GnoWallet) {		
		this.tx = txClient(wallet);		
		this.query = queryClient(wallet);
	}
};

const Realm = (wallet: GnoWallet) => {
	return {
		realm: {
			[realmTS]: new RealmModule(wallet)
		}
  }
}
export default Realm;