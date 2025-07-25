import {
  AccountWalletOption,
  BroadcastTransactionMap,
  CreateWalletOptions,
  Signer,
  Tx,
  TxFee,
  Wallet,
} from '@gnolang/tm2-js-client';
import { decodeTxMessages, defaultTxFee, fundsToCoins } from './utility';
import Long from 'long';
import { MemPackage, MsgAddPackage, MsgCall, MsgSend } from '../proto';
import { MsgEndpoint } from './endpoints';
import { LedgerConnector } from '@cosmjs/ledger-amino';
import { MsgRun } from '../proto/gno/vm';

/**
 * GnoWallet is an extension of the TM2 wallet with
 * specific functionality for Gno chains
 */
export class GnoWallet extends Wallet {
  constructor() {
    super();
  }

  /**
   * Generates a private key-based wallet, using a random seed
   * @param {AccountWalletOption} options the account options
   */
  static override createRandom = async (
    options?: AccountWalletOption
  ): Promise<GnoWallet> => {
    const wallet = await Wallet.createRandom(options);

    const gnoWallet: GnoWallet = new GnoWallet();
    gnoWallet.signer = wallet.getSigner();

    return gnoWallet;
  };

  /**
   * Generates a custom signer-based wallet
   * @param {Signer} signer the custom signer implementing the Signer interface
   * @param {CreateWalletOptions} options the wallet generation options
   */
  static override fromSigner = async (signer: Signer): Promise<GnoWallet> => {
    const wallet = await Wallet.fromSigner(signer);

    const gnoWallet: GnoWallet = new GnoWallet();
    gnoWallet.signer = wallet.getSigner();

    return gnoWallet;
  };

  /**
   * Generates a bip39 mnemonic-based wallet
   * @param {string} mnemonic the bip39 mnemonic
   * @param {CreateWalletOptions} options the wallet generation options
   */
  static override fromMnemonic = async (
    mnemonic: string,
    options?: CreateWalletOptions
  ): Promise<GnoWallet> => {
    const wallet = await Wallet.fromMnemonic(mnemonic, options);

    const gnoWallet: GnoWallet = new GnoWallet();
    gnoWallet.signer = wallet.getSigner();

    return gnoWallet;
  };

  /**
   * Generates a private key-based wallet
   * @param {string} privateKey the private key
   * @param {AccountWalletOption} options the account options
   */
  static override fromPrivateKey = async (
    privateKey: Uint8Array,
    options?: AccountWalletOption
  ): Promise<GnoWallet> => {
    const wallet = await Wallet.fromPrivateKey(privateKey, options);

    const gnoWallet: GnoWallet = new GnoWallet();
    gnoWallet.signer = wallet.getSigner();

    return gnoWallet;
  };

  /**
   * Creates a Ledger-based wallet
   * @param {LedgerConnector} connector the Ledger device connector
   * @param {CreateWalletOptions} options the wallet generation options
   */
  static override fromLedger = (
    connector: LedgerConnector,
    options?: CreateWalletOptions
  ): GnoWallet => {
    const wallet = Wallet.fromLedger(connector, options);

    const gnoWallet: GnoWallet = new GnoWallet();
    gnoWallet.signer = wallet.getSigner();

    return gnoWallet;
  };

