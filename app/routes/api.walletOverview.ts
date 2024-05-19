// app/routes/api/walletOverview.ts
import { json, LoaderFunction } from "@remix-run/node";

const MORALIS_API_URL_NET_WORTH = "https://deep-index.moralis.io/api/v2/wallets/getWalletNetWorth";
const MORALIS_API_KEY = process.env.MORALIS;  // Replace with your actual Moralis API key

async function getWalletOverview(address: string) {
  try {
    const response = await fetch(`${MORALIS_API_URL_NET_WORTH}?address=${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': MORALIS_API_KEY
      }
    });

    const data = await response.json();
    console.log("Overview data: ", data);
    return data;
  } catch (e) {
    console.error(e);
    return {
      total_networth_usd: 0,
      chains: []
    };
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const address = params.address;
  const overview = await getWalletOverview(address);
  return json({
    overview,
  });
};
