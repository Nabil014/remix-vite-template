import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const address = url.searchParams.get('wallet');
    const chain = url.searchParams.get('chain') || 'eth';

    if (!address) {
      return json({ error: 'Wallet address is required' }, { status: 400 });
    }

    // Definir ambas solicitudes fetch como promesas
    const protocolsPromise = fetch(`${baseURL}/wallets/${address}/defi/summary?chain=${chain}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': API_KEY
      }
    });

    const positionsPromise = fetch(`${baseURL}/wallets/${address}/defi/positions?chain=${chain}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': API_KEY
      }
    });

    // Usar Promise.all para esperar a que todas las promesas se resuelvan
    const [protocolsResponse, positionsResponse] = await Promise.all([protocolsPromise, positionsPromise]);

    // Verificar si protocolsResponse está bien
    if (!protocolsResponse.ok) {
      const message = await protocolsResponse.text();
      console.error('Error fetching protocols:', protocolsResponse.status, message);
      return json({ error: 'Unable to fetch protocols', details: message }, { status: protocolsResponse.status });
    }

    // Verificar si positionsResponse está bien
    if (!positionsResponse.ok) {
      const message = await positionsResponse.text();
      console.error('Error fetching positions:', positionsResponse.status, message);
      return json({ error: 'Unable to fetch positions', details: message }, { status: positionsResponse.status });
    }

    const protocolSummary = await protocolsResponse.json();
    const defiPositions = await positionsResponse.json();

    let uniswapRewards = 0;
    let uniswapValue = 0;
    // let totalUsdValue = 0;

    if (protocolSummary && protocolSummary.protocols && protocolSummary.protocols.length > 0) {
      for (const protocol of protocolSummary.protocols) {
        if (protocol.protocol_name === "uniswap-v3") {
          uniswapRewards = protocol.unclaimed_total_value_usd;
          uniswapValue = protocol.total_value_usd;
          // totalUsdValue += protocol.total_value_usd;
        }
      }
    }

    // Responder con los datos combinados
    return json({
      protocols: protocolSummary,
      uniswapRewards,
      uniswapValue,
      defiPositions
    });

  } catch (e) {
    console.error('Unknown error occurred:', e);
    return json({ error: 'An unknown error occurred', details: e instanceof Error ? e.message : e }, { status: 500 });
  }
};

