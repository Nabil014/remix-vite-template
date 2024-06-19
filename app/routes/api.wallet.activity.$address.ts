import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = process.env.MORALIS ?? '';
const baseURL = "https://deep-index.moralis.io/api/v2";

export const loader: LoaderFunction = async ({ request, params }) => {
  try {
    const url = new URL(request.url);
    const chain = url.searchParams.get('chain') && url.searchParams.get('chain') !== "undefined" ? url.searchParams.get('chain') : 'eth';
    const address = params.address;

    if (!address) {
      return json({ error: 'Wallet address is required' }, { status: 400 });
    }

    const response = await fetch(`${baseURL}/${address}?chain=${chain}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-Key': `${API_KEY}`
      }
    });

    if (!response.ok) {
      console.log(response.statusText);
      return json({ error: response.statusText }, { status: response.status });
    }

    const data = await response.json();

    if (!data.result) {
      return json({ transactions: [], message: "No transactions found" }, { status: 200 });
    }

    const transactions = data.result;

    const { weeklyActivity, walletsInteracted, interactionCounts } = groupTransactionsByWeek(transactions);

    return json({
      weeklyActivity,
      walletsInteracted,
      interactionCounts,
    });

  } catch (e) {
    console.error(e);
    return json({ error: 'An unknown error occurred' }, { status: 500 });
  }
};

const groupTransactionsByWeek = (transactions: any[]): { weeklyActivity: { [key: string]: number }, walletsInteracted: { [key: string]: string[] }, interactionCounts: { [key: string]: number } } => {
  const weeklyActivity: { [key: string]: number } = {};
  const walletsInteracted: { [key: string]: Set<string> } = {};
  const interactionCounts: { [key: string]: number } = {};

  transactions.forEach(tx => {
    const date = new Date(tx.block_timestamp);
    const weekNumber = getWeekNumber(date).toString();

    if (!weeklyActivity[weekNumber]) {
      weeklyActivity[weekNumber] = 0;
      walletsInteracted[weekNumber] = new Set();
    }

    weeklyActivity[weekNumber]++;
    walletsInteracted[weekNumber].add(tx.to_address);
    walletsInteracted[weekNumber].add(tx.from_address);

    interactionCounts[tx.to_address] = (interactionCounts[tx.to_address] || 0) + 1;
    interactionCounts[tx.from_address] = (interactionCounts[tx.from_address] || 0) + 1;
  });

  // Convert sets to arrays for serialization
  const walletsInteractedArray = Object.fromEntries(
    Object.entries(walletsInteracted).map(([week, wallets]) => [week, Array.from(wallets)])
  );

  return { weeklyActivity, walletsInteracted: walletsInteractedArray, interactionCounts };
};

const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;

  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};
