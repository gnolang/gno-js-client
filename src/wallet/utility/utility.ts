/**
 * Converts a fund map to a concatenated string representation ("<value><denomination>")
 * @param funds
 */
export const fundsToCoins = (funds?: Map<string, number>): string => {
  if (!funds) {
    return '';
  }

  const result: string[] = [];

  funds.forEach((value: number, denomination: string) => {
    result.push(`${value}${denomination}`);
  });

  return result.join(',');
};

/**
 * This is constant for now,
 * but should be fetched as an estimation
 * from the Tendermint node once this functionality
 * is available.
 *
 * Each package call / deployment
 * costs a fixed 1 GNOT
 * https://github.com/gnolang/gno/issues/649
 */
export const defaultTxFee = '1000000ugnot'; // 1 GNOT
