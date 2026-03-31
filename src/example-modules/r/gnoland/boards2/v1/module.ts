/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
// Auto-generated module for gno.land/r/gnoland/boards2/v1 — DO NOT EDIT
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

const realm = "gno.land/r/gnoland/boards2/v1";

type GetBoardIDFromNameReturn = [bigint, boolean];
type CreateBoardReturn = [bigint];
type CreateThreadReturn = [bigint];
type CreateReplyReturn = [bigint];
type CreateRepostReturn = [bigint];
type IsMemberReturn = [boolean];
type HasMemberRoleReturn = [boolean];
type IterateRealmMembersReturn = [boolean];
type GetBoardReturn = [unknown];
type IsBannedReturn = [boolean];
type GetFlaggingThresholdReturn = [bigint];
type IsBoardFrozenReturn = [boolean];
type IsThreadFrozenReturn = [boolean];
type IsRealmLockedReturn = [boolean];
type AreRealmMembersLockedReturn = [boolean];
type RenderReturn = [string];

const queryClient = (wallet: GnoWallet) => {
  return {
    async SetHelp(params: {
      content: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `SetHelp("${params.content}")`, height);
      return;
    },
    async SetPermissions(params: {
      boardID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `SetPermissions(${params.boardID})`, height);
      return;
    },
    async SetRealmNotice(params: {
      message: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `SetRealmNotice("${params.message}")`, height);
      return;
    },
    async GetBoardIDFromName(params: {
      name: string
    }, height?: number): Promise<GetBoardIDFromNameReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `GetBoardIDFromName("${params.name}")`, height);
      return _parseGnoReturns(result) as GetBoardIDFromNameReturn;
    },
    async CreateBoard(params: {
      name: string
      listed: boolean
      open: boolean
    }, height?: number): Promise<CreateBoardReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `CreateBoard("${params.name}",${params.listed},${params.open})`, height);
      return _parseGnoReturns(result) as CreateBoardReturn;
    },
    async RenameBoard(params: {
      name: string
      newName: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `RenameBoard("${params.name}","${params.newName}")`, height);
      return;
    },
    async CreateThread(params: {
      boardID: bigint
      title: string
      body: string
    }, height?: number): Promise<CreateThreadReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `CreateThread(${params.boardID},"${params.title}","${params.body}")`, height);
      return _parseGnoReturns(result) as CreateThreadReturn;
    },
    async CreateReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
      body: string
    }, height?: number): Promise<CreateReplyReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `CreateReply(${params.boardID},${params.threadID},${params.replyID},"${params.body}")`, height);
      return _parseGnoReturns(result) as CreateReplyReturn;
    },
    async CreateRepost(params: {
      boardID: bigint
      threadID: bigint
      destinationBoardID: bigint
      title: string
      body: string
    }, height?: number): Promise<CreateRepostReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `CreateRepost(${params.boardID},${params.threadID},${params.destinationBoardID},"${params.title}","${params.body}")`, height);
      return _parseGnoReturns(result) as CreateRepostReturn;
    },
    async DeleteThread(params: {
      boardID: bigint
      threadID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `DeleteThread(${params.boardID},${params.threadID})`, height);
      return;
    },
    async DeleteReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `DeleteReply(${params.boardID},${params.threadID},${params.replyID})`, height);
      return;
    },
    async EditThread(params: {
      boardID: bigint
      threadID: bigint
      title: string
      body: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `EditThread(${params.boardID},${params.threadID},"${params.title}","${params.body}")`, height);
      return;
    },
    async EditReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
      body: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `EditReply(${params.boardID},${params.threadID},${params.replyID},"${params.body}")`, height);
      return;
    },
    async RemoveMember(params: {
      boardID: bigint
      member: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `RemoveMember(${params.boardID},"${params.member}")`, height);
      return;
    },
    async IsMember(params: {
      boardID: bigint
      user: string
    }, height?: number): Promise<IsMemberReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `IsMember(${params.boardID},"${params.user}")`, height);
      return _parseGnoReturns(result) as IsMemberReturn;
    },
    async HasMemberRole(params: {
      boardID: bigint
      member: string
      role: string
    }, height?: number): Promise<HasMemberRoleReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `HasMemberRole(${params.boardID},"${params.member}","${params.role}")`, height);
      return _parseGnoReturns(result) as HasMemberRoleReturn;
    },
    async ChangeMemberRole(params: {
      boardID: bigint
      member: string
      role: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ChangeMemberRole(${params.boardID},"${params.member}","${params.role}")`, height);
      return;
    },
    async IterateRealmMembers(params: {
      offset: bigint
      fn: unknown
    }, height?: number): Promise<IterateRealmMembersReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `IterateRealmMembers(${params.offset},${params.fn})`, height);
      return _parseGnoReturns(result) as IterateRealmMembersReturn;
    },
    async GetBoard(params: {
      boardID: bigint
    }, height?: number): Promise<GetBoardReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `GetBoard(${params.boardID})`, height);
      return _parseGnoReturns(result) as GetBoardReturn;
    },
    async Ban(params: {
      boardID: bigint
      user: string
      hours: bigint
      reason: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Ban(${params.boardID},"${params.user}",${params.hours},"${params.reason}")`, height);
      return;
    },
    async Unban(params: {
      boardID: bigint
      user: string
      reason: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `Unban(${params.boardID},"${params.user}","${params.reason}")`, height);
      return;
    },
    async IsBanned(params: {
      boardID: bigint
      user: string
    }, height?: number): Promise<IsBannedReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `IsBanned(${params.boardID},"${params.user}")`, height);
      return _parseGnoReturns(result) as IsBannedReturn;
    },
    async SetFlaggingThreshold(params: {
      boardID: bigint
      threshold: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `SetFlaggingThreshold(${params.boardID},${params.threshold})`, height);
      return;
    },
    async GetFlaggingThreshold(params: {
      boardID: bigint
    }, height?: number): Promise<GetFlaggingThresholdReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `GetFlaggingThreshold(${params.boardID})`, height);
      return _parseGnoReturns(result) as GetFlaggingThresholdReturn;
    },
    async FlagThread(params: {
      boardID: bigint
      threadID: bigint
      reason: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `FlagThread(${params.boardID},${params.threadID},"${params.reason}")`, height);
      return;
    },
    async FlagReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
      reason: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `FlagReply(${params.boardID},${params.threadID},${params.replyID},"${params.reason}")`, height);
      return;
    },
    async FreezeBoard(params: {
      boardID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `FreezeBoard(${params.boardID})`, height);
      return;
    },
    async UnfreezeBoard(params: {
      boardID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `UnfreezeBoard(${params.boardID})`, height);
      return;
    },
    async IsBoardFrozen(params: {
      boardID: bigint
    }, height?: number): Promise<IsBoardFrozenReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `IsBoardFrozen(${params.boardID})`, height);
      return _parseGnoReturns(result) as IsBoardFrozenReturn;
    },
    async FreezeThread(params: {
      boardID: bigint
      threadID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `FreezeThread(${params.boardID},${params.threadID})`, height);
      return;
    },
    async UnfreezeThread(params: {
      boardID: bigint
      threadID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `UnfreezeThread(${params.boardID},${params.threadID})`, height);
      return;
    },
    async IsThreadFrozen(params: {
      boardID: bigint
      threadID: bigint
    }, height?: number): Promise<IsThreadFrozenReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `IsThreadFrozen(${params.boardID},${params.threadID})`, height);
      return _parseGnoReturns(result) as IsThreadFrozenReturn;
    },
    async InviteMember(params: {
      boardID: bigint
      user: string
      role: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `InviteMember(${params.boardID},"${params.user}","${params.role}")`, height);
      return;
    },
    async InviteMembers(params: {
      boardID: bigint
      invites: unknown
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `InviteMembers(${params.boardID},${params.invites})`, height);
      return;
    },
    async RequestInvite(params: {
      boardID: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `RequestInvite(${params.boardID})`, height);
      return;
    },
    async AcceptInvite(params: {
      boardID: bigint
      user: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AcceptInvite(${params.boardID},"${params.user}")`, height);
      return;
    },
    async RevokeInvite(params: {
      boardID: bigint
      user: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `RevokeInvite(${params.boardID},"${params.user}")`, height);
      return;
    },
    async LockRealm(params: {
      lockRealmMembers: boolean
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `LockRealm(${params.lockRealmMembers})`, height);
      return;
    },
    async IsRealmLocked(height?: number): Promise<IsRealmLockedReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "IsRealmLocked()", height);
      return _parseGnoReturns(result) as IsRealmLockedReturn;
    },
    async AreRealmMembersLocked(height?: number): Promise<AreRealmMembersLockedReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, "AreRealmMembersLocked()", height);
      return _parseGnoReturns(result) as AreRealmMembersLockedReturn;
    },
    async Render(params: {
      path: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async SetHelp(params: {
      content: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "SetHelp",
        [String(params.content)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async SetPermissions(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "SetPermissions",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async SetRealmNotice(params: {
      message: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "SetRealmNotice",
        [String(params.message)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async GetBoardIDFromName(params: {
      name: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetBoardIDFromNameReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetBoardIDFromName",
        [String(params.name)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as GetBoardIDFromNameReturn;
    },
    async CreateBoard(params: {
      name: string
      listed: boolean
      open: boolean
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CreateBoardReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CreateBoard",
        [String(params.name), String(params.listed), String(params.open)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as CreateBoardReturn;
    },
    async RenameBoard(params: {
      name: string
      newName: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "RenameBoard",
        [String(params.name), String(params.newName)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async CreateThread(params: {
      boardID: bigint
      title: string
      body: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CreateThreadReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CreateThread",
        [String(params.boardID), String(params.title), String(params.body)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as CreateThreadReturn;
    },
    async CreateReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
      body: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CreateReplyReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CreateReply",
        [String(params.boardID), String(params.threadID), String(params.replyID), String(params.body)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as CreateReplyReturn;
    },
    async CreateRepost(params: {
      boardID: bigint
      threadID: bigint
      destinationBoardID: bigint
      title: string
      body: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<CreateRepostReturn> {
      const resp = await wallet.callMethod(
        realm,
        "CreateRepost",
        [String(params.boardID), String(params.threadID), String(params.destinationBoardID), String(params.title), String(params.body)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as CreateRepostReturn;
    },
    async DeleteThread(params: {
      boardID: bigint
      threadID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "DeleteThread",
        [String(params.boardID), String(params.threadID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async DeleteReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "DeleteReply",
        [String(params.boardID), String(params.threadID), String(params.replyID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async EditThread(params: {
      boardID: bigint
      threadID: bigint
      title: string
      body: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "EditThread",
        [String(params.boardID), String(params.threadID), String(params.title), String(params.body)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async EditReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
      body: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "EditReply",
        [String(params.boardID), String(params.threadID), String(params.replyID), String(params.body)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async RemoveMember(params: {
      boardID: bigint
      member: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "RemoveMember",
        [String(params.boardID), String(params.member)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IsMember(params: {
      boardID: bigint
      user: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsMemberReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsMember",
        [String(params.boardID), String(params.user)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as IsMemberReturn;
    },
    async HasMemberRole(params: {
      boardID: bigint
      member: string
      role: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<HasMemberRoleReturn> {
      const resp = await wallet.callMethod(
        realm,
        "HasMemberRole",
        [String(params.boardID), String(params.member), String(params.role)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as HasMemberRoleReturn;
    },
    async ChangeMemberRole(params: {
      boardID: bigint
      member: string
      role: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ChangeMemberRole",
        [String(params.boardID), String(params.member), String(params.role)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IterateRealmMembers(params: {
      offset: bigint
      fn: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IterateRealmMembersReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IterateRealmMembers",
        [String(params.offset), String(params.fn)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as IterateRealmMembersReturn;
    },
    async GetBoard(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetBoardReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetBoard",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as GetBoardReturn;
    },
    async Ban(params: {
      boardID: bigint
      user: string
      hours: bigint
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Ban",
        [String(params.boardID), String(params.user), String(params.hours), String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async Unban(params: {
      boardID: bigint
      user: string
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "Unban",
        [String(params.boardID), String(params.user), String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IsBanned(params: {
      boardID: bigint
      user: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsBannedReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsBanned",
        [String(params.boardID), String(params.user)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as IsBannedReturn;
    },
    async SetFlaggingThreshold(params: {
      boardID: bigint
      threshold: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "SetFlaggingThreshold",
        [String(params.boardID), String(params.threshold)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async GetFlaggingThreshold(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<GetFlaggingThresholdReturn> {
      const resp = await wallet.callMethod(
        realm,
        "GetFlaggingThreshold",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as GetFlaggingThresholdReturn;
    },
    async FlagThread(params: {
      boardID: bigint
      threadID: bigint
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "FlagThread",
        [String(params.boardID), String(params.threadID), String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async FlagReply(params: {
      boardID: bigint
      threadID: bigint
      replyID: bigint
      reason: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "FlagReply",
        [String(params.boardID), String(params.threadID), String(params.replyID), String(params.reason)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async FreezeBoard(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "FreezeBoard",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async UnfreezeBoard(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "UnfreezeBoard",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IsBoardFrozen(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsBoardFrozenReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsBoardFrozen",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as IsBoardFrozenReturn;
    },
    async FreezeThread(params: {
      boardID: bigint
      threadID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "FreezeThread",
        [String(params.boardID), String(params.threadID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async UnfreezeThread(params: {
      boardID: bigint
      threadID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "UnfreezeThread",
        [String(params.boardID), String(params.threadID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IsThreadFrozen(params: {
      boardID: bigint
      threadID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsThreadFrozenReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsThreadFrozen",
        [String(params.boardID), String(params.threadID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as IsThreadFrozenReturn;
    },
    async InviteMember(params: {
      boardID: bigint
      user: string
      role: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "InviteMember",
        [String(params.boardID), String(params.user), String(params.role)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async InviteMembers(params: {
      boardID: bigint
      invites: unknown
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "InviteMembers",
        [String(params.boardID), String(params.invites)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async RequestInvite(params: {
      boardID: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "RequestInvite",
        [String(params.boardID)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async AcceptInvite(params: {
      boardID: bigint
      user: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AcceptInvite",
        [String(params.boardID), String(params.user)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async RevokeInvite(params: {
      boardID: bigint
      user: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "RevokeInvite",
        [String(params.boardID), String(params.user)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async LockRealm(params: {
      lockRealmMembers: boolean
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "LockRealm",
        [String(params.lockRealmMembers)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async IsRealmLocked(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<IsRealmLockedReturn> {
      const resp = await wallet.callMethod(
        realm,
        "IsRealmLocked",
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
      return _parseGnoReturns(result) as IsRealmLockedReturn;
    },
    async AreRealmMembersLocked(funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<AreRealmMembersLockedReturn> {
      const resp = await wallet.callMethod(
        realm,
        "AreRealmMembersLocked",
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
      return _parseGnoReturns(result) as AreRealmMembersLockedReturn;
    },
    async Render(params: {
      path: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<RenderReturn> {
      const resp = await wallet.callMethod(
        realm,
        "Render",
        [String(params.path)],
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
          gnoland: {
            boards2: {
              v1: new RealmModule(wallet),
            },
          },
        },
      },
    },
  };
};

export default Realm;
