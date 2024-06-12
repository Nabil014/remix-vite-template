import { type ActionFunction, json } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const action: ActionFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const tokenAddress = url.searchParams.get("address");
    console.log(tokenAddress);

    const headers = new Headers({
      'Accept': 'application/json',
      'X-API-Key': API_KEY
    });

    const get_metadata = await fetch(`${baseURL}/erc20/metadata?addresses=${tokenAddress}`, {
      method: 'GET',
      headers: headers
    });

    if (!get_metadata.ok) {
      const message = await get_metadata.json();
      throw new Error(message);
    }

    let tokenMetadata = await get_metadata.json();

    const pricePromise = fetch(`https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/price?include=percent_change`, {
      method: 'GET',
      headers: headers
    });

    const blockPromise = fetch(`https://deep-index.moralis.io/api/v2.2/block/${tokenMetadata[0].block_number}`, {
      method: 'GET',
      headers: headers
    });

    const [priceResponse, blockResponse] = await Promise.all([pricePromise, blockPromise]);

    if (!blockResponse.ok) {
      const message = await blockResponse.json();
      return json(message, { status: 500 });
    }

    const tokenPrice = await priceResponse.json();
    const blockCreated = await blockResponse.json();

    if (tokenMetadata[0].total_supply_formatted) {
      if (tokenPrice.usdPrice) {
        tokenMetadata[0].fdv = Number(tokenMetadata[0].total_supply_formatted) * Number(tokenPrice.usdPrice);
        tokenMetadata[0].fdv = Number(tokenMetadata[0].fdv).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
      }

      tokenMetadata[0].total_supply_formatted = Number(tokenMetadata[0].total_supply_formatted).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

    if (!tokenPrice.usdPrice) {
      tokenPrice.usdPrice = 0;
      tokenPrice.usdPriceFormatted = "0";
      tokenPrice["24hrPercentChange"] = "0";
    }

    return json({
      tokenAddress,
      tokenMetadata: tokenMetadata[0],
      tokenPrice,
      blockCreated
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