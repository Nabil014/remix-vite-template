import { useEffect, useState } from 'react';

interface WalletTokensProps {
  walletTokens: {
    token_address:string,
    name:string,
    balance_formatted:string,
    logo:string,
    usd_value:number,
    usd_price_24hr_percent_change:number,
    portfolio_percentage:number,
    usd_price:number
  }[]
}

const TokensTable = ({walletTokens}:WalletTokensProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isModalOpen]);

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formatBalance = (balance: string) => {
    const balanceNumber = parseFloat(balance);
    if (balanceNumber % 1 === 0) {
      return balance;
    } else {
      return balanceNumber.toFixed(6);
    }
  };

  return (
    <div>
      <div className="text-white flex flex-col gap-y-4">
          <h2 className="font-inter font-semibold text-[14px] leading-[16.94px] text-[#F5F5F5]">Tokens ({walletTokens?.length})</h2>
        <div className="flex-1">
          <table className="min-w-72 table-auto">
            <thead>
              <tr className="text-left text-[#F5F5F5] font-inter font-bold text-[12px] leading-[14.52px] opacity-50">
                <th className="py-2 w-1/3">Token</th>
                <th className="py-2 text-center w-1/3">Balance</th>
                <th className="py-2 text-center w-1/3 pr-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {walletTokens?.slice(0, 3).map((token, index) => (
                <tr key={index} className="border-b border-[#04E6E6]">
                  <td className="py-2 flex items-center gap-x-2">
                    <img src={token.logo} alt="token-logo" className='w-4 h-4 rounded-full ' />
                    <span className=" text-[10px] font-inter font-bold text-[#F5F5F5] leading-[12.1px]">{token.name}</span>
                  </td>
                  <td className="py-2 text-center">
                    <span className="text-[10px] font-inter font-bold text-[#F5F5F5] leading-[12.1px]">{formatBalance(token.balance_formatted)}</span>
                  </td>
                  <td className="py-2 text-right pr-2">
                    <span className="text-[10px] font-inter font-bold text-[#F5F5F5] leading-[12.1px]">{token.usd_value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center">
          <button className="text-teal-400 hover:text-teal-300" onClick={openModal}>View all &rarr;</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gradient-radial rounded-lg p-8 text-white w-[70vw] h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold">All Tokens</h2>
              <button onClick={closeModal} className="text-teal-400 hover:text-teal-300">Close</button>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left text-[#F5F5F5] font-inter font-bold text-[14px] leading-[16px] opacity-70">
                  <th className="py-2 w-1/6">Token</th>
                  <th className="py-2 w-1/6">Price</th>
                  <th className="py-2 w-1/6">Balance</th>
                  <th className="py-2 w-1/6">Value</th>
                  <th className="py-2 w-1/6">24h Change</th>
                  <th className="py-2 w-1/6 pr-2">Portfolio Percentage</th>
                </tr>
              </thead>
              <tbody>
                {walletTokens?.map((token, index) => (
                  <tr key={index} className="border-b border-[#04E6E6]">
                    <td className="py-3 flex items-center gap-x-2">
                    <img src={token.logo} alt="token-logo" className='w-4 h-4 rounded-full ' />
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[40px]">{token.name}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">${token.usd_price?.toFixed(6)}</span>
                    </td>
                    <td className="py-5">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">{formatBalance(token.balance_formatted)}</span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">${token.usd_value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                    </td> 
                    <td className="py-3 text-left">
                      <span className={`text-[12px] font-inter font-bold ${token.usd_price_24hr_percent_change < 0 ? 'text-[#FF0000]' : 'text-[#05FF00]'} leading-[14px]`}>
                        {token.usd_value?.toFixed(2)}% (${token.usd_price_24hr_percent_change?.toFixed(2)})
                      </span>
                    </td>
                    <td className="py-3 text-left pr-2">
                      <span className="text-[12px] font-inter font-bold text-[#F5F5F5] leading-[14px]">{token.portfolio_percentage}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default TokensTable;
