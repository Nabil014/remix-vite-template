const API_KEY = "316de030-e7c7-418b-b2d2-26e172d59119";
const BASE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency";
const BASE_URL_V2 = "https://pro-api.coinmarketcap.com/v2/cryptocurrency";

const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url, {
      headers: {
        'X-CMC_PRO_API_KEY': API_KEY,
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText} - ${errorDetails}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
      throw new Error(`Expected JSON, got ${contentType}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
};

const validateIds = (ids: number[]): void => {
  if (!ids || ids.length === 0) {
    throw new Error('No IDs provided');
  }
};

export const getMapData = async (start: number, limit: number): Promise<any[]> => {
  console.log(`Fetching map data: start=${start}, limit=${limit}`);
  const url = `${BASE_URL}/listings/latest?start=${start}&limit=${limit}`;
  const json = await fetchData(url);
  return Array.isArray(json.data) ? json.data : [];
};

export const getInfoData = async (ids: number[]): Promise<{ [key: string]: any }> => {
  validateIds(ids);
  const url = `${BASE_URL}/info?id=${ids.join(',')}`;
  const json = await fetchData(url);
  return json.data || {};
};

export const getLatestData = async (ids: number[]): Promise<{ [key: string]: any }> => {
  validateIds(ids);
  const url = `${BASE_URL_V2}/quotes/latest?id=${ids.join(',')}`;
  const json = await fetchData(url);
  return json.data || {};
};