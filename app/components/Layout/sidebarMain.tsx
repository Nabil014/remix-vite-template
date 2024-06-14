import { useState } from 'react';
import { AiOutlineFieldTime, AiOutlineThunderbolt } from 'react-icons/ai';
import { BiCoinStack } from 'react-icons/bi';
import { BsFillGridFill, BsGraphUp } from 'react-icons/bs';
import { FaFire } from 'react-icons/fa';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { GiWhaleTail } from 'react-icons/gi';
import { MdOutlineBubbleChart, MdOutlineDashboard } from 'react-icons/md';
import { Link } from '@remix-run/react';

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
      } z-50 w-64 md:left-0 h-dvh transition-all duration-300 bg-gradient-to-r from-[#000D0E] via-[#021618] to-[#000D0E] rounded-r-xl`}
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
                Tokens
                {showTopTokens ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {showTopTokens && (
              <ul className='pl-8 mt-2 space-y-1'>
                
                <li>
                  <Link to='/dashboard/trending-coins' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <AiOutlineThunderbolt className='w-4 h-4' />
                    Top Coins by Volume
                  </Link>
                </li>
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
                 Traders
                {showTopTraders ? <FiChevronUp /> : <FiChevronDown />}
              </div>
            </div>
            {showTopTraders && (
              <ul className='pl-8 mt-2 space-y-1'>
                <li>
                  <Link to='/dashboard/holders' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <BiCoinStack className='w-4 h-4' />
                    Top Profitable Traders
                  </Link>
                </li>
                <li>
                  <Link to='/dashboard/holders' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <BiCoinStack className='w-4 h-4' />
                    Top Traders by Swaps
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
                    <AiOutlineFieldTime className='w-4 h-4' />
                    Top Whales
                  </Link>
                </li>
                
                <li>
                  <Link to='/dashboard/holders' className='flex items-center text-[#6EEAEA] p-2 gap-x-4 rounded-lg hover:bg-gray-100 hover:text-gray-900 group'>
                    <AiOutlineFieldTime className='w-4 h-4' />
                    Top Holders
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
               NFTs
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
        <div className='flex items-center md:hidden mt-4'>
              <ul className='flex flex-col gap-y-2 tracking-[1px] font-medium ml-2  text-md'>
                <li>
                  <Link
                    to='/'
                    className='text-white dark:text-white hover:underline'
                    aria-current='page'
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='text-white dark:text-white hover:underline'
                  >
                    Company
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='text-white dark:text-white hover:underline'
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    to='/'
                    className='text-white dark:text-white hover:underline'
                  >
                    Features
                  </Link>
                </li>
              </ul>
            </div>
      </div>
    </aside>
  );
}
