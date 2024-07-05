import { json, ActionFunctionArgs } from "@remix-run/node";
import Moralis from "moralis";
import { emitter } from "~/services/emitter.server";
;


const moralisAPIKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImYyNjgyOTVlLTU1NDYtNDk2MS05NTkyLTUzZjE4MjQ0OWNlNSIsIm9yZ0lkIjoiMzkwMDMzIiwidXNlcklkIjoiNDAwNzgzIiwidHlwZUlkIjoiODQ3ZTY2MzQtNzJkMC00OWFmLTlmZGItMzBkODk1NDExZGNmIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3MTQzMzc1ODMsImV4cCI6NDg3MDA5NzU4M30.cGaFQZm7vkjGKbTQbxhrL-EKXu8QETo33KZ7AnE98qo";



// Funciones existentes de Moralis
export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("Received request");

  if (request.method !== "POST") {
    console.log("Method not allowed");
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  if (!Moralis.Core.isStarted) {
    console.log("Starting Moralis");
    await Moralis.start({ apiKey: moralisAPIKey });
  }

  try {
    const webhookBody = await request.json();
    console.log("Webhook Streaming");

    if (webhookBody.logs.length > 0 && !webhookBody.confirmed) {
      console.log("Processing logs");

      const decodedLogs = Moralis.Streams.parsedLogs(webhookBody);

      const addresses = getInvolvedAddresses(webhookBody.logs);

      const fromData = getFromData(webhookBody.erc20Transfers, addresses);
      const toData = getToData(webhookBody.erc20Transfers, addresses);

      for (const address of addresses) {
        console.log("Processing address:", address);
        await checkAndSendSwapHook(address, fromData[address], toData[address], webhookBody.chainId, webhookBody.transactionHash);
      }
    }
    return json({ status: "ok" }, { status: 200 });
  } catch (error) {
    console.error('Error handling webhook:', error);
    return json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function checkAndSendSwapHook(address, fromData, toData, chainId, transactionHash) {
  if (
    fromData.length === 1 && fromData[0].tokenName && fromData[0].value && fromData[0].to !== null && fromData[0].to !== "0x0000000000000000000000000000000000000000"
    && toData.length === 1 && toData[0].tokenName && toData[0].from !== null && toData[0].from !== "0x0000000000000000000000000000000000000000"
  ) {
    console.log("Valid data for net worth check");

    const response = await Moralis.EvmApi.wallets.getWalletNetWorth({
      chains: [chainId],
      address: address,
      excludeSpam: true,
      excludeUnverifiedContracts: true,
    });

    let netWorth = response.toJSON();

    console.log("Net worth in USD:", netWorth.total_networth_usd);

    await sendHook(address, fromData[0], toData[0], netWorth.total_networth_usd, chainId, transactionHash);
  } else {
    console.log("Invalid data or volume less than 50,000 USD, skipping net worth check");
  }
}

async function sendHook(address, fromTransfer, toTransfer, netWorth, chainId, transactionHash) {
  const chainName = getChainName(chainId);
  const explorerUrl = getExplorerUrl(chainId);
  const message = `🐋🐋🐋 *Whale alert* \n\n📍 *Address:* [${address}](${explorerUrl}/address/${address}) on *${chainName}* \n\n🔥 *Swapped:* \n   ${fromTransfer.valueWithDecimals} ${fromTransfer.tokenSymbol} (From: [${fromTransfer.to}](${explorerUrl}/address/${fromTransfer.from})) \n   ➡️ ${toTransfer.valueWithDecimals} ${toTransfer.tokenSymbol} (To: [${toTransfer.from}](${explorerUrl}/address/${toTransfer.to})) \n\n💰 *Net Worth:* ${netWorth} USD \n(${explorerUrl}/tx/${transactionHash})`;
  emitter.emit("alert", 
     message,
  );
}

function getInvolvedAddresses(logs) {
  const addresses = logs.reduce((acc, log) => {
    if (log.triggered_by) {
      acc.push(...log.triggered_by);
    }
    return acc;
  }, []);
  return [...new Set(addresses)];
}

function getFromData(transfers, addresses) {
  const results = {};
  addresses.forEach(address => {
    results[address.toLowerCase()] = transfers.filter(
      transfer => transfer.from.toLowerCase() === address.toLowerCase()
    );
  });
  return results;
}

function getToData(transfers, addresses) {
  const results = {};
  addresses.forEach(address => {
    results[address.toLowerCase()] = transfers.filter(
      transfer => transfer.to.toLowerCase() === address.toLowerCase()
    );
  });
  return results;
}

function getChainName(chainId) {
  const chainNames = {
    "0x1": "Ethereum Mainnet",
    "0x89": "Polygon Mainnet",
    "0x38": "BSC Mainnet",
    "0xa86a": "Avalanche Mainnet",
    "0xfa": "Fantom Opera",
    "0x19": "Cronos Mainnet",
    "0xa4b1": "Arbitrum One",
    "0x64": "xDai",
    "0x2105": "Step Network",
    "0xa": "Optimism",
    "0xe705": "Milkomeda Mainnet"
  };
  return chainNames[chainId] || "Unknown Chain";
}

function getExplorerUrl(chainId) {
  const explorerUrls = {
    "0x1": "https://etherscan.io",
    "0x89": "https://polygonscan.com",
    "0x38": "https://bscscan.com",
    "0xa86a": "https://snowtrace.io",
    "0xfa": "https://ftmscan.com",
    "0x19": "https://cronoscan.com",
    "0xa4b1": "https://arbiscan.io",
    "0x64": "https://blockscout.com/xdai/mainnet",
    "0x2105": "https://explorer.step.network",
    "0xa": "https://optimistic.etherscan.io",
    "0xe705": "https://explorer-mainnet-cardano-evm.c1.milkomeda.com"
  };
  return explorerUrls[chainId] || "https://etherscan.io";
}
