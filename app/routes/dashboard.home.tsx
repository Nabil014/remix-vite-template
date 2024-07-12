import React, { useState } from 'react';
import { InfiniteMovingCards } from '~/components/infinite-moving-cards';
import { PlaceholdersAndVanishInput } from '~/components/placeholders-and-vanish-input';
import Table from '~/components/table-list';
import Footer from '~/components/footer';
import { json } from '@remix-run/node';
import { formatPrice, formatVolume } from '~/utils/formatters';
import { useLoaderData, useParams } from '@remix-run/react';

const API_KEY = process.env.CMC_API_KEY;
const baseURL = 'https://pro-api.coinmarketcap.com/v1';

const ALLOWED_NETWORKS = [
  'Ethereum',
  'Arbitrum',
  'Base',
  'Binance Smart Chain',
  'Polygon',
  'Avalanche',
];

// Simple in-memory cache
let cache = {
  tokens: [],
  timestamp: 0,
};

async function fetchTokens() {
  try {
    const res = await fetch(`${baseURL}/cryptocurrency/listings/latest`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const message = await res.json();
      throw new Error(`Error fetching tokens: ${res.statusText} - ${JSON.stringify(message)}`);
    }

    const data = await res.json();
    return data.data; // The CoinMarketCap API returns tokens under the `data` key
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function fetchTokenDetailsByContract(contract) {
  try {
    const res = await fetch(`${baseURL}/cryptocurrency/info?contract=${contract}`, {
      method: 'GET',
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const message = await res.json();
      throw new Error(`Error fetching token details: ${res.statusText} - ${JSON.stringify(message)}`);
    }

    const data = await res.json();
    return Object.values(data.data)[0]; // Assuming the contract address will match the first element
  } catch (error) {
    console.error('Error fetching token details:', error);
    return null;
  }
}

async function fetchTraders() {
  try {
    const res = await fetch('https://omni.icarus.tools/ethereum/cush/topUsers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [
          {
            limit: 10,
            offset: 0,
            sort_by: 'tx_4h',
            sort_order: false,
            fee_tiers: [0],
          },
        ],
      }),
    });

    const data = await res.json();
    return data.result || [];
  } catch (error) {
    console.error('Error fetching traders:', error);
    return [];
  }
}

export const loader = async ({ request, params }) => {
  const { contract } = params;
  if (contract) {
    // Fetching token details for a specific contract
    const tokenDetails = await fetchTokenDetailsByContract(contract);

    if (!tokenDetails) {
      throw new Response('Token not found', { status: 404 });
    }

    return json({ token: tokenDetails });
  } else {
    // Fetching the list of tokens
    const now = Date.now();
    if (cache.tokens.length > 0 && now - cache.timestamp < 60000) {
      // Use cached data if it is less than 1 minute old
      return json({ tokens: cache.tokens });
    }

    try {
      const [tokens, traders] = await Promise.all([fetchTokens(), fetchTraders()]);

      const filteredTokens = tokens.filter(
        (token) =>
          ALLOWED_NETWORKS.includes(token.platform?.name) &&
          token.platform?.token_address &&
          token.id &&
          token.name &&
          token.symbol &&
          token.quote &&
          token.quote.USD &&
          token.quote.USD.price &&
          token.quote.USD.volume_24h,
      );

      filteredTokens.sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h);

      const topTokens = filteredTokens.slice(0, 10);

      // Update cache
      cache = {
        tokens: topTokens,
        timestamp: now,
      };

      return json({ tokens: topTokens, traders });
    } catch (error) {
      console.error('Error fetching data:', error);
      return json({ tokens: [], traders: [] });
    }
  }
};

