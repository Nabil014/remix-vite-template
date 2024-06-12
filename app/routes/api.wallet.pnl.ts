import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const betaURL = process.env.PNL_BETA_URL ?? 'https://deep-index.moralis.io/api/v2';

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const address = url.searchParams.get('wallet');
    const chain = url.searchParams.get('chain') || 'eth';

    if (!address) {
      return json({ error: 'Wallet address is required' }, { status: 400 });
    }

    console.log(`Fetching PnL for wallet: ${address} on chain: ${chain}`);
    console.log(`Using betaURL: ${betaURL}`);
    console.log(`Using API_KEY: ${API_KEY}`);

    if (!betaURL) {
      throw new Error('PNL_BETA_URL is not defined');
    }

    const fetchUrl = `${betaURL}/wallets/${address}/profitability?chain=${chain}&days=all`;
    console.log(`Fetching URL: ${fetchUrl}`);

    const response = await fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': API_KEY
      }
    });

    if (!response.ok) {
      const message = await response.text();
      console.error('Error fetching profitability:', response.status, message);
      return json({ error: 'Unable to fetch profitability', details: message }, { status: response.status });
    }

    const profitability = await response.json();

    return json(profitability);

  } catch (e) {
    console.error('Unknown error occurred:', e);
    return json({ error: 'An unknown error occurred', details: e instanceof Error ? e.message : e }, { status: 500 });
  }
};