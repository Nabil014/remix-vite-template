import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const address = url.searchParams.get('wallet');
    const chain = url.searchParams.get('chain') && url.searchParams.get('chain') !== "undefined" ? url.searchParams.get('chain') : 'eth';

    const response = await fetch(`${baseURL}/wallets/${address}/tokens?chain=${chain}&exclude_spam=true&exclude_unverified_contracts=true`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': `${API_KEY}`
      }
    });

    if (!response.ok) {
      console.log(response.statusText);
      const message = await response.json();
      if (message && message.message === "Cannot fetch token balances as wallet contains over 2000 tokens. Please contact support for further assistance.") {
        return json({ verified_tokens: [], unsupported: true }, { status: 200 });
      }
    }

    const data = await response.json();

    let verified_tokens: any[] = [];
    let spam_tokens: any[] = [];

    for (const token of data.result) {
      verified_tokens.push(token);
    }

    return json({
      verified_tokens,
      spam_tokens
    });

  } catch (e) {
    console.error(e);
    return json({ error: 'An unknown error occurred' }, { status: 500 });
  }
};

