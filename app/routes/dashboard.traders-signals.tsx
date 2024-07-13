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
    netWorth: message.netWorth
  };
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
          const parsedMessage = parseMessage(message);
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
