import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useEventSource } from "remix-utils/sse/react";
import { getMessagesTraders } from "~/utils/queries";

export const loader: LoaderFunction = async () => {
  const messages = await getMessagesTraders();
  return json({ messages });
};

const parseMessage = (message: any) => {
  return {
    alert: message.alert,
    chain: message.chain,
    swapped: message.swapped,
    from: message.from,
    to: message.to,
    netWorth: message.netWorth,
    transactionHash: message.transactionHash
  };
};

const getExplorerLink = (chainId, transactionHash) => {
  const explorers = {
    "Ethereum Mainnet": `https://etherscan.io/tx/${transactionHash}`,
    "Avalanche Mainnet": `https://snowtrace.io/tx/${transactionHash}`,
    "Fantom Opera": `https://ftmscan.com/tx/${transactionHash}`,
    "Cronos Mainnet": `https://cronoscan.com/tx/${transactionHash}`,
    "Arbitrum One": `https://arbiscan.io/tx/${transactionHash}`,
    "Binance Smart Chain": `https://bscscan.com/tx/${transactionHash}`,
    "Linea": `https://explorer.linea.build/tx/${transactionHash}`,
    "Base Network": `https://basescan.org/tx/${transactionHash}`,
    "Optimism": `https://optimistic.etherscan.io/tx/${transactionHash}`,
    "Polygon": `https://polygonscan.com/tx/${transactionHash}`
  };
  return explorers[chainId] || "#";
};

export default function WhaleSignals() {
  const { messages: initialMessages } = useLoaderData<{ messages: any[] }>();
  const [messages, setMessages] = useState(initialMessages);
  const liveResponse = useEventSource(`https://crypto-ghost.fly.dev/api/subscribetraders`, { event: "new-message" });

  useEffect(() => {
    if (liveResponse) {
      try {
        const parsedLiveResponse = JSON.parse(liveResponse);
        if (parsedLiveResponse.message) {
          const message = JSON.parse(parsedLiveResponse.message);
          setMessages(prevMessages => [...prevMessages, message]);
        } else {
          console.error("Received message with missing fields:", parsedLiveResponse);
        }
      } catch (error) {
        console.error("Failed to parse live response:", error);
      }
    }
  }, [liveResponse]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Traders Signals</h1>
      <div className="space-y-4 h-96 p-10 overflow-x-hidden overflow-y-scroll">
        {messages.map((message, index) => {
          const parsedMessage = parseMessage(JSON.parse(message));
          const explorerLink = getExplorerLink(parsedMessage.chain, parsedMessage.transactionHash);
          return (
            <div
              key={index}
              className="bg-gradient-to-b from-[#043234] to-[#000D0E] text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-600"
            >
              <div className="text-xl mb-2 font-bold">
                {parsedMessage.alert}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">Swapped:</span> {parsedMessage.swapped}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">From:</span> {parsedMessage.from}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">To:</span> {parsedMessage.to}
              </div>
              <div className="text-lg mb-2">
                <span className="font-semibold">Net Worth Of Address:</span> {parsedMessage.netWorth}
              </div>
              
              <div className="text-lg mb-2">
                <span className="font-semibold">Trasaction link:</span> {parsedMessage.transactionHash}
              </div>
              <div className="text-lg">
                <a href={explorerLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                  View Transaction
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
