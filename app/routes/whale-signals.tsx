import { useEffect } from "react";
import { useEventSource } from "remix-utils/sse/react";

export default function WhaleSignals() {
  const liveResponse = useEventSource(`http://localhost:3000/api/subscribe`, { event: "new-message" });

  useEffect(() => {
    if (liveResponse) {
      const message = JSON.parse(liveResponse);
console.log(JSON.stringify(message))
    }
  }, [liveResponse]);
  return (
    <div>
      <h1>Whale Signals</h1>
    </div>
  )
}
