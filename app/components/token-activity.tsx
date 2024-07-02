import { useState } from 'react'
import { faCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  SkeletonActivityAddress,
  SkeletonActivityChain,
} from './skeleton/skeletonActivity'

const ActivityCard = ({ walletData, loading }: any) => {
  const [copied, setCopied] = useState(false)
  const firstTransaction = walletData?.overview?.active_chains[0].first_transaction
  const lastTransaction = walletData?.overview?.active_chains[0].last_transaction
  const firstSeen = firstTransaction?.block_timestamp
    ? new Date(firstTransaction?.block_timestamp).toLocaleDateString()
    : 'N/A'
  const lastSeen = lastTransaction?.block_timestamp
    ? new Date(lastTransaction?.block_timestamp).toLocaleDateString()
    : 'N/A'

  const formatAddress = (address: string) => {
    return `${address?.toString().slice(0, 6)}...${address?.toString().slice(-4)}`
  }
  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="mx-auto min-h-[203px] w-full rounded-[30px] border border-[#04E6E6] bg-[#022527] p-6 text-white shadow-[inset_0_15px_10px_0_rgba(0,0,0,0.25)]">
      <h3 className="font-inter pb-4 text-[20px] font-semibold leading-[24.2px] text-[#F5F5F5] text-center lg:text-left">
        Activity
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center lg:justify-items-start">
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-inter text-[12px] text-sm leading-[14.52px] text-[#F5F5F5] opacity-50">
              Address
            </span>
            <div className="flex items-center">
              {loading ? (
                <SkeletonActivityAddress />
              ) : (
                <>
                  <div className="font-inter mr-1 text-[14px] font-semibold leading-[14.52px] text-[#F5F5F5]">
                    {formatAddress(walletData?.overview?.address)}
                  </div>
                  <button
                    onClick={() => copyToClipboard(walletData?.overview?.address)}
                    className="text-[14px] font-bold text-[#04E6E6] hover:text-[#03C5C5]"
                  >
                    <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
                  </button>
                </>
              )}
            </div>
          </div>
          <div>
            <span className="font-inter text-[12px] text-sm leading-[14.52px] text-[#F5F5F5] opacity-50">
              First seen
            </span>
            {loading ? (
              <SkeletonActivityAddress />
            ) : (
              <div className="font-inter text-[14px] leading-[16.94px] text-[#F5F5F5]">
                {firstSeen}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-inter text-[12px] text-sm leading-[14.52px] text-[#F5F5F5] opacity-50">
              Active Chains
            </span>
            {loading ? (
              <SkeletonActivityChain />
            ) : (
              <div className="mb-2 flex space-x-1">
                {walletData?.overview?.chains?.map((chain: string, index: number) => (
                  <div
                    key={index}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500"
                  >
                    <img
                      src={`/path-to-icons/${chain}.svg`}
                      alt={chain}
                      className="h-4 w-4"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className='flex flex-col'>
            <span className="font-inter text-[12px] text-sm leading-[14.52px] text-[#F5F5F5] opacity-50">
              Last seen
            </span>
            {loading ? (
              <SkeletonActivityAddress />
            ) : (
              <span className="font-inter text-[14px] leading-[16.94px] text-[#F5F5F5]">
                {lastSeen}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="font-inter text-[12px] text-sm leading-[14.52px] text-[#F5F5F5] opacity-50">
              Cross-chain Networth
            </span>
            {loading ? (
              <SkeletonActivityAddress />
            ) : (
              <span className="font-inter text-2xl text-[14px] font-semibold leading-[16.94px] text-[#F5F5F5]">
                $ {walletData?.overview?.total_networth_usd}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="h-24 w-24 items-center justify-center rounded-full border-8 border-[#00FFCB] hidden lg:flex">
            <div className="h-12 w-12 rounded-full bg-[#00FFCB]"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityCard
