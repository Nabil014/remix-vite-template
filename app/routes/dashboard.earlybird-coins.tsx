import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Table from '~/components/table-list';
import Footer from '~/components/footer';

const baseURL = "https://pro-api.coinmarketcap.com/v1";

async function getNewListings(): Promise<any[]> {
  const API_KEY = process.env.CMC_API_KEY;

  if (!API_KEY) {
    throw new Error('CMC_API_KEY is not defined');
  }

  try {
    const headers = new Headers({
      'Accept': 'application/json',
      'X-CMC_PRO_API_KEY': API_KEY,
    });

    const response = await fetch(`${baseURL}/cryptocurrency/listings/new`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(`Error fetching new listings: ${response.statusText} - ${JSON.stringify(message)}`);
    }

    const listingsData = await response.json();
    return listingsData.data || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const newListings = await getNewListings();
    return json({ tokens: newListings });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ tokens: [] });
  }
};

export default function Index() {
  const { tokens } = useLoaderData<{ tokens: any[] }>();

  const data = tokens.map((token: any) => ({
    contract: token.id,
    name: token.name || 'Token Name',
    symbol: token.symbol || 'Symbol',
    price: token.quote?.USD?.price?.toFixed(2) || '0.00',
    volume: token.quote?.USD?.volume_24h?.toFixed(2) || '0',
    image: token.logo || 'https://via.placeholder.com/20',
  }));

  const columns = [
    { key: 'image', label: 'Logo', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => <img src={val} alt="logo" className="w-6 h-6 rounded-full" /> },
    { key: 'name', label: 'Token Name', link: (item) => `/dashboard/token-details/${item.contract}`, format: null },
    { key: 'symbol', label: 'Symbol', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => val ?? 'USDT' },
    { key: 'price', label: 'Price', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => `$${val}` },
    { key: 'volume', label: 'Volume', link: (item) => `/dashboard/token-details/${item.contract}`, format: (val) => `$${val}` },
  ];

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <div>
        <Table
          data={data}
          title="New Listings"
          description="Newly listed cryptocurrencies."
          columns={columns}
        />
      </div>
      <Footer />
    </div>
  );
}
