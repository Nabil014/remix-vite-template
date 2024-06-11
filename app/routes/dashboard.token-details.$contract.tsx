// routes/dashboard.token-details.$contract.tsx
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import Moralis from 'moralis';
import TokenInfo from '~/components/token-info';
import TokenDetails from '~/components/token-detail';
import LineChart from '~/components/line-chart';
import Footer from '~/components/footer';
import TokenAnalysis from '~/components/token-analysis';

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;

  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      apiKey: process.env.MORALIS,
    });
  }

  const response = await Moralis.EvmApi.token.getTokenMetadata({
    chain: '0x1',
    addresses: [contract],
  });
  const coin = response.raw[0];

  // Obtener datos adicionales de la API
  const apiResponse = await fetch('https://omni.icarus.tools/ethereum/cush/searchTopTokens', {
    method: 'POST',
    headers: { accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify({
      params: [
        {
          result_size: 1,
          result_offset: 0,
          sort_by: 'tx_4h',
          sort_order: true,
          fee_tiers: [0],
          contract,
        },
      ],
    }),
  });

  const apiData = await apiResponse.json();
  const tokenData = apiData.result.results.find((t: any) => t.contract === contract);

  if (tokenData) {
    coin.price = tokenData.price;
    coin.volume = tokenData.volume_4h;
    coin.change_4h = tokenData.change_4h;
  }

  return json({ coin });
};

export default function CryptoDetails() {
  const { coin } = useLoaderData();

  return (
    <div className="bg-gradient-radial h-auto p-8">
      <div className="flex flex-col items-center p-4 lg:items-start">
        <TokenInfo coin={coin} />
        <div className="mt-8 flex w-full flex-col lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/3">
            <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5] mb-4">Token Details</h3>
            <TokenDetails coin={coin} />
          </div>
          <div className="mt-8 w-full lg:mt-0 lg:w-2/3 lg:pl-8">
            <h3 className="text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5] mb-4">Token Price Movement</h3>
            <LineChart address={coin.contract} />
          </div>
        </div>
        <div className="mt-8 w-full">
          <TokenAnalysis address={coin.contract} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
