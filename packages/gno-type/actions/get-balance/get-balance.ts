export type Address = `g1${string}`;

export interface Coin {
  symbol: string;
  amount: string;
  decimals: number;
}

export interface GetBalanceParameters {
  address: Address;
}

export interface GetBalanceResponse {
  address: Address;
  coins: Coin[];
}

/**
 * Get the balance of an address
 *
 * @param param.address - The address to get the balance of (must start with 'g1')
 *
 * @returns The balance of the address
 *
 * @throws Error if the address is not in the correct format
 * @throws Error if the address does not exist
 * @throws Error if the address has no balance
 * @throws Error if the address has an invalid balance
 * */
export interface getBalance {
  (param: GetBalanceParameters): Promise<GetBalanceResponse>;
}
