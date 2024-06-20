import { json, type LoaderFunction } from "@remix-run/node";

const COINGECKO_API = "https://api.coingecko.com/api/v3";

interface Token {
  id: string;
  symbol: string;
  name: string;
}

interface PriceData {
  prices: [number, number][];
}

interface PricePoint {
  x: string;
  y: number;
}

interface PriceStats {
  percentageChange: number;
  usdChange: number;
  direction: string;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const tokenAddress = params.tokenAddress; // Dirección del token
  if (!tokenAddress) {
    return json({ error: 'Token address is missing' }, { status: 400 });
  }

  try {
    const url = new URL(request.url);
    const vs_currency = url.searchParams.get('vs_currency') || 'usd';

    // Verificar si el token existe en CoinGecko
    const tokenListResponse = await fetch(`${COINGECKO_API}/coins/list`);
    const tokenList: Token[] = await tokenListResponse.json();
    const token = tokenList.find(t => t.id === tokenAddress.toLowerCase() || t.symbol === tokenAddress.toLowerCase() || t.name.toLowerCase() === tokenAddress.toLowerCase());

    if (!token) {
      return json({ error: 'Token not found' }, { status: 404 });
    }

    // Obtener precios históricos de los últimos 30 días
    const response = await fetch(`${COINGECKO_API}/coins/${token.id}/market_chart?vs_currency=${vs_currency}&days=30`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching historical prices:', errorText);
      return json({ error: 'Unable to fetch historical prices', details: errorText }, { status: response.status });
    }

    const data: PriceData = await response.json();
    const prices: PricePoint[] = data.prices.map(([timestamp, price]) => ({
      x: new Date(timestamp).toISOString(),
      y: price
    }));

    // Calcular cambios de precio
    const lastPrice = prices.length ? prices[prices.length - 1].y : 0;
    const firstPrice = prices.length ? prices[0].y : 0;
    const threshold = 0.0001;

    let direction = firstPrice <= lastPrice ? "up" : "down";

    let percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100;
    if (Math.abs(percentageChange) < threshold) {
      percentageChange = 0;
    }
    percentageChange = Number(percentageChange.toFixed(2));

    let usdChange = lastPrice - firstPrice;

    const priceStats: PriceStats = {
      percentageChange,
      usdChange,
      direction
    };

    return json({
      tokenPrices: prices,
      tokenPriceStats: priceStats
    });
  } catch (e) {
    console.error(e);
    if (e instanceof Error) {
      return json({ error: e.message }, { status: 500 });
    } else {
      return json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
};
