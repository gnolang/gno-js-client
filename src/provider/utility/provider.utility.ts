import { stringToBase64 } from '@gnolang/tm2-js-client';

/**
 * Prepares the VM ABCI query params by concatenating them
 * with new line or "." or ":" characters separation and encoding them to base64
 * `evaluateExpression` uses the "." character to separate parameters.
 * `getRenderOutput` uses the ":" character to separate parameters.
 * @param {string[]} params the params for the ABCI call
 * @param {string} separator the separator for ABCI call parameters (default: "\n")
 */
export const prepareVMABCIQuery = (
  params: string[],
  separator = '\n'
): string => {
  if (params.length == 1) {
    return stringToBase64(params[0]);
  }

  return stringToBase64(params.join(separator));
};

/**
 * Prepare the VM ABCI `evaluateExpression` query parameters by concatenating them
 * with the "." character delimiter and encoding them with base64.
 * @param {string[]} params the params for the ABCI call
 */
export const prepareVMABCIEvaluateExpressionQuery = (
  params: string[]
): string => {
  return prepareVMABCIQuery(params, '.');
};

/**
 * Prepare the VM ABCI `render` query parameters by concatenating them
 * with the ":" character delimiter and encoding them with base64.
 * @param {string[]} params the params for the ABCI call
 */
export const prepareVMABCIRenderQuery = (params: string[]): string => {
  return prepareVMABCIQuery(params, ':');
};

export const extractStringFromResponse = (abciData: string | null): string => {
  // Make sure the response is initialized
  if (!abciData) {
    throw new Error('ABCI response is not initialized');
  }

  // Extract the balances
  return Buffer.from(abciData, 'base64').toString();
};
