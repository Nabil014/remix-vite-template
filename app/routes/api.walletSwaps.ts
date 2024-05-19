import { json, LoaderFunction } from "@remix-run/node";

const ICARUS_API_URL_SWAPS = "https://omni.icarus.tools/ethereum/cush/allSwapsForUser";

async function getWalletSwaps(address: string) {
  try {
    const endTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
    const startTime = endTime - 24 * 60 * 60; // Hace 24 horas en segundos

    const response = await fetch(ICARUS_API_URL_SWAPS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [address, startTime, endTime]
      })
    });

    const data = await response.json();
    if (data && data.result) {
      return data.result;
    } else {
      throw new Error('Invalid response data');
    }
  } catch (e) {
    console.error("Error fetching wallet swaps: ", e);
    return [];
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const walletAddress = url.searchParams.get("walletAddress");

  if (!walletAddress) {
    return json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const swaps = await getWalletSwaps(walletAddress);
  return json({ swaps });
};
