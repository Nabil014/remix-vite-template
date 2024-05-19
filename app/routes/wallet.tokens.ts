// app/routes/api/walletTokens.ts
import { json, LoaderFunction } from "@remix-run/node";

const ICARUS_API_URL_TOKENS = "https://omni.icarus.tools/ethereum/cush/userTokenBalances";

async function getWalletTokens(address: string, blockNumber: number) {
  try {
    const response = await fetch(ICARUS_API_URL_TOKENS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [
          address,
          blockNumber
        ]
      })
    });

    const data = await response.json();
    return data.result.token_balances;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const { address } = params;
  const tokens = await getWalletTokens(address, 16000000);

  return json({
    tokens,
  });
};
