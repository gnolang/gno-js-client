import {
  SessionAccountInfo,
} from "../types/index.js";

const encoder = new TextEncoder();

/**
 * Encodes VM query parameters into a Uint8Array suitable for abciQuery data.
 * Joins params with the given separator and encodes to UTF-8 bytes.
 * @param {string[]} params the params for the ABCI call
 * @param {string} separator the separator for ABCI call parameters (default: "")
 */
export const encodeVMQueryData = (
  params: string[],
  separator = "",
): Uint8Array => {
  return encoder.encode(params.join(separator));
};

export const extractStringFromResponse = (abciData: string | null): string => {
  // Make sure the response is initialized
  if (!abciData) {
    throw new Error("ABCI response is not initialized");
  }

  // Extract the balances
  return Buffer.from(abciData, "base64").toString();
};

/**
 * Decodes an ABCI payload that is allowed to be empty.
 *
 * A query can legitimately succeed and produce nothing — a `Render` that
 * returns an empty string, for instance. The response adapter collapses an
 * empty payload to `null`, so text results have to read a missing payload as
 * empty; whether the query actually failed has already been settled by
 * `assertNoABCIError`.
 * @param {string | null} abciData the base64 `ResponseBase.Data`
 */
export const extractOptionalStringFromResponse = (abciData: string | null): string => {
  return abciData ? Buffer.from(abciData, "base64").toString() : "";
};

export const toRecord = (value: unknown): Record<string, unknown> => {
  return value && typeof value === "object"
    ? value as Record<string, unknown>
    : {
    };
};

export const toNumberOrUndefined = (value: unknown): number | undefined => {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }
  return Number(value);
};

export const toStringOrUndefined = (value: unknown): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  return String(value);
};

export const toStringArrayOrUndefined = (value: unknown): string[] | undefined => {
  if (!Array.isArray(value)) {
    return undefined;
  }
  return value.map(String);
};

export const normalizeSessionAccount = (raw: unknown): SessionAccountInfo => {
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
