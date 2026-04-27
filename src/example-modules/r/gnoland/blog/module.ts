// Auto-generated module for gno.land/r/gnoland/blog — DO NOT EDIT
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

const realm = "gno.land/r/gnoland/blog";

type NewPostProposalRequestReturn = [unknown];
type RenderReturn = [string];
type RenderLastPostsWidgetReturn = [string];
type PostExistsReturn = [boolean];

const queryClient = (wallet: GnoWallet) => {
  return {
    async AdminSetAdminAddr(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AdminSetAdminAddr("${params.addr}")`, height);
      return;
    },
    async AdminSetInPause(params: {
      state: boolean
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AdminSetInPause(${params.state})`, height);
      return;
    },
    async AdminAddModerator(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AdminAddModerator("${params.addr}")`, height);
      return;
    },
    async AdminRemoveModerator(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AdminRemoveModerator("${params.addr}")`, height);
      return;
    },
    async NewPostProposalRequest(params: {
      slug: string
      title: string
      body: string
      publicationDate: string
      authors: string
      tags: string
    }, height?: number): Promise<NewPostProposalRequestReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `NewPostProposalRequest("${params.slug}","${params.title}","${params.body}","${params.publicationDate}","${params.authors}","${params.tags}")`, height);
      return _parseGnoReturns(result) as NewPostProposalRequestReturn;
    },
    async ModAddPost(params: {
      slug: string
      title: string
      body: string
      publicationDate: string
      authors: string
      tags: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModAddPost("${params.slug}","${params.title}","${params.body}","${params.publicationDate}","${params.authors}","${params.tags}")`, height);
      return;
    },
    async ModEditPost(params: {
      slug: string
      title: string
      body: string
      publicationDate: string
      authors: string
      tags: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModEditPost("${params.slug}","${params.title}","${params.body}","${params.publicationDate}","${params.authors}","${params.tags}")`, height);
      return;
    },
    async ModRemovePost(params: {
      slug: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModRemovePost("${params.slug}")`, height);
      return;
    },
    async ModAddCommenter(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModAddCommenter("${params.addr}")`, height);
      return;
    },
    async ModDelCommenter(params: {
      addr: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModDelCommenter("${params.addr}")`, height);
      return;
    },
    async ModDelComment(params: {
      slug: string
      index: bigint
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `ModDelComment("${params.slug}",${params.index})`, height);
      return;
    },
    async AddComment(params: {
      postSlug: string
      comment: string
    }, height?: number): Promise<void> {
      await wallet.getProvider().evaluateExpression(realm, `AddComment("${params.postSlug}","${params.comment}")`, height);
      return;
    },
    async Render(params: {
      path: string
    }, height?: number): Promise<RenderReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `Render("${params.path}")`, height);
      return _parseGnoReturns(result) as RenderReturn;
    },
    async RenderLastPostsWidget(params: {
      limit: bigint
    }, height?: number): Promise<RenderLastPostsWidgetReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `RenderLastPostsWidget(${params.limit})`, height);
      return _parseGnoReturns(result) as RenderLastPostsWidgetReturn;
    },
    async PostExists(params: {
      slug: string
    }, height?: number): Promise<PostExistsReturn> {
      const result = await wallet.getProvider().evaluateExpression(realm, `PostExists("${params.slug}")`, height);
      return _parseGnoReturns(result) as PostExistsReturn;
    },
  };
};

const txClient = (wallet: GnoWallet) => {
  return {
    async AdminSetAdminAddr(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AdminSetAdminAddr",
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
    async AdminSetInPause(params: {
      state: boolean
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AdminSetInPause",
        [String(params.state)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async AdminAddModerator(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AdminAddModerator",
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
    async AdminRemoveModerator(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AdminRemoveModerator",
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
    async NewPostProposalRequest(params: {
      slug: string
      title: string
      body: string
      publicationDate: string
      authors: string
      tags: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<NewPostProposalRequestReturn> {
      const resp = await wallet.callMethod(
        realm,
        "NewPostProposalRequest",
        [String(params.slug), String(params.title), String(params.body), String(params.publicationDate), String(params.authors), String(params.tags)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as NewPostProposalRequestReturn;
    },
    async ModAddPost(params: {
      slug: string
      title: string
      body: string
      publicationDate: string
      authors: string
      tags: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModAddPost",
        [String(params.slug), String(params.title), String(params.body), String(params.publicationDate), String(params.authors), String(params.tags)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async ModEditPost(params: {
      slug: string
      title: string
      body: string
      publicationDate: string
      authors: string
      tags: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModEditPost",
        [String(params.slug), String(params.title), String(params.body), String(params.publicationDate), String(params.authors), String(params.tags)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async ModRemovePost(params: {
      slug: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModRemovePost",
        [String(params.slug)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async ModAddCommenter(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModAddCommenter",
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
    async ModDelCommenter(params: {
      addr: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModDelCommenter",
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
    async ModDelComment(params: {
      slug: string
      index: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "ModDelComment",
        [String(params.slug), String(params.index)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
    },
    async AddComment(params: {
      postSlug: string
      comment: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<void> {
      const resp = await wallet.callMethod(
        realm,
        "AddComment",
        [String(params.postSlug), String(params.comment)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
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
    async RenderLastPostsWidget(params: {
      limit: bigint
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<RenderLastPostsWidgetReturn> {
      const resp = await wallet.callMethod(
        realm,
        "RenderLastPostsWidget",
        [String(params.limit)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as RenderLastPostsWidgetReturn;
    },
    async PostExists(params: {
      slug: string
    }, funds: Map<string, number>, maxDeposit: Map<string, number>, fee: TxFee): Promise<PostExistsReturn> {
      const resp = await wallet.callMethod(
        realm,
        "PostExists",
        [String(params.slug)],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        funds,
        maxDeposit,
        fee,
      );
      if (resp.deliver_tx.ResponseBase.Error) {
        throw new Error(resp.deliver_tx.ResponseBase.Log || JSON.stringify(resp.deliver_tx.ResponseBase.Error));
      }
      const result = atob(resp.deliver_tx.ResponseBase.Data as string);
      return _parseGnoReturns(result) as PostExistsReturn;
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
            blog: new RealmModule(wallet),
          },
        },
      },
    },
  };
};

export default Realm;
