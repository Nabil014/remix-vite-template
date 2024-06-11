import { Link } from '@remix-run/react';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FaFire } from 'react-icons/fa';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { RiWallet3Fill } from 'react-icons/ri';
import { BsGraphUp, BsFillGridFill } from 'react-icons/bs';
import { MdOutlineBubbleChart, MdOutlineDashboard } from 'react-icons/md';
import { GiWhaleTail } from 'react-icons/gi';
import { BiCoinStack } from 'react-icons/bi';
import { AiOutlineFieldTime } from 'react-icons/ai';

interface Props {
  showSidebar: boolean;
}

export default function SidebarMain({ showSidebar }: Props) {
  const [showTopTraders, setShowTopTraders] = useState(false);
  const [showTopTokens, setShowTopTokens] = useState(false);

  return (
    <aside
      className={`fixed ${
        showSidebar ? 'left-0' : '-left-full'
      } z-50 w-64 md:left-0 h-screen transition-all duration-300 bg-gradient-to-r from-[#043033] via-[#000D0E] to-[#000D0E] border-r border-gray-700`}
    >
      <div className='px-3 pb-4 bg-transparent'>
        <ul className='space-y-2 mt-8 font-medium'>
          <li>
            <Link
              prefetch='intent'
              to='/dashboard/home'
              className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'
            >
              <MdOutlineDashboard className='w-5 h-5' />
              Overview
            </Link>
          </li>
          <li>
            <Link
              prefetch='intent'
              to='/dashboard/bubbles'
              className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'
            >
              <MdOutlineBubbleChart className='w-5 h-5' />
              Crypto Bubbles
            </Link>
          </li>
          <li>
            <div
              onClick={() => setShowTopTokens(!showTopTokens)}
              className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-900 group'
            >
              <BiCoinStack className='w-5 h-5' />
              <div className='flex items-center justify-between w-full'>
                Top Tokens
                {showTopTokens ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {showTopTokens && (
              <ul className='pl-8 mt-2 space-y-1'>
                <li>
                  <Link to='/dashboard/trending-coins' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <AiOutlineThunderbolt className='w-4 h-4' />
                    Trending Coins
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard/details' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <AiOutlineFieldTime className='w-4 h-4' />
                    Top Earlybird Coins
                  </Link>
                </li>
              </ul>
            )}
          </li>
        
          <li>
            <div
              onClick={() => setShowTopTraders(!showTopTraders)}
              className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-900 group'
            >
              <FaFire className='w-5 h-5' />
              <div className='flex items-center justify-between w-full'>
                Top Traders
                {showTopTraders ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {showTopTraders && (
              <ul className='pl-8 mt-2 space-y-1'>
                <li>
                  <Link to='/dashboard/holders' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <BiCoinStack className='w-4 h-4' />
                    Top Traders by Volume
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard/holders' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <AiOutlineFieldTime className='w-4 h-4' />
                    Top Traders by Earlybird Tokens
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard/holders' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <BsFillGridFill className='w-4 h-4' />
                    Top Traders by CEX
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
              to='/dashboard/holders'
              className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'
            >
              <BsGraphUp className='w-5 h-5' />
              Top NFTs
            </Link>
          </li>
          <li>
            <Link
              to='/dashboard/holders'
              className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'
            >
              <GiWhaleTail className='w-5 h-5' />
              <div className='flex items-center justify-between w-full'>
                Whale Alerts
                <span className='inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:text-gray-300'>
                  Pro
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