const formatAddress = (address) => {
  if (!address) return '';
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const formatVolume = (volume) => {
  if (volume >= 1e9) {
    return (volume / 1e9).toFixed(2) + 'B';
  } else if (volume >= 1e6) {
    return (volume / 1e6).toFixed(2) + 'M';
  } else {
    return volume.toFixed(2);
  }
};

export default function Index() {
  const { tokens, traders } = useLoaderData();
  const { contract } = useParams();
  const [selectedNetwork, setSelectedNetwork] = useState('');

  // Carousel items
  const items = [
    { token: 'DOSE', inflow: '$190,083', average: '51' },
    { token: 'DOSE', inflow: '$190,083', average: '51' },
    { token: 'DOSE', inflow: '$190,083', average: '51' },
    { token: 'DOSE', inflow: '$190,083', average: '51' },
    { token: 'DOSE', inflow: '$190,083', average: '51' },
  ];

  // Handle search bar change
  const handleChange = (e) => {
    console.log(e.target.value);
  };

  // Handle search bar submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  // Filter tokens based on the selected network
  const filteredTokens = selectedNetwork
    ? tokens.filter((token) => token.platform.name === selectedNetwork)
    : tokens;

  // Get the available networks in the current tokens
  const availableNetworks = [...new Set(tokens.map((token) => token.platform.name))];

  const tokenData = filteredTokens.map((token) => ({
    contract: token.platform.token_address,
    name: token.name,
    symbol: token.symbol,
    price: formatPrice(token.quote.USD.price),
    volume: formatVolume(token.quote.USD.volume_24h),
    image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`,
    network: token.platform.name,
  }));

  const tokenColumns = [
    {
      key: 'image',
      label: 'Logo',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => <img src={val} alt="logo" className="h-6 w-6 rounded-full" />,
    },
    {
      key: 'name',
      label: 'Token Name',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: null,
    },
    {
      key: 'symbol',
      label: 'Symbol',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => val ?? 'USDT',
    },
    {
      key: 'price',
      label: 'Price',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => val,
    },
    {
      key: 'volume',
      label: 'Volume',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => val,
    },
    {
      key: 'network',
      label: 'Network',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => val,
    },
  ];

  const traderData = traders.map((trader) => ({
    account: trader.account || null,
    volume: trader.volume || '0',
    swaps: trader.swaps || null,
    positions: trader.positions || 0,
  }));

  const traderColumns = [
    {
      key: 'account',
      label: 'Account',
      link: (item) => `/dashboard/wallets/${item.account}`,
      format: formatAddress,
    },
    { key: 'volume', label: 'Volume', link: null, format: formatVolume },
    { key: 'swaps', label: 'Swaps', link: null, format: null },
    { key: 'positions', label: 'Positions', link: null, format: null },
  ];

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <div
        className="absolute h-[523px] w-[523px] rounded-full bg-custom-radial opacity-50"
        style={{ top: '80px', left: '800px', transform: 'rotate(90deg)' }}
      ></div>
      <div
        className="absolute h-[771px] w-[771px] rounded-full bg-custom-radial opacity-50"
        style={{ top: '500px', left: '-450px', transform: 'rotate(-90deg)' }}
      ></div>
      <div
        className="absolute h-[523px] w-[523px] rounded-full bg-custom-radial opacity-50"
        style={{ top: '1200px', left: '800px', transform: 'rotate(90deg)' }}
      ></div>

      <PlaceholdersAndVanishInput
        placeholders={['Placeholder 1', 'Placeholder 2', 'Placeholder 3']}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />

      <div>
        <h2 className="mb-4 text-base font-semibold leading-[19.36px] text-[#04E6E6]">Signals</h2>
        <InfiniteMovingCards items={items} speed="extra slow" direction="right" pauseOnHover={false} />
      </div>

      <div className="mt-10">
        <h2 className="mb-10 text-base font-semibold leading-[19.36px] text-[#04E6E6]">Top 10 tokens by volume</h2>
        <Table
          data={tokenData}
          title="Top 10 Coins by Volume"
          description="Top 10 cryptocurrencies by trading volume in the past 24 hours."
          columns={tokenColumns}
          networks={availableNetworks}
          selectedNetwork={selectedNetwork}
          onNetworkChange={setSelectedNetwork}
        />
      </div>

      <div className="mt-10">
        <h2 className="mb-10 text-base font-semibold leading-[19.36px] text-[#04E6E6]">Top 10 traders by swaps</h2>
        <Table
          data={traderData}
          title="Top 10 Traders by Swaps"
          description="This table shows the top 10 traders with the highest number of swaps."
          columns={traderColumns}
          networks={[]}
          selectedNetwork=""
          onNetworkChange={null}
          showCopyIcon={true}
        />
      </div>

      <Footer />
    </div>
  );
}
