import React from 'react';
import { FaCopy } from 'react-icons/fa';

const ActivityCard = (walletData:any,address:any) => {
  console.log("fetcher1 "+JSON.stringify(walletData))
  console.log("fetcher2 "+JSON.stringify(walletData.walletData))
  console.log("fetcher3 "+JSON.stringify(walletData.walletData?.overview.total_networth_usd))
  const firstTransaction = walletData?.walletData?.overview?.active_chains[0].first_transaction
  const lastTransaction = walletData?.walletData?.overview?.active_chains[0].last_transaction
 const firstSeen = firstTransaction?.block_timestamp ? new Date(firstTransaction?.block_timestamp).toLocaleDateString() : "N/A";
  const lastSeen = lastTransaction?.block_timestamp ? new Date(lastTransaction?.block_timestamp).toLocaleDateString() : "N/A";

  console.log("fetcher4"+JSON.stringify(firstTransaction))
  console.log("fetcher4"+JSON.stringify(lastTransaction)) 
  console.log("fetche5"+JSON.stringify(firstSeen))
  console.log("fetcher5"+JSON.stringify(lastSeen)) 


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
          <div className="mr-1 font-inter font-semibold text-[#F5F5F5] text-[14px] leading-[14.52px]">{walletData.walletData?.overview.address}</div>
            <FaCopy className="text-[#F5F5F5] w-[7.5px] h-[8.5px] border border-[#F5F5F5] rounded-[2px] p-[1px] ml-[5px]" />
            </div>
          </div>
          <div className='mt-2'>
            <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">First seen</span>
            <div className="font-inter text-[#F5F5F5] text-[14px] leading-[16.94px]">{firstSeen}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Active Chains</span>
          <div className="mb-2 mt-1 flex space-x-1">
          {walletData.walletData?.overview.chains.map((chain, index) => (
              <div key={index} className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center">
                <img src={`/path-to-icons/${chain.chain}.svg`} alt={chain.chain} className="h-4 w-4" />
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Last seen</div>
          <div className="font-inter text-[#F5F5F5] text-[14px] leading-[16.94px]">{lastSeen}</div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Cross-chain Networth</span>
          <div className="text-2xl font-inter font-semibold text-[#F5F5F5] text-[14px] leading-[16.94px]">          
           {walletData.walletData?.overview.total_networth_usd+"$"}
             </div>
        </div>
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-8 border-[#00FFCB]">
          <div className="h-12 w-12 rounded-full bg-[#00FFCB]"></div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
