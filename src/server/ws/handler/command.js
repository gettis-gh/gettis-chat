import { deleteMessageTree, deleteMessage, deleteAllMessages, replaceMessage } from "../../../controller/message.controller.js";

function splitCommand(command) {
    const split = command.split(" ");
    return split;
}

export async function handleCommand({message, wss}) {
    const messageFirstWord = message.content.split(" ")[0];

    switch (messageFirstWord) {
        case "/del":
            try {
                const messageId = message.metadata.parentId;
                const result = await deleteMessage(messageId);
                if (result.error) {
                    console.error("Error deleting message: ", [result, messageId, message.content, message]);
                    return;
                }
                const alert = JSON.stringify({
                    type: "alert",
                    content: "updated-messages"
                });
            
                wss.clients.forEach(client => {
                    if (client.readyState === client.OPEN) {
                        client.send(alert);
                    }
                });
            } catch (error) {
                console.error("Error deleting message: ", error.message);
            }
            break;

        case "/deltree":
            try {
                const messageId = message.metadata.parentId;
                const result = await deleteMessageTree(messageId);
                if (result.error) {
                    console.error("Error deleting message: ", [result, messageId, message.content, message]);
                    return;
                }
                const alert = JSON.stringify({
                    type: "alert",
                    content: "updated-messages"
                });
            
                wss.clients.forEach(client => {
                    if (client.readyState === client.OPEN) {
                        client.send(alert);
                    }
                });
            } catch (error) {
                console.error("Error deleting message: ", error.message);
            }
            break;

            case "/clear":
                try {
                    const messageId = message.metadata.parentId;
                    const result = await deleteAllMessages(messageId);
                    if (result.error) {
                        console.error("Error deleting message: ", [result, messageId, message.content, message]);
                        return;
                    }
                    const alert = JSON.stringify({
                        type: "alert",
                        content: "updated-messages"
                    });
                
                    wss.clients.forEach(client => {
                        if (client.readyState === client.OPEN) {
                            client.send(alert);
                        }
                    });
                } catch (error) {
                    console.error("Error deleting all messages: ", error.message);
                }
                break;

                case "/replace":
                    try {
                        const messageId = message.metadata.parentId;
                        const newContent = message.content.split(" ")[1];

                        const result = await replaceMessage({messageId, newContent});
                        if (result.error) {
                            console.error("Error replacing message: ", [result, messageId, message.content, message]);
                            return;
                        }
                        const alert = JSON.stringify({
                            type: "alert",
                            content: "updated-messages"
                        });
                    
                        wss.clients.forEach(client => {
                            if (client.readyState === client.OPEN) {
                                client.send(alert);
                            }
                        });
                    } catch (error) {
                        console.error("Error deleting message: ", error.message);
                    }
                    break;

        default:
            console.error("Unknown command: ", message.content);
            break;
    }
}