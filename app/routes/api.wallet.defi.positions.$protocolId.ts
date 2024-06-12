import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const address = url.searchParams.get('wallet');
    const chain = url.searchParams.get('chain') || 'eth';
    const protocolId = params.protocolId;

    if (!address) {
      return json({ error: 'Wallet address is required' }, { status: 400 });
    }

    console.log(`Fetching positions for protocol ${protocolId} for wallet: ${address} on chain: ${chain}`);

    const get_positions = await fetch(`${baseURL}/wallets/${address}/defi/${protocolId}/positions?chain=${chain}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': API_KEY
      }
    });

    if (!get_positions.ok) {
      const message = await get_positions.text();
      console.error('Error fetching positions:', get_positions.status, message);
      return json({ error: 'Unable to fetch positions', details: message }, { status: get_positions.status });
    }

    const defiPosition = await get_positions.json();

    // Responder con los datos combinados
    return json({
      positionDetail: defiPosition
    });

  } catch (e) {
    console.error('Unknown error occurred:', e);
    return json({ error: 'An unknown error occurred', details: e instanceof Error ? e.message : e }, { status: 500 });
  }
};
