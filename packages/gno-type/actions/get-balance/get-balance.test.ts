import {
  getBalance,
  GetBalanceParameters,
  GetBalanceResponse,
} from './get-balance';

const mockGetBalance: getBalance = async (
  param: GetBalanceParameters
): Promise<GetBalanceResponse> => {
  return {
    address: param.address,
    coins: [
      {
        symbol: 'ugnot',
        amount: '9786000000',
        decimals: 8,
      },
      {
        symbol: 'myToken',
        amount: '100',
        decimals: 2,
      },
    ],
  };
};

describe('getBalance', () => {
  it('should return the correct balance', async () => {
    const param: GetBalanceParameters = {
      address: 'g1test',
    };

    const expectedResponse: GetBalanceResponse = {
      address: 'g1test',
      coins: [
        {
          symbol: 'ugnot',
          amount: '9786000000',
          decimals: 8,
        },
        {
          symbol: 'myToken',
          amount: '100',
          decimals: 2,
        },
      ],
    };

    const response = await mockGetBalance(param);
    expect(response).toEqual(expectedResponse);
  });

  it('sould accept an address with the correct format', async () => {
    const param: GetBalanceParameters = {
      address: 'g1test',
    };

    const response = await mockGetBalance(param);
    expect(response.address).toEqual(param.address);
  });

  // TODO: Add more tests
});
