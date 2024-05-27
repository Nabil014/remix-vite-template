import React, { useEffect, useState } from 'react';

const LineChart = () => {
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
      { name: '2023', data: [3500, 3400, 3600, 3500, 3700, 3300, 3100, 3200, 3150, 3100, 3300, 3700] },
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
        opacityFrom: 0.7, // Más notorio en los picos altos
        opacityTo: 0.01, // Casi transparente en los picos bajos
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
        style: { colors: '#9ca3af', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 400 },
      },
    },
    yaxis: {
      min: 2900,
      max: 3800,
      labels: {
        style: { colors: '#9ca3af', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 400 },
        formatter: (value) => value,
      },
    },
    tooltip: {
      theme: 'dark',
      x: { format: 'MMMM yyyy' },
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

  const series = [
    { name: 'Price', data: [3500, 3400, 3600, 3500, 3700, 3300, 3100, 3200, 3150, 3100, 3300, 3700] },
  ];

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
        <Chart options={options} series={series} type="area" height={270} />
      </div>
    </div>
  );
};

export default LineChart;
