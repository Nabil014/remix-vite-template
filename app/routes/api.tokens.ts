import { json, LoaderFunction } from "@remix-run/node";
import Moralis from 'moralis';

async function getTokenLogo(address: string) {
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.MORALIS,
      });
    }

    const response = await Moralis.EvmApi.token.getTokenMetadata({
      chain: "0x1",
      addresses: [address],
    });
    return response.raw[0]?.logo || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);

  try {
    const res = await fetch('https://omni.icarus.tools/ethereum/cush/searchTopTokens', {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [
          {
            result_size: limit,
            result_offset: offset,
            sort_by: "tx_4h",
            sort_order: false,
            fee_tiers: [0],
          },
        ],
      }),
    });

    const data = await res.json();

    const tokensWithLogos = await Promise.all(data.result.results.map(async (token: any) => {
      const logo = await getTokenLogo(token.contract);
      return { ...token, logo };
    }));

    return json({ tokens: tokensWithLogos });
  } catch (error) {
    console.log(error);
    return json({ tokens: [] });
  }
};
