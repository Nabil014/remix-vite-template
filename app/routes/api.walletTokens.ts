import { json, LoaderFunction } from "@remix-run/node";

const ICARUS_API_URL_TOKENS = "https://omni.icarus.tools/ethereum/cush/userTokenBalances";

async function getWalletTokens(address: string) {
  try {
    const response = await fetch(ICARUS_API_URL_TOKENS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [address,
          19894512]
      })
    });

    const data = await response.json();
    console.log("Tokens data: ", data.result);
    return data.result;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const walletAddress = url.searchParams.get("walletAddress");

  if (!walletAddress) {
    return json({ error: "Invalid query parameters" }, { status: 400 });
  }

  const tokens = await getWalletTokens(walletAddress);
  return json({
    tokens,
  });
};
