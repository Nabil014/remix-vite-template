import { useCallback, useEffect, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Link, Outlet, useFetcher, useMatches } from "@remix-run/react";
import clsx from "clsx";
import { motion, useScroll, useTransform } from "framer-motion";
if (typeof global === 'undefined') {
  window.global = window;
}
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
  const [traders, setTraders] = useState([]);
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
    (match) => match.id === "routes/dashboard.wallets.$id"
  );

  useEffect(() => {
    navBackgroundColor.onChange((color) => {
      document.querySelector("meta[name=theme-color]")?.setAttribute("content", color);
    });
  }, [navBackgroundColor]);

  useEffect(() => {
    if (fetcher.data ) {
      setTraders((prevTokens) => [...prevTokens, ...fetcher.data.traders]);
      setLoading(false);
    }
  }, [fetcher.data]);

  useEffect(() => {
    fetcher.load(`/api/traders?limit=15`);
  }, []);

  const loadMore = useCallback(() => {
    if (!loading) {
      setLoading(true);
      fetcher.load(`/api/traders?limit=15&offset=${traders.length}`);
    }
  }, [fetcher, traders.length, loading]);

  const formatPrice = (price) => {
    return price < 1 ? price?.toFixed(8) : price?.toFixed(2);
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
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
    height: '89vh',
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
            <h1 className="text-2xl font-bold">Top Traders</h1>
            <p className="text-lg">Address & Volume Details</p>
          </div>
        </motion.nav>
        <section className="overflow-y-auto flex-grow p-2 custom-scrollbar" ref={containerRef} style={{ height: '89vh' }}>
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 0px;
              background: transparent;
            }
            .custom-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
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
          {loading && traders.length === 0 ? (
            <div className='flex justify-center items-center h-full w-full'>
              <span className="loading loading-infinity loading-lg"></span>
            </div>
          ) : (
            <div className="max-w-full px-2 py-4">
              <div className="min-w-full align-middle">
                <div className="rounded-xl shadow-sm overflow-hidden">
                  <div className="mb-4 table-header">
                    <div>Address</div>
                    <div>Volume</div>
                    <div className='mr-9'>Swaps</div>
                  </div>
                  <Virtuoso
                    style={{ height: '80vh', overflowX: 'hidden', padding: 5 }}
                    data={traders}
                    endReached={loadMore}
                    increaseViewportBy={200}
                    itemContent={(index, token) => (
                      <Link 
                        to={token.account}
                        key={token.account} 
                        className="link-item"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-x-2">
                            <span className="font-semibold text-sm text-gray-200">{shortenAddress(token.account)}</span>
                          </div>
                          <div className="text-sm text-gray-200">${formatPrice(token.volume)}</div>
                          <div className="text-sm text-gray-200 mr-6">{token.swaps}</div>
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
