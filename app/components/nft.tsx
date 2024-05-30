import React from 'react';

export const NFTs = () => {
  return (
    <div className="bg-[#022527] p-6 rounded-2xl text-white border border-[#04E6E6] shadow-[inset_0px_4px_10px_0px_rgba(0,0,0,0.25)] w-[375px]">
      <div className="mb-4">
        <p className="text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">NFTs</p>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-[12px] font-bold leading-[14.52px] text-[#F5F5F5] opacity-50">Collections</p>
          <p className="text-[14px] font-bold leading-[16.94px] mt-1 text-[#F5F5F5]">2246</p>
        </div>
        <div>
          <p className="text-[12px] font-bold leading-[14.52px] text-[#F5F5F5] opacity-50">NFTs</p>
          <p className="text-[10px] font-bold leading-[12.1px] mt-1 text-[#F5F5F5]">27130</p>
        </div>
      </div>
      <hr className="border-t border-[#04E6E6] my-4" />
      <div className="flex justify-center">
        <button className="text-[#04E6E6] text-sm">View all →</button>
      </div>
    </div>
  );
};
