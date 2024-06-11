import { Link } from '@remix-run/react';

const Table = ({ data, title, description }) => {
  const formatValue = (value) => {
    const [integer, decimal = ''] = value.toString().split('.');
    const formattedDecimal = decimal.padEnd(12 - integer.length, '0').slice(0, 12 - integer.length);
    return `${integer}.${formattedDecimal}`;
  };

  return (
    <div className="max-w-[1328px]">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-[#022527] border border-[#04E6E6] rounded-[30px] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#04E6E6]">
                <h2 className="text-xl font-semibold text-[#E2E8F0]">{title}</h2>
                <p className="text-sm text-[#A0AEC0]">
                  {description}
                </p>
              </div>
              <table className="min-w-full divide-y divide-[#04E6E6]">
                <thead className="bg-[#022527]">
                  <tr>
                    <th className="px-4 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Token Name</span>
                    </th>
                    <th className="px-4 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Symbol</span>
                    </th>
                    <th className="px-4 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Price</span>
                    </th>
                    <th className="px-4 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Volume</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#04E6E6]">
                  {data.map((coin, index) => (
                    <Link key={index} to={`/dashboard/token-details/${coin.contract}`} className="contents">
                      <tr className="hover:bg-[#014147]">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-x-3">
                            {coin.image && (
                              <img
                                src={coin.image}
                                alt={`${coin.name} Logo`}
                                className="flex-shrink-0 w-6 h-6 rounded-full"
                              />
                            )}
                            <span className="font-semibold text-sm text-[#E2E8F0]">{coin.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#E2E8F0]">{coin.symbol}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#E2E8F0]">${formatValue(coin.price)}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-[#E2E8F0]">${formatValue(coin.volume)}</span>
                        </td>
                      </tr>
                    </Link>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
