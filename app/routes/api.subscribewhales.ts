import { emitter } from "~/services/emitterwhales.server";
import { eventStream } from "remix-utils/sse/server";

export async function loader({ request }: any) {
  return eventStream(request.signal, (send) => {
    function handle(message:string) {
      send({ event: "new-message", data: message});
    }

    emitter.on("message", handle);

    return function clear() {
      emitter.off("message", handle);
    };
  });
}