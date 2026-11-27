import {
  type Tm2Client,
} from "@gnolang/tm2-js-client";
import {
  type AbciQueryResponse,
} from "@gnolang/tm2-rpc";

import {
  BaseGnoProvider,
} from "../index.js";

/**
 * Builds the raw RPC response a node sends, so a test can drive the same
 * `adaptAbciQueryResponse` path the provider uses instead of handing
 * `assertNoABCIError` an already-adapted object.
 * @param {object} [error] the amino-encoded `ResponseBase.error`
 * @param {string} [log] the raw `ResponseBase.log`
 * @param {string} [data] the `ResponseBase.data` payload, as text
 */
export const nodeResponse = (
  error?: Record<string, unknown>,
  log = "",
  data = "",
): AbciQueryResponse => {
  return {
    responseBase: {
      error: error as AbciQueryResponse["responseBase"]["error"],
      data: new TextEncoder().encode(data),
      events: [],
      log,
      info: "",
    },
    key: new Uint8Array(),
    value: new Uint8Array(),
    height: 0,
  };
};

// BaseTm2Provider's constructor is protected, so tests need a public one.
export class TestGnoProvider extends BaseGnoProvider {
  constructor(client: Tm2Client) {
    super(client);
  }
}
