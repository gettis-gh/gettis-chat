// ws/handler/message.js

import { handleNewMessage } from "./newMessage.js";
import { handleGetMessages } from "./getMessages.js";

export async function handleMessage(ws, rawData, context) {
    const { wss, messages, username } = context;

    let message;
    try {
        message = JSON.parse(rawData);
    } catch (err) {
        return ws.send(JSON.stringify({
            type: 'error',
            content: 'Invalid JSON format.'
        }));
    }

    switch (message.type) {
        case "new-message": {
            await handleNewMessage({ message, username, messages, wss });
            break;
        }

        case "get-messages": {
            const amount = message.content.amount ?? 20;
            await handleGetMessages({ amount, ws });
            break;
        }

        default:
            ws.send(JSON.stringify({
                type: "error",
                content: `Unknown message type: ${message.type}`
            }));
            break;
    }
}
