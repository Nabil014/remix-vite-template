import { Bar } from 'react-chartjs-2';
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface VolumeChartProps {
  weeklyActivity: { [key: string]: number };
}

const VolumeChart: React.FC<VolumeChartProps> = ({ weeklyActivity }) => {
  const data = {
    labels: Object.keys(weeklyActivity).map(week => `${week}`),
    datasets: [
      {
        label: 'Activity',
        data: Object.values(weeklyActivity),
        backgroundColor: '#00FFD1',
        borderColor: '#00FFD1',
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
          display: true,
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
    <div className="flex flex-col gap-y-3 rounded-lg text-white w-1/2">
      <h3 className="font-semibold text-sm">Wallet Activity</h3>
      <span className="text-gray-400 text-xs font-bold ">Weekly transactions over the last 90 days</span>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VolumeChart;
