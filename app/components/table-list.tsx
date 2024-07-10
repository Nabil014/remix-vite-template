import { Link } from '@remix-run/react';

const Table = ({ data, title, description, columns, networks, selectedNetwork, onNetworkChange }) => {
  if (!data || !Array.isArray(data)) {
    return <p>No data available</p>;
  }

  return (
    <div className="max-w-[1328px] flex flex-col h-full">
      <div className="flex flex-col flex-grow">
        <div className="overflow-x-auto flex-grow">
          <div className="p-1.5 min-w-full inline-block align-middle h-full">
            <div className="bg-[#022527] border border-[#04E6E6] rounded-[30px] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="px-6 py-4 border-b border-[#04E6E6] flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-[#E2E8F0]">{title}</h2>
                  <p className="text-sm text-[#A0AEC0]">{description}</p>
                </div>
                <div className="min-w-[200px]">
                  <label htmlFor="network-select" className="block text-white mb-2">Networks:</label>
                  <select
                    id="network-select"
                    value={selectedNetwork}
                    onChange={(e) => onNetworkChange(e.target.value)}
                    className="p-2 rounded bg-gray-800 text-white border border-[#04E6E6] focus:outline-none focus:ring-2 focus:ring-[#04E6E6] w-full"
                  >
                    <option value="">All</option>
                    {networks.map((network) => (
                      <option key={network} value={network}>{network}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                <table className="min-w-full divide-y divide-[#04E6E6]">
                  <thead className="bg-[#022527]">
                    <tr>
                      {columns.map((col) => (
                        <th key={col.key} className="px-4 py-3 text-start whitespace-nowrap">
                          <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">{col.label}</span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#04E6E6]">
                    {data.map((item, index) => (
                      <tr key={index} className="hover:bg-[#014147]">
                        {columns.map((col) => (
                          <td key={col.key} className="px-4 py-3">
                            {col.link ? (
                              <Link to={col.link(item)}>
                                <span className="text-sm text-[#E2E8F0]">
                                  {col.format ? col.format(item[col.key]) : item[col.key]}
                                </span>
                              </Link>
                            ) : (
                              <span className="text-sm text-[#E2E8F0]">
                                {col.format ? col.format(item[col.key]) : item[col.key]}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
