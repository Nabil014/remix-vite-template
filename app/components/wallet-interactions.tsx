import { useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'
import { SkeletonWalletInteractions } from './skeleton/skeletonActivity'

interface WalletInteractionsProps {
  walletInteractionsData: { [key: string]: number }
  walletUniqueSent: []
  walletUniqueReceived: []
  loading: boolean
}

export default function WalletInteractions({
  walletInteractionsData,
  walletUniqueSent,
  walletUniqueReceived,
  loading,
}: WalletInteractionsProps) {
  const [showAll, setShowAll] = useState(false)

  const transformedData = Object.entries(walletInteractionsData).map(
    ([address, interactions]) => ({
      address,
      interactions,
    }),
  )

  const dataToShow = showAll ? transformedData : transformedData.slice(0, 7)

  return (
    <div className="flex mb-4 flex-col gap-y-4 text-white">
      <div>
        <h2 className="text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">
          Wallet Interactions
        </h2>
        <p className="mt-2 text-[10px] font-semibold leading-[12.1px] text-[#F5F5F5] opacity-50">
          Wallet interactions based on the last 90 days
        </p>
      </div>
      <div className="flex flex-col justify-between gap-x-5 text-lg sm:flex-row">
        <div className="mb-2 flex items-center sm:mb-0">
          <div className="flex h-[24.75px] w-[25.5px] items-center justify-center rounded-full border-[1.5px] border-[#F5F5F5]">
            <FaArrowUp className="text-white-500" />
          </div>
          <span className="ml-2 mr-2 text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">
            {walletUniqueSent?.length}
          </span>
          <span className="text-[10px] font-semibold leading-[12.1px] text-[#F5F5F5] opacity-50">
            unique addresses sent to
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex h-[24.75px] w-[25.5px] items-center justify-center rounded-full border-[1.5px] border-[#F5F5F5]">
            <FaArrowUp className="text-white-500" />
          </div>
          <span className="ml-2 mr-2 text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">
            {walletUniqueReceived?.length}
          </span>
          <span className="ml-2 text-[10px] font-semibold leading-[12.1px] text-[#F5F5F5] opacity-50">
            unique addresses received from
          </span>
        </div>
      </div>
        <table className="border-collapse ">
          <thead>
            <tr>
              <th className="border-b border-[#04E6E6] py-2 text-left text-[10px] font-semibold leading-[12.1px] text-[#F5F5F5]">
                Address
              </th>
              <th className="border-b border-[#04E6E6] py-2 text-right text-[10px] font-bold leading-[12.1px] text-[#F5F5F5]">
                Interactions
              </th>
            </tr>
          </thead>
          {loading ? (
            <SkeletonWalletInteractions />
          ) : (
            <tbody>
              {dataToShow?.map((interaction, index) => (
                <tr key={index} className="space-y-2">
                  <td className="border-b border-[#04E6E6] py-3 text-left text-[10px] font-semibold leading-[12.1px] text-[#dfdbdb]">
                    {interaction.address}
                  </td>
                  <td className="border-b border-[#04E6E6] py-3 text-right text-[10px] font-semibold leading-[12.1px] text-[#dfdbdb]">
                    {interaction.interactions}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      {transformedData?.length > 7 && (
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
  )
}
