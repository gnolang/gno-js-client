import {
  Tm2Client,
} from "@gnolang/tm2-rpc";

import {
  BaseGnoProvider,
} from "../provider";

/**
 * Provider based on JSON-RPC HTTP requests
 */
export class GnoJSONRPCProvider extends BaseGnoProvider {
  /**
   * Creates a new instance of the GNO JSON-RPC Provider
   * @param {string} baseURL the JSON-RPC URL of the node
   */
  static async create(baseURL: string): Promise<GnoJSONRPCProvider> {
    return new GnoJSONRPCProvider(await Tm2Client.connect(baseURL));
  }
}
