import React from 'react';

// Icons can be imported or definidos as SVG elements
const WhaleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#04E6E6]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-4.418 3.582-8 8-8s8 3.582 8 8c0 4.418-3.582 8-8 8s-8-3.582-8-8zm8 0V9m0 2v2m2-2h2m-4 0h-2" />
  </svg>
);

const EarlyAdopterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#04E6E6]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.29 10.71a1 1 0 001.42 0L21 2.42A1 1 0 0020 1H4a1 1 0 00-.71 1.71L11.29 10.71zM12 12.43l-7.71-7.71A1 1 0 004 4v16a1 1 0 001.29.96L12 18.43l6.71 2.53A1 1 0 0020 20V4a1 1 0 00-1.71-.71L12 12.43z" />
  </svg>
);

const MultiChainerIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#04E6E6]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h.01M12 12h.01M19 12h.01M5 19h.01M12 19h.01M19 19h.01M5 5h.01M12 5h.01M19 5h.01" />
  </svg>
);

const NFTCollectorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#04E6E6]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2.5A9.5 9.5 0 0121.5 12 9.5 9.5 0 0112 21.5 9.5 9.5 0 012.5 12 9.5 9.5 0 0112 2.5zM9 9h6v6H9V9z" />
  </svg>
);

const TokenSpeculatorIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 text-[#04E6E6]">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11.25a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 4.5h.01M19.5 19.5h.01M4.5 19.5h.01M19.5 4.5h.01M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
  </svg>
);

export const Badges = () => {
  return (
    <div className="bg-[#022527] p-6 rounded-2xl text-white border border-[#04E6E6] shadow-[inset_0px_15px_10px_0px_rgba(0,0,0,0.25)] w-[375px]">
      <div className="mb-4">
        <p className="text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">Badges</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col items-center bg-transparent p-4 rounded-2xl text-[#F5F5F5] border border-[#04E6E6]">
          <WhaleIcon />
          <p className="text-[12px] font-bold leading-[14.52px] mt-2 text-center">Whale</p>
        </div>
        <div className="flex flex-col items-center bg-transparent p-4 rounded-2xl text-[#F5F5F5] border border-[#04E6E6]">
          <EarlyAdopterIcon />
          <p className="text-[12px] font-bold leading-[14.52px] mt-2 text-center">Early Adopter</p>
        </div>
        <div className="flex flex-col items-center bg-transparent p-4 rounded-2xl text-[#F5F5F5] border border-[#04E6E6]">
          <MultiChainerIcon />
          <p className="text-[12px] font-bold leading-[14.52px] mt-2 text-center">Multi-chainer</p>
        </div>
        <div className="flex flex-col items-center bg-transparent p-4 rounded-2xl text-[#F5F5F5] border border-[#04E6E6]">
          <NFTCollectorIcon />
          <p className="text-[12px] font-bold leading-[14.52px] mt-2 text-center">NFT Collector</p>
        </div>
        <div className="flex flex-col items-center bg-transparent p-4 rounded-2xl text-[#F5F5F5] border border-[#04E6E6] opacity-50">
          <TokenSpeculatorIcon />
          <p className="text-[12px] font-bold leading-[14.52px] mt-2 text-center">Token Speculator</p>
        </div>
        <div className="flex flex-col items-center bg-transparent p-4 rounded-2xl text-[#F5F5F5] border border-[#04E6E6] opacity-50">
          <TokenSpeculatorIcon />
          <p className="text-[12px] font-bold leading-[14.52px] mt-2 text-center">Token Speculator</p>
        </div>
      </div>
    </div>
  );
};