  /**
   * Initiates a native currency transfer transaction between accounts
   * @param {string} to the bech32 address of the receiver
   * @param {Map<string, number>} funds the denomination -> value map for funds
   * @param {TransactionEndpoint} endpoint the transaction broadcast type (sync / commit)
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  transferFunds = async <K extends keyof BroadcastTransactionMap>(
    to: string,
    funds: Map<string, number>,
    endpoint: K,
    fee?: TxFee
  ): Promise<BroadcastTransactionMap[K]['result']> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);

    // Fetch the wallet address
    const sender: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gas_wanted: new Long(60000),
          gas_fee: defaultTxFee,
        };

    // Prepare the Msg
    const sendMsg: MsgSend = {
      from_address: sender,
      to_address: to,
      amount: amount,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          type_url: MsgEndpoint.MSG_SEND,
          value: MsgSend.encode(sendMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign the transaction
    const signedTx: Tx = await this.signTransaction(tx, decodeTxMessages);

    // Send the transaction
    return this.sendTransaction(signedTx, endpoint);
  };

  /**
   * Invokes the specified method on a GNO contract
   * @param {string} path the gno package / realm path
   * @param {string} method the method name
   * @param {string[]} args the method arguments, if any
   * @param {TransactionEndpoint} endpoint the transaction broadcast type (sync / commit)
   * @param {Map<string, number>} [funds] the denomination -> value map for funds, if any
   * @param {Map<string, number>} [maxDeposit] the denomination -> value map for max storage deposit, if any
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  callMethod = async <K extends keyof BroadcastTransactionMap>(
    path: string,
    method: string,
    args: string[] | null,
    endpoint: K,
    funds?: Map<string, number>,
    maxDeposit?: Map<string, number>,
    fee?: TxFee
  ): Promise<BroadcastTransactionMap[K]['result']> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);
    const maxDepositAmount: string = fundsToCoins(maxDeposit);

    // Fetch the wallet address
    const caller: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gas_wanted: new Long(60000),
          gas_fee: defaultTxFee,
        };

    // Prepare the Msg
    const callMsg: MsgCall = {
      caller: caller,
      send: amount,
      max_deposit: maxDepositAmount,
      pkg_path: path,
      func: method,
      args: args ? (args.length === 0 ? null : args) : null,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          type_url: MsgEndpoint.MSG_CALL,
          value: MsgCall.encode(callMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign the transaction
    const signedTx: Tx = await this.signTransaction(tx, decodeTxMessages);

    // Send the transaction
    return this.sendTransaction(signedTx, endpoint);
  };

  /**
   * Deploys the specified package / realm
   * @param {MemPackage} gnoPackage the package / realm to be deployed
   * @param {TransactionEndpoint} endpoint the transaction broadcast type (sync / commit)
   * @param {Map<string, number>} [funds] the denomination -> value map for funds, if any
   * @param {Map<string, number>} [maxDeposit] the denomination -> value map for max storage deposit, if any
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  deployPackage = async <K extends keyof BroadcastTransactionMap>(
    gnoPackage: MemPackage,
    endpoint: K,
    funds?: Map<string, number>,
    maxDeposit?: Map<string, number>,
    fee?: TxFee
  ): Promise<BroadcastTransactionMap[K]['result']> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);
    const maxDepositAmount: string = fundsToCoins(maxDeposit);

    // Fetch the wallet address
    const caller: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gas_wanted: new Long(60000),
          gas_fee: defaultTxFee,
        };

    // Prepare the Msg
    const addPkgMsg: MsgAddPackage = {
      creator: caller,
      package: gnoPackage,
      send: amount,
      max_deposit: maxDepositAmount,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          type_url: MsgEndpoint.MSG_ADD_PKG,
          value: MsgAddPackage.encode(addPkgMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign the transaction
    const signedTx: Tx = await this.signTransaction(tx, decodeTxMessages);

    // Send the transaction
    return this.sendTransaction(signedTx, endpoint);
  };

  /**
   * Executes arbitrary Gno code
   * @param {MemPackage} gnoPackage the gno package being executed
   * @param {TransactionEndpoint} endpoint the transaction broadcast type (sync / commit)
   * @param {Map<string, number>} [funds] the denomination -> value map for funds, if any
   * @param {Map<string, number>} [maxDeposit] the denomination -> value map for max storage deposit, if any
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  executePackage = async <K extends keyof BroadcastTransactionMap>(
    gnoPackage: MemPackage,
    endpoint: K,
    funds?: Map<string, number>,
    maxDeposit?: Map<string, number>,
    fee?: TxFee
  ): Promise<BroadcastTransactionMap[K]['result']> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);
    const maxDepositAmount: string = fundsToCoins(maxDeposit);

    // Fetch the wallet address
    const caller: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gas_wanted: new Long(60000),
          gas_fee: defaultTxFee,
        };

    // Prepare the Msg
    const runMsg: MsgRun = {
      caller,
      send: amount,
      package: gnoPackage,
      max_deposit: maxDepositAmount,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          type_url: MsgEndpoint.MSG_RUN,
          value: MsgRun.encode(runMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign the transaction
    const signedTx: Tx = await this.signTransaction(tx, decodeTxMessages);

    // Send the transaction
    return this.sendTransaction(signedTx, endpoint);
  };
}
