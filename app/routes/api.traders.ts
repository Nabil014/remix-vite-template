import { json, type LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const limit = parseInt(url.searchParams.get("limit") || "20", 10);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);

  try {
    const res = await fetch('https://omni.icarus.tools/ethereum/cush/topUsers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        params: [
          {
            limit,
            offset,
            sort_by: "tx_4h",
            sort_order: false,
            fee_tiers: [0],
          },
        ],
      }),
    });

    const data = await res.json();
    return json({ traders: data.result });
  } catch (error) {
    console.error(error);
    return json({ traders: [] });
  }
};
