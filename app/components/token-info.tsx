import React from 'react';

const TokenInfo = ({ coin }) => {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between space-y-4 rounded-lg bg-transparent p-4 text-[#F5F5F5] lg:flex-row lg:space-x-8 lg:space-y-0 lg:p-6">
      <div className="flex w-full flex-col space-y-4 lg:w-auto">
        <div className="flex w-full items-center space-x-4">
          <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-[#D9D9D9]">
            <img
              src={coin.logo || 'https://via.placeholder.com/48'}
              alt={`${coin.name} Logo`}
              className="h-[39px] w-[39px] rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center">
              <h2 className="text-[20px] font-semibold leading-[24.2px]">
                {coin.name}
              </h2>
              <span className="ml-1 text-[12px] text-[#04E6E6]">✔</span>
            </div>
            <span className="block text-[10px] font-light leading-[12.1px] text-[#04E6E6]">
              {coin.symbol}
            </span>
          </div>
        </div>
        <div className="w-full">
          <p className="text-[25px] font-semibold leading-[10px] text-[#F5F5F5]">
            ${coin.price || '0.00'}
            <span className="ml-2 text-[16px] font-semibold leading-[20px] text-[#05FF00]">
              {coin.change_4h || '+0.00%'}
            </span>
          </p>
          <p className="text-[10px] font-medium leading-[12px] text-[#F5F5F5] opacity-50">
            as of block {coin.block || '00000000'} from Uniswap v3
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col items-center text-center lg:w-auto lg:items-start lg:text-left">
        <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
          Token Categories
        </h3>
        <div className="mt-2 flex w-full justify-center">
          <button className="rounded-full border border-[#04E6E6] bg-transparent px-4 py-1 text-[10px] font-light leading-[12.1px] text-[#04E6E6]">
            No categories
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-auto">
        <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
          Token Links
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2 w-[266px]">
          {[
            { name: 'Moralis Money', link: '#' },
            { name: 'Etherscan', link: `https://etherscan.io/token/${coin.contract}` },
            { name: 'Official website', link: '#' },
            { name: 'Reddit', link: '#' },
          ].map(({ name, link }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-lg border border-[#04E6E6] bg-transparent px-2 py-1 text-[10px] font-light text-[#F5F5F5] w-[130px] h-[30px]"
            >
              <span className="flex items-center">
                <span className="rounded-full bg-[#ffffff] h-[9.75px] w-[9.75px] mr-2"></span>
                {name}
              </span>
              <svg
                className="w-3 h-3 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8L7 21"
                ></path>
              </svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
