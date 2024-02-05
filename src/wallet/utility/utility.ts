import { Any, MemPackage, MsgAddPackage, MsgCall, MsgSend } from '../../proto';
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
    switch (m.typeUrl) {
      case MsgEndpoint.MSG_CALL:
        return {
          '@type': m.typeUrl,
          ...MsgCall.decode(m.value),
        };
      case MsgEndpoint.MSG_SEND:
        return {
          '@type': m.typeUrl,
          ...MsgSend.decode(m.value),
        };
      case MsgEndpoint.MSG_ADD_PKG:
        const msgAddPkg = MsgAddPackage.decode(m.value);
        return {
          '@type': m.typeUrl,
          ...msgAddPkg,
          package: msgAddPkg.package
            ? mapToStdMemPackage(msgAddPkg.package)
            : undefined,
        };
      case MsgEndpoint.MSG_RUN:
        const msgRun = MsgRun.decode(m.value);
        return {
          '@type': m.typeUrl,
          ...msgRun,
          package: msgRun.package
            ? mapToStdMemPackage(msgRun.package)
            : undefined,
        };
      default:
        throw new Error(`unsupported message type ${m.typeUrl}`);
    }
  });
};

interface StdMemPackage {
  Name: string;
  Path: string;
  Files: {
    Name: string;
    Body: string;
  }[];
}

const mapToStdMemPackage = (memPackage: MemPackage): StdMemPackage => {
  const { name, path, files } = memPackage;
  return {
    Name: name,
    Path: path,
    Files: files.map((file) => ({
      Name: file.name,
      Body: file.body,
    })),
  };
};
