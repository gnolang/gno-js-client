import {
  describe,
  expect,
  test,
} from "vitest";

import {
  sortCoins,
} from "../index.js";

// upstream/master:tm2/pkg/std/coin.go: ParseCoins trims and sorts denoms; MarshalAmino uses Coins.String() with normalized amounts.
describe("sortCoins", () => {
  test.each`
    coins                         | expected
    ${"10ugnot,5foo"}              | ${"5foo,10ugnot"}
    ${"007ugnot,05foo"}            | ${"5foo,7ugnot"}
    ${"007ugnot,invalid,05foo"}    | ${"007ugnot,invalid,05foo"}
    ${""}                         | ${""}
    ${" "}                        | ${""}
  `("sorts or preserves '$coins'", ({
    coins,
    expected,
  }) => {
    expect(sortCoins(coins)).toBe(expected);
  });
});
