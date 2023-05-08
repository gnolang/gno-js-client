import { Tx, TxFee, Wallet } from 'tm2-js-client';
import { fundsToCoins } from './utility/utility';
import Long from 'long';
import { MsgSend } from '../proto/gno/bank';
import { MsgEndpoint } from './endpoints';
import { LedgerConnector } from '@cosmjs/ledger-amino';
import { MemPackage, MsgAddPackage, MsgCall } from '../proto/gno/vm';

/**
 * GnoWallet is an extension of the TM2 wallet with
 * specific functionality for Gno chains
 */
export class GnoWallet extends Wallet {
  /**
   * Generates a private key-based wallet, using a random seed
   */
  static override createRandom = async (): Promise<GnoWallet> => {
    const wallet = await Wallet.createRandom();

    const gnoWallet: GnoWallet = new GnoWallet();
    Object.assign(gnoWallet, wallet);

    return gnoWallet;
  };

  /**
   * Generates a bip39 mnemonic-based wallet
   * @param {string} mnemonic the bip39 mnemonic
   * @param {number} [accountIndex=0] the account index
   */
  static override fromMnemonic = async (
    mnemonic: string,
    accountIndex?: number
  ): Promise<GnoWallet> => {
    const wallet = await Wallet.fromMnemonic(mnemonic, accountIndex);

    const gnoWallet: GnoWallet = new GnoWallet();
    Object.assign(gnoWallet, wallet);

    return gnoWallet;
  };

  /**
   * Generates a private key-based wallet
   * @param {string} privateKey the private key
   */
  static override fromPrivateKey = async (
    privateKey: Uint8Array
  ): Promise<GnoWallet> => {
    const wallet = await Wallet.fromPrivateKey(privateKey);

    const gnoWallet: GnoWallet = new GnoWallet();
    Object.assign(gnoWallet, wallet);

    return gnoWallet;
  };

  /**
   * Creates a Ledger-based wallet
   * @param {LedgerConnector} connector the Ledger device connector
   * @param {number} [accountIndex=0] the account index
   */
  static override fromLedger = (
    connector: LedgerConnector,
    accountIndex?: number
  ): GnoWallet => {
    const wallet = Wallet.fromLedger(connector, accountIndex);

    const gnoWallet: GnoWallet = new GnoWallet();
    Object.assign(gnoWallet, wallet);

    return gnoWallet;
  };

  /**
   * Initiates a native currency transfer transaction between accounts
   * @param {string} to the bech32 address of the receiver
   * @param {Map<string, number>} funds the denomination -> value map for funds
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  transferFunds = async (
    to: string,
    funds: Map<string, number>,
    fee?: TxFee
  ): Promise<string> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);

    // Fetch the wallet address
    const sender: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gasWanted: new Long(60000),
          gasFee: '1ugnot',
        };

    // Prepare the Msg
    const sendMsg: MsgSend = {
      fromAddress: sender,
      toAddress: to,
      amount: amount,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          typeUrl: MsgEndpoint.MSG_SEND,
          value: MsgSend.encode(sendMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign and send the transaction
    return this.sendTransaction(tx);
  };

  /**
   * Invokes the specified method on a GNO contract
   * @param {string} path the gno package / realm path
   * @param {string} method the method name
   * @param {string[]} args the method arguments, if any
   * @param {Map<string, number>} [funds] the denomination -> value map for funds, if any
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  callMethod = async (
    path: string,
    method: string,
    args: string[],
    funds?: Map<string, number>,
    fee?: TxFee
  ): Promise<string> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);

    // Fetch the wallet address
    const caller: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gasWanted: new Long(60000),
          gasFee: '1ugnot',
        };

    // Prepare the Msg
    const callMsg: MsgCall = {
      caller: caller,
      send: amount,
      pkgPath: path,
      func: method,
      args: args,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          typeUrl: MsgEndpoint.MSG_CALL,
          value: MsgCall.encode(callMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign and send the transaction
    return this.sendTransaction(tx);
  };

  /**
   * Deploys the specified package / realm
   * @param {MemPackage} gnoPackage the package / realm to be deployed
   * @param {Map<string, number>} [funds] the denomination -> value map for funds, if any
   * @param {TxFee} [fee] the custom transaction fee, if any
   */
  deployPackage = async (
    gnoPackage: MemPackage,
    funds?: Map<string, number>,
    fee?: TxFee
  ): Promise<string> => {
    // Convert the funds into the correct representation
    const amount: string = fundsToCoins(funds);

    // Fetch the wallet address
    const caller: string = await this.getAddress();

    // Construct the transaction fee
    const txFee: TxFee = fee
      ? fee
      : {
          gasWanted: new Long(60000),
          gasFee: '1ugnot',
        };

    // Prepare the Msg
    const addPkgMsg: MsgAddPackage = {
      creator: caller,
      package: gnoPackage,
      deposit: amount,
    };

    // Construct the transfer transaction
    const tx: Tx = {
      messages: [
        {
          typeUrl: MsgEndpoint.MSG_ADD_PKG,
          value: MsgAddPackage.encode(addPkgMsg).finish(),
        },
      ],
      fee: txFee,
      memo: '',
      signatures: [], // No signature yet
    };

    // Sign and send the transaction
    return this.sendTransaction(tx);
  };
}
