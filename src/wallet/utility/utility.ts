import {
  PubKeySecp256k1,
  Secp256k1PubKeyType,
  uint8ArrayToBase64,
} from "@gnolang/tm2-js-client";

import {
  MsgRun,
} from "../../proto/gno/vm.js";
import {
  Any,
  MsgAddPackage,
  MsgCall,
  MsgCreateSession,
  MsgRevokeAllSessions,
  MsgRevokeSession,
  MsgSend,
} from "../../proto/index.js";
import {
  MsgEndpoint,
} from "../endpoints.js";

/**
 * Converts a fund map to a concatenated string representation ("<value><denomination>")
 * @param funds
 */
export const fundsToCoins = (funds?: Map<string, number>): string => {
  if (!funds) {
    return "";
  }

  const result: string[] = [];

  funds.forEach((value: number, denomination: string) => {
    result.push(`${value}${denomination}`);
  });

  return result.join(",");
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
export const defaultTxFee = "1000000ugnot"; // 1 GNOT

export const PUB_KEY_SECP256K1_TYPE_URL = Secp256k1PubKeyType;

/**
 * Wraps a compressed secp256k1 public key into the TM2 protobuf Any format.
 * @param {Uint8Array} rawPubKeyBytes the compressed secp256k1 public key bytes
 */
export const secp256k1PubKeyToAny = (rawPubKeyBytes: Uint8Array): Any => ({
  type_url: PUB_KEY_SECP256K1_TYPE_URL,
  value: PubKeySecp256k1.encode({
    key: rawPubKeyBytes,
  }).finish(),
});

const pubKeyAnyToAminoJson = (pubKey: Any | undefined): unknown => {
  if (!pubKey) {
    return undefined;
  }
  if (pubKey.type_url !== PUB_KEY_SECP256K1_TYPE_URL) {
    return {
      type_url: pubKey.type_url,
      value: uint8ArrayToBase64(pubKey.value),
    };
  }

  return {
    "@type": pubKey.type_url,
    value: uint8ArrayToBase64(PubKeySecp256k1.decode(pubKey.value).key),
  };
};

/**
 * Decodes (and unrolls) Transaction messages into full objects
 * @param {Any[]} messages the encoded transaction messages
 */
export const decodeTxMessages = (messages: Any[]): unknown[] => {
  return messages.map((m: Any) => {
    switch (m.type_url) {
      case MsgEndpoint.MSG_CALL: {
        const decodedMessage = MsgCall.decode(m.value);
        const messageJson = MsgCall.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          send: "",
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_SEND: {
        const decodedMessage = MsgSend.decode(m.value);
        const messageJson = MsgSend.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_ADD_PKG: {
        const decodedMessage = MsgAddPackage.decode(m.value);
        const messageJson = MsgAddPackage.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_RUN: {
        const decodedMessage = MsgRun.decode(m.value);
        const messageJson = MsgRun.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_CREATE_SESSION: {
        const decodedMessage = MsgCreateSession.decode(m.value);
        const messageJson = MsgCreateSession.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
          session_key: pubKeyAnyToAminoJson(decodedMessage.session_key),
        };
      }
      case MsgEndpoint.MSG_REVOKE_SESSION: {
        const decodedMessage = MsgRevokeSession.decode(m.value);
        const messageJson = MsgRevokeSession.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
          session_key: pubKeyAnyToAminoJson(decodedMessage.session_key),
        };
      }
      case MsgEndpoint.MSG_REVOKE_ALL_SESSIONS: {
        const decodedMessage = MsgRevokeAllSessions.decode(m.value);
        const messageJson = MsgRevokeAllSessions.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      default:
        throw new Error(`unsupported message type ${m.type_url}`);
    }
  });
};
