import { WebSocketServer } from "ws";
import url from 'url';
import { findUsernameByUserId } from "../controller/user.controller.js";
import { handleMessage } from "./ws/handler/message.js";

export function createWebSocketServer(httpServer) {
    const wss = new WebSocketServer({ server: httpServer });
    const messages = [];

    wss.on('connection', async (ws, req) => {
        const { userId } = url.parse(req.url, true).query;

        if (!userId) {
            ws.close(1008, "Missing userId");
            return;
        }
        
        const usernameRes = await findUsernameByUserId(userId);
        const username = usernameRes.attachData.username;

        if (!username) {
            ws.close(1008, "User doesn't exist.");
            return;
        }

        const context = { wss, messages, username };
        
        ws.on('message', async (data) => {
            await handleMessage(ws, data, context);
        });

        ws.send(JSON.stringify({
            type: "ready"
        }));
    });

    return wss;
}