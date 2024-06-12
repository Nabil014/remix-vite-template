import { json, LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Table from '~/components/table-list';
import Footer from '~/components/footer';

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6Ijg5ZTJhNmI0LThlNjktNDY0Yi04MzYwLWNkZGI3OTEwNTRkNyIsIm9yZ0lkIjoiMTcyNTc5IiwidXNlcklkIjoiMTcyMjUwIiwidHlwZUlkIjoiYWE5Njk3MTMtMDhmNC00YThhLTgwZWYtNTNmNmUzNmY2NzQ5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTczMzE1MTEsImV4cCI6NDg1MzA5MTUxMX0.xlAawKhVtgE1sMhUGs-afbJh4vEd-Erz8AEjoXoxzrU";
const baseURL = "https://deep-index.moralis.io/api/v2.2";

async function getTokenLogo(address: string) {
  try {
    const headers = new Headers({
      'Accept': 'application/json',
      'X-API-Key': API_KEY,
    });

    const response = await fetch(`${baseURL}/erc20/metadata?addresses=${address}`, {
      method: 'GET',
      headers: headers,
    });

    if (!response.ok) {
      const message = await response.json();
      throw new Error(`Error fetching token metadata: ${response.statusText} - ${JSON.stringify(message)}`);
    }

    const tokenMetadata = await response.json();
    return tokenMetadata[0]?.logo || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get('limit') || '10', 10);
  const offset = parseInt(url.searchParams.get('offset') || '0', 10);

  try {
    const res = await fetch('https://omni.icarus.tools/ethereum/cush/searchTopTokens', {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [
          {
            result_size: limit,
            result_offset: offset,
            sort_by: 'tx_4h',
            sort_order: false,
            fee_tiers: [0],
          },
        ],
      }),
    });

    const data = await res.json();

    const tokensWithLogos = await Promise.all(
      data.result.results.map(async (token: any) => {
        const logo = await getTokenLogo(token.contract);
        return { ...token, logo };
      })
    );

    return json({ tokens: tokensWithLogos });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json({ tokens: [] });
  }
};

export default function Index() {
  const { tokens } = useLoaderData();

  const data = tokens.map((token: any) => ({
    contract: token.contract,
    name: token.name || 'Token Name',
    symbol: token.symbol || 'Symbol',
    price: token.price || '0.00',
    volume: token.volume_4h || '0',
    image: token.logo || 'https://via.placeholder.com/20',
  }));

  return (
    <div className="relative flex min-h-screen flex-col gap-8 overflow-hidden bg-gradient-radial from-[#043033] via-[#000D0E] to-[#000D0E] p-8">
      <div>
        <Table
          data={data}
          title="Top 10 Coins by Volume"
          description="Top 10 cryptocurrencies by trading volume in the past 4 hours."
        />
      </div>
      <Footer />
    </div>
  );
}
