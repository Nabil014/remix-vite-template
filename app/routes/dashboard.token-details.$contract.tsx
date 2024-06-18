import { useFetcher, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import TokenInfo from '~/components/token-info';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';
import TokenDetails from '~/components/token-detail';
import LineChart from '~/components/LineChart';
import TokenAnalysis from '~/components/token-analysis';
import axios from "axios"

const cache = {};

async function fetchWithCache(url, options) {
  if (cache[url]) {
    return cache[url];
  }
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }
  const data = await response.json();
  cache[url] = data;
  return data;
}

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;
  const url = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${contract}/market_chart/?vs_currency=usd&days=1`;

  try {
    const data = await fetchWithCache(url, { timeout: 10000 });

    // Filtrar los datos para obtener solo las últimas 4 horas
    const currentTime = Date.now();
    const fourHoursAgo = currentTime - 4 * 60 * 60 * 1000;
    const tokenPrices = data.prices
      .filter(([time]) => time >= fourHoursAgo)
      .map(([time, price]) => ({
        x: new Date(time).toISOString(),
        y: price,
        block: time
      }));

    return json({ contract, tokenPrices });
  } catch (error) {
    console.error("Error fetching data:", error);
    return json({ contract, tokenPrices: [], error: error.message }, { status: 500 });
  }
};

export default function CryptoDetails() {
  const fetcher = useFetcher();
  const { contract, tokenPrices, error } = useLoaderData();
  const [tokenData, setTokenData] = useState(null);

  useEffect(() => {
    if (fetcher.data) {
      setTokenData(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    async function init() {
      await fetcher.load(`/api/tokens?address=${contract}`);
    }
    init();
  }, [contract]);


  return (
    <div className="h-auto bg-gradient-radial p-8">
      <div className="flex flex-col items-center lg:items-start">
        {tokenData && <TokenInfo coin={tokenData} />}
        <div className="mt-8 flex w-full flex-col lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/3 lg:pr-4">
            <h3 className="mb-4 text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
              Token Details
            </h3>
            {tokenData && <TokenDetails tokenData={tokenData} />}
          </div>
          <div className="mt-8 w-full lg:mt-0 lg:w-2/3 lg:pl-4">
            <h3 className="mb-4 text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
              Token Price Movement
            </h3>
            {error ? (
              <p className="text-red-500">Error fetching data: {error}</p>
            ) : (
              <LineChart tokenPrices={tokenPrices} />
            )}
          </div>
        </div>
        <div className="mt-8 w-full">
          <TokenAnalysis />
        </div>
      </div>
      <Footer />
    </div>
  );
}