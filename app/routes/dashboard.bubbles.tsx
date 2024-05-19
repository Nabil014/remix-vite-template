import { json, useLoaderData, useFetcher } from "@remix-run/react";
import { useEffect, useState, useMemo, useCallback } from "react";
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

interface LoaderData {
  cryptoData: CryptoData[];
  currentPage: number;
  error: string | null;
}

export const loader = async ({ request }: { request: Request }): Promise<Response> => {
  const url = new URL(request.url);
  const currentPage = parseInt(url.searchParams.get("page") || "1");
  const pageSize = 400;
  const start = (currentPage - 1) * pageSize + 1;
  let cryptoData: CryptoData[] = [];
  let error: string | null = null;

  try {
    performance.mark('fetch-mapData-start');
    const mapData = await getMapData(start, pageSize);
    performance.mark('fetch-mapData-end');
    performance.measure('fetch-mapData', 'fetch-mapData-start', 'fetch-mapData-end');
    console.log(`Time to fetch mapData: ${performance.getEntriesByName('fetch-mapData')[0].duration}ms`);

    performance.mark('fetch-infoData-latestData-start');
    const ids = mapData.map((crypto: { id: number }) => crypto.id);
    const [infoData, latestData] = await Promise.all([getInfoData(ids), getLatestData(ids)]);
    performance.mark('fetch-infoData-latestData-end');
    performance.measure('fetch-infoData-latestData', 'fetch-infoData-latestData-start', 'fetch-infoData-latestData-end');
    console.log(`Time to fetch infoData and latestData concurrently: ${performance.getEntriesByName('fetch-infoData-latestData')[0].duration}ms`);

    performance.mark('process-data-start');
    cryptoData = mapData.map((crypto: any) => ({
      name: latestData[crypto.id]?.name,
      symbol: infoData[crypto.id]?.symbol,
      logo: infoData[crypto.id]?.logo,
      latestH1: latestData[crypto.id]?.quote?.USD?.percent_change_1h,
      latestH7: latestData[crypto.id]?.quote?.USD?.percent_change_7d,
      latestD7: latestData[crypto.id]?.quote?.USD?.percent_change_24h,
    }));
    performance.mark('process-data-end');
    performance.measure('process-data', 'process-data-start', 'process-data-end');
    console.log(`Time to process data: ${performance.getEntriesByName('process-data')[0].duration}ms`);
  } catch (err: any) {
    console.error("Error fetching data:", err);
    error = err.message;
  }

  return json({ cryptoData, currentPage, error });
};

export default function Bubbles() {
  const { cryptoData: initialCryptoData, currentPage: initialPage, error: initialError } = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [data, setData] = useState(initialCryptoData);
  const [filter, setFilter] = useState("1 Hour");
  const [error, setError] = useState(initialError);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = useMemo(() => Math.ceil(data.length / 50), [data.length]);

  useEffect(() => {
    performance.mark('component-mounted');
    performance.measure('component-render-time', 'navigationStart', 'component-mounted');
    const measure = performance.getEntriesByName('component-render-time')[0];
    console.log(`Component initial render time: ${measure.duration}ms`);
  }, []);

  useEffect(() => {
    if (fetcher.data && fetcher.data.currentPage === currentPage) {
      performance.mark('data-loaded');
      performance.measure('data-fetch-time', 'data-fetch-start', 'data-loaded');
      const measure = performance.getEntriesByName('data-fetch-time')[0];
      console.log(`Data fetch time for page ${currentPage}: ${measure.duration}ms`);
      
      setData(prevData => [...prevData, ...fetcher.data.cryptoData]);
      setError(fetcher.data.error);
      setIsLoading(false);
    }
  }, [fetcher.data, currentPage]);

  useEffect(() => {
    if (currentPage !== initialPage && data.length < currentPage * 50) {
      performance.mark('data-fetch-start');
      setIsLoading(true);
      fetcher.load(`/dashboard/bubbles?page=${currentPage}`);
    }
  }, [currentPage, initialPage, data.length, fetcher]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
  }, []);

  const handleFilterChange = useCallback((selectedFilter: string) => {
    setFilter(selectedFilter);
  }, []);

  const filteredData = useMemo(() => {
    switch (filter) {
      case "1 Hour":
        return data.map(({ name, symbol, logo, latestH1 }) => ({
          name,
          symbol,
          logo,
          price: latestH1,
        }));
      case "7 Hours":
        return data.map(({ name, symbol, logo, latestH7 }) => ({
          name,
          symbol,
          logo,
          price: latestH7,
        }));
      case "7 Days":
        return data.map(({ name, symbol, logo, latestD7 }) => ({
          name,
          symbol,
          logo,
          price: latestD7,
        }));
      default:
        return [];
    }
  }, [filter, data]);

  const displayedData = useMemo(() => {
    const startIndex = (currentPage - 1) * 30;
    return filteredData.slice(startIndex, startIndex + 30);
  }, [filteredData, currentPage]);

  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="flex justify-center space-x-4 bg-transparent mt-20">
        {["1 Hour", "7 Hours", "7 Days"].map((f) => (
          <button
            key={f}
            type="button"
            className={`min-h-[38px] min-w-[38px] flex justify-center items-center ${filter === f ? "bg-white text-gray-800" : "text-[#6EEAEA] hover:bg-gray-100"} py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-600 dark:text-white dark:focus:bg-neutral-500`}
            onClick={() => handleFilterChange(f)}
          >
            {f}
          </button>
        ))}
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex flex-col items-center">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-transparent">
            <div className="flex flex-col justify-center items-center p-4 md:p-5">
              <div className="flex justify-center">
                <div className="animate-spin inline-block h-10 w-10 border-4 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <BubbleChart cryptoData={displayedData} />
        )}
        <div className="flex items-center justify-center p-2 bg-transparent">
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
      </div>
    </div>
  );
}