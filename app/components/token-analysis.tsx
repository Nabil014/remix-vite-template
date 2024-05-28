import React, { useState } from 'react';

const TokenAnalysis: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Token Transfers');

  // Harcodeo de las tabs 
  const activities = [
    {
      amount: 0.15,
      usdValue: 553.76,
      from: '0x6b5B...19f1',
      to: 'Uniswap V2: Router 2',
      transaction: '0xd320...d556',
      timeAgo: 'A few seconds ago',
    },
    {
      amount: 0.15,
      usdValue: 553.76,
      from: '0x6b5B...19f1',
      to: 'Uniswap V2: Router 2',
      transaction: '0xd320...d556',
      timeAgo: 'A few seconds ago',
    },
    {
      amount: 0.15,
      usdValue: 553.76,
      from: '0x6b5B...19f1',
      to: 'Uniswap V2: Router 2',
      transaction: '0xd320...d556',
      timeAgo: 'A few seconds ago',
    },
    {
      amount: 0.15,
      usdValue: 553.76,
      from: '0x6b5B...19f1',
      to: 'Uniswap V2: Router 2',
      transaction: '0xd320...d556',
      timeAgo: 'A few seconds ago',
    },
    {
      amount: 0.15,
      usdValue: 553.76,
      from: '0x6b5B...19f1',
      to: 'Uniswap V2: Router 2',
      transaction: '0xd320...d556',
      timeAgo: 'A few seconds ago',
    },
    {
      amount: 0.15,
      usdValue: 553.76,
      from: '0x6b5B...19f1',
      to: 'Uniswap V2: Router 2',
      transaction: '0xd320...d556',
      timeAgo: 'A few seconds ago',
    },
    {
        amount: 0.15,
        usdValue: 553.76,
        from: '0x6b5B...19f1',
        to: 'Uniswap V2: Router 2',
        transaction: '0xd320...d556',
        timeAgo: 'A few seconds ago',
      },
      {
        amount: 0.15,
        usdValue: 553.76,
        from: '0x6b5B...19f1',
        to: 'Uniswap V2: Router 2',
        transaction: '0xd320...d556',
        timeAgo: 'A few seconds ago',
      },
  ];

  const tabs = ['Token Transfers', 'Token Holders', 'Holder Insights', 'Profitable Wallets', 'Token Swaps', 'Token Pairs'];

  return (
    <div className="bg-transparent text-white p-4 rounded-2xl shadow-lg w-full">
      <h1 className="text-[#F5F5F5] font-inter font-semibold text-lg leading-tight mb-4">Token Analysis</h1>
      <div className="flex space-x-2 pb-3 border-b border-[#04E6E6] overflow-x-auto whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 py-1 rounded-lg font-inter text-sm leading-tight font-semibold ${
              activeTab === tab ? 'bg-[#04E6E6] text-[#000000]' : 'text-[#ffffff]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-[#F5F5F5] font-inter font-semibold text-xl leading-tight mb-4">Activity</h2>
        <div className="bg-[#022527] p-4 rounded-2xl border border-[#04E6E6]">
          <div
            className={`overflow-y-auto ${activities.length > 5 ? 'max-h-80' : ''}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#000000 transparent',
            }}
          >
            {activities.map((activity, index) => (
              <div key={index}>
                <div className="flex justify-between items-center p-2 rounded-2xl gap-4">
                  <button className="bg-[#04E6E6] px-3 py-1 rounded-lg text-[#043234] font-inter font-medium text-sm leading-tight">
                    Transfers
                  </button>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">Amount</span>
                    <span className="font-semibold text-xs">{activity.amount}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">USD Value</span>
                    <span className="font-semibold text-xs">${activity.usdValue}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">From</span>
                    <span className="font-semibold text-xs">{activity.from}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">To</span>
                    <span className="font-semibold text-xs">{activity.to}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">Transaction</span>
                    <span className="font-semibold text-xs">{activity.transaction}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">{activity.timeAgo}</span>
                  </div>
                </div>
                {index < activities.length - 1 && <div className="border-b border-[#04E6E6] mx-2"></div>}
              </div>
            ))}
          </div>
          <style jsx>{`
            .overflow-y-auto::-webkit-scrollbar {
              width: 8px;
            }

            .overflow-y-auto::-webkit-scrollbar-track {
              background: transparent;
            }

            .overflow-y-auto::-webkit-scrollbar-thumb {
              background-color: #000000;
              border-radius: 10px;
            }

            .overflow-y-auto::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default TokenAnalysis;
