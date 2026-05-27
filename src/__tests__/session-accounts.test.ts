import {
  PubKeySecp256k1,
  Secp256k1PubKeyType,
  uint8ArrayToBase64,
} from "@gnolang/tm2-js-client";
import {
  describe, expect, test,
} from "vitest";

import {
  decodeTxMessages,
  MsgCreateSession,
  MsgEndpoint,
  MsgRevokeAllSessions,
  MsgRevokeSession,
  secp256k1PubKeyToAny,
} from "../index.js";

describe("account session messages", () => {
  const sessionPubKey = Uint8Array.from([
    2,
    ...Array.from({
      length: 32,
    }, (_, index) => index + 1),
  ]);

  test("wraps compressed secp256k1 public keys as TM2 Any", () => {
    const wrapped = secp256k1PubKeyToAny(sessionPubKey);

    expect(wrapped.type_url).toBe(Secp256k1PubKeyType);
    expect(PubKeySecp256k1.decode(wrapped.value).key).toEqual(sessionPubKey);
  });

  test("encodes and decodes MsgCreateSession", () => {
    const sessionKey = secp256k1PubKeyToAny(sessionPubKey);
    const message = MsgCreateSession.create({
      creator: "g1master",
      session_key: sessionKey,
      expires_at: 1_700_000_000n,
      allow_paths: ["gno.land/r/demo/boards"],
      spend_limit: "1000ugnot",
      spend_period: 3600n,
    });

    const decoded = MsgCreateSession.decode(MsgCreateSession.encode(message).finish());

    expect(decoded).toEqual(message);
  });

  test("decodes account session transaction messages for signing", () => {
    const sessionKey = secp256k1PubKeyToAny(sessionPubKey);
    const createSession = MsgCreateSession.create({
      creator: "g1master",
      session_key: sessionKey,
      expires_at: 0n,
      allow_paths: [],
      spend_limit: "",
      spend_period: 0n,
    });
    const revokeSession = MsgRevokeSession.create({
      creator: "g1master",
      session_key: sessionKey,
    });
    const revokeAllSessions = MsgRevokeAllSessions.create({
      creator: "g1master",
    });

    expect(decodeTxMessages([
      {
        type_url: MsgEndpoint.MSG_CREATE_SESSION,
        value: MsgCreateSession.encode(createSession).finish(),
      },
      {
        type_url: MsgEndpoint.MSG_REVOKE_SESSION,
        value: MsgRevokeSession.encode(revokeSession).finish(),
      },
      {
        type_url: MsgEndpoint.MSG_REVOKE_ALL_SESSIONS,
        value: MsgRevokeAllSessions.encode(revokeAllSessions).finish(),
      },
    ])).toMatchObject([
      {
        "@type": MsgEndpoint.MSG_CREATE_SESSION,
        creator: "g1master",
        session_key: {
          "@type": Secp256k1PubKeyType,
          value: uint8ArrayToBase64(sessionPubKey),
        },
      },
      {
        "@type": MsgEndpoint.MSG_REVOKE_SESSION,
        creator: "g1master",
        session_key: {
          "@type": Secp256k1PubKeyType,
          value: uint8ArrayToBase64(sessionPubKey),
        },
      },
      {
        "@type": MsgEndpoint.MSG_REVOKE_ALL_SESSIONS,
        creator: "g1master",
      },
    ]);
  });
});
