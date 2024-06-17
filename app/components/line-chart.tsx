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
  const tokenFetcher = useFetcher();
  const priceFetcher = useFetcher();
  const [tokenData, setTokenData] = useState<any>(null);
  const [tokenPrice, setTokenPrice] = useState<any>(null);
  const { contract } = useLoaderData();

  useEffect(() => {
    if (tokenFetcher.data) {
      setTokenData(tokenFetcher.data);
    }
  }, [tokenFetcher.data]);

  useEffect(() => {
    async function loadTokenData() {
      await tokenFetcher.load(`/api/tokens?address=${contract}`);
    }
    loadTokenData();
  }, [contract]);

  useEffect(() => {
    if (priceFetcher.data) {
      setTokenPrice(priceFetcher.data);
    }
  }, [priceFetcher.data]);

  useEffect(() => {
    async function loadTokenPrice() {
      await priceFetcher.load(`/api/tokens/${contract}/prices?chain=eth`);
    }
    loadTokenPrice();
  }, [contract]);

  const chartOptions = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
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
        stops: [0, 100],
      },
    },
    markers: {
      size: 3,  // Tamaño más pequeño para los puntos
      colors: ['#4ade80'],
      strokeColors: '#ffffff',
      strokeWidth: 2,
      hover: {
        size: 5,  // Tamaño más pequeño en el hover
      },
    },
    xaxis: {
      type: 'datetime',
      tickPlacement: 'on',
      categories: [],
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: false, // Ocultar las etiquetas del eje X
        style: { colors: '#ffffff' },
        formatter: (value) => new Date(value).toLocaleDateString(),
      },
    },
    yaxis: {
      labels: {
        show: true,
        formatter: (value) => value.toFixed(8),
        style: { colors: '#ffffff' },
      },
    },
    tooltip: {
      theme: 'dark',
      x: { show: true, format: 'dd/MM/yy HH:mm' },
      y: {
        formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
          const block = tokenPrice.tokenPrices[dataPointIndex].block;
          return `USD Price: ${value.toFixed(8)} | Block: ${block}`;
        },
        title: {
          formatter: () => '',
        },
      },
      marker: {
        fillColors: ['#4ade80'],
      },
    },
    responsive: [
      {
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
      },
    ],
  };

  const chartSeries = [
    {
      name: 'Price',
      data: tokenPrice ? tokenPrice.tokenPrices
        .filter(price => price.y !== null)
        .map(price => ({
          x: new Date(price.x).getTime(),
          y: price.y,
        })) : [],
    },
  ];

  return (
    <div className="h-auto bg-gradient-radial">
      <div className="flex flex-col items-center p-4 lg:items-start">
        {tokenData && <TokenInfo coin={tokenData} />}
        <div className="mt-8 flex w-full flex-col gap-8 lg:flex-row lg:items-start">
          <div className="w-full flex-shrink-0 lg:w-1/3">
            <h3 className="mb-4 text-[20px] font-semibold text-[#F5F5F5]">
              Token Details
            </h3>
            {tokenData && (
              <TokenDetails
                totalSupply={tokenData.tokenMetadata.total_supply_formatted.toLocaleString()}
                fullyDilutedValuation={parseFloat(
                  tokenData.tokenMetadata.fully_diluted_valuation,
                ).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
                tokenAge={Math.floor(
                  (new Date().getTime() -
                    new Date(tokenData.tokenMetadata.created_at).getTime()) /
                    (1000 * 60 * 60 * 24),
                )}
                dateCreated={
                  new Date(tokenData.tokenMetadata.created_at)
                    .toISOString()
                    .split('T')[0]
                }
                currentPrice={parseFloat(
                  tokenData.tokenPrice.usdPriceFormatted,
                )}
                tokenAddress={tokenData.tokenMetadata.address}
                name={tokenData.tokenMetadata.name}
                symbol={tokenData.tokenMetadata.symbol}
                contractType="ERC20" // Assuming contract type is ERC20 based on the given data
                decimals={parseInt(tokenData.tokenMetadata.decimals)}
              />
            )}
          </div>
          <div className="h-full w-full flex-grow lg:w-2/3 lg:pl-8">
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
