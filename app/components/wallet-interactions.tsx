import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

interface WalletInteractionsProps {
  walletInteractionsData: { [key: string]: number };
}

export default function WalletInteractions({ walletInteractionsData }: WalletInteractionsProps) {
  const [showAll, setShowAll] = useState(false);

  
  const transformedData = Object.entries(walletInteractionsData).map(([address, interactions]) => ({
    address,
    interactions,
  }));

  const dataToShow = showAll ? transformedData : transformedData.slice(0, 7);

  return (
    <div className="flex flex-col gap-y-4 min-h-[500px] text-white">
      <div>
        <h2 className="text-[14px] font-semibold text-[#F5F5F5] leading-[16.94px]">Wallet Interactions</h2>
        <p className="text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px] opacity-50 mt-2">
          Wallet interactions based on the last 90 days
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-between text-lg gap-x-5">
        <div className="flex items-center mb-2 sm:mb-0">
          <div className="flex items-center justify-center w-[25.5px] h-[24.75px] border-[1.5px] border-[#F5F5F5] rounded-full">
            <FaArrowUp className="text-white-500" />
          </div>
          <span className="ml-2 text-[14px] font-semibold text-[#F5F5F5] leading-[16.94px] mr-2">13</span>
          <span className="text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px] opacity-50">unique addresses sent to</span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-[25.5px] h-[24.75px] border-[1.5px] border-[#F5F5F5] rounded-full">
            <FaArrowUp className="text-white-500" />
          </div>
          <span className="ml-2 text-[14px] font-semibold text-[#F5F5F5] leading-[16.94px] mr-2">13</span>
          <span className="ml-2 text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px] opacity-50">unique addresses sent to</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-[#04E6E6] py-2 text-left text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px]">Address</th>
              <th className="border-b border-[#04E6E6] py-2 text-right text-[10px] font-bold text-[#F5F5F5] leading-[12.1px]">Interactions</th>
            </tr>
          </thead>
          <tbody>
            {dataToShow.map((interaction, index) => (
              <tr key={index} className="space-y-2">
                <td className="border-b border-[#04E6E6] py-3 text-left text-[10px] font-semibold text-[#dfdbdb] leading-[12.1px]">{interaction.address}</td>
                <td className="border-b border-[#04E6E6] py-3 text-right text-[10px] font-semibold text-[#dfdbdb] leading-[12.1px]">{interaction.interactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transformedData.length > 7 && (
        <div className="flex justify-center ">
          <button 
            className="text-teal-400 hover:text-teal-300" 
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'View less' : 'View all'}
          </button>
        </div>
      )}
    </div>
  );
}
