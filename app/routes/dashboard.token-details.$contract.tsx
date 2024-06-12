import { useFetcher, useLoaderData } from '@remix-run/react';
import { json, LoaderFunction } from '@remix-run/node';
import TokenInfo from '~/components/token-info';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';
import TokenDetails from '~/components/token-detail';
import LineChart from '~/components/line-chart';
import TokenAnalysis from '~/components/token-analysis';

export const loader: LoaderFunction = async ({ params }) => {
  const { contract } = params;
  return json({ contract });
};

export default function CryptoDetails() {
  const fetcher = useFetcher();
  const [tokenData, setTokenData] = useState<any>(null);
  const { contract } = useLoaderData();

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
  

  const chartOptions = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    series: [],
    legend: { show: true, labels: { colors: '#ffffff' } },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2, colors: ['#4ade80'] },
    grid: { borderColor: '#374151', strokeDashArray: 2 },
    fill: {
      type: 'gradient',
      gradient: { 
        shadeIntensity: 1, 
        inverseColors: false,
        gradientToColors: ['#4ade80'], 
        opacityFrom: 0.7, 
        opacityTo: 0.01, 
        stops: [0, 100] 
      },
    },
    xaxis: {
      type: 'category',
      tickPlacement: 'on',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: false,  // Ocultar las etiquetas del eje X
      },
    },
    yaxis: {
      min: 2900,
      max: 3800,
      labels: {
        show: false,  // Ocultar las etiquetas del eje Y
        formatter: (value) => value,
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: false },
      y: { 
        formatter: (value) => `$${value}`,
        title: {
          formatter: () => 'Price: ',
        }
      },
      marker: {
        fillColors: ['#4ade80'], 
      },
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: { height: 300 },
        xaxis: {
          labels: {
            style: { fontSize: '11px', fontWeight: 400 },
          },
        },
        yaxis: {
          labels: {
            style: { fontSize: '11px', fontWeight: 400 },
          },
        },
      },
    }],
  };

  const chartSeries = [
    { name: 'Price', data: tokenData ? tokenData.priceHistory : [] },
  ];

  return (
    <div className="h-auto bg-gradient-radial">
      <div className="flex flex-col items-center p-4 lg:items-start">
        {tokenData && <TokenInfo coin={tokenData} />}
        <div className="mt-8 flex w-full flex-col lg:flex-row lg:items-start gap-8">
          <div className="w-full lg:w-1/3 flex-shrink-0">
            <h3 className="mb-4 text-[20px] font-semibold text-[#F5F5F5]">
              Token Details
            </h3>
            {tokenData && (
              <TokenDetails
                totalSupply={(tokenData.tokenMetadata.total_supply_formatted).toLocaleString()}
                fullyDilutedValuation={parseFloat(tokenData.tokenMetadata.fully_diluted_valuation).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                tokenAge={Math.floor((new Date().getTime() - new Date(tokenData.tokenMetadata.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                dateCreated={new Date(tokenData.tokenMetadata.created_at).toISOString().split('T')[0]}
                currentPrice={parseFloat(tokenData.tokenPrice.usdPriceFormatted)}
                tokenAddress={tokenData.tokenMetadata.address}
                name={tokenData.tokenMetadata.name}
                symbol={tokenData.tokenMetadata.symbol}
                contractType="ERC20"  // Assuming contract type is ERC20 based on the given data
                decimals={parseInt(tokenData.tokenMetadata.decimals)}
              />
            )}
          </div>
          <div className="w-full lg:w-2/3 lg:pl-8 flex-grow h-full">
            <h3 className="mb-4 text-[20px] font-semibold leading-[23.2px] text-[#F5F5F5]">
              Token Price Movement
            </h3>
            <div>
              <LineChart options={chartOptions} series={chartSeries} />
            </div>
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
