import { FaArrowUp } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const data = [
  { address: '0x7d0f84fb0047fe897919b1cd4264dad3e4c9d5a3', interactions: 9 },
  { address: 'ENS: Public Resolver 2', interactions: 8 },
  { address: '0x7d0f84fb0047fe897919b1cd4264dad3e4c9d5a3', interactions: 3 },
  { address: 'USD Coin (USDC)', interactions: 3 },
  { address: '0x7d0f84fb0047fe897919b1cd4264dad3e4c9d5a3', interactions: 2 },
  { address: 'Hop Protocol: Ethereum Bridge', interactions: 2 },
  { address: '0x7d0f84fb0047fe897919b1cd4264dad3e4c9d5a3', interactions: 2 },
  { address: 'Optimism: getaway', interactions: 1 },
  { address: 'Layerswap 1', interactions: 1 },
  { address: '0x7d0f84fb0047fe897919b1cd4264dad3e4c9d5a3', interactions: 1 },
];

export default function WalletInteractions() {
  return (
    <div className="wallet-interactions mt-6 w-full max-w-[662px] h-auto rounded-[30px] bg-transparent p-6 sm:p-[32px] text-white">
      <h2 className="text-[14px] font-semibold text-[#F5F5F5] leading-[16.94px]">Wallet Interactions</h2>
      <p className="text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px] opacity-50 mt-2">
        Wallet interactions based on the last 90 days
      </p>
      <div className="mt-4 flex flex-col sm:flex-row justify-between text-lg">
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
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b border-[#04E6E6] py-2 text-left text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px]">Address</th>
              <th className="border-b border-[#04E6E6] py-2 text-right text-[10px] font-bold text-[#F5F5F5] leading-[12.1px]">Interactions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((interaction, index) => (
              <tr key={index}>
                <td className="border-b border-[#04E6E6] py-2 text-left text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px]">{interaction.address}</td>
                <td className="border-b border-[#04E6E6] py-2 text-right text-[10px] font-semibold text-[#F5F5F5] leading-[12.1px]">{interaction.interactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
