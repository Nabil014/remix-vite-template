import React from 'react';

const ComparePlans = () => {
  return (
    <div className="mt-16 overflow-x-auto">
      <h2 className="mb-8 text-center text-[36px] font-black leading-[46.09px] tracking-wide text-[#F5F5F5]">
        Compare plans
      </h2>
      <div className="min-w-full bg-[#022527] text-white border border-[#04E6E6] rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="py-3 px-4 text-left text-lg font-semibold border-r border-[#04E6E6] border-t-0 border-l-0">Content & Dashboard</th>
              <th className="py-3 px-4 text-left text-lg font-semibold border-r border-[#04E6E6] border-t-0 border-l-0">Free</th>
              <th className="py-3 px-4 text-left text-lg font-semibold border-r border-[#04E6E6] border-t-0 border-l-0">Gold</th>
              <th className="py-3 px-4 text-left text-lg font-semibold border-t-0 border-l-0">Diamond</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0">AI Powered Smart Search</td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center">✔️</td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center">✔️</td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center">✔️</td>
            </tr>
            <tr>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0">CryptoGhost Labels</td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center"></td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center">✔️</td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center">✔️</td>
            </tr>
            <tr>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0">Signals</td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center"></td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center"></td>
              <td className="py-3 px-4 border-t border-[#04E6E6] border-b-0 border-l-0 text-center">✔️</td>
            </tr>
          </tbody>
        </table>
      </div>
        <div className="mt-4 text-center">
         <button className="mb-4 w-36 rounded bg-[#00D8FF] py-2 font-semibold text-black transition duration-300 hover:bg-[#00B8E4]">
             View All
            </button>
        </div>
    </div>
  );
}

export default ComparePlans;
