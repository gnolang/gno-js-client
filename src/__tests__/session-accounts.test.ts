import {
  PubKeySecp256k1,
  Secp256k1PubKeyType,
  TransactionEndpoint,
} from "@gnolang/tm2-js-client";
import {
  describe, expect, test, vi,
} from "vitest";

import {
  decodeTxMessages,
  GnoWallet,
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

  // upstream/master: auth/msgs.go omits empty limits/paths.
  function mockWallet() {
    const wallet = new GnoWallet();
    vi.spyOn(wallet, "getAddress").mockResolvedValue("g1master");
    const signSpy = vi.spyOn(wallet, "signTransaction").mockImplementation(async tx => tx);
    const sendSpy = vi.spyOn(wallet, "sendTransaction").mockResolvedValue({
    } as never);
    return {
      wallet,
      signSpy,
      sendSpy,
    };
  }

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

  test("includes spend limits and period in createSession signing JSON", async () => {
    const {
      wallet, signSpy,
    } = mockWallet();

    await wallet.createSession(
      secp256k1PubKeyToAny(sessionPubKey),
      0n,
      "5foo,10ugnot",
      ["*"],
      TransactionEndpoint.BROADCAST_TX_COMMIT,
      3600n,
    );

    expect(decodeTxMessages(signSpy.mock.calls[0][0].messages)).toEqual([
      {
        "@type": "/auth.m_create_session",
        creator: "g1master",
        session_key: {
          "@type": Secp256k1PubKeyType,
          value: "AgECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g",
        },
        expires_at: "0",
        allow_paths: ["*"],
        spend_limit: "5foo,10ugnot",
        spend_period: "3600",
      },
    ]);
  });

  test("decodes account session transaction messages for signing", () => {
    const sessionKey = secp256k1PubKeyToAny(sessionPubKey);
    const createSession = MsgCreateSession.create({
      creator: "g1master",
      session_key: sessionKey,
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
    ])).toEqual([
      {
        "@type": MsgEndpoint.MSG_CREATE_SESSION,
        creator: "g1master",
        session_key: {
          "@type": Secp256k1PubKeyType,
          value: "AgECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g",
        },
        expires_at: "0",
      },
      {
        "@type": MsgEndpoint.MSG_REVOKE_SESSION,
        creator: "g1master",
        session_key: {
          "@type": Secp256k1PubKeyType,
          value: "AgECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g",
        },
      },
      {
        "@type": MsgEndpoint.MSG_REVOKE_ALL_SESSIONS,
        creator: "g1master",
      },
    ]);
  });
});
