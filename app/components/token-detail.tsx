import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

interface TokenDetailsProps {
  totalSupply: string;
  fullyDilutedValuation: string;
  tokenAge: number;
  dateCreated: string;
  currentPrice: number;
  tokenAddress: string;
  name: string;
  symbol: string;
  contractType: string;
  decimals: number;
}

const TokenDetails: React.FC<TokenDetailsProps> = ({
  totalSupply,
  fullyDilutedValuation,
  tokenAge,
  dateCreated,
  currentPrice,
  tokenAddress,
  name,
  symbol,
  contractType,
  decimals
}) => {
  const [copied, setCopied] = useState(false);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-md p-6 rounded-lg bg-transparent text-white space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Total Supply</span>
          <span className="text-[14px] font-bold text-right">{totalSupply}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Fully Diluted Valuation</span>
          <span className="text-[14px] font-bold text-right">{fullyDilutedValuation}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Token Age</span>
          <span className="text-[14px] font-bold text-right">{tokenAge} days</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Date Created</span>
          <span className="text-[14px] font-bold text-right">{dateCreated}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Current Price</span>
          <span className="text-[14px] font-bold text-right">${currentPrice.toFixed(8)}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Token Address</span>
          <div className="flex items-center">
            <span className="text-[14px] font-bold text-right mr-2">
              {formatAddress(tokenAddress)}
            </span>
            <button
              onClick={() => copyToClipboard(tokenAddress)}
              className="text-[14px] font-bold text-[#04E6E6] hover:text-[#03C5C5]">
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            </button>
          </div>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Name</span>
          <span className="text-[14px] font-bold text-right">{name}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Symbol</span>
          <span className="text-[14px] font-bold text-right">{symbol}</span>
        </div>
        <div className="flex justify-between py-2 border-b border-[#04E6E6]">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Contract Type</span>
          <span className="text-[14px] font-bold text-right">{contractType}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-[14px] font-normal w-[160px] text-[#F5F5F580]">Decimals</span>
          <span className="text-[14px] font-bold text-right">{decimals}</span>
        </div>
      </div>
    </div>
  );
};

export default TokenDetails;
