import { createMessage } from "../../../controller/message.controller.js";

export async function handleNewMessage({ message, username, messages, wss }) {

    const now = new Date();
    const timestamp = now.toISOString();

    const userMessage = message.content.message;

    const messageToCreate = {
        content: userMessage.content,
        metadata: {
            ...userMessage.metadata,
            author: username,
            timestamp
        }
    };

    const result = await createMessage(messageToCreate);

    if (result.error) {
        console.error("Error saving message:", [result, messageToCreate]);
        return;
    }

    const alert = JSON.stringify({
        type: "alert",
        content: "new-message"
    });

    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(alert);
        }
    });
}
