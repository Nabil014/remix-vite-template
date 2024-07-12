import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';

function formatPrice(price: number | null): string {
  if (price === null || isNaN(price)) {
    return 'N/A';
  }
  return `$${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 6,
  }).format(price)}`;
}

const TokenDetails = ({ tokenData, currentPrice }) => {
  const [copied, setCopied] = useState(false);

  function calculateDaysFromCreatedAt(createdAt: string): number {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - createdDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    return daysDifference;
  }

  const formattedTokenData = {
    totalSupply: tokenData?.self_reported_circulating_supply || "N/A",
    fullyDilutedValuation: tokenData?.self_reported_market_cap ? `$${tokenData.self_reported_market_cap}` : "N/A",
    dateCreated: tokenData?.date_added ? new Date(tokenData.date_added).toISOString().split('T')[0] : "N/A",
    currentPrice: formatPrice(currentPrice),
    tokenAddress: tokenData?.platform?.token_address || "N/A",
    name: tokenData?.name || "N/A",
    symbol: tokenData?.symbol || "N/A",
    contractType: tokenData?.platform?.name || "N/A",
    decimals: tokenData?.decimals || "N/A",
    tokenAge: tokenData?.date_added ? calculateDaysFromCreatedAt(tokenData.date_added) + " days" : "N/A",
  };

  const formatAddress = (address) => {
    return address !== "N/A" ? `${address.slice(0, 6)}...${address.slice(-4)}` : "N/A";
  };

  const copyToClipboard = (address) => {
    if (address !== "N/A") {
      navigator.clipboard.writeText(address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
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
