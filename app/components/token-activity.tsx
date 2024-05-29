import React from 'react';
import { FaCopy } from 'react-icons/fa';

const ActivityCard = () => {
  return (
    <div
      className=" mt-8 relative mx-auto rounded-[30px] border border-[#04E6E6] bg-[#022527] text-white shadow-inner w-[1000px] h-[203px] p-[24px_48px_48px_32px] shadow-[inset_0_15px_10px_0_rgba(0,0,0,0.25)]"
    >
      <div className="absolute left-[32px] top-[24px] text-[#F5F5F5] font-inter font-semibold text-[20px] leading-[24.2px]">
        Activity
      </div>
      <div className="flex items-start justify-between gap-[16px] pt-[56px]">
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Address</span>
            <div className="flex items-center">
              <div className="mr-1 text-lg font-inter font-semibold text-[#F5F5F5] text-[14px] leading-[14.52px]">0xd8a...6045</div>
              <FaCopy className="text-[#F5F5F5] w-[7.5px] h-[8.5px] border border-[#F5F5F5] rounded-[2px] p-[1px] ml-[5px]" />
            </div>
          </div>
          <div className='mt-2'>
            <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">First seen</span>
            <div className="text-lg font-inter text-[#F5F5F5] text-[14px] leading-[16.94px]">4 months ago</div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Active Chains</span>
          <div className="mb-2 mt-1 flex space-x-1">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-3 w-3 rounded-full bg-gray-500"></div>
            ))}
          </div>
          <div className="mt-6 text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">First seen</div>
          <div className="text-lg font-inter text-[#F5F5F5] text-[14px] leading-[16.94px]">8 months ago</div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Cross-chain Networth</span>
          <div className="text-2xl font-inter font-semibold text-[#F5F5F5] text-[14px] leading-[16.94px]">$3,030,478</div>
        </div>
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#00FFCB]">
          <div className="h-12 w-12 rounded-full bg-[#00FFCB]"></div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
