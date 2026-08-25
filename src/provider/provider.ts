import {
  ABCIResponse,
  adaptAbciQueryResponse,
  BaseTm2Provider,
  Provider,
} from "@gnolang/tm2-js-client";

import {
  VMEndpoint,
} from "./endpoints.js";
import {
  assertNoABCIError,
  ObjectNotFoundError,
} from "./errors/index.js";
import {
  FunctionSignature,
  SessionAccountInfo,
} from "./types/index.js";
import {
  encodeVMQueryData,
  extractOptionalStringFromResponse,
  extractStringFromResponse,
  normalizeSessionAccount,
} from "./utility/index.js";

/**
 * GnoProvider is the Provider interface for Gno-specific functionality
 */
export interface GnoProvider extends Provider {
  /**
   * Executes the Render(<path>) method in read-only mode
   * @param {string} packagePath the gno package path
   * @param {string} path the render path
   * @param {number} [height=0] the height for querying.
   */
  getRenderOutput(
    packagePath: string,
    path: string,
    height?: number
  ): Promise<string>

  /**
   * Fetches public facing function signatures
   * @param {string} packagePath the gno package path
   * @param {number} [height=0] the height for querying.
   */
  getFunctionSignatures(
    packagePath: string,
    height?: number
  ): Promise<FunctionSignature[]>

  /**
   * Fetches all account sessions for a master address.
   * @param {string} masterAddress the bech32 address of the master account
   * @param {number} [height=0] the height for querying.
   */
  getSessions(
    masterAddress: string,
    height?: number
  ): Promise<SessionAccountInfo[]>

  /**
   * Fetches a single account session.
   * @param {string} masterAddress the bech32 address of the master account
   * @param {string} sessionAddress the bech32 address of the session account
   * @param {number} [height=0] the height for querying.
   */
  getSession(
    masterAddress: string,
    sessionAddress: string,
    height?: number
  ): Promise<SessionAccountInfo>

  /**
   * Evaluates any expression in readonly mode and returns the results
   * @param {string} packagePath the gno package path
   * @param {string} expression the expression to be evaluated
   * @param {number} [height=0] the height for querying.
   */
  evaluateExpression(
    packagePath: string,
    expression: string,
    height?: number
  ): Promise<string>

  /**
   * Fetches the file content, or the list of files if the path is a directory
   * @param {string} packagePath the gno package path
   * @param {number} [height=0] the height for querying.
   */
  getFileContent(packagePath: string, height?: number): Promise<string>
}

/**
 * Base implementation of GnoProvider backed by a Tm2Client.
 * Provides all VM query methods; subclasses only need a static `create()` factory.
 */
export abstract class BaseGnoProvider extends BaseTm2Provider implements GnoProvider {
  /**
   * Runs an ABCI query and surfaces node-side failures as typed errors.
   *
   * A VM-level failure is not a transport error: it comes back as a regular
   * HTTP 200 response with `ResponseBase.Error` set and `Data` null. Checking
   * it here — rather than in each caller — is what keeps "package not found"
   * distinguishable from "package declares no Render".
   * @param {string} path the ABCI query path
   * @param {Uint8Array} data the query payload
   * @param {number} [height=0] the height for querying.
   */
  private async abciQuery(path: string, data: Uint8Array, height?: number): Promise<ABCIResponse> {
    const abciResponse = adaptAbciQueryResponse(
      await this.client.abciQuery({
        path,
        data,
        height: height ?? 0,
        prove: false,
      }),
    );

    assertNoABCIError(abciResponse.response.ResponseBase);

    return abciResponse;
  }

  async evaluateExpression(
    packagePath: string,
    expression: string,
    height?: number,
  ): Promise<string> {
    const abciResponse = await this.abciQuery(
      `vm/${VMEndpoint.EVALUATE}`,
      encodeVMQueryData([packagePath, expression], "."),
      height,
    );

    return extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFileContent(packagePath: string, height?: number): Promise<string> {
    const abciResponse = await this.abciQuery(
      `vm/${VMEndpoint.FILE_CONTENT}`,
      encodeVMQueryData([packagePath]),
      height,
    );

    return extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFunctionSignatures(
    packagePath: string,
    height?: number,
  ): Promise<FunctionSignature[]> {
    const abciResponse = await this.abciQuery(
      `vm/${VMEndpoint.FUNCTION_SIGNATURES}`,
      encodeVMQueryData([packagePath]),
      height,
    );

    const {
      ResponseBase,
    } = abciResponse.response;

    // A package that exports nothing is a success with an empty payload, not a
    // failure — `assertNoABCIError` has already ruled the latter out.
    if (!ResponseBase.Data) {
      return [];
    }

    return JSON.parse(extractStringFromResponse(ResponseBase.Data));
  }

  async getSessions(masterAddress: string, height?: number): Promise<SessionAccountInfo[]> {
    const abciResponse = await this.abciQuery(
      `auth/accounts/${masterAddress}/sessions`,
      new Uint8Array(),
      height,
    );

    const {
      ResponseBase,
    } = abciResponse.response;

    if (!ResponseBase.Data) {
      return [];
    }

    const raw = extractStringFromResponse(ResponseBase.Data);
    if (raw.trim() === "") {
      return [];
    }

    return (JSON.parse(raw) as unknown[]).map(normalizeSessionAccount);
  }

  async getSession(
    masterAddress: string,
    sessionAddress: string,
    height?: number,
  ): Promise<SessionAccountInfo> {
    const abciResponse = await this.abciQuery(
      `auth/accounts/${masterAddress}/session/${sessionAddress}`,
      new Uint8Array(),
      height,
    );

    const {
      ResponseBase,
    } = abciResponse.response;

    // A node on a current tm2 reports a missing session as
    // `/std.SessionNotFoundError`, which `assertNoABCIError` has already
    // raised. This covers the remaining shape — a success carrying no account —
    // so that it too names the condition instead of leaking
    // "ABCI response is not initialized".
    if (!ResponseBase.Data) {
      throw new ObjectNotFoundError(
        `no session ${sessionAddress} for master account ${masterAddress}`,
      );
    }

    return normalizeSessionAccount(
      JSON.parse(extractStringFromResponse(ResponseBase.Data)),
    );
  }

  async getRenderOutput(
    packagePath: string,
    path: string,
    height?: number,
  ): Promise<string> {
    const abciResponse = await this.abciQuery(
      `vm/${VMEndpoint.RENDER}`,
      encodeVMQueryData([packagePath, path], ":"),
      height,
    );

    return extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getRealmPaths(prefix: string): Promise<string[]> {
    const abciResponse = await this.abciQuery(
      "vm/qpaths",
      encodeVMQueryData([prefix]),
    );

    const {
      ResponseBase,
    } = abciResponse.response;

    if (!ResponseBase.Data) {
      return [];
    }

    const raw = extractStringFromResponse(ResponseBase.Data);
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return parsed.map((p: any) => (typeof p === "string" ? p : p.path));
      }
    }
    catch {
      // Not JSON, treat as newline-separated paths
    }
    return raw.split("\n").filter(p => p.length > 0);
  }
}
