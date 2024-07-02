import React from 'react';

function formatPrice(price: number | null): string {
  if (price === null || isNaN(price)) {
    return '$0.00';
  }

  if (price < 1) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(price);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

function formatPercentage(percentage: number | string | null): string {
  const parsedPercentage =
    typeof percentage === 'number' ? percentage : parseFloat(percentage || '0');
  if (isNaN(parsedPercentage)) {
    return '0.00';
  }
  return parsedPercentage.toFixed(2);
}

interface Coin {
  id: number;
  name: string;
  symbol: string;
  logo: string;
  description: string;
  category: string;
  platform: {
    token_address: string;
  };
  self_reported_market_cap: number;
  self_reported_circulating_supply: number;
  tags: string[];
  twitter_username: string;
  urls: {
    website: string[];
    twitter: string[];
    chat: string[];
    explorer: string[];
  };
  quote?: {
    USD: {
      price: number;
      percent_change_24h: number;
    };
  };
}

interface TokenInfoProps {
  coin: Coin;
  currentPrice: number | null;
  percentageChange: number | null;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ coin, currentPrice, percentageChange }) => {

  if (!coin) {
    return <div>Loading...</div>;
  }

  const formattedPrice = formatPrice(currentPrice);
  const formattedPercentage = formatPercentage(percentageChange);
  const percentageColor = percentageChange && percentageChange < 0 ? 'text-red-500' : 'text-[#05FF00]';

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between space-y-4 rounded-lg bg-transparent p-4 text-[#F5F5F5] lg:flex-row lg:space-y-0 lg:p-6">
      <div className="flex w-full flex-col space-y-4 lg:w-1/2">
        <div className="flex w-full items-center space-x-4">
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#D9D9D9]">
            <img
              src={coin.logo || 'https://via.placeholder.com/48'}
              alt={`${coin.name} Logo`}
              className="h-[60px] w-[60px] rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-[30px] font-bold leading-[24.2px]">
                {coin.name}
              </h2>
              <span className="ml-1 text-[12px] text-[#04E6E6]">✔</span>
            </div>
            <span className="block text-[15px] font-bold mt-1 text-[#04E6E6]">
              {coin.symbol}
            </span>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[30px] font-bold leading-[10px] text-[#F5F5F5]">
            {formattedPrice}
            <span className={`ml-2 text-[20px] font-bold leading-[20px] ${percentageColor}`}>
              {formattedPercentage}%
            </span>
          </p>
          <p className="mt-3 text-[12px] font-bold leading-[12px] text-[#F5F5F5] opacity-50">
            as of block {coin.platform.token_address || '00000000'} from Uniswap v3
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-end lg:w-1/2">
        <div className="grid w-full grid-cols-2 gap-2 lg:grid-cols-3 lg:w-auto mt-7">
          {coin.tags && coin.tags.length > 0 ? (
            coin.tags.map((category, index) => (
              <button
                key={index}
                className="flex items-center justify-between rounded-lg border border-[#04E6E6] bg-transparent px-4 py-2 text-[11px] font-light leading-[12.1px] text-[#04E6E6]"
              >
                <span className="flex items-center">
                  <span className="mr-2 h-[9.75px] w-[9.75px] rounded-full bg-[#ffffff]"></span>
                  {category}
                </span>
              </button>
            ))
          ) : (
            <button className="rounded-lg border border-[#04E6E6] bg-transparent px-4 py-2 text-[11px] font-light leading-[12.1px] text-[#04E6E6]">
              No categories
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
