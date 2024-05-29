// File: app/components/token-table.tsx
import React from 'react';

const tokens = [
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
  { token: 'ETH', balance: 525.38, value: 1079820.85 },
];

const TokensTable = () => {
  return (
    <div className="bg-transparent mt-6 rounded-lg text-white flex flex-col h-[380px] w-[400px]">
      <div className="mb-4">
        <h2 className="font-inter font-semibold text-[14px] leading-[16.94px] text-[#F5F5F5]">Tokens (100)</h2>
      </div>
      <div className="flex-1 overflow-y-auto pr-4" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4a5568 #1a202c' }}>
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left text-[#F5F5F5] font-inter font-bold text-[12px] leading-[14.52px] opacity-50">
              <th className="py-2">Token</th>
              <th className="py-2 text-center">Balance</th>
              <th className="py-2 text-center pr-2">Value</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map((token, index) => (
              <tr key={index} className="border-b border-[#04E6E6]">
                <td className="py-2 flex items-center">
                  <span className="w-4 h-4 bg-[#F5F5F5] opacity-50 rounded-full mr-2"></span>
                  {token.token}
                </td>
                <td className="py-2 text-center">{token.balance}</td>
                <td className="py-2 text-right pr-2">{token.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 text-center">
        <a href="#" className="text-teal-400 hover:text-teal-300">View all &rarr;</a>
      </div>
      <style jsx>{`
        .overflow-y-auto::-webkit-scrollbar {
          width: 8px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background-color: #4a5568;
          border-radius: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
    </div>
  );
};

export default TokensTable;
