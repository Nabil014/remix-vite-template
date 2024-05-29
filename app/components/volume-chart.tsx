import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VolumeChart = () => {
  const data = {
    labels: Array(12).fill(''),
    datasets: [
      {
        label: 'Activity',
        data: [40, 80, 60, 20, 100, 120, 70, 60, 50, 110, 30, 10],
        backgroundColor: '#00FFD1',
      }
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: '',
      },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: {
          family: 'Arial',
          size: 14
        },
        bodyFont: {
          family: 'Arial',
          size: 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false
        }
      },
      y: {
        ticks: {
          color: '#FFFFFF',
          font: {
            family: 'Arial',
            size: 12
          }
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="relative h-96 w-[800px] bg-transparent p-6 rounded-lg">
      <div className="text-white text-xl font-semibold mb-2">Wallet Activity</div>
      <div className="text-gray-400 mb-4">Weekly transactions over the last 90 days</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VolumeChart;
