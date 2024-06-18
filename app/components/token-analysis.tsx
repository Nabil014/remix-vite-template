import { json, useFetcher, useLoaderData } from '@remix-run/react';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;
  return json({ contract });
};

const TokenAnalysis: React.FC = () => {
  const fetcher = useFetcher();
  const { contract } = useLoaderData();
  
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('Token Transfers');
  const [copiedTransactionHash, setCopiedTransactionHash] = useState(null);

  useEffect(() => {
    async function fetchTransactions() {
      if (contract) {
        try {
          const response = await fetch(`/api/tokens/transactions?address=${contract}`);
          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error fetching transactions:", errorText);
            throw new Error(errorText);
          }
          const data = await response.json();
          setTransactions(data.transactions || []);
        } catch (error) {
          console.error("Error in fetchTransactions:", error);
        }
      }
    }
    fetchTransactions();
  }, [contract]);

  const formatAddress = (address) => {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount) => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount)) return "0.00";
    return parsedAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatUSDValue = (value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) return "$0.00";
    return parsedValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const copyToClipboard = (text, hash) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedTransactionHash(hash);
      setTimeout(() => setCopiedTransactionHash(null), 2000);
    });
  };

  const formatTimeAgo = (timestamp) => {
    const now = Date.now();
    const timeDifference = now - new Date(timestamp).getTime();
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
  };

  const tabs = ['Token Transfers', 'Token Holders', 'Holder Insights', 'Profitable Wallets', 'Token Swaps', 'Token Pairs'];

  return (
    <div className="bg-transparent text-white p-4 rounded-2xl w-full">
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
        <div className="bg-transparent p-4 rounded-2xl border border-[#04E6E6]">
          <div
            className={`overflow-y-auto ${transactions.length > 4 ? 'max-h-80' : ''}`}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#000000 transparent',
            }}
          >
            {transactions.map((tx, index) => (
              <div key={index}>
                <div className="flex justify-between items-center p-2 rounded-2xl gap-4">
                  <button className="bg-[#04E6E6] px-3 py-1 rounded-lg text-[#043234] font-inter font-medium text-sm leading-tight">
                    Transfer
                  </button>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">Amount</span>
                    <span className="font-semibold text-xs">{formatAmount(tx.transaction_value)}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">USD Value</span>
                    <span className="font-semibold text-xs">{formatUSDValue(tx.usdValue)}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">From</span>
                    <span className="font-semibold text-xs">{formatAddress(tx.from_address)}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">To</span>
                    <span className="font-semibold text-xs">{formatAddress(tx.to_address)}</span>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">Transaction</span>
                    <div className="flex items-center">
                      <span className="font-semibold text-xs">{formatAddress(tx.hash)}</span>
                      <button
                        onClick={() => copyToClipboard(tx.hash, tx.hash)}
                        className="ml-2 text-[14px] font-bold text-[#04E6E6] hover:text-[#03C5C5]"
                      >
                        <FontAwesomeIcon icon={copiedTransactionHash === tx.hash ? faCheck : faCopy} />
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 text-left px-2 whitespace-nowrap">
                    <span className="text-gray-400 block text-xs">{formatTimeAgo(tx.block_timestamp)}</span>
                  </div>
                </div>
                {index < transactions.length - 1 && <div className="border-b border-[#04E6E6] mx-2"></div>}
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
