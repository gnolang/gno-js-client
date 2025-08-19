import { type Any, MsgAddPackage, MsgCall, MsgSend } from '../../proto';
import { MsgRun } from '../../proto/gno/vm';
import { MsgEndpoint } from '../endpoints';

/**
 * Converts a fund map to a concatenated string representation ("<value><denomination>")
 * @param funds
 */
export const fundsToCoins = (funds?: Map<string, number>): string => {
  if (!funds) {
    return '';
  }

  const result: string[] = [];

  funds.forEach((value: number, denomination: string) => {
    result.push(`${value}${denomination}`);
  });

  return result.join(',');
};

/**
 * This is constant for now,
 * but should be fetched as an estimation
 * from the Tendermint node once this functionality
 * is available.
 *
 * Each package call / deployment
 * costs a fixed 1 GNOT
 * https://github.com/gnolang/gno/issues/649
 */
export const defaultTxFee = '1000000ugnot'; // 1 GNOT

/**
 * Decodes (and unrolls) Transaction messages into full objects
 * @param {Any[]} messages the encoded transaction messages
 */
export const decodeTxMessages = (messages: Any[]): any[] => {
  return messages.map((m: Any) => {
    switch (m.type_url) {
      case MsgEndpoint.MSG_CALL: {
        const decodedMessage = MsgCall.decode(m.value);
        const messageJson = MsgCall.toJSON(decodedMessage) as object;
        return {
          '@type': m.type_url,
          send: '',
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_SEND: {
        const decodedMessage = MsgSend.decode(m.value);
        const messageJson = MsgSend.toJSON(decodedMessage) as object;
        return {
          '@type': m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_ADD_PKG: {
        const decodedMessage = MsgAddPackage.decode(m.value);
        const messageJson = MsgAddPackage.toJSON(decodedMessage) as object;
        return {
          '@type': m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_RUN: {
        const decodedMessage = MsgRun.decode(m.value);
        const messageJson = MsgRun.toJSON(decodedMessage) as object;
        return {
          '@type': m.type_url,
          ...messageJson,
        };
      }
      default:
        throw new Error(`unsupported message type ${m.type_url}`);
    }
  });
};
