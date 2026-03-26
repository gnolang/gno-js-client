import { TransactionEndpoint, TxFee } from '@gnolang/tm2-js-client';
import {
  GnoWallet,
  GnoJSONRPCProvider,
  defaultTxFee,
  MemFile,
  MemPackage,
} from '..';
import Long from 'long';
import { spawn, ChildProcess } from 'child_process';

describe('E2E Tests', () => {
  const txFee: TxFee = {
    gas_wanted: new Long(50000000),
    gas_fee: defaultTxFee,
  };

  let provider: GnoJSONRPCProvider;
  let gnoWallet: GnoWallet;
  let gnodevProcess: ChildProcess;

  beforeAll(async () => {
    // Start gnodev server
    gnodevProcess = spawn('gnodev', ['local', '-paths', 'gno.land/r/tests/vm']);

    // Wait for server to be ready
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Server startup timeout'));
      }, 30000);

      gnodevProcess.stdout?.on('data', (data) => {
        if (data.toString().includes('node is ready')) {
          clearTimeout(timeout);
          resolve();
        }
      });

      gnodevProcess.stderr?.on('data', (data) => {
        console.error('gnodev error:', data.toString());
      });

      gnodevProcess.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });

    provider = new GnoJSONRPCProvider('http://127.0.0.1:26657');

    // test1 already has an account balance
    gnoWallet = await GnoWallet.fromMnemonic(
      'source bonus chronic canvas draft south burst lottery vacant surface solve popular case indicate oppose farm nothing bullet exhibit title speed wink action roast'
    );
    gnoWallet.connect(provider);
  }, 40000);

  test('MsgCall with omitted empty args list and max_deposit as empty string', async () => {
    await expect(
      gnoWallet.callMethod(
        'gno.land/r/tests/vm',
        'IncCounter',
        [],
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        undefined,
        undefined,
        txFee
      )
    ).resolves.not.toThrow();

    const result = await gnoWallet.callMethod(
      'gno.land/r/tests/vm',
      'Counter',
      [],
      TransactionEndpoint.BROADCAST_TX_COMMIT,
      undefined,
      undefined,
      txFee
    );

    const data = result.deliver_tx.ResponseBase.Data;
    expect(data).toBeTruthy();
    const decodedData = Buffer.from(data!, 'base64').toString();
    expect(decodedData).toBe('(1 int)\n\n');
  });

  test('MemPackage with omitted type and info', async () => {
    const pkgName = 'hello' + Math.floor(Math.random() * 1000);
    const gnomodtoml: MemFile = {
      name: 'gnomod.toml',
      body:
        'module = "gno.land/p/g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5/' +
        pkgName +
        '"\ngno = "0.9"\n',
    };
    const hello: MemFile = {
      name: pkgName + '.gno',
      body:
        'package ' +
        pkgName +
        '\n\nfunc Hello() string {\n  return "Hello, world!"\n}\n',
    };
    const memPackage: MemPackage = {
      name: pkgName,
      path: 'gno.land/p/g1jg8mtutu9khhfwc4nxmuhcpftf0pajdhfvsqf5/' + pkgName,
      files: [gnomodtoml, hello],
    };

    await expect(
      gnoWallet.deployPackage(
        memPackage,
        TransactionEndpoint.BROADCAST_TX_COMMIT,
        undefined,
        undefined,
        txFee
      )
    ).resolves.not.toThrow();
  });

  afterAll(async () => {
    // Stop gnodev server
    if (gnodevProcess) {
      // Try to exit gracefully
      if (!gnodevProcess.kill('SIGINT')) {
        // Force kill if it doesn't exit
        gnodevProcess.kill('SIGKILL');
      }
    }
  });
});
