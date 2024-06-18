import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

const TokenDetails = ({ tokenData }: any) => {
  const [copied, setCopied] = useState(false);

  function calculateDaysFromCreatedAt(createdAt: string): number {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }

  const formattedTokenData = {
    totalSupply: tokenData?.tokenMetadata?.total_supply_formatted || "N/A",
    fullyDilutedValuation: tokenData?.tokenMetadata?.fully_diluted_valuation ? `$${tokenData.tokenMetadata.fully_diluted_valuation}` : "N/A",
    dateCreated: tokenData?.tokenMetadata?.created_at ? new Date(tokenData.tokenMetadata.created_at).toISOString().split('T')[0] : "N/A",
    currentPrice: tokenData?.tokenPrice?.usdPriceFormatted ? `$${tokenData.tokenPrice.usdPriceFormatted}` : "N/A",
    tokenAddress: tokenData?.tokenMetadata?.address || "N/A",
    name: tokenData?.tokenMetadata?.name || "N/A",
    symbol: tokenData?.tokenMetadata?.symbol || "N/A",
    contractType: tokenData?.tokenMetadata?.verified_contract ? "ERC20" : "N/A",
    decimals: tokenData?.tokenMetadata?.decimals || "N/A",
    tokenAge: tokenData?.tokenMetadata?.created_at ? calculateDaysFromCreatedAt(tokenData.tokenMetadata.created_at) + " days" : "N/A",
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="w-full max-w-lg h-full p-4 rounded-2xl bg-transparent text-[#F5F5F5] space-y-4">
      <div>
        {[
          { label: "Total Supply", value: formattedTokenData.totalSupply },
          { label: "Fully Diluted Valuation", value: formattedTokenData.fullyDilutedValuation },
          { label: "Token Age", value: formattedTokenData.tokenAge },
          { label: "Date Created", value: formattedTokenData.dateCreated },
          { label: "Current Price", value: formattedTokenData.currentPrice },
          { label: "Token Address", value: (
            <>
              {formatAddress(formattedTokenData.tokenAddress)}
              <button
                onClick={() => copyToClipboard(formattedTokenData.tokenAddress)}
                className="ml-2 text-[14px] font-bold text-[#04E6E6] hover:text-[#03C5C5]"
              >
                <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
              </button>
            </>
          )},
          { label: "Name", value: formattedTokenData.name },
          { label: "Symbol", value: formattedTokenData.symbol },
          { label: "Contract Type", value: formattedTokenData.contractType },
          { label: "Decimals", value: formattedTokenData.decimals },
        ].map((item, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-[#04E6E6]">
            <span className="text-[13px] font-normal leading-[20px] w-[160px] text-[#F5F5F580]">{item.label}</span>
            <span className="text-[13px] font-bold leading-[15px] text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenDetails;
