import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ params, request }) => {
  try {
    const tokenAddress = params.tokenAddress;
    const url = new URL(request.url);
    const chain = url.searchParams.get('chain') || 'eth';

    // Obtener el último bloque
    const latestBlockResponse = await fetch(`${baseURL}/latestBlockNumber/0x1`, {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'X-API-Key': API_KEY }
    });

    console.log("Latest Block Response Status:", latestBlockResponse.status);

    if (!latestBlockResponse.ok) {
      const errorText = await latestBlockResponse.text();
      console.error('Error fetching latest block:', errorText);
      return json({ error: 'Unable to fetch latest block', details: errorText }, { status: latestBlockResponse.status });
    }

    const latest_block = await latestBlockResponse.json();
    console.log("Latest Block Data:", latest_block);

    // Preparar fechas para los últimos 30 días, incluyendo hoy
    const dates = Array.from({ length: 60 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      return date.toISOString();
    });

    // Obtener bloques para cada fecha en paralelo
    const blockPromises = dates.map(dateString => 
      fetch(`${baseURL}/dateToBlock?chain=${chain}&date=${dateString}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'X-API-Key': API_KEY }
      }).then(res => res.json())
    );
    const blocks = await Promise.all(blockPromises);

    // Obtener precios para cada bloque en paralelo
    const pricePromises = blocks.map(block => 
      fetch(`${baseURL}/erc20/${tokenAddress}/price?chain=${chain}&to_block=${block.block}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'X-API-Key': API_KEY }
      }).then(res => res.json())
    );
    const prices = await Promise.all(pricePromises);

    // Combinar bloques y precios en un array
    const price_blocks = blocks.map((block, i) => ({
      x: dates[i],
      y: Number(prices[i]?.usdPriceFormatted), // Convertir a número
      block: block.block
    }));

    const lastPrice = price_blocks.length ? Number(price_blocks[0].y) : 0;
    const firstPrice = price_blocks.length ? Number(price_blocks[price_blocks.length - 1].y) : 0;
    const threshold = 0.0001;

    let direction = firstPrice <= lastPrice ? "up" : "down";

    let percentageChange = ((lastPrice - firstPrice) / firstPrice) * 100;
    if (Math.abs(percentageChange) < threshold) {
      percentageChange = 0;
    }
    percentageChange = Number(percentageChange.toFixed(2));

    let usdChange = lastPrice - firstPrice;

    price_blocks.reverse();

    return json({ 
      tokenPrices: price_blocks,
      tokenPriceStats: {
        percentageChange, 
        usdChange, 
        direction
      }
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


