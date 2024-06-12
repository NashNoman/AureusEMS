import querystring from "querystring";

type WebSocketData = {
  "?userId": string;
  role: string;
  exam?: string;
};

Bun.serve<WebSocketData>({
  port: 3001,
  fetch(req, server) {
    const params = getRequestParams(req);
    const success = server.upgrade(req, { data: params });

    return success
      ? undefined
      : new Response("Couldn't initiate WebSocket connection.", {
          status: 500,
        });
  },
  websocket: {
    open(ws) {
      ws.subscribe(ws.data["?userId"]);
    },
    message(ws, msg) {
      const data = JSON.parse(msg as string);
      ws.publish(data["instructorId"], data["message"]);
    },
    close(ws) {
      ws.unsubscribe(ws.data["?userId"]);
    },
  },
});

const getRequestParams = (req: Request) => {
  const parsedUrl = new URL(req.url);
  const query = querystring.parse(parsedUrl.search);
  return query;
};
