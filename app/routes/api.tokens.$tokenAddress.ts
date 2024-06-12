import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ params }) => {
  try {
    const tokenAddress = params.tokenAddress;
    console.log(`Fetching token owners for address: ${params.tokenAddress}`);
    const headers = new Headers({
      'Accept': 'application/json',
      'X-API-Key': API_KEY
    });

    const ownersPromise = fetch(`${baseURL}/erc20/${tokenAddress}/owners?limit=50`, {
      method: 'GET',
      headers: headers
    });

    const [ownersResponse] = await Promise.all([ownersPromise]);

    if (!ownersResponse.ok) {
      const message = await ownersResponse.json();
      throw new Error(message);
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

    return json({
      tokenOwners: tokenOwners.result,
      topTokenOwners: results,
      totalBalance,
      totalUsd,
      totalPercentage,
      commonTokens
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

