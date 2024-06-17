import { useFetcher, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import TokenInfo from '~/components/token-info';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';
import TokenDetails from '~/components/token-detail';
import LineChart from '~/components/LineChart';
import TokenAnalysis from '~/components/token-analysis';

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;
  return json({ contract });
};

export default function CryptoDetails() {
  const fetcher = useFetcher();
  const priceFetcher = useFetcher();
  const [tokenData, setTokenData] = useState(null);
  const [tokenPrice, setTokenPrice] = useState(null);
  const { contract } = useLoaderData();

  useEffect(() => {
    if (fetcher.data && priceFetcher.data) {
      setTokenData(fetcher.data);
      setTokenPrice(priceFetcher.data);
    }
  }, [fetcher.data, priceFetcher.data]);

  useEffect(() => {
    async function init(){
      await fetcher.load(`/api/tokens?address=${contract}`);
      await priceFetcher.load(`/api/tokens/${contract}/prices?chain=eth`);
    }
    init();
  }, [contract]);

  console.log("PRECIO", tokenPrice)

  // Transformar los datos para el gráfico
  const prices = tokenPrice?.tokenPrices
    ?.filter(price => price.y !== null)
    ?.map(price => ({
      x: new Date(price.x).getTime(), // Convertir fecha a timestamp
      y: price.y
    })) || [];

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
            <LineChart prices={prices} />
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
