import { json, LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Virtuoso } from "react-virtuoso";
import Moralis from "moralis";
import { ethers } from "ethers";
import { CopyToClipboard } from 'react-copy-to-clipboard'; // Importa el componente de copiar

// Iniciar Moralis
const startMoralis = async () => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: "YOUR_MORALIS_API_KEY",
    });
  }
};

// Loader para la información básica de la wallet
export const loader: LoaderFunction = async ({ params }) => {
  const walletAddress = params.id;
  if (!walletAddress) return redirect('/');

  try {
    await startMoralis();

    const provider = new ethers.providers.JsonRpcProvider("https://site1.moralis-nodes.com/eth/950c1101b6104b8fa17ff17d3d113079");
    const balance = await provider.getBalance(walletAddress);
    const balanceInEth = ethers.utils.formatEther(balance);

    return json({
      walletAddress,
      balance: balanceInEth,
    });
  } catch (error) {
    console.error("Failed to load data: ", error);
    return json({
      walletAddress,
      balance: null,
    });
  }
};

export default function WalletDetails() {
  const { walletAddress, balance } = useLoaderData();
  const [tokens, setTokens] = useState([]);
  const [walletHistory, setWalletHistory] = useState([]);
  const [loadingTokens, setLoadingTokens] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);

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
      content: <OverviewTab balance={balance} />,
    },
    {
      title: 'Tokens',
      value: 'tokens',
      content: (
        <TokensTab
          walletAddress={walletAddress}
          tokens={tokens}
          loading={loadingTokens}
          setTokens={setTokens}
          setLoading={setLoadingTokens}
        />
      ),
    },
    {
      title: 'History',
      value: 'history',
      content: (
        <HistoryTab
          walletAddress={walletAddress}
          walletHistory={walletHistory}
          loading={loadingHistory}
          setWalletHistory={setWalletHistory}
          setLoading={setLoadingHistory}
        />
      ),
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

  return (
    <div className="flex flex-col h-screen  text-white">
      <motion.nav className="flex justify-between items-center h-16 px-6 bg-[#1a1a1a] border-b border-gray-700">
        <div>
          <h1 className="text-2xl font-bold">Wallet Details</h1>
          <p className="text-lg">{walletAddress}</p>
        </div>
      </motion.nav>

      <div className="flex flex-col flex-grow overflow-y-auto p-6" ref={containerRef}>
        <div className=" border border-gray-700 rounded-lg shadow p-6">
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

function OverviewTab({ balance }) {
  if (balance === null) {
    return <p>No balance data available.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Wallet Balance</h2>
      <p className="text-md text-gray-400">Balance: {balance} ETH</p>
    </div>
  );
}

function TokensTab({ walletAddress, tokens, loading, setTokens, setLoading }) {
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        setLoading(true);

        await startMoralis();
        const provider = new ethers.providers.JsonRpcProvider("https://site1.moralis-nodes.com/eth/950c1101b6104b8fa17ff17d3d113079");
        const currentBlock = await provider.getBlockNumber();
        console.log("token2Data "+currentBlock)
        console.log("walletAddress "+walletAddress)
        const blocksPerDay = Math.floor((24 * 60 * 60) / 13.5); // Approximate number of blocks per day
        const blockOneDayAgo = currentBlock - blocksPerDay;
        const tokenResponse = await fetch('https://omni.icarus.tools/ethereum/cush/userTokenBalances', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            params: [
              walletAddress,
              currentBlock
            ],
          }),
        });

        const tokenData = await tokenResponse.json();
        console.log("token2Data"+JSON.stringify(tokenData.result.token_balances))
        const tokens =await tokenData.result.token_balances.map(token => ({
          token_address: token.token_address,
          token_name: token.token_name,
          token_symbol: token.token_symbol,
          balance: token.balance,
          value_usd: token.value_usd,
          price_usd: token.price_usd
        }));

       await setTokens(tokens);
      } catch (error) {
        console.error("Failed to load tokens: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const formatPrice = (price) => {
    return price < 1 ? price?.toFixed(8) : price?.toFixed(2);
  };

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  if (loading) {
    return <p>Loading tokens...</p>;
  }

  if (!tokens.length) {
    return <p>No tokens available for this wallet.</p>;
  }

  return (
    <div className="h-full">
      <div className="max-w-full px-2 py-4">
        <div className="min-w-full align-middle">
          <div className="rounded-xl shadow-sm overflow-hidden">
          
            <div style={{ height: '80vh', overflowX: 'hidden', padding: 5 }}>
              {tokens.map((token, index) => (
                <Link 
                  key={index}
                  to={`/dashboard/tokens/${token.token_address}`}
                  className="link-item flex items-center justify-between px-4 py-2 mb-2 bg-[#1a1a1a] rounded"
                >
                  <div className="flex items-center gap-x-2">
                    <span className="font-semibold text-sm text-gray-200">{"address: "+shortenAddress(token.token_address)}</span>
                  </div>
                  <div className="text-sm text-gray-200">{"name: "+token.token_name}</div>
                  <div className="text-sm text-gray-200">{"symbol: "+token.token_symbol}</div>
                  <div className="text-sm text-gray-200">{"balance: "+formatPrice(token.balance)}</div>
                  <div className="text-sm text-gray-200">{"value usd: "+token.value_usd.toFixed(4)}</div>
                  <div className="text-sm text-gray-200">{"token price: "+token.price_usd.toFixed(8)}</div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryTab({ walletAddress, walletHistory, loading, setWalletHistory, setLoading }) {
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);

        await startMoralis();
        const provider = new ethers.providers.JsonRpcProvider("https://site1.moralis-nodes.com/eth/950c1101b6104b8fa17ff17d3d113079");
        const currentBlock = await provider.getBlockNumber();
        const blocksPerWeek = (86400 * 7) / 13;
        const blockOneWeekAgo = currentBlock - Math.floor(blocksPerWeek);

        const response = await Moralis.EvmApi.wallets.getWalletHistory({
          chain: "0x1",
          order: "DESC",
          fromBlock: blockOneWeekAgo,
          address: walletAddress,
        });
        const transactions = response.result;
        const history = await Promise.all(transactions.map(async (tx) => {
          const receipt = await provider.getTransactionReceipt(tx.hash);
          return {
            ...tx,
            from_address: receipt.from,
            to_address: receipt.to,
          };
        }));
        setWalletHistory(history);
console.log("response.result "+JSON.stringify(response.result))
      } catch (error) {
        console.error("Failed to load history: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [walletAddress, setLoading, setWalletHistory]);

  const shortenAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  if (loading) {
    return <p>Loading history...</p>;
  }

  if (!walletHistory.length) {
    return <p>No history available for this wallet.</p>;
  }

  return (
    <div className="h-full">
      <h2 className="text-xl font-bold">Wallet History</h2>
      <div className="max-w-full px-2 py-4">
        <div className="min-w-full align-middle">
          <div className="rounded-xl shadow-sm overflow-hidden">
            <Virtuoso
              style={{ height: '80vh', overflowX: 'hidden', padding: 5 }}
              data={walletHistory}
              itemContent={(index, transaction) => (
                <div 
                  key={index}
                  className="link-item flex items-center justify-between px-4 py-2 mb-2 bg-[#1a1a1a] rounded"
                >
                  <div className="flex items-center gap-x-2">
                    <span className="font-semibold text-sm text-gray-200">{"tx: "}<a href={`https://etherscan.io/tx/${transaction.hash}`} target="_blank" rel="noopener noreferrer">{shortenAddress(transaction.hash)}</a></span>
                    <button className="ml-2 text-blue-500" onClick={() => handleCopy(transaction.hash)}>Copy</button>
                  </div>               
                  <div className="text-sm text-gray-200">{"date: "+new Date(transaction.blockTimestamp).toLocaleString()}</div>

                  <div className="text-sm text-gray-200">
                    {"from: "+shortenAddress(transaction.from_address)}
                    <button className="ml-2 text-blue-500" onClick={() => handleCopy(transaction.from_address)}>Copy</button>
                  </div>
             
                  <div className="text-sm text-gray-200">
                    {"to: "+shortenAddress(transaction.to_address)}
                    <button className="ml-2 text-blue-500" onClick={() => handleCopy(transaction.to_address)}>Copy</button>
                  </div>

                  <div className="text-sm text-gray-200">{"value: "+ethers.utils.formatEther(transaction.value)} ETH</div>
                  
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
