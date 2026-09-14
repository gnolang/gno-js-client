import {
  describe, expect, test,
} from "vitest";

import {
  decodeTxMessages,
  MsgEnablePackage,
  MsgEndpoint,
  MsgRejectPackage,
} from "../index.js";

describe("package approval messages", () => {
  test("decodes enable and reject package messages", () => {
    const enablePackage = MsgEnablePackage.create({
      approver: "g1approver",
      pkg_path: "gno.land/r/demo/foo",
      pkg_hash: "abc123",
      pkg_height: 42n,
    });
    const rejectPackage = MsgRejectPackage.create({
      sender: "g1sender",
      pkg_path: "gno.land/r/demo/foo",
    });

    expect(decodeTxMessages([
      {
        type_url: MsgEndpoint.MSG_ENABLE_PKG,
        value: MsgEnablePackage.encode(enablePackage).finish(),
      },
      {
        type_url: MsgEndpoint.MSG_REJECT_PKG,
        value: MsgRejectPackage.encode(rejectPackage).finish(),
      },
    ])).toEqual([
      {
        "@type": MsgEndpoint.MSG_ENABLE_PKG,
        approver: "g1approver",
        pkg_path: "gno.land/r/demo/foo",
        pkg_hash: "abc123",
        pkg_height: "42",
      },
      {
        "@type": MsgEndpoint.MSG_REJECT_PKG,
        sender: "g1sender",
        pkg_path: "gno.land/r/demo/foo",
      },
    ]);
  });
});
