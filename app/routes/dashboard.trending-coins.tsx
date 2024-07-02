import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Table from '~/components/table-list';
import Footer from '~/components/footer';

const baseURL = "https://pro-api.coinmarketcap.com/v1";

async function getTrendingCoins(): Promise<any[]> {
  const API_KEY = process.env.CMC_API_KEY;

  if (!API_KEY) {
    throw new Error('CMC_API_KEY is not defined');
  }

  try {
    const headers = new Headers({
      'Accept': 'application/json',
      'X-CMC_PRO_API_KEY': API_KEY,
    });

    const response = await fetch(`${baseURL}/cryptocurrency/trending/gainers-losers`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(`Error fetching trending coins: ${response.statusText} - ${JSON.stringify(message)}`);
    }

    const trendingData = await response.json();
    const trendingTokens = trendingData.data || [];


    // Obtener información adicional incluyendo el logo
    const tokenIds = trendingTokens.map((token: any) => token.id).join(',');
    const infoResponse = await fetch(`${baseURL}/cryptocurrency/info?id=${tokenIds}`, {
      method: 'GET',
      headers: headers,
    });

    if (!infoResponse.ok) {
      const message = await infoResponse.json();
      throw new Error(`Error fetching token info: ${infoResponse.statusText} - ${JSON.stringify(message)}`);
    }

    const infoData = await infoResponse.json();
    const tokenInfo = infoData.data || {};

    // Combinar la información de los tokens en tendencia con la información adicional
    const combinedData = trendingTokens.map((token: any) => ({
      ...token,
      logo: tokenInfo[token.id]?.logo || 'https://via.placeholder.com/20',
      percentChange24h: token.quote?.USD?.percent_change_24h?.toFixed(2) || '0.00',
      contract: tokenInfo[token.id]?.platform?.token_address || token.id, // Asegurarse de usar el contrato correcto
      network: tokenInfo[token.id]?.platform?.name || 'Unknown', // Agregar información de la red
    }));

    // Filtrar solo las criptomonedas de las redes especificadas
    const specifiedNetworks = ['Ethereum', 'Base', 'BNB', 'Polygon', 'Avalanche'];
    const filteredTokens = combinedData.filter(token => specifiedNetworks.includes(token.network));


    return filteredTokens;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const trendingCoins = await getTrendingCoins();
    return json({ tokens: trendingCoins });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ tokens: [] });
  }
};

export default function TrendingCoins() {
  const { tokens } = useLoaderData<{ tokens: any[] }>();

  const data = tokens.map((token: any) => ({
    contract: token.contract, // Usar el contrato correcto
    name: token.name || 'Token Name',
    symbol: token.symbol || 'Symbol',
    volume: token.quote?.USD?.volume_24h?.toFixed(2) || '0',
    image: token.logo || 'https://via.placeholder.com/20',
    percentChange24h: token.percentChange24h,
    network: token.network, // Agregar información de la red
  }));

  const columns = [
    {
      key: 'image',
      label: 'Logo',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => <img src={val} alt="logo" className="w-6 h-6 rounded-full" />,
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
      key: 'volume',
      label: 'Volume',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => `$${Number(val).toLocaleString()}`,
    },
    {
      key: 'percentChange24h',
      label: '24h Change',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: (val) => `${val}%`,
    },
    {
      key: 'network',
      label: 'Network',
      link: (item) => `/dashboard/token-details/${item.contract}`,
      format: null,
    },
  ];

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <div>
        <Table
          data={data}
          title="Trending Coins"
          description="Top trending cryptocurrencies."
          columns={columns}
        />
      </div>
      <Footer />
    </div>
  );
}
