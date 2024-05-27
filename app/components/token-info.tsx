const TokenInfo = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center rounded-lg bg-transparent p-4 lg:p-6 text-white">
      <div className="flex items-center space-x-4 w-full lg:w-auto">
        <div className="flex h-[39px] w-[39px] items-center justify-center rounded-full bg-gray-700">
          <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=014" alt="Bitcoin Logo" className="h-[39px] w-[39px] rounded-full" />
        </div>
        <div>
          <h2 className="flex items-center text-[20px] font-semibold leading-[24.2px]">
            Wrapped Ether
            <span className="ml-1 text-blue-500 text-lg">✔</span>
          </h2>
          <p className="text-[25px] font-semibold leading-[30.26px] text-[#F5F5F5]">
            $3,748.47
            <span className="ml-2 text-[#05FF00] text-[12px] font-semibold leading-[14.52px]">+1.007%</span>
          </p>
          <p className="text-[8px] font-medium leading-[9.68px] text-[#F5F5F5] opacity-50">
            as of block 00000000 from Uniswap v3
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start text-center lg:text-left w-full lg:w-auto">
        <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
          Token Categories
        </h3>
        <button className="mt-2 rounded-full border border-[#04E6E6] bg-transparent px-4 py-1 text-[#04E6E6] text-[10px] font-light leading-[12.1px]">
          No categories
        </button>
      </div>

      <div className="flex flex-col items-center justify-center lg:justify-start lg:items-start text-center lg:text-left w-full lg:w-auto">
        <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
          Token Links
        </h3>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <a
            href="#"
            className="flex items-center justify-between rounded-lg border border-[#04E6E6] bg-transparent px-4 py-2 text-xs text-[#F5F5F5] w-full lg:w-auto"
            style={{ height: '35px' }}
          >
            <span className="flex items-center">
              <span className="rounded-full bg-white h-3 w-3 mr-2"></span>
              Moralis Money
            </span>
            <span className="ml-2">🔗</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between rounded-lg border border-[#04E6E6] bg-transparent px-4 py-2 text-xs text-[#F5F5F5] w-full lg:w-auto"
            style={{ height: '35px' }}
          >
            <span className="flex items-center">
              <span className="rounded-full bg-white h-3 w-3 mr-2"></span>
              Etherscan
            </span>
            <span className="ml-2">🔗</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between rounded-lg border border-[#04E6E6] bg-transparent px-4 py-2 text-xs text-[#F5F5F5] w-full lg:w-auto"
            style={{ height: '35px' }}
          >
            <span className="flex items-center">
              <span className="rounded-full bg-white h-3 w-3 mr-2"></span>
              Official website
            </span>
            <span className="ml-2">🔗</span>
          </a>
          <a
            href="#"
            className="flex items-center justify-between rounded-lg border border-[#04E6E6] bg-transparent px-4 py-2 text-xs text-[#F5F5F5] w-full lg:w-auto"
            style={{ height: '35px' }}
          >
            <span className="flex items-center">
              <span className="rounded-full bg-white h-3 w-3 mr-2"></span>
              Reddit
            </span>
            <span className="ml-2">🔗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
