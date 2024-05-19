import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, Outlet, useFetcher, useMatches } from "@remix-run/react";
import { motion, useScroll, useTransform } from "framer-motion";
import clsx from "clsx";
import { Virtuoso } from 'react-virtuoso';

const Footer = () => {
  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        color: 'white'
      }}
    >
      Loading...
    </div>
  );
};
 
export default function Index() {
  const fetcher = useFetcher();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef(null);
  const { scrollY } = useScroll({ container: containerRef });
  const range = [0, 30, 60];
  const navBackgroundColor = useTransform(scrollY, range, [
    '#ffffff',
    '#ffffff',
    '#f8f9fa',
  ]);

  const matches = useMatches();
  const isTraderDetails = matches.some(
    (match) => match.id === "routes/dashboard.tokens.$id"
  );

  useEffect(() => {
    navBackgroundColor.onChange((color) => {
      document.querySelector("meta[name=theme-color]")?.setAttribute("content", color);
    });
  }, [navBackgroundColor]);

  useEffect(() => {
    if (fetcher.data) {
      setTokens((prevTokens) => [...prevTokens, ...fetcher.data.tokens]);
      setLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    fetcher.load(`/api/tokens?limit=15`);
  }, []);

  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      fetcher.load(`/api/tokens?limit=20&offset=${tokens.length}`);
    }
  }, [fetcher, tokens.length, loading]);

  const formatPrice = (price) => {
    return price < 1 ? price.toFixed(8) : price.toFixed(2);
  };

  const sideBarStyles = {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
    flexGrow: 0,
    flexShrink: 0,
    borderRight: '1px solid #e5e7eb',
    overflow: 'hidden',
    color: '#e2e8f0',
  };

  const contentStyles = {
    flexDirection: 'column',
    height: '89vh', // Set the height to 89vh
    overflowY: 'auto',
    color: '#e2e8f0',
  };

  return (
    <div className="flex h-full">
     
      <div className={clsx(
        "md:w-[40%] flex-grow-0 flex-shrink-0 h-full flex flex-col relative md:border-r border-gray-100"
      )} style={sideBarStyles}>
        <motion.nav className="flex justify-between items-center h-16 px-6 bg-[#1a1a1a] border-b border-gray-700">
          <div>
            <h1 className="text-2xl font-bold">Top Tokens</h1>
            <p className="text-lg">Get list of top tokens on Uniswap V3</p>
          </div>
        </motion.nav>
        <section className="overflow-y-auto flex-grow p-2 custom-scrollbar" ref={containerRef} style={{ height: '89vh' }}>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 0px; /* Remove scrollbar space */
              background: transparent; /* Optional: just make scrollbar invisible */
            }
            .custom-scrollbar {
              -ms-overflow-style: none;  /* IE and Edge */
              scrollbar-width: none;  /* Firefox */
            }
            .link-item {
              display: block;
              padding: 0.5rem 1rem;
              border-radius: 0.5rem;
              transition: background-color 0.3s, transform 0.3s;
            }
            .link-item:hover {
              background-color: #2d3748;
              transform: scale(1.02);
            }
            .table-header {
              display: flex;
              justify-content: space-between;
              padding: 0.5rem 1rem;
              border-bottom: 1px solid #e5e7eb;
              background-color: #1a1a1a;
              color: #e2e8f0;
              font-weight: bold;
              font-size: 0.875rem;
            }
            .table-header div {
              flex: 1;
              text-align: left;
            }
            .table-header div:last-child {
              text-align: right;
            }
          `}</style>
          {loading && tokens.length === 0 ? (
            <div className='flex justify-center items-center h-full w-full'><span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            <div className="max-w-full px-2 py-4">
              <div className="min-w-full align-middle">
                <div className="rounded-xl shadow-sm overflow-hidden">
                  <div className="mb-4 table-header">
                    <div>Token Name</div>
                    <div className='mr-9'>Price</div>
                  </div>
                  <Virtuoso
                    style={{ height: '80vh', overflowX: 'hidden', padding: 5 }}
                    data={tokens}
                    endReached={loadMore}
                    increaseViewportBy={200}
                    itemContent={(index, token) => (
                      <Link 
                        to={token.contract}
                        key={token.contract} 
                        className="link-item"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-2">
                            {token.logo && <img src={token.logo} alt={token.name} className="w-6 h-6 rounded-full" />}
                            <span className="font-semibold text-sm text-gray-200">{token.name}</span>
                            <span className="text-xs text-gray-500">{token.symbol}</span>
                          </div>
                          <div className="text-sm mr-6 text-gray-200">${formatPrice(token.price)}</div>
                        </div>
                      </Link>
                    )}
                    components={{ Footer }}
                  />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
      <div className="flex-grow h-full" style={contentStyles}>
        {!isTraderDetails ?
          <div className="w-full mx-auto rounded-md h-full overflow-hidden flex items-center justify-center">
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-white dark:text-white text-base mb-10">
                The road to freedom starts from here
              </p>
            </div>
          </div>
          : <Outlet />
        }
      </div>
    </div>
  );
}
