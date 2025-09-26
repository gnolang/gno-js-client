// To run:
// npx ts-node e2e-test.ts

import {TransactionEndpoint, TxFee, Tx} from "@gnolang/tm2-js-client"
import {
    GnoWallet,
    GnoJSONRPCProvider,
    defaultTxFee,
    MemFile,
    MemPackage,
    Any,
} from '..';
import Long from 'long';

const run = async () => {
    const provider: GnoJSONRPCProvider = new GnoJSONRPCProvider('http://127.0.0.1:26657')
    // test1 already has an account balance
    const gnoWallet: GnoWallet = await GnoWallet.fromMnemonic('source bonus chronic canvas draft south burst lottery vacant surface solve popular case indicate oppose farm nothing bullet exhibit title speed wink action roast')
    gnoWallet.connect(provider)

    const txFee: TxFee = {
        gas_wanted: new Long(50000000),
        gas_fee: defaultTxFee,
    }

    console.log('Test MsgCall omitted empty args list and max_deposit as empty string')
    await gnoWallet.callMethod(
        'gno.land/r/moul/config', 'ListManagers', [],
        TransactionEndpoint.BROADCAST_TX_COMMIT, undefined, undefined, txFee)

    console.log('Test MemPackage omitted type and info')
    const pkgName = 'hello' + Math.floor(Math.random() * 1000)
    const gnomodtoml: MemFile = {
        name: 'gnomod.toml',
        body: 'module = "gno.land/p/g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5/' + pkgName + '"\ngno = "0.9"\n',
    }
    const hello: MemFile = {
        name: pkgName + '.gno',
        body: 'package ' + pkgName + '\n\nfunc Hello() string {\n  return "Hello, world!"\n}\n',
    }
    const memPackage: MemPackage = {
        name: pkgName,
        path: 'gno.land/p/g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5/' + pkgName,
        files: [gnomodtoml, hello],
    }
    await gnoWallet.deployPackage(
        memPackage, TransactionEndpoint.BROADCAST_TX_COMMIT, undefined, undefined, txFee)
}

run().then(() => {
    console.log('PASS')
}).catch((e) => {
    console.log('FAIL')

    console.error(e)
})
