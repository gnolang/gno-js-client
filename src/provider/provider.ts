import {
  AbciQueryParams,
  ABCIResponse,
  adaptAbciQueryResponse,
  BaseTm2Provider,
  parseSignCoin,
  Provider,
  TxSignCoin,
} from "@gnolang/tm2-js-client";

import {
  ParamsEndpoint,
  VMEndpoint,
} from "./endpoints.js";
import {
  assertNoABCIError,
  ObjectNotFoundError,
} from "./errors/index.js";
import {
  EvalJSONResult,
  FunctionSignature,
  PackageDocumentation,
  RealmStorage,
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
   * Evaluates an expression in readonly mode and returns raw amino TypedValue JSON
   * @param {string} packagePath the gno package path
   * @param {string} expression the expression to be evaluated
   * @param {number} [height=0] the height for querying.
   */
  evaluateExpressionJSON(
    packagePath: string,
    expression: string,
    height?: number
  ): Promise<EvalJSONResult>

  /**
   * Fetches the storage size and deposit of a realm as uint64 bigints
   * @param {string} packagePath the gno realm path
   * @param {number} [height=0] the height for querying.
   */
  getRealmStorage(packagePath: string, height?: number): Promise<RealmStorage>

  /**
   * Fetches the storage price per byte (the vm storage_price param)
   * @param {number} [height=0] the height for querying.
   */
  getStoragePrice(height?: number): Promise<TxSignCoin>

  /**
   * Fetches the package documentation as the node's raw JSON
   * @param {string} packagePath the gno package path
   * @param {number} [height=0] the height for querying.
   */
  getPackageDocument(packagePath: string, height?: number): Promise<PackageDocumentation>

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
   * VM errors are returned in successful HTTP response through
   * `ResponseBase.Error`. The base provider converts these errors to a
   * generic `TM2Error`, so this override calls {@link assertNoABCIError}
   * first to preserve errors such as `InvalidPkgPathError`.
   * @param {AbciQueryParams} params the ABCI query parameters
   * @returns {Promise<ABCIResponse>} the ABCI response
   */
  override async abciQuery(params: AbciQueryParams): Promise<ABCIResponse> {
    const abciResponse = adaptAbciQueryResponse(
      await this.client.abciQuery(params),
    );

    assertNoABCIError(abciResponse.response.ResponseBase);

    return abciResponse;
  }

  async evaluateExpression(
    packagePath: string,
    expression: string,
    height?: number,
  ): Promise<string> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.EVALUATE}`,
      data: encodeVMQueryData([packagePath, expression], "."),
      height: height ?? 0,
      prove: false,
    });

    return extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async evaluateExpressionJSON(
    packagePath: string,
    expression: string,
    height?: number,
  ): Promise<EvalJSONResult> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.EVALUATE_JSON}`,
      data: encodeVMQueryData([packagePath, expression], "."),
      height: height ?? 0,
      prove: false,
    });

    const {
      Data,
    } = abciResponse.response.ResponseBase;
    const result = Data ? JSON.parse(extractStringFromResponse(Data)) : null;
    if (!Array.isArray(result?.results)) {
      throw new Error(`vm/${VMEndpoint.EVALUATE_JSON} response has no results array`);
    }

    return result;
  }

  async getRealmStorage(packagePath: string, height?: number): Promise<RealmStorage> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.STORAGE}`,
      data: encodeVMQueryData([packagePath]),
      height: height ?? 0,
      prove: false,
    });

    const raw = extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
    const match = /^storage: ([0-9]+), deposit: ([0-9]+)$/.exec(raw);
    if (!match) {
      throw new Error("Invalid vm/qstorage response: expected storage: <uint64>, deposit: <uint64>");
    }
    return {
      storage: BigInt(match[1]),
      deposit: BigInt(match[2]),
    };
  }

  async getStoragePrice(height?: number): Promise<TxSignCoin> {
    const abciResponse = await this.abciQuery({
      path: `params/${ParamsEndpoint.STORAGE_PRICE}`,
      data: new Uint8Array(),
      height: height ?? 0,
      prove: false,
    });

    const raw = extractStringFromResponse(abciResponse.response.ResponseBase.Data);
    const price: unknown = JSON.parse(raw);
    if (typeof price !== "string") {
      throw new Error("Invalid storage price response: expected a JSON coin string");
    }
    const coin = parseSignCoin(price)[0];
    if (!coin) {
      throw new Error("Invalid storage price response: expected a positive coin");
    }
    return coin;
  }

  async getPackageDocument(packagePath: string, height?: number): Promise<PackageDocumentation> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.DOC}`,
      data: encodeVMQueryData([packagePath]),
      height: height ?? 0,
      prove: false,
    });

    return JSON.parse(extractStringFromResponse(abciResponse.response.ResponseBase.Data));
  }

  async getFileContent(packagePath: string, height?: number): Promise<string> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.FILE_CONTENT}`,
      data: encodeVMQueryData([packagePath]),
      height: height ?? 0,
      prove: false,
    });

    return extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFunctionSignatures(
    packagePath: string,
    height?: number,
  ): Promise<FunctionSignature[]> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.FUNCTION_SIGNATURES}`,
      data: encodeVMQueryData([packagePath]),
      height: height ?? 0,
      prove: false,
    });

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
    const abciResponse = await this.abciQuery({
      path: `auth/accounts/${masterAddress}/sessions`,
      data: new Uint8Array(),
      height: height ?? 0,
      prove: false,
    });

    const {
      ResponseBase,
    } = abciResponse.response;

    // No sessions arrive as empty data or JSON null.
    const raw = extractOptionalStringFromResponse(ResponseBase.Data).trim();
    return ((raw ? JSON.parse(raw) : null) as unknown[] | null ?? []).map(normalizeSessionAccount);
  }

  async getSession(
    masterAddress: string,
    sessionAddress: string,
    height?: number,
  ): Promise<SessionAccountInfo> {
    const abciResponse = await this.abciQuery({
      path: `auth/accounts/${masterAddress}/session/${sessionAddress}`,
      data: new Uint8Array(),
      height: height ?? 0,
      prove: false,
    });

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
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.RENDER}`,
      data: encodeVMQueryData([packagePath, path], ":"),
      height: height ?? 0,
      prove: false,
    });

    return extractOptionalStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getRealmPaths(prefix: string): Promise<string[]> {
    const abciResponse = await this.abciQuery({
      path: `vm/${VMEndpoint.PATHS}`,
      data: encodeVMQueryData([prefix]),
      height: 0,
      prove: false,
    });

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
