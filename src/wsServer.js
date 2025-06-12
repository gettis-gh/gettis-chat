import { WebSocketServer } from "ws";

export function createWebSocketServer(httpServer) {
    const wss = new WebSocketServer({ server: httpServer });

    wss.on('connection', (ws) => {
        ws.on('message', (data) => {
            const message = data.toString();

            if (message === "ping") {
                ws.send("pong!");
            } else {
                ws.send(`Echo: ${message}`);

                wss.clients.forEach(client => {
                    if (client.readyState === client.OPEN) {
                        client.send(`new-message`);
                    }
                });
            }
        });
    });

    return wss;
}