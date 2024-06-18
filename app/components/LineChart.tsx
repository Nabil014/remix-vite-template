import React, { useEffect, useState, useMemo } from 'react';

const LineChart = ({ tokenPrices }: { tokenPrices: { x: string; y: number; block: number }[] }) => {
  const [isClient, setIsClient] = useState(false);
  const [Chart, setChart] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      import('react-apexcharts').then((module) => {
        setChart(() => module.default);
      });
    }
  }, []);

  const options = useMemo(() => ({
    chart: {
      height: 400,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
      width: '100%',
    },
    series: [
      { name: 'Price', data: tokenPrices },
    ],
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
      type: 'datetime',
      labels: {
        show: false,
        style: { colors: '#9ca3af', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 400 },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        show: false,
        style: { colors: '#9ca3af', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 400 },
        formatter: (value: number) => value.toFixed(2),
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'yyyy-MM-ddTHH:mm:ss.000Z' },
      y: {
        formatter: (value: number, { dataPointIndex }: { dataPointIndex: number }) => {
          const block = tokenPrices[dataPointIndex].block;
          return `USD Price: ${value.toFixed(10)} | Block: ${block}`;
        },
        title: {
          formatter: () => '',
        }
      },
      marker: {
        fillColors: ['#4ade80'],
      },
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: { height: 250 },
        xaxis: {
          labels: { show: false },
        },
        yaxis: {
          labels: { show: false },
        },
        grid: {
          show: false,
        }
      },
    }],
  }), [tokenPrices]);

  if (!isClient || !Chart) {
    return null;
  }

  return (
    <div className='h-full bg-transparent rounded-[30px] p-4 w-full'>
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-4">
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 inline-block bg-green-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-300 font-semibold">Price</span>
        </div>
      </div>
      <div id="chart" className="w-full">
        <Chart options={options} series={[{ name: 'Price', data: tokenPrices }]} type="area" height={350} />
      </div>
    </div>
  );
};

export default LineChart;
