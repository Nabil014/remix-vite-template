import { json, type LoaderFunction } from "@remix-run/node";

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjEyOTcwOGRmLTAwMmYtNDNhMi04NzVmLTY3Zjk0OGU4OTk4OCIsIm9yZ0lkIjoiMzkwMDMzIiwidXNlcklkIjoiNDAwNzgzIiwidHlwZUlkIjoiODQ3ZTY2MzQtNzJkMC00OWFmLTlmZGItMzBkODk1NDExZGNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTg0MDAxMTQsImV4cCI6NDg3NDE2MDExNH0.omPk1UXIt9_rEp4Pn3pBkqdSKNznn8PnsC6awTnqBcI";
const baseURL = "https://deep-index.moralis.io/api/v2.2";

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const tokenAddress = url.searchParams.get("address");
    console.log("Token Address:", tokenAddress);

    if (!tokenAddress) {
      throw new Error("No token address provided");
    }

    const headers = new Headers({
      'Accept': 'application/json',
      'X-API-Key': API_KEY
    });

    // Fetch token metadata to get block number
    const get_metadata = await fetch(`${baseURL}/erc20/metadata?addresses=${tokenAddress}`, {
      method: 'GET',
      headers: headers
    });

    if (!get_metadata.ok) {
      const message = await get_metadata.text();
      console.error("Error fetching token metadata:", message);
      throw new Error(`Error fetching token metadata: ${get_metadata.statusText} - ${message}`);
    }

    let tokenMetadata = await get_metadata.json();
    const blockNumber = tokenMetadata[0]?.block_number;
    console.log("Block Number:", blockNumber);

    if (!blockNumber) {
      throw new Error("Block number not found in token metadata");
    }

    // Fetch block data using block number
    const blockResponse = await fetch(`https://deep-index.moralis.io/api/v2.2/block/${blockNumber}`, {
      method: 'GET',
      headers: headers
    });

    if (!blockResponse.ok) {
      const message = await blockResponse.text();
      console.error("Error fetching block data:", message);
      throw new Error(`Error fetching block data: ${blockResponse.statusText} - ${message}`);
    }

    const blockCreated = await blockResponse.json();
    const transactions = blockCreated.transactions;
    console.log("Transactions:", transactions);

    return json({ transactions });

  } catch (e) {
    if (e instanceof Error) {
      console.error("Error in loader:", e.message);
      if (e.message.includes("Validation service blocked")) {
        return json({ error: "Has alcanzado el límite diario de tu plan gratuito en Moralis. Por favor, actualiza tu plan." }, { status: 403 });
      }
      return json({ error: e.message }, { status: 500 });
    } else {
      console.error("Unknown error in loader");
      return json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
};
