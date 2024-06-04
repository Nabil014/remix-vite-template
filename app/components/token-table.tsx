import React, { useState, useEffect } from 'react';

const tokens = [
  { token: 'Ether', symbol: 'ETH', price: 3768.38, balance: 525.377, value: 1979820.85, change: -0.47, changeValue: -17.73, portfolioPercentage: 67.91 },
  { token: 'Kyber Network Crystal', symbol: 'KNC', price: 0.60, balance: 700008.508, value: 422126.49, change: -5.67, changeValue: -0.04, portfolioPercentage: 14.48 },
  { token: 'Wrapped Ether', symbol: 'WETH', price: 3768.38, balance: 80.339, value: 302746.45, change: -0.47, changeValue: -17.73, portfolioPercentage: 10.38 },
  { token: 'OMGToken', symbol: 'OMG', price: 0.72, balance: 123646.253, value: 89402.29, change: 3.77, changeValue: 0.03, portfolioPercentage: 3.07 },
];

const TokensTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="bg-transparent mt-6 rounded-badge text-white flex flex-col" style={{ width: '439px', height: '261px', padding: '32px', gap: '16px' }}>
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
          <a href="#" className="text-teal-400 hover:text-teal-300" onClick={openModal}>View all &rarr;</a>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gradient-radial rounded-lg p-8 text-white" style={{ width: '70vw', maxHeight: '90vh' }}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">All Tokens</h2>
              <button onClick={closeModal} className="text-teal-400 hover:text-teal-300">Close</button>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-[#F5F5F5] font-inter font-bold text-[14px] leading-[16px] opacity-70">
                  <th className="py-2">Token</th>
                  <th className="py-2 text-left">Price</th>
                  <th className="py-2 text-left">Balance</th>
                  <th className="py-2 text-left">Value</th>
                  <th className="py-2 text-left">24h Change</th>
                  <th className="py-2 text-left pr-2">Portfolio Percentage</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map((token, index) => (
                  <tr key={index} className="border-b border-[#04E6E6]">
                    <td className="py-3 flex items-center">
                      <span className="w-4 h-4 bg-[#D9D9D9] rounded-full mr-2"></span>
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[40px]">{token.token}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">${token.price.toFixed(2)}</span>
                    </td>
                    <td className="py-5">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">{token.balance}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">${token.value.toLocaleString('en-US')}</span>
                    </td> 
                    <td className="py-3 text-left">
                      <span className={`text-[12px] font-inter font-bold ${token.change < 0 ? 'text-[#FF0000]' : 'text-[#05FF00]'} leading-[14px]`}>
                        {token.change.toFixed(2)}% (${token.changeValue.toFixed(2)})
                      </span>
                    </td>
                    <td className="py-3 text-left pr-2">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">{token.portfolioPercentage}%</span>
                    </td>
                  </tr>         
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokensTable;
