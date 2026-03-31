// Auto-generated module for gno.land/r/gov/dao/v3/impl — DO NOT EDIT
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

const realm = "gno.land/r/gov/dao/v3/impl";

type NewGovDAOReturn = [unknown];
type RenderReturn = [string];
type GetInstanceReturn = [unknown];
type NewChangeLawRequestReturn = [unknown];
type NewUpgradeDaoImplRequestReturn = [unknown];
type NewAddMemberRequestReturn = [unknown];
type NewWithdrawMemberRequestReturn = [unknown];
type NewPromoteMemberRequestReturn = [unknown];
type NewTreasuryPaymentRequestReturn = [unknown];
type NewTreasuryGRC20TokensUpdateReturn = [unknown];
type NewRenderReturn = [unknown];
type NewProposalsStatusesReturn = [unknown];
type StringifyVotesReturn = [string];
type StringifyProposalReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async NewGovDAO(height?: number): Promise<NewGovDAOReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "NewGovDAO()", height);
      return _parseGnoReturns(result) as NewGovDAOReturn;
    },
    async Render(params: {
      in: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.in}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
    async AddMember(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AddMember("${params.addr}")`, height);
      return;
    },
    async GetInstance(height?: number): Promise<GetInstanceReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "GetInstance()", height);
      return _parseGnoReturns(result) as GetInstanceReturn;
    },
    async NewChangeLawRequest(params: {
      newLaw: unknown
    }, height?: number): Promise<NewChangeLawRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewChangeLawRequest(${params.newLaw})`, height);
      return _parseGnoReturns(result) as NewChangeLawRequestReturn;
    },
    async NewUpgradeDaoImplRequest(params: {
      realmPkg: string
      reason: string
    }, height?: number): Promise<NewUpgradeDaoImplRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewUpgradeDaoImplRequest("${params.realmPkg}","${params.reason}")`, height);
      return _parseGnoReturns(result) as NewUpgradeDaoImplRequestReturn;
    },
    async NewAddMemberRequest(params: {
      addr: string
      tier: string
      portfolio: string
    }, height?: number): Promise<NewAddMemberRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewAddMemberRequest("${params.addr}","${params.tier}","${params.portfolio}")`, height);
      return _parseGnoReturns(result) as NewAddMemberRequestReturn;
    },
    async NewWithdrawMemberRequest(params: {
      addr: string
      reason: string
    }, height?: number): Promise<NewWithdrawMemberRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewWithdrawMemberRequest("${params.addr}","${params.reason}")`, height);
      return _parseGnoReturns(result) as NewWithdrawMemberRequestReturn;
    },
    async NewPromoteMemberRequest(params: {
      addr: string
      fromTier: string
      toTier: string
    }, height?: number): Promise<NewPromoteMemberRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewPromoteMemberRequest("${params.addr}","${params.fromTier}","${params.toTier}")`, height);
      return _parseGnoReturns(result) as NewPromoteMemberRequestReturn;
    },
    async NewTreasuryPaymentRequest(params: {
      reason: string
    }, height?: number): Promise<NewTreasuryPaymentRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewTreasuryPaymentRequest("${params.reason}")`, height);
      return _parseGnoReturns(result) as NewTreasuryPaymentRequestReturn;
    },
    async NewTreasuryGRC20TokensUpdate(params: {
      newTokenKeys: unknown
    }, height?: number): Promise<NewTreasuryGRC20TokensUpdateReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewTreasuryGRC20TokensUpdate(${params.newTokenKeys})`, height);
      return _parseGnoReturns(result) as NewTreasuryGRC20TokensUpdateReturn;
    },
    async NewRender(params: {
      d: unknown
    }, height?: number): Promise<NewRenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewRender(${params.d})`, height);
      return _parseGnoReturns(result) as NewRenderReturn;
    },
    async NewProposalsStatuses(height?: number): Promise<NewProposalsStatusesReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "NewProposalsStatuses()", height);
      return _parseGnoReturns(result) as NewProposalsStatusesReturn;
    },
    async StringifyVotes(params: {
      ps: unknown
    }, height?: number): Promise<StringifyVotesReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `StringifyVotes(${params.ps})`, height);
      return _parseGnoReturns(result) as StringifyVotesReturn;
    },
    async StringifyProposal(params: {
      p: unknown
    }, height?: number): Promise<StringifyProposalReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `StringifyProposal(${params.p})`, height);
      return _parseGnoReturns(result) as StringifyProposalReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async NewGovDAO(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewGovDAOReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewGovDAO",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewGovDAOReturn;
    },
    async Render(params: {
      in: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<RenderReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Render",
        [String(params.in)],
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
    async AddMember(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AddMember",
        [String(params.addr)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async GetInstance(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetInstanceReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetInstance",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as GetInstanceReturn;
    },
    async NewChangeLawRequest(params: {
      newLaw: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewChangeLawRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewChangeLawRequest",
        [String(params.newLaw)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewChangeLawRequestReturn;
    },
    async NewUpgradeDaoImplRequest(params: {
      realmPkg: string
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewUpgradeDaoImplRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewUpgradeDaoImplRequest",
        [String(params.realmPkg), String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewUpgradeDaoImplRequestReturn;
    },
    async NewAddMemberRequest(params: {
      addr: string
      tier: string
      portfolio: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewAddMemberRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewAddMemberRequest",
        [String(params.addr), String(params.tier), String(params.portfolio)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewAddMemberRequestReturn;
    },
    async NewWithdrawMemberRequest(params: {
      addr: string
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewWithdrawMemberRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewWithdrawMemberRequest",
        [String(params.addr), String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewWithdrawMemberRequestReturn;
    },
    async NewPromoteMemberRequest(params: {
      addr: string
      fromTier: string
      toTier: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewPromoteMemberRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewPromoteMemberRequest",
        [String(params.addr), String(params.fromTier), String(params.toTier)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewPromoteMemberRequestReturn;
    },
    async NewTreasuryPaymentRequest(params: {
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewTreasuryPaymentRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewTreasuryPaymentRequest",
        [String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewTreasuryPaymentRequestReturn;
    },
    async NewTreasuryGRC20TokensUpdate(params: {
      newTokenKeys: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewTreasuryGRC20TokensUpdateReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewTreasuryGRC20TokensUpdate",
        [String(params.newTokenKeys)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewTreasuryGRC20TokensUpdateReturn;
    },
    async NewRender(params: {
      d: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewRenderReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewRender",
        [String(params.d)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewRenderReturn;
    },
    async NewProposalsStatuses(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewProposalsStatusesReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewProposalsStatuses",
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewProposalsStatusesReturn;
    },
    async StringifyVotes(params: {
      ps: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<StringifyVotesReturn> {
      const resp = await wallet.callMethod(
        realm,
        "StringifyVotes",
        [String(params.ps)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as StringifyVotesReturn;
    },
    async StringifyProposal(params: {
      p: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<StringifyProposalReturn> {
      const resp = await wallet.callMethod(
        realm,
        "StringifyProposal",
        [String(params.p)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as StringifyProposalReturn;
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
          gov: {
            dao: {
              v3: {
                impl: new RealmModule(wallet),
              },
            },
          },
        },
      },
    },
  };
};

export default Realm;
