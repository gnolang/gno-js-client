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
