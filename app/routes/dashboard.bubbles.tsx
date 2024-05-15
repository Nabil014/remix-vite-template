import { json, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { getInfoData, getLatestData, getMapData } from "~/api/data";


import BubbleChart from "~/components/bubble-chart";
import Pagination from "~/components/paginated";

interface CryptoData {
  name: string;
  symbol: string;
  logo: string;
  latestH1: number | string;
  latestH7: number | string;
  latestD7: number | string;
}

let lastUpdateTime: number | null = null;
let cachedData: any[] = [];
const updateInterval = 60000; // 1 minuto


function getLastUpdateTime(): number | null {
  return lastUpdateTime;
}

function updateLastUpdateTime(time: number): void {
  lastUpdateTime = time;
}

function getCachedData(): any[] {
  return cachedData;
}

export async function loader({ params }: any) {
  const currentPage = parseInt(params.page) || 1;
  let cryptoData: CryptoData[] = [];
  try {
    const currentTime = new Date().getTime();
    const lastUpdateTime = getLastUpdateTime();
    const shouldUpdate = !lastUpdateTime || currentTime - lastUpdateTime > updateInterval;

    if (shouldUpdate) {
      const mapData = await getMapData(currentPage);
      const ids = mapData.map((crypto: any) => crypto.id);
      const infoData = await getInfoData(ids);
      const latestData = await getLatestData(ids);

      cryptoData = mapData.map((crypto: any) => {
        const logo = infoData[crypto.id]?.logo;
        const symbol = infoData[crypto.id]?.symbol;
        const name = latestData[crypto.id]?.name;
        const latestH1 = latestData[crypto.id]?.quote?.USD?.percent_change_1h;
        const latestH7 = latestData[crypto.id]?.quote?.USD?.percent_change_7d;
        const latestD7 = latestData[crypto.id]?.quote?.USD?.percent_change_24h;
        return {
          name,
          symbol,
          logo,
          latestH1,
          latestH7,
          latestD7
        };
      });


      updateLastUpdateTime(currentTime);
      cachedData = cryptoData;
    } else {
      cryptoData = getCachedData();
    }

    return json(cryptoData);
  } catch (error) {
    console.error("Error fetching data:", error);
    return json([]);
  }
}


export default function Bubbles() {
  const data = useLoaderData<CryptoData[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<"1 Hour" | "7 Hours" | "7 Days">("1 Hour");

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterChange = (selectedFilter: "1 Hour" | "7 Hours" | "7 Days") => {
    setFilter(selectedFilter);
  };

  const filterData = (cryptoData: CryptoData[]) => {
    switch (filter) {
      case "1 Hour":
        return cryptoData.map(({ name, symbol, logo, latestH1 }) => ({
          name,
          symbol,
          logo,
          price: latestH1,
        }));
      case "7 Hours":
        return cryptoData.map(({ name, symbol, logo, latestH7 }) => ({
          name,
          symbol,
          logo,
          price: latestH7,
        }));
      case "7 Days":
        return cryptoData.map(({ name, symbol, logo, latestD7 }) => ({
          name,
          symbol,
          logo,
          price: latestD7,
        }));
      default:
        return [];
    }
  };

  const filteredData = filterData(data);

  const totalPages = Math.ceil(filteredData.length / 30);
  const startIndex = (currentPage - 1) * 30;
  const endIndex = Math.min(startIndex + 30, filteredData.length);
  const currentPageData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="flex justify-center mt-20 space-x-4 bg-transparent">
        <button
          type="button"
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${filter === "1 Hour" ? "bg-white text-gray-800" : "text-[#6EEAEA] hover:bg-gray-100"} py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`}
          onClick={() => handleFilterChange("1 Hour")}
        >
          1 Hour
        </button>
        <button
          type="button"
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${filter === "7 Hours" ? "bg-white text-gray-800" : "text-[#6EEAEA] hover:bg-gray-100"} py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`}
          onClick={() => handleFilterChange("7 Hours")}
        >
          7 Hours
        </button>
        <button
          type="button"
          className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${filter === "7 Days" ? "bg-white text-gray-800" : "text-[#6EEAEA] hover:bg-gray-100"} py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`}
          onClick={() => handleFilterChange("7 Days")}
        >
          7 Days
        </button>
      </div>
      <BubbleChart cryptoData={currentPageData} />
      <div className="flex items-center justify-center p-2 bg-transparent">
        <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>
    </div>
  );
}