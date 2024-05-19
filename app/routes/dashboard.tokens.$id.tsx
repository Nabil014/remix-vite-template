import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Loader para la información básica del token
export const loader: LoaderFunction = async ({ params }) => {
  const tokenAddress = params.id;
  if (!tokenAddress) return redirect('/');

  return json({
    tokenAddress
  });
};

export default function TokenDetails() {
  const { tokenAddress } = useLoaderData();
  const [tokenDetails, setTokenDetails] = useState(null);
  const [tokenOverview, setTokenOverview] = useState(null);
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPools = async (tokenAddress, pairedTokenAddress) => {
    const response = await fetch('https://omni.icarus.tools/ethereum/cush/searchPoolsByTokenAddresses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [
          tokenAddress,
          pairedTokenAddress,
          {
            result_size: 62,
            sort_by: "tvl_usd",
            sort_order: false
          }
        ],
      }),
    });

    const data = await response.json();
    return data.result ? data.result.pools : [];
  };

  useEffect(() => {
    const fetchTokenDetails = async () => {
      try {
        setLoading(true);

        // Fetch token details from searchTokenByAddress API
        const tokenResponse = await fetch('https://omni.icarus.tools/ethereum/cush/searchTokenByAddress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            params: [
              tokenAddress,
              {
                result_size: 1,
                sort_by: "tvl",
                sort_order: false
              }
            ],
          }),
        });

        const tokenData = await tokenResponse.json();
        console.log("tokenData " + JSON.stringify(tokenData));

        if (tokenData.result) {
          setTokenDetails(tokenData.result.results[0] || null);
        } else {
          setTokenDetails(null);
        }

        // Fetch token overview from getTokenOverview API
        const overviewResponse = await fetch('https://omni.icarus.tools/ethereum/cush/getTokenOverview', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            params: [
              tokenAddress
            ],
          }),
        });

        const overviewData = await overviewResponse.json();
        console.log("overviewData " + JSON.stringify(overviewData));

        if (overviewData.result) {
          setTokenOverview(overviewData.result);
        } else {
          setTokenOverview(null);
        }

        // Fetch pools from searchPoolsByTokenAddresses API for multiple token pairs
        const usdcPools = await fetchPools(tokenAddress, "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"); // USDC
        const usdtPools = await fetchPools(tokenAddress, "0xdAC17F958D2ee523a2206206994597C13D831ec7"); // USDT
        const daiPools = await fetchPools(tokenAddress, "0x6b175474e89094c44da98b954eedeac495271d0f"); // DAI
        const wethPools = await fetchPools(tokenAddress, "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"); // WETH

        setPools([...usdcPools, ...usdtPools, ...daiPools, ...wethPools]);

      } catch (error) {
        console.error("Failed to load token details: ", error);
        setTokenDetails(null);
        setTokenOverview(null);
        setPools([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [tokenAddress]);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: containerRef });
  const range = [0, 30, 60];
  const navBackgroundColor = useTransform(scrollY, range, [
    '#141414',
    '#141414',
    '#1a1a1a',
  ]);

  const tabs = [
    {
      title: 'Overview',
      value: 'overview',
      content: <OverviewTab tokenDetails={tokenDetails} tokenOverview={tokenOverview} />,
    },
    {
      title: 'Pools',
      value: 'pools',
      content: <PoolsTab pools={pools} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].value);

  useEffect(() => {
    return navBackgroundColor.onChange((color) => {
      document
        .querySelector("meta[name=theme-color]")
        ?.setAttribute("content", color);
    });
  }, [navBackgroundColor]);

  if (loading) return <div>Loading...</div>;

  if (!tokenDetails || !tokenOverview) return <div>No data available</div>;

  return (
    <div className="flex flex-col h-screen text-white">
      <motion.nav className="flex justify-between items-center h-16 px-6 bg-[#1a1a1a] border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-bold">Token Details</h1>
          <p className="text-lg">{tokenAddress}</p>
        </div>
      </motion.nav>

      <div className="flex flex-col flex-grow overflow-y-auto p-6" ref={containerRef}>
        <div className="border border-gray-700 rounded-lg shadow p-6">
          <div className="flex space-x-4 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                className={`py-2 px-4 rounded-lg ${
                  activeTab === tab.value
                    ? 'bg-blue-700 text-white'
                    : 'bg-gray-800 text-gray-400'
                }`}
                onClick={() => setActiveTab(tab.value)}
              >
                {tab.title}
              </button>
            ))}
          </div>
          <div className="mt-2">
            {tabs.find((tab) => tab.value === activeTab)?.content}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewTab({ tokenDetails, tokenOverview }) {
  if (!tokenDetails || !tokenOverview) return <div>No data available</div>;

  const { cg_token_info } = tokenOverview;

  return (
    <div>
      <h2 className="mt-4 text-xl font-bold">Token Overview</h2>
      {cg_token_info?.image && (
        <img
          src={cg_token_info.image}
          alt={`${cg_token_info.name} logo`}
          className="w-16 h-16 mb-4"
        />
      )}
            <p>Name: {tokenDetails.name}</p>

            <p>Price: ${tokenDetails.price}</p>

      <p>TVL: ${tokenDetails.tvl}</p>
      <p>Volume (24h): ${tokenDetails.volume_24h}</p>
      <p>Volume (4h): ${tokenDetails.volume_4h}</p>
      <p>Volume (7d): ${tokenDetails.volume_7d}</p>
      <p>Volume (30d): ${tokenDetails.volume_30d}</p>
      <p>Change (4h): {tokenDetails.change_4h}%</p>
      <p>Change (24h): {tokenDetails.change_24h}%</p>
      <p>Change (7d): {tokenDetails.change_7d}%</p>
      <p>Change (30d): {tokenDetails.change_30d}%</p>
      <p>Fees (4h): ${tokenDetails.fees_4h}</p>
      <p>Fees (24h): ${tokenDetails.fees_24h}</p>
      <p>Fees (7d): ${tokenDetails.fees_7d}</p>
      <p>Fees (30d): ${tokenDetails.fees_30d}</p>
      <p>Transactions (4h): {tokenDetails.tx_4h}</p>
      <p>Transactions (24h): {tokenDetails.tx_24h}</p>
      <p>Transactions (7d): {tokenDetails.tx_7d}</p>
      <p>Transactions (30d): {tokenDetails.tx_30d}</p>
      <p>Active Pools: {tokenDetails.active_pools}</p>
      <p>Last Updated: {new Date(tokenDetails.last_updated).toLocaleString()}</p>

      {cg_token_info && (
        <>
          <p>Market Cap: ${cg_token_info.market_cap}</p>
          <p>Market Cap Rank: {cg_token_info.market_cap_rank}</p>
          <p>Fully Diluted Valuation: ${cg_token_info.fully_diluted_valuation}</p>
          <p>Total Volume: ${cg_token_info.total_volume}</p>
          <p>High 24h: ${cg_token_info.high_24h}</p>
          <p>Low 24h: ${cg_token_info.low_24h}</p>
          <p>Price Change 24h: ${cg_token_info.price_change_24h}</p>
          <p>Price Change Percentage 24h: {cg_token_info.price_change_percentage_24h}%</p>
          <p>All-Time High: ${cg_token_info.ath}</p>
          <p>All-Time High Change Percentage: {cg_token_info.ath_change_percentage}%</p>
          <p>All-Time High Date: {new Date(cg_token_info.ath_date).toLocaleDateString()}</p>
          <p>All-Time Low: ${cg_token_info.atl}</p>
          <p>All-Time Low Change Percentage: {cg_token_info.atl_change_percentage}%</p>
          <p>All-Time Low Date: {new Date(cg_token_info.atl_date).toLocaleDateString()}</p>
          <p>Circulating Supply: {cg_token_info.circulating_supply}</p>
          <p>Total Supply: {cg_token_info.total_supply}</p>
          <p>Max Supply: {cg_token_info.max_supply}</p>
        </>
      )}
    </div>
  );
}

function PoolsTab({ pools }) {
  if (!pools.length) return <div>No pools available</div>;

  return (
    <div>
      <h2 className="text-xl font-bold">Pools</h2>
      {pools.map((pool, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-bold">Pool Address: {pool.address}</h3>
          <p>Token 0: {pool.t0_name} ({pool.t0_symbol})</p>
          <p>Token 1: {pool.t1_name} ({pool.t1_symbol})</p>
          <p>Liquidity: {pool.liquidity}</p>
          <p>Fee: {pool.fee}</p>
          <p>Last Price: {pool.last_price}</p>
          <p>TVL USD: ${pool.tvl_usd}</p>
        </div>
      ))}
    </div>
  );
}
