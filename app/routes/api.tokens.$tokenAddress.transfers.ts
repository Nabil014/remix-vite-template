import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const tokenAddress = params.tokenAddress;
    console.log(`Fetching token transfers for address: ${tokenAddress}`);
    const headers = new Headers({
      'Accept': 'application/json',
      'X-API-Key': API_KEY
    });

    const transfersPromise = fetch(`${baseURL}/erc20/${tokenAddress}/transfers?limit=50`, {
      method: 'GET',
      headers: headers
    });

    const [transfersResponse] = await Promise.all([transfersPromise]);

    if (!transfersResponse.ok) {
      const message = await transfersResponse.json();
      throw new Error(message);
    }

    const tokenTransfers = await transfersResponse.json();

    return json({
      tokenTransfers: tokenTransfers.result
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