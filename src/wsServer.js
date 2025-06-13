import { WebSocketServer } from "ws";
import url from 'url';
import { findUsernameByUserId } from "./controller/user.controller.js";

export function createWebSocketServer(httpServer) {
    const wss = new WebSocketServer({ server: httpServer });
    const messages = [];

    wss.on('connection', async (ws, req) => {
        const {userId} = url.parse(req.url, true).query;
        const usernameRes = await findUsernameByUserId(userId);
        const username = usernameRes.attachData.username;
        console.log(JSON.stringify(username));

        ws.on('message', (data) => {
            const rawMessage = data.toString();
            
            try {
                const message = JSON.parse(rawMessage);

                switch (message.type) {
                    case "new-message":
                        const userMessage = message.content;

                        const now = new Date();
                        const hour = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        const messageToSave = {
                            message: userMessage.text,
                            metadata: {
                                author: `[${username}]`,
                                time: `@${hour}`
                            }
                        };
                 
                        messages.push(messageToSave);

                        const responseMessage = JSON.stringify({
                            type: "alert",
                            content: "new-message"
                        });
                        wss.clients.forEach(client => {
                            if (client.readyState === client.OPEN) {
                                client.send(responseMessage);
                            }
                        });
                        break;

                    case "get-messages":
                        const query = message.content;

                        const resMessages = messages.slice(-Math.min(messages.length, query.amount));

                        const response = JSON.stringify({
                            type: "return-messages",
                            content: resMessages
                        });
                        ws.send(response);
                        break;

                    case "load-profile":
                        console.log("cargando perfil de manera maravillosa");
                        break;

                    default:
                        break;
                }
            } catch (error) {
                const response = { reply: 'Error trying to parse.', original: rawMessage };
                ws.send(JSON.stringify(response));
            }   
        });
    });

    return wss;
}