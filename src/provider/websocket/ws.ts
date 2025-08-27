import type { GnoProvider } from '../provider';
import {
  type ABCIResponse,
  ABCIEndpoint,
  newRequest,
  WSProvider,
} from '@gnolang/tm2-js-client';
import type { FunctionSignature } from '../types';
import { VMEndpoint } from '../endpoints';
import {
  extractStringFromResponse,
  prepareVMABCIEvaluateExpressionQuery,
  prepareVMABCIQuery,
  prepareVMABCIRenderQuery,
} from '../utility';

export class GnoWSProvider extends WSProvider implements GnoProvider {
  /**
   * Creates a new instance of the {@link GnoWSProvider}
   * @param {string} baseURL the WS URL of the node
   * @param {number} requestTimeout the timeout for the WS request (in MS)
   */
  constructor(baseURL: string, requestTimeout?: number) {
    super(baseURL, requestTimeout);
  }

  async evaluateExpression(
    packagePath: string,
    expression: string,
    _height?: number
  ): Promise<string> {
    const response = await this.sendRequest<ABCIResponse>(
      newRequest(ABCIEndpoint.ABCI_QUERY, [
        `vm/${VMEndpoint.EVALUATE}`,
        prepareVMABCIEvaluateExpressionQuery([packagePath, expression]),
        '0', // Height; not supported > 0 for now
        false,
      ])
    );

    // Parse the response
    const abciResponse = this.parseResponse<ABCIResponse>(response);

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFileContent(packagePath: string, _height?: number): Promise<string> {
    const response = await this.sendRequest<ABCIResponse>(
      newRequest(ABCIEndpoint.ABCI_QUERY, [
        `vm/${VMEndpoint.FILE_CONTENT}`,
        prepareVMABCIQuery([packagePath]),
        '0', // Height; not supported > 0 for now
        false,
      ])
    );

    // Parse the response
    const abciResponse = this.parseResponse<ABCIResponse>(response);

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }

  async getFunctionSignatures(
    packagePath: string,
    _height?: number
  ): Promise<FunctionSignature[]> {
    const response = await this.sendRequest<ABCIResponse>(
      newRequest(ABCIEndpoint.ABCI_QUERY, [
        `vm/${VMEndpoint.FUNCTION_SIGNATURES}`,
        prepareVMABCIQuery([packagePath]),
        '0', // Height; not supported > 0 for now
        false,
      ])
    );

    // Parse the response
    const abciResponse = this.parseResponse<ABCIResponse>(response);

    // Function signatures encoded in JSON
    const responseRaw: string = extractStringFromResponse(
      abciResponse.response.ResponseBase.Data
    );

    return JSON.parse(responseRaw);
  }

  async getRenderOutput(
    packagePath: string,
    path: string,
    _height?: number
  ): Promise<string> {
    const response = await this.sendRequest<ABCIResponse>(
      newRequest(ABCIEndpoint.ABCI_QUERY, [
        `vm/${VMEndpoint.RENDER}`,
        prepareVMABCIRenderQuery([packagePath, path]),
        '0', // Height; not supported > 0 for now
        false,
      ])
    );

    // Parse the response
    const abciResponse = this.parseResponse<ABCIResponse>(response);

    return extractStringFromResponse(abciResponse.response.ResponseBase.Data);
  }
}
