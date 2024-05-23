
const Table = ({ data }) => {
  return (
    <div className="max-w-[1328px]">
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="bg-[#022527] border border-[#04E6E6] rounded-[30px] shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-[#04E6E6]">
                <h2 className="text-xl font-semibold text-[#E2E8F0]">Titulo</h2>
                <p className="text-sm text-[#A0AEC0]">
                  Lorem ipsum dolor sit amet consectetur. Nunc diam rhoncus enim nec consectetur tellus nulla. Orci felis gravida nunc fermentum tempus suspendisse. Id aenean hac tincidunt nisi vitae tortor nisl ullamcorper. Lectus porttitor pellentesque dis sagittis at proin diam blandit fames.
                </p>
              </div>
              <table className="min-w-full divide-y divide-[#04E6E6]">
                <thead className="bg-[#022527]">
                  <tr>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Token Name</span>
                    </th>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">PNL</span>
                    </th>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Amount wallet</span>
                    </th>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Age</span>
                    </th>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Market cap</span>
                    </th>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Potencial high</span>
                    </th>
                    <th className="px-6 py-3 text-start whitespace-nowrap">
                      <span className="text-xs font-semibold uppercase tracking-wide text-[#E2E8F0]">Potencial low</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#04E6E6]">
                  {data.map((coin, index) => (
                    <tr key={index}>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-x-3">
                          <svg className="flex-shrink-0 w-5 h-5 text-[#E2E8F0]" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span className="font-semibold text-sm text-[#E2E8F0]">{coin.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-[#E2E8F0]">{coin.pnl}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-[#E2E8F0]">{coin.amountWallet}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-[#E2E8F0]">{coin.age}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-[#E2E8F0]">{coin.marketCap}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-[#E2E8F0]">{coin.potencialHigh}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="text-sm text-[#E2E8F0]">{coin.potencialLow}</span>
                      </td>
                    </tr>
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
