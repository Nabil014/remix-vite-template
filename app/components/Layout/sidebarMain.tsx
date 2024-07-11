import { useState } from 'react'
import { AiOutlineFieldTime, AiOutlineThunderbolt } from 'react-icons/ai'
import { BiCoinStack } from 'react-icons/bi'
import { BsFillGridFill, BsGraphUp } from 'react-icons/bs'
import { FaFire } from 'react-icons/fa'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { GiWhaleTail } from 'react-icons/gi'
import { MdOutlineBubbleChart, MdOutlineDashboard } from 'react-icons/md'
import { Link } from '@remix-run/react'

interface Props {
  showSidebar: boolean
}

export default function SidebarMain({ showSidebar }: Props) {
  const [showTopTraders, setShowTopTraders] = useState(false)
  const [showTopTokens, setShowTopTokens] = useState(false)

  return (
    <aside
      className={`fixed ${
        showSidebar ? 'left-0' : '-left-full'
      } z-50 w-64 md:left-0 h-[88dvh] transition-all duration-300 overflow-y-auto bg-gradient-to-r from-[#000D0E] via-[#021618] to-[#000D0E] rounded-r-xl`}
    >
      <div className="bg-transparent px-3 pb-4">
        <ul className="mt-8 space-y-2 font-medium">
          <li>
            <Link
              prefetch="intent"
              to="/dashboard/home"
              className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
            >
              <MdOutlineDashboard className="h-5 w-5" />
              Overview
            </Link>
          </li>
          <li>
            <Link
              prefetch="intent"
              to="/dashboard/bubbles"
              className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
            >
              <MdOutlineBubbleChart className="h-5 w-5" />
              Crypto Bubbles
            </Link>
          </li>
          <li>
            <div
              onClick={() => setShowTopTokens(!showTopTokens)}
              className="group flex cursor-pointer items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
            >
              <BiCoinStack className="h-5 w-5" />
              <div className="flex w-full items-center justify-between">
                Tokens
                {showTopTokens ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {showTopTokens && (
              <ul className="mt-2 space-y-1 pl-8">
                <li>
                  <Link
                    to="/dashboard/volume-coins"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <AiOutlineThunderbolt className="h-4 w-4" />
                    Top Coins by Volume
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/trending-coins"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <AiOutlineThunderbolt className="h-4 w-4" />
                    {/* https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyTrendingGainerslosers */}
                    Trending Coins
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/earlybird-coins"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <AiOutlineFieldTime className="h-4 w-4" />
                    {/* https://coinmarketcap.com/api/documentation/v1/#operation/getV1CryptocurrencyListingsNew */}
                    Top Earlybird Coins
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              onClick={() => setShowTopTraders(!showTopTraders)}
              className="group flex cursor-pointer items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
            >
              <FaFire className="h-5 w-5" />
              <div className="flex w-full items-center justify-between">
                Traders
                {showTopTraders ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {showTopTraders && (
              <ul className="mt-2 space-y-1 pl-8">
                <li>
                  <Link
                    to="/dashboard/top-traders"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <BiCoinStack className="h-4 w-4" />
                    Top Profitable Traders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/wallets-swaps"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <BiCoinStack className="h-4 w-4" />
                    Top Traders by Swaps
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/holders"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <AiOutlineFieldTime className="h-4 w-4" />
                    Top Traders by Earlybird Tokens
                  </Link>
                </li>

                {/* <li>
                  <Link
                    to="/dashboard/holders"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <AiOutlineFieldTime className="h-4 w-4" />
                    Top Whales
                  </Link>
                </li> */}

                 <li>
                  <Link
                    to="/dashboard/holders"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <AiOutlineFieldTime className="h-4 w-4" />
                    Top Holders
                  </Link>
                </li> 
                {/* <li>
                  <Link
                    to="/dashboard/holders"
                    className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
                  >
                    <BsFillGridFill className="h-4 w-4" />
                    Top Traders by CEX
                  </Link>
                </li> */}
              </ul>
            )}
          </li>
          <li>
            <Link
              to="/dashboard/nfts"
              className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
            >
              <BsGraphUp className="h-5 w-5" />
              NFTs
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/holders"
              className="group flex items-center gap-x-4 rounded-lg p-2 text-[#6EEAEA] hover:bg-gray-100 hover:text-gray-900"
            >
              <GiWhaleTail className="h-5 w-5" />
              <div className="flex w-full items-center justify-between">
                Whale Alerts
                <span className="ml-3 inline-flex items-center justify-center rounded-full bg-gray-100 px-2 text-sm font-medium text-gray-800 dark:text-gray-300">
                  Pro
                </span>
              </div>
            </Link>
          </li>
        </ul>
        <div className="mt-4 flex items-center md:hidden">
          <ul className="text-md ml-2 flex flex-col gap-y-2 font-medium  tracking-[1px]">
            <li>
              <Link
                to="/"
                className="text-white hover:underline dark:text-white"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:underline dark:text-white"
              >
                Company
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:underline dark:text-white"
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-white hover:underline dark:text-white"
              >
                Features
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  )
}
