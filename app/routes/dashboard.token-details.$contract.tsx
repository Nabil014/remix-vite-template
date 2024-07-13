import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import TokenInfo from '~/components/token-info';
import Footer from '~/components/footer';
import TokenDetails from '~/components/token-detail';
import LineChart from '~/components/LineChart';
import TokenAnalysis from '~/components/token-analysis';

const API_KEY = process.env.CMC_API_KEY;

const fetchWithRetries = async (url, options = {}, retries = 3, delay = 1000) => {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return await response.json();
      if (response.status === 429 && attempt < retries - 1) await new Promise(resolve => setTimeout(resolve, delay));
      else {
        const errorResponse = await response.json();
        throw new Error(`Error fetching data: ${response.statusText}, ${errorResponse.message}`);
      }
    } catch (error) {
      if (attempt < retries - 1) await new Promise(resolve => setTimeout(resolve, delay));
      else throw error;
    }
  }
  throw new Error('Failed to fetch data after multiple attempts');
};

const getTokenDataFromContract = async (contract) => {
  const url = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/info?address=${contract}`;
  const response = await fetchWithRetries(url, { headers: { 'X-CMC_PRO_API_KEY': API_KEY } });
  const tokenData = Object.values(response.data)[0];
  if (tokenData && tokenData.symbol) return tokenData;
  throw new Error('Symbol not found in the response');
};

const fetchTokenPriceFromNetwork = async (symbol) => {
  const currentDate = new Date().toISOString();
  const twentyFourHoursAgo = new Date(new Date().setHours(new Date().getHours() - 24)).toISOString();
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical?symbol=${symbol}&convert=USD&time_start=${twentyFourHoursAgo}&time_end=${currentDate}&interval=hourly`;
  const response = await fetchWithRetries(url, { headers: { 'X-CMC_PRO_API_KEY': API_KEY } });
  return response.data[symbol][0].quotes;
};

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;
  try {
    const tokenData = await getTokenDataFromContract(contract);
    const prices = await fetchTokenPriceFromNetwork(tokenData.symbol);
    const tokenPrices = prices.map((quote) => ({
      x: new Date(quote.timestamp).toISOString(),
      y: quote.quote.USD.price,
      timestamp: quote.timestamp,
    }));

    const currentPrice = tokenPrices[tokenPrices.length - 1]?.y || 0;
    const timestamp = tokenPrices[tokenPrices.length - 1]?.timestamp || '';
    const percentageChange = tokenPrices[0]?.y ? ((currentPrice - tokenPrices[0]?.y) / tokenPrices[0]?.y) * 100 : 0;
    const block = Math.floor(new Date(timestamp).getTime() / 1000); 

    return json({ contract, tokenData, tokenPrices, currentPrice, percentageChange, block });
  } catch (error) {
    console.error('Error fetching data:', error);
    return json(
      { contract, tokenData: null, tokenPrices: [], currentPrice: 0, percentageChange: 0, block: 0, error: error.message },
      { status: 500 }
    );
  }
};

export default function CryptoDetails() {
  const { contract, tokenData, tokenPrices, currentPrice, percentageChange, block, error } = useLoaderData();

  return (
    <div className="h-auto bg-gradient-radial p-8">
      <div className="flex flex-col items-center lg:items-start">
        {tokenData ? (
          <>
            <TokenInfo coin={tokenData} currentPrice={currentPrice} percentageChange={percentageChange} block={block} />
            <div className="mt-8 flex w-full flex-col lg:flex-row lg:items-start">
              <div className="w-full lg:w-1/3 lg:pr-4">
                <h3 className="mb-4 text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
                  Token Details
                </h3>
                <TokenDetails tokenData={tokenData} currentPrice={currentPrice} />
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
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
