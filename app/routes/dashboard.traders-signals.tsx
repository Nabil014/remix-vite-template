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
    address: message.address,
    alert: message.alert,
    chain: message.chain,
    swapped: message.swapped,
    from: message.from,
    to: message.to,
    netWorth: message.netWorth,
    transactionHash: message.transactionHash
  };
};

const getExplorerLink = (chain, transactionHash) => {
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
  return explorers[chain] || "#";
};

export default function TradeSignals() {
  const { messages: initialMessages } = useLoaderData<{ messages: any[] }>();
  const [messages, setMessages] = useState(initialMessages);
  const liveResponse = useEventSource(`https://crypto-ghost.fly.dev/api/subscribetraders`, { event: "new-message" });

  useEffect(() => {
    if (liveResponse) {
      console.log("liveResponse "+liveResponse)
      try {
        const parsedLiveResponse = JSON.parse(liveResponse);
        if (parsedLiveResponse) {
          const message = parsedLiveResponse; // No parsear nuevamente
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
    <div className="p-4 h-screen w-screen ">
      <h1 className="text-3xl font-bold text-white mb-6">Traders Signals</h1>
      <div className="space-y-6">
        {messages.map((message, index) => {
          const parsedMessage = parseMessage(message);
          const explorerLink = getExplorerLink(parsedMessage.chain, parsedMessage.transactionHash);
          return (
            <div
              key={index}
              className="bg-gradient-to-b from-[#043234] to-[#000D0E] text-white p-6 rounded-lg shadow-lg border border-gray-700 hover:shadow-2xl transition-transform"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-xl font-bold">{parsedMessage.alert}</div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">{parsedMessage.chain}</div>
                  <div className="text-lg font-semibold">{parsedMessage.netWorth} USD</div>
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <span className="font-semibold">Trader:</span> {parsedMessage.address}
                </div>
                <div>
                  <span className="font-semibold">Swapped:</span> {parsedMessage.swapped}
                </div>
                <div>
                  <span className="font-semibold">From:</span> {parsedMessage.from}
                </div>
                <div>
                  <span className="font-semibold">To:</span> {parsedMessage.to}
                </div>
                <div className="text-right mt-4">
                  <a href={explorerLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    View Transaction
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
