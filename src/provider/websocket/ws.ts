import {
  Tm2Client,
} from "@gnolang/tm2-rpc";

import {
  BaseGnoProvider,
} from "../provider";

/**
 * Provider based on WebSocket connections
 */
export class GnoWSProvider extends BaseGnoProvider {
  /**
   * Creates a new instance of the {@link GnoWSProvider}
   * @param {string} baseURL the WS URL of the node
   */
  static async create(baseURL: string): Promise<GnoWSProvider> {
    return new GnoWSProvider(await Tm2Client.connect(baseURL));
  }

  /**
   * Closes the WS connection
   */
  closeConnection(): void {
    this.client.disconnect();
  }
}
