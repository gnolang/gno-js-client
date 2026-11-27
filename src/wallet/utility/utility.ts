import {
  PubKeyMultisig,
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
  MsgEnablePackage,
  MsgRejectPackage,
  MsgRevokeAllSessions,
  MsgRevokeSession,
  MsgSend,
} from "../../proto/index.js";
import {
  MsgEndpoint,
} from "../endpoints.js";

/** Sorts a coin string by denomination and normalizes amounts, leaving unparseable input unchanged. */
export const sortCoins = (coins: string): string => {
  // Go strings.TrimSpace uses Unicode White_Space; reCoin allows only ASCII space between amount and denom.
  const parts = coins.split(",").map(coin => coin.replace(/^\p{White_Space}+|\p{White_Space}+$/gu, ""));
  if (parts.length === 1 && parts[0] === "") {
    return "";
  }

  // upstream/master:tm2/pkg/std/coin.go: reAmt, reSpc, reDnmString, and reCoin.
  const parsed = parts.map(coin => coin.match(/^([0-9]+)[\t\n\v\f\r ]*([a-z/][a-z0-9_.:/-]{2,})$/));
  if (!parsed.every((coin): coin is RegExpMatchArray => coin !== null)) {
    return coins;
  }

  return parsed
    .sort((a, b) => a[2] < b[2] ? -1 : a[2] > b[2] ? 1 : 0)
    .map(coin => `${BigInt(coin[1]).toString()}${coin[2]}`)
    .join(",");
};

/**
 * Converts a fund map to a concatenated string representation ("<value><denomination>")
 * @param funds
 */
export const fundsToCoins = (funds?: Map<string, number>): string => {
  if (!funds) {
    return "";
  }

  return [...funds]
    .filter(([denomination, amount]) => {
      if (amount < 0) {
        throw new Error(`invalid coin amount: ${amount}${denomination}`);
      }

      return amount !== 0;
    })
    .sort(([a], [b]) => a < b ? -1 : a > b ? 1 : 0)
    .map(([denomination, amount]) => `${amount}${denomination}`)
    .join(",");
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
const PUB_KEY_ED25519_TYPE_URL = "/tm.PubKeyEd25519";
const PUB_KEY_MULTISIG_TYPE_URL = "/tm.PubKeyMultisig";

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
  if (pubKey.type_url === PUB_KEY_MULTISIG_TYPE_URL) {
    const decoded = PubKeyMultisig.decode(pubKey.value);
    return {
      "@type": pubKey.type_url,
      threshold: decoded.k.toString(),
      pubkeys: decoded.pub_keys.map(pubKeyAnyToAminoJson),
    };
  }
  if (pubKey.type_url !== PUB_KEY_SECP256K1_TYPE_URL && pubKey.type_url !== PUB_KEY_ED25519_TYPE_URL) {
    throw new Error(`unsupported session public key type ${pubKey.type_url}`);
  }

  return {
    "@type": pubKey.type_url,
    // Upstream crypto/{ed25519,secp256k1}/*.proto both encode the raw key as field 1 bytes.
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
        const messageJson = MsgRun.toJSON(decodedMessage) as Record<string, unknown>;
        if (decodedMessage.max_send === "") {
          delete messageJson.max_send;
        }
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_ENABLE_PKG: {
        const decodedMessage = MsgEnablePackage.decode(m.value);
        const messageJson = MsgEnablePackage.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_REJECT_PKG: {
        const decodedMessage = MsgRejectPackage.decode(m.value);
        const messageJson = MsgRejectPackage.toJSON(decodedMessage) as object;
        return {
          "@type": m.type_url,
          ...messageJson,
        };
      }
      case MsgEndpoint.MSG_CREATE_SESSION: {
        const decodedMessage = MsgCreateSession.decode(m.value);
        return {
          "@type": m.type_url,
          creator: decodedMessage.creator,
          session_key: pubKeyAnyToAminoJson(decodedMessage.session_key),
          expires_at: decodedMessage.expires_at.toString(),
          ...(decodedMessage.allow_paths.length > 0 && {
            allow_paths: decodedMessage.allow_paths,
          }),
          ...(decodedMessage.spend_limit !== "" && {
            spend_limit: decodedMessage.spend_limit,
          }),
          ...(decodedMessage.spend_period !== 0n && {
            spend_period: decodedMessage.spend_period.toString(),
          }),
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
