import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjEyOTcwOGRmLTAwMmYtNDNhMi04NzVmLTY3Zjk0OGU4OTk4OCIsIm9yZ0lkIjoiMzkwMDMzIiwidXNlcklkIjoiNDAwNzgzIiwidHlwZUlkIjoiODQ3ZTY2MzQtNzJkMC00OWFmLTlmZGItMzBkODk1NDExZGNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTg0MDAxMTQsImV4cCI6NDg3NDE2MDExNH0.omPk1UXIt9_rEp4Pn3pBkqdSKNznn8PnsC6awTnqBcI";
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const tokenAddress = url.searchParams.get("address");
    const headers = new Headers({
      'Accept': 'application/json',
      'X-API-Key': API_KEY
    });

    const ownersResponse = await fetch(`${baseURL}/erc20/${tokenAddress}/owners?limit=50`, {
      method: 'GET',
      headers: headers
    });

    if (!ownersResponse.ok) {
      const message = await ownersResponse.json();
      throw new Error(`Error fetching token owners: ${ownersResponse.statusText} - ${JSON.stringify(message)}`);
    }

    const tokenOwners = await ownersResponse.json();

    let topTenHolders = [];
    if (tokenOwners && tokenOwners.result && tokenOwners.result.length > 0) {
      topTenHolders = tokenOwners.result.slice(0, 10);
    }

    let totalBalance = topTenHolders.reduce((acc: number, holder: any) => acc + Number(holder.balance_formatted), 0);
    let totalUsd = topTenHolders.reduce((acc: number, holder: any) => acc + Number(holder.usd_value), 0);
    let totalPercentage = topTenHolders.reduce((acc: number, holder: any) => acc + holder.percentage_relative_to_total_supply, 0);

    const fetchDataForOwner = async (owner: any) => {
      return {
        balanceData: [], // Dummy data, replace with actual data fetching logic
      };
    };

    const results = await Promise.all(topTenHolders.map((owner: any) => fetchDataForOwner(owner)));

    let tokenOccurrences = results.reduce((acc: any, holder: any) => {
      holder.balanceData.forEach((token: any) => {
        const address = token.token_address;
        if (!acc[address]) {
          acc[address] = { count: 0, tokenDetails: token };
        }
        acc[address].count += 1;
      });
      return acc;
    }, {});

    let commonTokens = Object.values(tokenOccurrences)
      .filter((item: any) => item.count >= 3)
      .map((item: any) => item);

    const get_metadata = await fetch(`${baseURL}/erc20/metadata?addresses=${tokenAddress}`, {
      method: 'GET',
      headers: headers
    });

    if (!get_metadata.ok) {
      const message = await get_metadata.json();
      throw new Error(`Error fetching token metadata: ${get_metadata.statusText} - ${JSON.stringify(message)}`);
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

    if (!priceResponse.ok) {
      const message = await priceResponse.json();
      throw new Error(`Error fetching token price: ${priceResponse.statusText} - ${JSON.stringify(message)}`);
    }

    if (!blockResponse.ok) {
      const message = await blockResponse.json();
      throw new Error(`Error fetching block data: ${blockResponse.statusText} - ${JSON.stringify(message)}`);
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
      tokenMetadata: tokenMetadata[0],
      tokenOwners: tokenOwners.result,
      topTokenOwners: results,
      totalBalance,
      totalUsd,
      tokenPrice,
      blockCreated,
      totalPercentage,
      commonTokens
    });

  } catch (e) {
    if (e instanceof Error) {
      // Añadir manejo específico para el error de límite de plan
      if (e.message.includes("Validation service blocked")) {
        return json({ error: "Has alcanzado el límite diario de tu plan gratuito en Moralis. Por favor, actualiza tu plan." }, { status: 403 });
      }
      return json({ error: e.message }, { status: 500 });
    } else {
      return json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
};
