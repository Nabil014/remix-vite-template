import { useState } from 'react';
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ActivityCard = (walletData:any) => {
  const [copied,setCopied]=useState(false)
  const firstTransaction = walletData?.walletData?.overview?.active_chains[0].first_transaction
  const lastTransaction = walletData?.walletData?.overview?.active_chains[0].last_transaction
 const firstSeen = firstTransaction?.block_timestamp ? new Date(firstTransaction?.block_timestamp).toLocaleDateString() : "N/A";
  const lastSeen = lastTransaction?.block_timestamp ? new Date(lastTransaction?.block_timestamp).toLocaleDateString() : "N/A";
 
  const formatAddress = (address: string) => {
    return `${address?.toString().slice(0, 6)}...${address?.toString().slice(-4)}`;
  };
  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <div
      className="w-full  mx-auto rounded-[30px] border border-[#04E6E6] bg-[#022527] text-white h-[203px] p-6 shadow-[inset_0_15px_10px_0_rgba(0,0,0,0.25)]"
    >
      <div className="flex flex-col text-[#F5F5F5] font-inter font-semibold text-[20px] leading-[24.2px] pb-4">
        Activity
      </div>
      <div className="flex justify-between gap-6 ">
        <div className="flex flex-col">
          <div className="mb-4">
            <span className="text-sm text-[#F5F5F5] opacity-50 font-inter text-[12px] leading-[14.52px]">Address</span>
            <div className="flex items-center">
          <div className="mr-1 font-inter font-semibold text-[#F5F5F5] text-[14px] leading-[14.52px]">{formatAddress(walletData?.walletData?.overview.address)}</div><button
              onClick={() => copyToClipboard(walletData.walletData?.overview.address)}
              className="text-[14px] font-bold text-[#04E6E6] hover:text-[#03C5C5]">
              <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
            </button>
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
          {walletData.walletData?.overview.chains.map((chain, index:number) => (
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
