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
          color: 'rgba(245, 245, 245, 0.5)',
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
    <div className="relative bg-transparent p-8 rounded-lg text-white" style={{ width: '661px', height: '328px' }}>
      <div className="text-lg font-semibold mb-2" style={{ fontSize: '14px', fontWeight: 600 }}>Wallet Activity</div>
      <div className="text-gray-400 mb-4" style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(245, 245, 245, 0.5)' }}>Weekly transactions over the last 90 days</div>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VolumeChart;
