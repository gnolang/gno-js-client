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
  FunctionSignature,
  SessionAccountInfo,
} from "./types/index.js";
import {
  encodeVMQueryData,
  extractStringFromResponse,
} from "./utility/index.js";

const toRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === "object"
    ? value as Record<string, unknown>
    : {
    };
};

const toNumberOrUndefined = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  return Number(value);
};

const toStringOrUndefined = (value: unknown): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return String(value);
};

const toStringArrayOrUndefined = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }
  return value.map(String);
};

const normalizeSessionAccount = (raw: unknown): SessionAccountInfo => {
  const obj = toRecord(raw);
  const baseSession = toRecord(obj.BaseSessionAccount ?? obj.base_session_account ?? obj);
  const baseAccount = toRecord(baseSession.BaseAccount ?? baseSession.base_account ?? baseSession);
  const allowPaths = toStringArrayOrUndefined(obj.allow_paths)
    ?? toStringArrayOrUndefined(baseSession.allow_paths)
    ?? toStringArrayOrUndefined(baseAccount.allow_paths);

  return {
    address: String(baseAccount.address ?? ""),
    public_key: baseAccount.public_key ?? baseAccount.pub_key,
    account_number: toStringOrUndefined(baseAccount.account_number),
    sequence: toStringOrUndefined(baseAccount.sequence),
    master_address: String(baseSession.master_address ?? ""),
    expires_at: toNumberOrUndefined(baseSession.expires_at),
    spend_limit: toStringOrUndefined(baseSession.spend_limit),
    spend_period: toNumberOrUndefined(baseSession.spend_period),
    spend_used: toStringOrUndefined(baseSession.spend_used),
    spend_reset: toNumberOrUndefined(baseSession.spend_reset),
    allow_paths: allowPaths,
  };
};

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
  private async abciQuery(path: string, data: Uint8Array, height?: number): Promise<ABCIResponse> {
    return adaptAbciQueryResponse(
      await this.client.abciQuery({
        path,
        data,
        height: height ?? 0,
        prove: false,
      }),
    );
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

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFileContent(packagePath: string, height?: number): Promise<string> {
    const abciResponse = await this.abciQuery(
      `vm/${VMEndpoint.FILE_CONTENT}`,
      encodeVMQueryData([packagePath]),
      height,
    );

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
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

    if (ResponseBase.Error) {
      throw new Error(
        `ABCI error querying ${packagePath}: ${ResponseBase.Log || JSON.stringify(ResponseBase.Error)}`,
      );
    }

    const responseRaw: string = extractStringFromResponse(ResponseBase.Data);

    return JSON.parse(responseRaw);
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

    if (ResponseBase.Error) {
      throw new Error(ResponseBase.Log || JSON.stringify(ResponseBase.Error));
    }
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

    if (ResponseBase.Error) {
      throw new Error(ResponseBase.Log || JSON.stringify(ResponseBase.Error));
    }

    const raw = extractStringFromResponse(ResponseBase.Data);
    return normalizeSessionAccount(JSON.parse(raw));
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

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getRealmPaths(prefix: string): Promise<string[]> {
    const abciResponse = await this.abciQuery(
      "vm/qpaths",
      encodeVMQueryData([prefix]),
    );

    const {
      ResponseBase,
    } = abciResponse.response;

    if (ResponseBase.Error) {
      throw new Error(ResponseBase.Log || JSON.stringify(ResponseBase.Error));
    }
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
