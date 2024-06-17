import React, { useEffect, useState } from 'react';

const LineChart = ({ prices }) => {
  const [isClient, setIsClient] = useState(false);
  const [Chart, setChart] = useState(null);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== 'undefined') {
      import('react-apexcharts').then((module) => {
        setChart(() => module.default);
      });
    }
  }, []);

  const options = {
    chart: {
      height: 300,
      type: 'area',
      toolbar: { show: false },
      zoom: { enabled: false },
      background: 'transparent',
    },
    series: [
      { name: 'Price', data: prices },
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
        style: { colors: '#9ca3af', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 400 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#9ca3af', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 400 },
        formatter: (value) => value,
      },
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'dd MMM yyyy' },
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

  if (!isClient || !Chart) {
    return null;
  }

  return (
    <div className='h-full bg-transparent rounded-[30px] p-4'>
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-4">
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 inline-block bg-green-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-300 font-semibold">Price</span>
        </div>
      </div>
      <div id="chart">
        <Chart options={options} series={[{ name: 'Price', data: prices }]} type="area" height={270} />
      </div>
    </div>
  );
};

export default LineChart;
