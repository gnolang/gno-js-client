# Changelog

All published versions of `@gnolang/gno-js-client` and the commits they correspond to.
Dates are npm publish dates (UTC). Commit hashes point to `main` unless noted.

This file was reconstructed from git history and npm publish metadata to address
[#241](https://github.com/gnolang/gno-js-client/issues/241). Going forward, please
keep it up to date as part of the release process.

## [2.0.2] - 2026-04-01

Commit: [`0c078d6`](https://github.com/gnolang/gno-js-client/commit/0c078d69cad9f5851ac919d6140ff55a4cd3b1c5)

- chore: Bump `@gnolang/tm2-js-client` and remove treeshaking from build (`0c078d6`)

## [2.0.1] - 2026-04-01

Commit: no dedicated commit on `main` (published from an uncommitted local state between
`8bd1756` and `0c078d6`; closest tracked commit: [`8bd1756`](https://github.com/gnolang/gno-js-client/commit/8bd1756f7e604b2b88f92cbf4e8ea3670c2dbc4b)).

Functionally a re-publish between 2.0.0 and 2.0.2 with no recorded source changes; prefer 2.0.2.

## [2.0.0] - 2026-03-31

Commit: [`7b39384`](https://github.com/gnolang/gno-js-client/commit/7b393844ef322fbb16eff6ac21671c0030efa7f7) (latest commit at publish time; bump-to-2.0.0 was [`0ef402b`](https://github.com/gnolang/gno-js-client/commit/0ef402b989237b795faf9d3cb41015bbcca8a070))

Major release. The PR that landed this on `main` is [#238](https://github.com/gnolang/gno-js-client/pull/238); contents were published from `feat/version-2.0` before that merge.

**Breaking changes**
- ESM-compatible imports; package now ships dual ESM/CJS (`7b39384`, [#238](https://github.com/gnolang/gno-js-client/pull/238))
- Build system replaced (now uses `tsdown`); update deps (`0ef402b`, [#238](https://github.com/gnolang/gno-js-client/pull/238))
- Treeshaking disabled on the bundle (`0c078d6`)
- Bump `@gnolang/tm2-js-client` to a 2.x-compatible version (`0c078d6`)

**Features**
- Extensible client architecture with better `GnoWallet` typing and adjusted return types for transactions ([#236](https://github.com/gnolang/gno-js-client/pull/236))
- Workflows migrated to `pnpm` (`8bd1756`, [#238](https://github.com/gnolang/gno-js-client/pull/238))

**Maintenance / deps (since 1.4.5)**
- [#229](https://github.com/gnolang/gno-js-client/pull/229) bump tar
- [#227](https://github.com/gnolang/gno-js-client/pull/227) bump prettier 3.6.2 → 3.8.1
- [#226](https://github.com/gnolang/gno-js-client/pull/226) bump @types/node 24.7.0 → 25.0.10
- [#225](https://github.com/gnolang/gno-js-client/pull/225) bump eslint group
- [#224](https://github.com/gnolang/gno-js-client/pull/224) bump actions group
- [#223](https://github.com/gnolang/gno-js-client/pull/223) bump npm_and_yarn group

## [1.4.5] - 2025-10-08

Commit: [`d0de0c4`](https://github.com/gnolang/gno-js-client/commit/d0de0c47fa3554780aafedd5a5d8379817fcf298) ("Bump version")

- feat: remove amino-json patch ([#199](https://github.com/gnolang/gno-js-client/pull/199))
- chore(deps-dev): everything-else group ([#201](https://github.com/gnolang/gno-js-client/pull/201))
- chore(deps-dev): @types/node 24.3.0 → 24.5.2 ([#202](https://github.com/gnolang/gno-js-client/pull/202))
- chore(deps-dev): eslint group ([#203](https://github.com/gnolang/gno-js-client/pull/203))

## [1.4.4] - 2025-09-08

Commit: [`d2401c0`](https://github.com/gnolang/gno-js-client/commit/d2401c011cb721856e966d2c29c5c6c812fe8173) ([#191](https://github.com/gnolang/gno-js-client/pull/191))

- chore(deps): everything-else group, 2 updates ([#191](https://github.com/gnolang/gno-js-client/pull/191))
- chore(deps-dev): eslint group ([#190](https://github.com/gnolang/gno-js-client/pull/190))

## [1.4.3] - 2025-09-04

Commit: [`518b018`](https://github.com/gnolang/gno-js-client/commit/518b0186be079dda9ff9b4a7d5dec62d86c435d0) ("Bump version")

- chore: change proto generate script to apply compatibility patch ([#187](https://github.com/gnolang/gno-js-client/pull/187))

## [1.4.2] - 2025-08-27

Commit: [`d6cd18d`](https://github.com/gnolang/gno-js-client/commit/d6cd18d3576a3aa6623917d73d5505a6db0b47e0) ([#189](https://github.com/gnolang/gno-js-client/pull/189))

- feat: proto/amino compatibility hack ([#184](https://github.com/gnolang/gno-js-client/pull/184))
- chore: export `MsgRun` from proto ([#185](https://github.com/gnolang/gno-js-client/pull/185))
- fix: correct `MsgCall` args field tag number in protobuf encoding ([#186](https://github.com/gnolang/gno-js-client/pull/186))
- chore(deps): everything-else group, 9 updates ([#189](https://github.com/gnolang/gno-js-client/pull/189))
- chore(deps): bump actions/checkout 4 → 5 ([#182](https://github.com/gnolang/gno-js-client/pull/182))

## [1.4.1] - 2025-07-25

Commit: [`7f06f99`](https://github.com/gnolang/gno-js-client/commit/7f06f991e54b562142cdbb9cbbd9c33fc3bb00d7) ("Bump version")

- fix: order of columns in proto ([#178](https://github.com/gnolang/gno-js-client/pull/178))

## [1.4.0] - 2025-07-25

Commit: [`21cfea9`](https://github.com/gnolang/gno-js-client/commit/21cfea93581564cb43c7cb3287c58b60a514d61c) ([#177](https://github.com/gnolang/gno-js-client/pull/177))

- feat: update proto messages ([#177](https://github.com/gnolang/gno-js-client/pull/177))
- chore(deps): everything-else group, 18 updates ([#176](https://github.com/gnolang/gno-js-client/pull/176)) — also bumped package version to 1.3.3 in source, but 1.3.3 was never published.

## [1.3.2] - 2025-01-16

Commit: [`cb04b9d`](https://github.com/gnolang/gno-js-client/commit/cb04b9dc1e9c30bbc768c3c7b054224a6393f047) ("Bump version")

- feat: add custom signer support ([#164](https://github.com/gnolang/gno-js-client/pull/164))
- chore(deps): everything-else group, 3 updates ([#149](https://github.com/gnolang/gno-js-client/pull/149))

## [1.3.1] - 2024-09-19

Commit: [`115afac`](https://github.com/gnolang/gno-js-client/commit/115afac4d61f67da58ac5c9f06c5f108a505562b) ([#146](https://github.com/gnolang/gno-js-client/pull/146))

- chore(deps): everything-else group, 8 updates ([#146](https://github.com/gnolang/gno-js-client/pull/146))
- chore(deps): everything-else group, 2 updates ([#138](https://github.com/gnolang/gno-js-client/pull/138))

## [1.3.0] - 2024-06-26

Commit: [`c5c3f94`](https://github.com/gnolang/gno-js-client/commit/c5c3f9431b0891d7be827c115de4056855f4a172) ([#132](https://github.com/gnolang/gno-js-client/pull/132))

- feat: lowercase the field names for `MsgCall` ([#132](https://github.com/gnolang/gno-js-client/pull/132)) — wire-format-affecting change
- feat: add the changed syntax of the ABCI query ([#129](https://github.com/gnolang/gno-js-client/pull/129))
- fix: ensure proto defaults in JSON ([#133](https://github.com/gnolang/gno-js-client/pull/133))
- docs: README update ([#110](https://github.com/gnolang/gno-js-client/pull/110))

## [1.2.3] - 2024-04-29

Commit: [`cb5d9ed`](https://github.com/gnolang/gno-js-client/commit/cb5d9ed27abb1e50a932007c06a5f6a6de7b9b70) ("Update @gnolang/tm2-js-client")

- Update `@gnolang/tm2-js-client`
- chore(deps): bump ts-proto 1.171.0 → 1.172.0 ([#106](https://github.com/gnolang/gno-js-client/pull/106))

## [1.2.2] - 2024-04-06

Commit: [`25d85d3`](https://github.com/gnolang/gno-js-client/commit/25d85d36ab3adf2d2522cefd935b12a8c5db0fa8) ("Bump version")

- fix: include `send` property in `MsgCall` to resolve invalid signature error ([#100](https://github.com/gnolang/gno-js-client/pull/100))
- chore(deps): actions group, 2 updates ([#101](https://github.com/gnolang/gno-js-client/pull/101))
- chore(deps): @types/node 20.11.10 → 20.12.5 ([#103](https://github.com/gnolang/gno-js-client/pull/103))
- chore(deps): everything-else group, 3 updates ([#104](https://github.com/gnolang/gno-js-client/pull/104))

## [1.2.1] - 2024-03-11

Commit: [`0d6d321`](https://github.com/gnolang/gno-js-client/commit/0d6d3219699b71a0f05d09a0f86bc26384450b18) ("Bump package version")

- fix: sign `addpkg` with empty deposit ([#94](https://github.com/gnolang/gno-js-client/pull/94))
- chore(deps): bump typescript 5.3.2 → 5.4.2 ([#96](https://github.com/gnolang/gno-js-client/pull/96))
- chore(deps): bump ts-proto 1.167.2 → 1.168.0 ([#95](https://github.com/gnolang/gno-js-client/pull/95))
- chore(deps): bump eslint 8.56.0 → 8.57.0 ([#93](https://github.com/gnolang/gno-js-client/pull/93))

## [1.2.0] - 2024-02-12

Commit: [`e5700f0`](https://github.com/gnolang/gno-js-client/commit/e5700f056fc9c5bf59f76db237ed16020ac0599b) ("Bump minor version")

- feat: add support for `MsgRun` transaction execution ([#91](https://github.com/gnolang/gno-js-client/pull/91))
- chore(deps): bump prettier 3.1.0 → 3.2.5 ([#92](https://github.com/gnolang/gno-js-client/pull/92))
- chore(deps): bump eslint-plugin-prettier 5.0.0 → 5.1.3 ([#84](https://github.com/gnolang/gno-js-client/pull/84))
- chore(deps): bump eslint 8.55.0 → 8.56.0 ([#79](https://github.com/gnolang/gno-js-client/pull/79))
- chore(deps): bump @types/node 20.10.3 → 20.11.10 ([#90](https://github.com/gnolang/gno-js-client/pull/90))
- chore(deps): bump ts-proto 1.165.0 → 1.166.4 → 1.167.2 ([#88](https://github.com/gnolang/gno-js-client/pull/88), [#89](https://github.com/gnolang/gno-js-client/pull/89))

## [1.1.7] - 2023-12-04

Commit: [`963c755`](https://github.com/gnolang/gno-js-client/commit/963c755bfa7a5e60196c5a88c42f0cbfeec231e9) ([#72](https://github.com/gnolang/gno-js-client/pull/72))

- chore(deps): bump @cosmjs/ledger-amino 0.31.0 → 0.32.0 ([#72](https://github.com/gnolang/gno-js-client/pull/72))
- chore(deps): bump typescript 5.2.2 → 5.3.2 ([#71](https://github.com/gnolang/gno-js-client/pull/71))
- chore(deps): bump ts-proto 1.157.0 → 1.165.0 ([#78](https://github.com/gnolang/gno-js-client/pull/78))
- chore(deps): bump eslint 8.48.0 → 8.55.0 ([#76](https://github.com/gnolang/gno-js-client/pull/76))
- chore(deps): bump @types/node 20.5.0 → 20.10.3 ([#77](https://github.com/gnolang/gno-js-client/pull/77))
- chore(deps): bump eslint-config-prettier 9.0.0 → 9.1.0 ([#75](https://github.com/gnolang/gno-js-client/pull/75))

## [1.1.6] - 2023-09-25

Commit: [`7430b7e`](https://github.com/gnolang/gno-js-client/commit/7430b7e96d9a39e380b8d972df19c8e10b1661f2) ("Bump tm2-js-client version")

- Bump `@gnolang/tm2-js-client`

## [1.1.5] - 2023-09-24

Commit: [`76418b2`](https://github.com/gnolang/gno-js-client/commit/76418b2d307ab0bb9f8c1b8c91b3486b159701b4) ("Bump tm2-js-client version")

- Bump `@gnolang/tm2-js-client`

## [1.1.4] - 2023-09-22

Commit: [`9bb9f8b`](https://github.com/gnolang/gno-js-client/commit/9bb9f8bd12c316493a8fce2cbf27cfffe8bca556) ("Bump version")

- fix: hacky fix of `null` args list marshaling issue ([#46](https://github.com/gnolang/gno-js-client/pull/46))

## [1.1.3] - 2023-09-22

Commit: [`2c0c9be`](https://github.com/gnolang/gno-js-client/commit/2c0c9becb45f4beb0cfe9d8dc96a8808e5a5dcaf) ("Bump version")

- Re-publish of 1.1.2 (no source changes between 1.1.2 and 1.1.3 beyond the version bump).

## [1.1.2] - 2023-09-22

Commit: [`8d01ab4`](https://github.com/gnolang/gno-js-client/commit/8d01ab43ad701bf875afa0d563acda05d7c8042a) ([#45](https://github.com/gnolang/gno-js-client/pull/45))

- feat: modify args encoding to support `null` ([#45](https://github.com/gnolang/gno-js-client/pull/45))

## [1.1.1] - 2023-09-21

Commit: [`371cb33`](https://github.com/gnolang/gno-js-client/commit/371cb33363c54df667a62f0549e70e4cecc74ac0) ("Remove useless object assignment")

- chore: remove unused object assignment

## [1.1.0] - 2023-09-13

Commit: [`6cdf395`](https://github.com/gnolang/gno-js-client/commit/6cdf3957cd3b0fd869ffc11f4c297e29f96127b4) ("Update Wallet API following @gnolang/tm2-js-client changes")

- feat: update Wallet API to track upstream `@gnolang/tm2-js-client` API changes

## [1.0.7] - 2023-09-08

Commit: [`e03c742`](https://github.com/gnolang/gno-js-client/commit/e03c742b4f103f499acc0a89515ded1b991d631a) ("Resolve invalid message decode for MsgAddPackage")

- fix: invalid message decode for `MsgAddPackage`

## [1.0.6] - 2023-09-06

Commit: [`fc472db`](https://github.com/gnolang/gno-js-client/commit/fc472db987f7ca1c4d650232e1a6ca5d6a4326e7) ("Update the API to include tm2-js-client Provider API changes")

- feat: track upstream `tm2-js-client` Provider API changes
- chore(deps): bump ts-proto 1.156.2 → 1.157.0 ([#40](https://github.com/gnolang/gno-js-client/pull/40))
- chore(deps): bump typescript 5.1.6 → 5.2.2 ([#39](https://github.com/gnolang/gno-js-client/pull/39))
- chore(deps): bump eslint 8.44.0 → 8.48.0 ([#38](https://github.com/gnolang/gno-js-client/pull/38), [#28](https://github.com/gnolang/gno-js-client/pull/28), [#36](https://github.com/gnolang/gno-js-client/pull/36))
- chore(deps): bump @types/node 20.3.3 → 20.5.0 ([#35](https://github.com/gnolang/gno-js-client/pull/35), [#37](https://github.com/gnolang/gno-js-client/pull/37))
- chore(deps): bump prettier 2.8.8 → 3.0.1 ([#33](https://github.com/gnolang/gno-js-client/pull/33))
- chore(deps): bump eslint-config-prettier 8.8.0 → 9.0.0 ([#34](https://github.com/gnolang/gno-js-client/pull/34))
- chore(deps): bump ts-proto 1.150.1 → 1.156.2 ([#29](https://github.com/gnolang/gno-js-client/pull/29))
- chore(deps): bump @typescript-eslint/* 5.60.1 → 5.62.0 ([#22](https://github.com/gnolang/gno-js-client/pull/22), [#23](https://github.com/gnolang/gno-js-client/pull/23))
- chore(deps): bump jest 29.5.0 → 29.6.1 ([#15](https://github.com/gnolang/gno-js-client/pull/15))

> Note: 1.0.5 was never published.

## [1.0.4] - 2023-07-03

Commit: [`314b1d6`](https://github.com/gnolang/gno-js-client/commit/314b1d693d1d0245da22e418c4d03628ae0184a2) ("Bump cosmjs dependencies, update patch version")

- chore: bump cosmjs dependencies

## [1.0.3] - 2023-07-03

Commit: [`57ea001`](https://github.com/gnolang/gno-js-client/commit/57ea0017c8087bfe9c4a745018acbe3379e7dced) ("Bump version, upgrade packages")

- chore(deps): bump protobufjs 7.2.3 → 7.2.4 ([#14](https://github.com/gnolang/gno-js-client/pull/14))
- chore(deps): bump typescript 5.1.3 → 5.1.6 ([#13](https://github.com/gnolang/gno-js-client/pull/13))
- chore(deps): bump @types/node 20.3.1 → 20.3.3 ([#12](https://github.com/gnolang/gno-js-client/pull/12))
- chore(deps): bump eslint 8.43.0 → 8.44.0 ([#11](https://github.com/gnolang/gno-js-client/pull/11))
- chore(deps): bump @typescript-eslint/parser 5.60.0 → 5.60.1 ([#10](https://github.com/gnolang/gno-js-client/pull/10))
- chore(deps): bump ts-jest 29.1.0 → 29.1.1 ([#9](https://github.com/gnolang/gno-js-client/pull/9))
- chore(deps): bump @typescript-eslint/eslint-plugin 5.59.11 → 5.60.1 ([#8](https://github.com/gnolang/gno-js-client/pull/8))
- chore(deps): bump ts-proto 1.149.0 → 1.150.1 ([#7](https://github.com/gnolang/gno-js-client/pull/7))
- chore(deps): bump @typescript-eslint/parser 5.59.11 → 5.60.0 ([#4](https://github.com/gnolang/gno-js-client/pull/4))
- chore(deps): bump eslint 8.42.0 → 8.43.0 ([#3](https://github.com/gnolang/gno-js-client/pull/3))

## [1.0.2] - 2023-06-16

Commit: [`b72e2e0`](https://github.com/gnolang/gno-js-client/commit/b72e2e063f41730efbd3dd8b6f449e90df57812c) ("Bump version, upgrade packages")

- chore(deps): bump @types/node 20.2.5 → 20.2.6 ([#1](https://github.com/gnolang/gno-js-client/pull/1))

## [1.0.1] - 2023-06-08

Commit: [`ea436d8`](https://github.com/gnolang/gno-js-client/commit/ea436d8e722fb2e9c178ff84039bc97015b083fa) ("Minor version bump")

- chore: minor version bump

## [1.0.0] - 2023-05-16

Commit: [`8e2154c`](https://github.com/gnolang/gno-js-client/commit/8e2154c335c232a029d130d4760771e009912a00) ("Update package.json")

- Initial public release of `@gnolang/gno-js-client`.

---

## Commit-to-version mapping (for tagging)

The table below records the commit on `main` that corresponds to each published npm version. Run the following from a clean checkout of `main` to create matching annotated git tags:

```sh
git tag -a v1.0.0 8e2154c335c232a029d130d4760771e009912a00 -m "v1.0.0"
git tag -a v1.0.1 ea436d8e722fb2e9c178ff84039bc97015b083fa -m "v1.0.1"
git tag -a v1.0.2 b72e2e063f41730efbd3dd8b6f449e90df57812c -m "v1.0.2"
git tag -a v1.0.3 57ea0017c8087bfe9c4a745018acbe3379e7dced -m "v1.0.3"
git tag -a v1.0.4 314b1d693d1d0245da22e418c4d03628ae0184a2 -m "v1.0.4"
git tag -a v1.0.6 fc472db987f7ca1c4d650232e1a6ca5d6a4326e7 -m "v1.0.6"
git tag -a v1.0.7 e03c742b4f103f499acc0a89515ded1b991d631a -m "v1.0.7"
git tag -a v1.1.0 6cdf3957cd3b0fd869ffc11f4c297e29f96127b4 -m "v1.1.0"
git tag -a v1.1.1 371cb33363c54df667a62f0549e70e4cecc74ac0 -m "v1.1.1"
git tag -a v1.1.2 8d01ab43ad701bf875afa0d563acda05d7c8042a -m "v1.1.2"
git tag -a v1.1.3 2c0c9becb45f4beb0cfe9d8dc96a8808e5a5dcaf -m "v1.1.3"
git tag -a v1.1.4 9bb9f8bd12c316493a8fce2cbf27cfffe8bca556 -m "v1.1.4"
git tag -a v1.1.5 76418b2d307ab0bb9f8c1b8c91b3486b159701b4 -m "v1.1.5"
git tag -a v1.1.6 7430b7e96d9a39e380b8d972df19c8e10b1661f2 -m "v1.1.6"
git tag -a v1.1.7 963c755bfa7a5e60196c5a88c42f0cbfeec231e9 -m "v1.1.7"
git tag -a v1.2.0 e5700f056fc9c5bf59f76db237ed16020ac0599b -m "v1.2.0"
git tag -a v1.2.1 0d6d3219699b71a0f05d09a0f86bc26384450b18 -m "v1.2.1"
git tag -a v1.2.2 25d85d36ab3adf2d2522cefd935b12a8c5db0fa8 -m "v1.2.2"
git tag -a v1.2.3 cb5d9ed27abb1e50a932007c06a5f6a6de7b9b70 -m "v1.2.3"
git tag -a v1.3.0 c5c3f9431b0891d7be827c115de4056855f4a172 -m "v1.3.0"
git tag -a v1.3.1 115afac4d61f67da58ac5c9f06c5f108a505562b -m "v1.3.1"
git tag -a v1.3.2 cb04b9dc1e9c30bbc768c3c7b054224a6393f047 -m "v1.3.2"
git tag -a v1.4.0 21cfea93581564cb43c7cb3287c58b60a514d61c -m "v1.4.0"
git tag -a v1.4.1 7f06f991e54b562142cdbb9cbbd9c33fc3bb00d7 -m "v1.4.1"
git tag -a v1.4.2 d6cd18d3576a3aa6623917d73d5505a6db0b47e0 -m "v1.4.2"
git tag -a v1.4.3 518b0186be079dda9ff9b4a7d5dec62d86c435d0 -m "v1.4.3"
git tag -a v1.4.4 d2401c011cb721856e966d2c29c5c6c812fe8173 -m "v1.4.4"
git tag -a v1.4.5 d0de0c47fa3554780aafedd5a5d8379817fcf298 -m "v1.4.5"
git tag -a v2.0.0 7b393844ef322fbb16eff6ac21671c0030efa7f7 -m "v2.0.0"
# v2.0.1: published from an uncommitted state — best approximation:
git tag -a v2.0.1 8bd1756f7e604b2b88f92cbf4e8ea3670c2dbc4b -m "v2.0.1 (approximate; published from uncommitted state)"
git tag -a v2.0.2 0c078d69cad9f5851ac919d6140ff55a4cd3b1c5 -m "v2.0.2"

# Push all tags to GitHub once verified:
git push origin --tags
```

| npm version | npm publish (UTC)        | git commit | notes |
|-------------|--------------------------|------------|-------|
| 1.0.0       | 2023-05-16T10:31:15Z     | `8e2154c`  | Initial release |
| 1.0.1       | 2023-06-08T18:37:27Z     | `ea436d8`  |       |
| 1.0.2       | 2023-06-16T10:22:30Z     | `b72e2e0`  |       |
| 1.0.3       | 2023-07-03T10:02:03Z     | `57ea001`  |       |
| 1.0.4       | 2023-07-03T10:20:31Z     | `314b1d6`  |       |
| 1.0.5       | —                        | —          | Never published |
| 1.0.6       | 2023-09-06T12:18:29Z     | `fc472db`  |       |
| 1.0.7       | 2023-09-08T10:41:57Z     | `e03c742`  |       |
| 1.1.0       | 2023-09-13T12:30:40Z     | `6cdf395`  |       |
| 1.1.1       | 2023-09-21T13:39:49Z     | `371cb33`  |       |
| 1.1.2       | 2023-09-22T10:42:03Z     | `8d01ab4`  |       |
| 1.1.3       | 2023-09-22T10:48:23Z     | `2c0c9be`  |       |
| 1.1.4       | 2023-09-22T16:25:21Z     | `9bb9f8b`  |       |
| 1.1.5       | 2023-09-24T21:41:01Z     | `76418b2`  |       |
| 1.1.6       | 2023-09-25T11:30:52Z     | `7430b7e`  |       |
| 1.1.7       | 2023-12-04T10:12:18Z     | `963c755`  |       |
| 1.2.0       | 2024-02-12T09:43:48Z     | `e5700f0`  |       |
| 1.2.1       | 2024-03-11T15:29:53Z     | `0d6d321`  |       |
| 1.2.2       | 2024-04-06T09:04:17Z     | `25d85d3`  |       |
| 1.2.3       | 2024-04-29T12:01:21Z     | `cb5d9ed`  |       |
| 1.3.0       | 2024-06-26T13:42:51Z     | `c5c3f94`  |       |
| 1.3.1       | 2024-09-19T10:34:16Z     | `115afac`  |       |
| 1.3.2       | 2025-01-16T12:00:01Z     | `cb04b9d`  |       |
| 1.3.3       | —                        | `5662326`  | Bumped in source ([#176](https://github.com/gnolang/gno-js-client/pull/176)) but never published; superseded by 1.4.0 |
| 1.4.0       | 2025-07-25T16:53:52Z     | `21cfea9`  |       |
| 1.4.1       | 2025-07-25T18:11:09Z     | `7f06f99`  |       |
| 1.4.2       | 2025-08-27T18:15:15Z     | `d6cd18d`  |       |
| 1.4.3       | 2025-09-04T14:42:19Z     | `518b018`  |       |
| 1.4.4       | 2025-09-08T13:41:59Z     | `d2401c0`  |       |
| 1.4.5       | 2025-10-08T12:38:28Z     | `d0de0c4`  |       |
| 2.0.0       | 2026-03-31T13:44:27Z     | `7b39384`  | bump-to-2.0.0 commit was `0ef402b`; published from `feat/version-2.0` (PR [#238](https://github.com/gnolang/gno-js-client/pull/238)), merged to main 2026-04-27 |
| 2.0.1       | 2026-04-01T13:51:42Z     | `8bd1756`* | *Approximate. No commit on main has `version: "2.0.1"`; published from an uncommitted state. Diff vs 2.0.2 is unknown without inspecting the npm tarballs. |
| 2.0.2       | 2026-04-01T14:00:40Z     | `0c078d6`  |       |
