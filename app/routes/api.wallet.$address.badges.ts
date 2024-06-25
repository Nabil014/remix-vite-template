import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const chain = url.searchParams.get('chain') && url.searchParams.get('chain') !== "undefined" ? url.searchParams.get('chain') : 'eth';
    const address = params.address;

    if (!address) {
      return json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const response = await fetch(`${baseURL}/${address}/nft?chain=${chain}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': `${API_KEY}`
      }
    });

    if (!response.ok) {
      console.log(response.statusText);
      return json({ error: response.statusText }, { status: response.status });
    }

    const data = await response.json();

    if (!data.result || data.result.length === 0) {
      return json({ badges: [], message: "No badges found" }, { status: 200 });
    }

    const badges = data.result;

    return json({ badges }, { status: 200 });

  } catch (e) {
    console.error(e);
    return json({ error: 'An unknown error occurred' }, { status: 500 });
  }
};
