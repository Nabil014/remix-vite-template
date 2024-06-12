// routes/dashboard.token-details.$contract.tsx
import { useFetcher, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import TokenInfo from '~/components/token-info';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;
  return json({ contract });
};

export default function CryptoDetails() {
  const fetcher = useFetcher();
  const [tokenData, setTokenData] = useState(null);
  const { contract } = useLoaderData();

  useEffect(() => {
    if (fetcher.data) {
      console.log('DATA FETCHER', fetcher.data);
      setTokenData(fetcher.data);
    }
  }, [fetcher.data]);

  useEffect(() => {
    console.log("contract", contract)
    fetcher.load(`/api/tokens?address=${contract}`);
  }, [contract]);

  return (
    <div className="h-auto bg-gradient-radial p-8">
      <div className="flex flex-col items-center p-4 lg:items-start">
        {tokenData && <TokenInfo coin={tokenData.tokenMetadata} />}
        <div className="mt-8 flex w-full flex-col lg:flex-row lg:items-start">
          <div className="w-full lg:w-1/3">
            <h3 className="mb-4 text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
              Token Details
            </h3>
            {/* <TokenDetails coin={coin} /> */}
          </div>
          <div className="mt-8 w-full lg:mt-0 lg:w-2/3 lg:pl-8">
            <h3 className="mb-4 text-[16px] font-semibold leading-[19.36px] text-[#F5F5F5]">
              Token Price Movement
            </h3>
            {/* <LineChart address={coin.contract} /> */}
          </div>
        </div>
        <div className="mt-8 w-full">
          {/* <TokenAnalysis address={coin.contract} /> */}
        </div>
      </div>
      <Footer />
    </div>
  );
}
