// app/routes/api/walletOverview.ts
import { json, LoaderFunction } from "@remix-run/node";
import Moralis from "moralis";

const MORALIS_API_URL_NET_WORTH = "https://deep-index.moralis.io/api/v2/wallets/getWalletNetWorth";
const MORALIS_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjEyOTcwOGRmLTAwMmYtNDNhMi04NzVmLTY3Zjk0OGU4OTk4OCIsIm9yZ0lkIjoiMzkwMDMzIiwidXNlcklkIjoiNDAwNzgzIiwidHlwZUlkIjoiODQ3ZTY2MzQtNzJkMC00OWFmLTlmZGItMzBkODk1NDExZGNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTg0MDAxMTQsImV4cCI6NDg3NDE2MDExNH0.omPk1UXIt9_rEp4Pn3pBkqdSKNznn8PnsC6awTnqBcI";  // Replace with your actual Moralis API key

if (!Moralis.Core.isStarted) {
  Moralis.start({
    apiKey: MORALIS_API_KEY,
  });
}

async function getWalletOverview(address: string) {
  try {
    const [netWorthResponse, activeChainsResponse] = await Promise.all([
      Moralis.EvmApi.wallets.getWalletNetWorth({
        excludeSpam: true,
        excludeUnverifiedContracts: true,
        address,
      }),
      Moralis.EvmApi.wallets.getWalletActiveChains({
        address,
      }),
    ]);

    const netWorthData = netWorthResponse.toJSON();
    const activeChainsData = activeChainsResponse.toJSON();

    return { ...netWorthData, ...activeChainsData };
  } catch (error) {
    console.error(error);
    return {address:address,
      total_networth_usd: 0,
      chains: [],
    };
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const address = url.searchParams.get("address");

  if (!address) {
    return json({ error: "Address parameter is required" }, { status: 400 });
  }

  const overview = await getWalletOverview(address);
  return json({
    overview,
  });
};
