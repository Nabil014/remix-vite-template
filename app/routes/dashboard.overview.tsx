import React from 'react';
import { useLoaderData } from '@remix-run/react';
import { LoaderFunction, json } from '@remix-run/server-runtime';

export const loader: LoaderFunction = async () => {
  const data = {
    traders: 500,
    volume: 1500000,
    transactions: 3000,
    alerts: [
      { id: 1, message: "New high volume trade detected." },
      { id: 2, message: "Price alert for BTC." },
    ],
    topTraders: [
      { address: "0x52...7e0c", volume: 26700813165, swaps: 7923 },
      { address: "0xfd...60c9", volume: 14691219395, swaps: 5890 },
      // ... otros traders
    ],
  };
  return json(data);
};

interface Data {
  traders: number;
  volume: number;
  transactions: number;
  alerts: { id: number; message: string }[];
  topTraders: { address: string; volume: number; swaps: number }[];
}

export default function Overview() {
  const data = useLoaderData<Data>();

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden dark:bg-neutral-800 dark:border-neutral-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-neutral-200">Dashboard Overview</h2>
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Summary of the most important metrics and recent activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
          <MetricsSummary title="Total Traders" value={data.traders.toString()} />
          <MetricsSummary title="Total Volume (USD)" value={data.volume.toLocaleString('en-US')} />
          <MetricsSummary title="Transactions" value={data.transactions.toString()} />
        </div>

        <RecentAlerts alerts={data.alerts} />

        <TopTradersTable topTraders={data.topTraders} />

        <div className="px-6 py-4 flex justify-between items-center border-t border-gray-200 dark:border-neutral-700">
          <p className="text-sm text-gray-600 dark:text-neutral-400">
            Showing top traders and their performance.
          </p>
          <div className="inline-flex gap-x-2">
            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Prev
            </button>
            <button
              type="button"
              className="py-1.5 px-2 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const MetricsSummary = ({ title, value }: { title: string; value: string }) => (
  <div className="bg-gray-50 dark:bg-neutral-800 p-4 rounded-lg">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">{title}</h3>
    <p className="text-2xl font-bold text-gray-900 dark:text-neutral-100">{value}</p>
  </div>
);

const RecentAlerts = ({ alerts }: { alerts: { id: number; message: string }[] }) => (
  <div className="p-6 border-t border-gray-200 dark:border-neutral-700">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">Recent Alerts</h3>
    <ul className="mt-4 space-y-2">
      {alerts.map(alert => (
        <li key={alert.id} className="bg-red-50 dark:bg-red-900 p-3 rounded-lg text-red-700 dark:text-red-200">
          {alert.message}
        </li>
      ))}
    </ul>
  </div>
);

const TopTradersTable = ({ topTraders }: { topTraders: { address: string; volume: number; swaps: number }[] }) => (
  <div className="p-6">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">Top Traders</h3>
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
        <thead className="bg-gray-50 dark:bg-neutral-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Address</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Volume</th>
            <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-800 dark:text-neutral-200">Swaps</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
          {topTraders.map((trader, index) => (
            <tr key={index}>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-neutral-200">
                {trader.address}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-neutral-200">
                {trader.volume.toLocaleString('en-US')}
              </td>
              <td className="px-6 py-3 whitespace-nowrap text-sm font-semibold text-gray-800 dark:text-neutral-200">
                {trader.swaps}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
