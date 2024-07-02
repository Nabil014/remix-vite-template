import { useEffect, useState } from 'react'
import { SkeletonTokenTable } from './skeleton/skeletonActivity'

interface WalletTokensProps {
  walletTokens: {
    token_address: string
    name: string
    balance_formatted: string
    logo: string
    usd_value: number
    usd_price_24hr_percent_change: number
    portfolio_percentage: number
    usd_price: number
  }[]
  loading: boolean
}

const TokensTable = ({ walletTokens, loading }: WalletTokensProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  const openModal = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const formatBalance = (balance: string) => {
    const balanceNumber = parseFloat(balance)
    if (balanceNumber % 1 === 0) {
      return balance
    } else {
      return balanceNumber.toFixed(6)
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-y-4 text-white">
        <h2 className="font-inter text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">
          Tokens ({walletTokens?.length})
        </h2>
        <div className="flex-1">
          {loading ? (
            <div className='max-w-[350px]'>

              <SkeletonTokenTable />
            </div>
          ) : (
            <table className="min-w-72 table-auto">
              <thead>
                <tr className="font-inter text-left text-[12px] font-bold leading-[14.52px] text-[#F5F5F5] opacity-50">
                  <th className="w-1/3 py-2">Token</th>
                  <th className="w-1/3 py-2 text-center">Balance</th>
                  <th className="w-1/3 py-2 pr-2 text-center">Value</th>
                </tr>
              </thead>
              <tbody>
                {walletTokens?.slice(0, 3).map((token, index) => (
                  <tr key={index} className="border-b border-[#04E6E6]">
                    <td className="flex items-center gap-x-2 py-2">
                      <img
                        src={token.logo}
                        alt="token-logo"
                        className="h-4 w-4 rounded-full "
                      />
                      <span className=" font-inter text-[10px] font-bold leading-[12.1px] text-[#F5F5F5]">
                        {token.name}
                      </span>
                    </td>
                    <td className="py-2 text-center">
                      <span className="font-inter text-[10px] font-bold leading-[12.1px] text-[#F5F5F5]">
                        {formatBalance(token.balance_formatted)}
                      </span>
                    </td>
                    <td className="py-2 pr-2 text-right">
                      <span className="font-inter text-[10px] font-bold leading-[12.1px] text-[#F5F5F5]">
                        {token.usd_value.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="text-center">
          <button
            className="text-teal-400 hover:text-teal-300"
            onClick={openModal}
          >
            View all &rarr;
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <div className="h-[90vh] w-[70vw] overflow-y-auto rounded-lg bg-gradient-radial p-8 text-white">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold">All Tokens</h2>
              <button
                onClick={closeModal}
                className="text-teal-400 hover:text-teal-300"
              >
                Close
              </button>
            </div>
            <table className="w-full table-auto">
              <thead>
                <tr className="font-inter text-left text-[14px] font-bold leading-[16px] text-[#F5F5F5] opacity-70">
                  <th className="w-1/6 py-2">Token</th>
                  <th className="w-1/6 py-2">Price</th>
                  <th className="w-1/6 py-2">Balance</th>
                  <th className="w-1/6 py-2">Value</th>
                  <th className="w-1/6 py-2">24h Change</th>
                  <th className="w-1/6 py-2 pr-2">Portfolio Percentage</th>
                </tr>
              </thead>
              <tbody>
                {walletTokens?.map((token, index) => (
                  <tr key={index} className="border-b border-[#04E6E6]">
                    <td className="flex items-center gap-x-2 py-3">
                      <img
                        src={token.logo}
                        alt="token-logo"
                        className="h-4 w-4 rounded-full "
                      />
                      <span className="font-inter text-[12px] font-bold leading-[40px] text-[#F5F5F5]">
                        {token.name}
                      </span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="font-inter text-[12px] font-bold leading-[14px] text-[#F5F5F5]">
                        ${token.usd_price?.toFixed(6)}
                      </span>
                    </td>
                    <td className="py-5">
                      <span className="font-inter text-[12px] font-bold leading-[14px] text-[#F5F5F5]">
                        {formatBalance(token.balance_formatted)}
                      </span>
                    </td>
                    <td className="py-3 text-left">
                      <span className="font-inter text-[12px] font-bold leading-[14px] text-[#F5F5F5]">
                        $
                        {token.usd_value?.toLocaleString('en-US', {
                          style: 'currency',
                          currency: 'USD',
                        })}
                      </span>
                    </td>
                    <td className="py-3 text-left">
                      <span
                        className={`font-inter text-[12px] font-bold ${token.usd_price_24hr_percent_change < 0 ? 'text-[#FF0000]' : 'text-[#05FF00]'} leading-[14px]`}
                      >
                        {token.usd_value?.toFixed(2)}% ($
                        {token.usd_price_24hr_percent_change?.toFixed(2)})
                      </span>
                    </td>
                    <td className="py-3 pr-2 text-left">
                      <span className="font-inter text-[12px] font-bold leading-[14px] text-[#F5F5F5]">
                        {token.portfolio_percentage}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default TokensTable
