import React, { useEffect, useState } from 'react';

const lineChart = () => {
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
      background: '#1f2937', 
    },
    series: [
      { name: '2023', data: [18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000, 60000, 70000] },
      { name: '2022', data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000] },
    ],
    legend: { show: false },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    grid: { borderColor: '#374151', strokeDashArray: 2 },
    fill: {
      type: 'gradient',
      gradient: { 
        shadeIntensity: 1, 
        opacityFrom: 0.1, 
        opacityTo: 0.8, 
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
        style: { colors: '#d1d5db', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 600 },
      },
    },
    yaxis: {
      labels: {
        style: { colors: '#d1d5db', fontSize: '13px', fontFamily: 'Inter, sans-serif', fontWeight: 600 },
        formatter: (value) => value >= 1000 ? `${value / 1000}k` : value,
      },
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'MMMM yyyy' },
      y: { formatter: (value) => `$${value >= 1000 ? `${value / 1000}k` : value}` },
    },
    responsive: [{
      breakpoint: 768,
      options: {
        chart: { height: 300 },
        xaxis: {
          labels: {
            style: { fontSize: '11px', fontWeight: 600 },
          },
        },
        yaxis: {
          labels: {
            style: { fontSize: '11px', fontWeight: 600 },
          },
        },
      },
    }],
  };

  const series = [
    { name: '2023', data: [18000, 51000, 60000, 38000, 88000, 50000, 40000, 52000, 88000, 80000, 60000, 70000] },
    { name: '2022', data: [27000, 38000, 60000, 77000, 40000, 50000, 49000, 29000, 42000, 27000, 42000, 50000] },
  ];

  if (!isClient || !Chart) {
    return null;
  }

  return (
    <div className='bg-black p-4 rounded-lg shadow'>
      <div className="flex justify-center sm:justify-end items-center gap-x-4 mb-4">
        <div className="flex items-center rounded-lg">
          <span className="w-2.5 h-2.5 inline-block bg-blue-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-300 font-semibold">Price</span>
        </div>
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 inline-block bg-purple-600 rounded-full mr-2"></span>
          <span className="text-sm text-gray-300 font-semibold">Volume</span>
        </div>
      </div>
      <div id="chart">
        <Chart options={options} series={series} type="area" height={490} />
      </div>
    </div>
  );
};

export default lineChart;
