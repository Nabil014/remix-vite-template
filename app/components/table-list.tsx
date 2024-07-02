import { Link } from '@remix-run/react';

const Table = ({ data, title, description, columns }) => {
  const formatValue = (value) => {
    if (typeof value !== 'string' && typeof value !== 'number') return '0.000000000000';
    const [integer, decimal = ''] = value.toString().split('.');
    const formattedDecimal = decimal.padEnd(12 - integer.length, '0').slice(0, 12 - integer.length);
    return `${integer}.${formattedDecimal}`;
  };

  if (!data || !Array.isArray(data)) {
    return <p>No data available</p>;
  }

  return (
    <div className="max-w-[1328px] flex flex-col h-full">
      <div className="flex flex-col flex-grow">
        <div className="overflow-x-auto flex-grow">
          <div className="p-1.5 min-w-full inline-block align-middle h-full">
            <div className="bg-[#022527] border border-[#04E6E6] rounded-[30px] shadow-sm overflow-hidden flex flex-col h-full">
              <div className="px-6 py-4 border-b border-[#04E6E6]">
                <h2 className="text-xl font-semibold text-[#E2E8F0]">{title}</h2>
                <p className="text-sm text-[#A0AEC0]">{description}</p>
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
