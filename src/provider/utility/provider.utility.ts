import { stringToBase64 } from '@gnolang/tm2-js-client';

/**
 * Prepares the VM ABCI query params by concatenating them
 * with a newline separation and encoding them to base64
 * @param {string[]} params the params for the ABCI call
 */
export const prepareVMABCIQuery = (params: string[]): string => {
  if (params.length == 1) {
    return stringToBase64(params[0]);
  }

  return stringToBase64(params.join('\n'));
};

export const extractStringFromResponse = (abciData: string | null): string => {
  // Make sure the response is initialized
  if (!abciData) {
    throw new Error('ABCI response is not initialized');
  }

  // Extract the balances
  return Buffer.from(abciData, 'base64').toString();
};
