import { useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from "@remix-run/node";
import { useEffect, useState } from "react";
import { useEventSource } from "remix-utils/sse/react";
import { getMessagesTraders } from "~/utils/queries";

export const loader: LoaderFunction = async () => {
  const messages = await getMessagesTraders();
  return json({ messages });
};

// Función para parsear los mensajes
const parseMessage = (message: string) => {
  try {
    const [header, swapDetails, netWorth] = message.split('\n\n');
    if (!header || !swapDetails || !netWorth) throw new Error("Incomplete message");

    const [alert, chain] = header.split(' on ');
    const swappedRegex = /Swapped: (.+) From:/;
    const fromRegex = /From: (.+) To:/;
    const toRegex = /To: (.+) Net Worth/;
    const netWorthRegex = /Net Worth Of Address: (.+)/;

    const swapped = swapDetails.match(swappedRegex)?.[1];
    const from = swapDetails.match(fromRegex)?.[1];
    const to = swapDetails.match(toRegex)?.[1];
    const netWorthValue = netWorth.match(netWorthRegex)?.[1];

    if (!alert || !chain || !swapped || !from || !to || !netWorthValue) throw new Error("Message details are missing");

    return {
      alert,
      chain,
      swapped,
      from,
      to,
      netWorth: netWorthValue
    };
  } catch (error) {
    console.error("Failed to parse message:", message, error);
    return null;
  }
};

export default function WhaleSignals() {
  const { messages: initialMessages } = useLoaderData<{ messages: any[] }>();
  console.log("initialMessages  "+JSON.stringify(initialMessages))

  const [messages, setMessages] = useState(initialMessages);
  const liveResponse = useEventSource(`https://crypto-ghost.fly.dev/api/subscribetraders`, { event: "new-message" });

  useEffect(() => {
    if (liveResponse) {
      try {
        const message = JSON.parse(liveResponse);
        if (message) {
          setMessages(prevMessages => [...prevMessages, message]);
        } else {
          console.error("Received message with missing fields:", message);
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
          const parsedMessage = parseMessage(message);
          if (!parsedMessage) {
            return (
              <div
                key={index}
                className="bg-gradient-to-b from-[#043234] to-[#000D0E] text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-600"
              >
                <div className="text-xl mb-2 font-bold">
                  Message format is incorrect
                </div>
              </div>
            );
          }
          return (
            <div
              key={index}
              className="bg-gradient-to-b from-[#043234] to-[#000D0E] text-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl border border-gray-600"
            >
              <div className="text-xl mb-2 font-bold">
                {parsedMessage.alert} on {parsedMessage.chain}
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
              <div className="text-lg">
                <span className="font-semibold">Net Worth Of Address:</span> {parsedMessage.netWorth}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
