import { json, type LoaderFunction } from '@remix-run/server-runtime';
import Moralis from 'moralis';
import { ethers } from 'ethers';
  
const tokenDecimals:any = {
  '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359': 6, 
  '0x2791bca1f2de4661ed88a30c99a7a9449aa84174': 6, 

  
  '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063': 6, 
  '0xc2132D05D31c914a87C6611C10748AEb04B58e8F': 6, 
};

// A utility function to get the decimal count for a known token, defaulting to 18
function getTokenDecimals(address:string) {
  return tokenDecimals[address] || 18;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const account = url.searchParams.get("account");
  const currentDate = new Date();
  
  // Set the time range to one day ago
  const oneDayAgo = new Date();
  oneDayAgo.setDate(currentDate.getDate() - 1); // Subtract one day from the current date

  if (!account) {
    return new Response(JSON.stringify({ error: "Account parameter is required" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }

  try {
const response = await fetch('https://omni.icarus.tools/polygon/cush/trendingPools', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    params: [10]
  })
});

    if (!response.ok) {
      throw new Error(`Failed to fetch swaps: ${response.status}`);
    }
    const data = await response.json();

/* 
      const tokenTransfers = [];
      const response2 = await Moralis.EvmApi.transaction.getTransaction({
        chain: "0x89",
        transactionHash: data.result[0].txn
      });
      if (response2) {
        const logs = response2;
        console.log("logs", response2.toJSON().logs);

        const transfers = response2.toJSON().logs
          .filter(log => log.topic0 === ethers.id("Transfer(address,address,uint256)"))
          .map(log => {
            const tokenAddress = log.address; // Extract the token's contract address from the log
console.log("tokenAddress "+tokenAddress)
            const from = `0x${log.topic1.slice(26)}`;
            const to = `0x${log.topic2.slice(26)}`;
          
            const value = ethers.formatUnits(log.data, getTokenDecimals(tokenAddress)); // Assuming 18 decimals for ERC-20 token
            return { from, to, value: `${value} ETH` };
          });
        tokenTransfers.push(...transfers);
      }
      console.log("tokenTransfers", tokenTransfers);

 */
console.log("data "+JSON.stringify(data))
    return json(data.result);
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
    return json({ error: error.message }, { status: 500 });
  }
};