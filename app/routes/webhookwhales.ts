import { json, ActionFunctionArgs } from "@remix-run/node";
import Moralis from "moralis";
import { emitter } from "~/services/emittertraders.server";
import { createMessageTrader, createMessageWhale } from "~/utils/queries";

const moralisAPIKey = process.env.MORALIS_API_KEY;

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
    return json({ status: "ok", transactionHash: webhookBody.transactionHash }, { status: 200 });
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
    console.log("Invalid data");
  }
}
async function sendHook(address, fromTransfer, toTransfer, netWorth, chainId, transactionHash) {
  const chainName = getChainName(chainId);
  const currentTime = new Date().toISOString();

  const message = {
    alert: `Trader alert on ${chainName}`,
    chain: chainName,
    swapped: `${fromTransfer.valueWithDecimals} ${fromTransfer.tokenSymbol}`,
    from: fromTransfer.from,
    to: toTransfer.from,
    netWorth: `${netWorth} USD`,
    time: currentTime,
    transactionHash: transactionHash
  };

  await createMessageWhale(message, currentTime);
  emitter.emit("message", JSON.stringify(message));
  console.log("Sent message:", message);
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
    "0xa86a": "Avalanche Mainnet",
    "0xfa": "Fantom Opera",
    "0x19": "Cronos Mainnet",
    "0xa4b1": "Arbitrum One",
    "0x38": "Binance Smart Chain",
    "0xe708": "Linea",
    "0x2105": "Base Network",
    "0xa": "Optimism",
    "0x89": "Polygon"
  };
  return chainNames[chainId] || "Unknown Chain";
}
