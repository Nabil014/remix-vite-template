import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData, useParams, Link } from '@remix-run/react';
import Table from '~/components/table-list';
import Footer from '~/components/footer';
import { formatPrice, formatVolume } from '~/utils/formatters';

const API_KEY = process.env.CMC_API_KEY;
const baseURL = "https://pro-api.coinmarketcap.com/v1";

const ALLOWED_NETWORKS = ["Ethereum", "Arbitrum", "Base", "Binance Smart Chain", "Polygon", "Avalanche"];

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
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      const message = await res.json();
      throw new Error(`Error fetching tokens: ${res.statusText} - ${JSON.stringify(message)}`);
    }

    const data = await res.json();
    return data.data;  // La API de CoinMarketCap devuelve los tokens bajo la clave `data`
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
        'Accept': 'application/json'
      }
    });

    if (!res.ok) {
      const message = await res.json();
      throw new Error(`Error fetching token details: ${res.statusText} - ${JSON.stringify(message)}`);
    }

    const data = await res.json();
    return Object.values(data.data)[0];  // Asumiendo que la dirección del contrato coincidirá con el primer elemento
  } catch (error) {
    console.error('Error fetching token details:', error);
    return null;
  }
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const { contract } = params;
  if (contract) {
    // Fetching token details for a specific contract
    const tokenDetails = await fetchTokenDetailsByContract(contract);

    if (!tokenDetails) {
      throw new Response("Token not found", { status: 404 });
    }

    return json({ token: tokenDetails });
  } else {
    // Fetching the list of tokens
    const now = Date.now();
    if (cache.tokens.length > 0 && (now - cache.timestamp) < 60000) {
      // Use cached data if it is less than 1 minute old
      return json({ tokens: cache.tokens });
    }

    try {
      const tokens = await fetchTokens();

      const filteredTokens = tokens.filter(token =>
        ALLOWED_NETWORKS.includes(token.platform?.name) &&
        token.platform?.token_address &&
        token.id && token.name && token.symbol && token.quote && token.quote.USD && token.quote.USD.price && token.quote.USD.volume_24h
      );

      filteredTokens.sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h);

      const topTokens = filteredTokens.slice(0, 10);

      // Update cache
      cache = {
        tokens: topTokens,
        timestamp: now,
      };

      return json({ tokens: topTokens });
    } catch (error) {
      console.error('Error fetching data:', error);
      return json({ tokens: [] });
    }
  }
};

export default function Index() {
  const { tokens, token } = useLoaderData();
  const { contract } = useParams();

  if (contract && token) {
    // Render token details view
    return (
      <div>
        <h1>Token Details for {token.name}</h1>
        <p>Symbol: {token.symbol}</p>
        <p>Contract Address: {contract}</p>
        <p>Network: {token.platform.name}</p>
        <p>Price: ${token.quote.USD.price}</p>
        <p>Volume 24h: {token.quote.USD.volume_24h}</p>
        <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} alt={`${token.name} logo`} />
        <Link to="/dashboard/volume-coins">Back to list</Link>
      </div>
    );
  }

  // Render tokens list view
  const data = tokens.map((token) => ({
    contract: token.platform.token_address,
    name: token.name,
    symbol: token.symbol,
    price: formatPrice(token.quote.USD.price),
    volume: formatVolume(token.quote.USD.volume_24h),
    image: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`,  // URL para los logos de CoinMarketCap
    network: token.platform.name
  }));

  const columns = [
    { key: 'image', label: 'Logo', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => <img src={val} alt="logo" className="w-6 h-6 rounded-full" /> },
    { key: 'name', label: 'Token Name', link: (item) => `/dashboard/token-details/${item.contract}`, format: null },
    { key: 'symbol', label: 'Symbol', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => val ?? 'USDT' },
    { key: 'price', label: 'Price', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => val },
    { key: 'volume', label: 'Volume', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => val },
    { key: 'network', label: 'Network', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => val },
  ];

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E]">
      <div className="flex-grow overflow-hidden">
        <Table
          data={data}
          title="Top 10 Coins by Volume"
          description="Top 10 cryptocurrencies by trading volume in the past 24 hours."
          columns={columns}
        />
      </div>
      <Footer />
    </div>
  );
}
