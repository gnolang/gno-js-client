import {
  PubKeyMultisig,
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
  const sessionKeyJSON = {
    "@type": Secp256k1PubKeyType,
    value: "AgECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8g",
  };

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

  // upstream/master: auth/msgs.go omits empty limits/paths; std/coin.go sorts denoms.
  test("includes sorted spend limits and period in createSession signing JSON", async () => {
    const wallet = new GnoWallet();
    vi.spyOn(wallet, "getAddress").mockResolvedValue("g1master");
    const signSpy = vi.spyOn(wallet, "signTransaction").mockImplementation(async tx => tx);
    vi.spyOn(wallet, "sendTransaction").mockResolvedValue({
    } as never);

    await wallet.createSession(
      secp256k1PubKeyToAny(sessionPubKey),
      0n,
      "10ugnot,5foo",
      ["*"],
      TransactionEndpoint.BROADCAST_TX_COMMIT,
      3600n,
    );

    expect(decodeTxMessages(signSpy.mock.calls[0][0].messages)).toEqual([
      {
        "@type": MsgEndpoint.MSG_CREATE_SESSION,
        creator: "g1master",
        session_key: sessionKeyJSON,
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
        session_key: sessionKeyJSON,
        expires_at: "0",
      },
      {
        "@type": MsgEndpoint.MSG_REVOKE_SESSION,
        creator: "g1master",
        session_key: sessionKeyJSON,
      },
      {
        "@type": MsgEndpoint.MSG_REVOKE_ALL_SESSIONS,
        creator: "g1master",
      },
    ]);
  });

  // upstream/master: crypto amino encodes keys as base64 or threshold/pubkeys.
  test("decodes ed25519 and multisig session keys for signing", () => {
    const ed25519Key = {
      type_url: "/tm.PubKeyEd25519",
      value: Uint8Array.from([10, 32, ...sessionPubKey.slice(1)]),
    };
    const multisigKey = {
      type_url: "/tm.PubKeyMultisig",
      value: PubKeyMultisig.encode({
        k: 1n,
        pub_keys: [ed25519Key],
      }).finish(),
    };
    const ed25519JSON = {
      "@type": "/tm.PubKeyEd25519",
      value: "AQIDBAUGBwgJCgsMDQ4PEBESExQVFhcYGRobHB0eHyA=",
    };
    const multisigJSON = {
      "@type": "/tm.PubKeyMultisig",
      threshold: "1",
      pubkeys: [ed25519JSON],
    };
    for (const [session_key, expected] of [[ed25519Key, ed25519JSON], [multisigKey, multisigJSON]] as const) {
      expect(decodeTxMessages([
        {
          type_url: MsgEndpoint.MSG_CREATE_SESSION,
          value: MsgCreateSession.encode(MsgCreateSession.create({
            creator: "g1master",
            session_key,
          })).finish(),
        },
      ])).toEqual([
        {
          "@type": MsgEndpoint.MSG_CREATE_SESSION,
          creator: "g1master",
          session_key: expected,
          expires_at: "0",
        },
      ]);
    }
  });

  test("rejects unknown session key types", () => {
    expect(() => decodeTxMessages([
      {
        type_url: MsgEndpoint.MSG_CREATE_SESSION,
        value: MsgCreateSession.encode(MsgCreateSession.create({
          session_key: {
            type_url: "/unknown.PubKey",
            value: new Uint8Array(),
          },
        })).finish(),
      },
    ])).toThrow("unsupported session public key type /unknown.PubKey");
  });
});
