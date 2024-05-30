import React from 'react';

const tokens = [
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
  { token: 'ETH', balance: 525.38, value: 1979820.85 },
];

const TokensTable = () => {
  return (
    <div className="bg-transparent mt-6 rounded-lg text-white flex flex-col " style={{ width: '439px', height: '261px', borderRadius: '30px', padding: '32px', gap: '16px' }}>
      <div className="mb-4">
        <h2 className="font-inter font-semibold text-[14px] leading-[16.94px] text-[#F5F5F5]">Tokens (100)</h2>
      </div>
      <div className="flex-1">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-[#F5F5F5] font-inter font-bold text-[12px] leading-[14.52px] opacity-50">
              <th className="py-2">Token</th>
              <th className="py-2 text-center">Balance</th>
              <th className="py-2 text-center pr-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {tokens.slice(0, 3).map((token, index) => (
              <tr key={index} className="border-b border-[#04E6E6]">
                <td className="py-2 flex items-center">
                  <span className="mt-3 w-4 h-4 bg-[#D9D9D9] rounded-full mr-2"></span>
                  <span className="mt-3 text-[10px] font-inter font-bold text-[#F5F5F5] leading-[12.1px]">{token.token}</span>
                </td>
                <td className="py-2 text-center">
                  <span className="text-[10px] font-inter font-bold text-[#F5F5F5] leading-[12.1px]">{token.balance}</span>
                </td>
                <td className="py-2 text-right pr-2">
                  <span className="text-[10px] font-inter font-bold text-[#F5F5F5] leading-[12.1px]">{token.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-teal-400 hover:text-teal-300">View all &rarr;</a>
      </div>
    </div>
  );
};

export default TokensTable;
