import { GnoProvider } from '../provider';
import {
  ABCIEndpoint,
  ABCIResponse,
  JSONRPCProvider,
  newRequest,
  RestService,
} from 'tm2-js-client';
import { FunctionSignature } from '../types';
import { VMEndpoint } from '../endpoints';
import { extractStringFromResponse, prepareVMABCIQuery } from '../utility';

/**
 * Provider based on JSON-RPC HTTP requests
 */
export class GnoJSONRPCProvider extends JSONRPCProvider implements GnoProvider {
  /**
   * Creates a new instance of the GNO JSON-RPC Provider
   * @param {string} baseURL the JSON-RPC URL of the node
   */
  constructor(baseURL: string) {
    super(baseURL);
  }

  async evaluateExpression(
    packagePath: string,
    expression: string,
    height?: number
  ): Promise<string> {
    const abciResponse: ABCIResponse = await RestService.post<ABCIResponse>(
      this.baseURL,
      {
        request: newRequest(ABCIEndpoint.ABCI_QUERY, [
          `vm/${VMEndpoint.EVALUATE}`,
          prepareVMABCIQuery([packagePath, expression]),
          '0', // Height; not supported > 0 for now
          false,
        ]),
      }
    );

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFileContent(packagePath: string, height?: number): Promise<string> {
    const abciResponse: ABCIResponse = await RestService.post<ABCIResponse>(
      this.baseURL,
      {
        request: newRequest(ABCIEndpoint.ABCI_QUERY, [
          `vm/${VMEndpoint.FILE_CONTENT}`,
          prepareVMABCIQuery([packagePath]),
          '0', // Height; not supported > 0 for now
          false,
        ]),
      }
    );

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFunctionSignatures(
    packagePath: string,
    height?: number
  ): Promise<FunctionSignature[]> {
    const abciResponse: ABCIResponse = await RestService.post<ABCIResponse>(
      this.baseURL,
      {
        request: newRequest(ABCIEndpoint.ABCI_QUERY, [
          `vm/${VMEndpoint.FUNCTION_SIGNATURES}`,
          prepareVMABCIQuery([packagePath]),
          '0', // Height; not supported > 0 for now
          false,
        ]),
      }
    );

    // Function signatures encoded in JSON
    const responseRaw: string = extractStringFromResponse(
      abciResponse.response.ResponseBase.Data
    );

    return JSON.parse(responseRaw);
  }

  async getRenderOutput(
    packagePath: string,
    path: string,
    height?: number
  ): Promise<string> {
    const abciResponse: ABCIResponse = await RestService.post<ABCIResponse>(
      this.baseURL,
      {
        request: newRequest(ABCIEndpoint.ABCI_QUERY, [
          `vm/${VMEndpoint.RENDER}`,
          prepareVMABCIQuery([packagePath, path]),
          '0', // Height; not supported > 0 for now
          false,
        ]),
      }
    );

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }
}
