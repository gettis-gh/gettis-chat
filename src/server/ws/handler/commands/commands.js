import { deleteMessageTree, deleteMessage, deleteAllMessages, replaceMessage, createMessage } from "../../../../controller/message.controller.js";
import { broadcastAlert } from "./helper.js";

export const commandHandlers = {
    "/del": {
        description: "Elimina un mensaje individual (usa parentId del mensaje)",
        handler: async ({ message, wss }) => {
            const messageId = message.metadata.parentId;
            const result = await deleteMessage(messageId);
            if (!result.error) broadcastAlert(wss, "updated-messages");
        }
    },

    "/deltree": {
        description: "Elimina un mensaje y todos sus hijos",
        handler: async ({ message, wss }) => {
            const messageId = message.metadata.parentId;
            const result = await deleteMessageTree(messageId);
            if (!result.error) broadcastAlert(wss, "updated-messages");
        }
    },

    "/clear": {
        description: "Elimina todos los mensajes del thread",
        handler: async ({ message, wss }) => {
            const messageId = message.metadata.parentId;
            const result = await deleteAllMessages(messageId);
            if (!result.error) broadcastAlert(wss, "updated-messages");
        }
    },

    "/replace": {
        description: "Reemplaza el mensaje original con un nuevo contenido",
        handler: async ({ message, wss }) => {
            const messageId = message.metadata.parentId;
            const newContent = message.content.split(" ").slice(1).join(" ");
            const result = await replaceMessage({ messageId, newContent });
            if (!result.error) broadcastAlert(wss, "updated-messages");
        }
    },

    "/help": {
        description: "Muestra la lista de comandos disponibles",
        handler: async ({ message, wss }) => {
            const helpText = Object.entries(commandHandlers)
                .map(([cmd, data]) => `${cmd} — ${data.description}`)
                .join("\n");

            const now = new Date();
            const timestamp = now.toISOString();
            const messageToCreate = {
                content: helpText,
                metadata: {
                    type: "text",
                    parentId: message.metadata.parentId,
                    author: "system",
                    timestamp
                }
            };

            const result = await createMessage(messageToCreate);
            if (!result.error) broadcastAlert(wss, "updated-messages");
        }
    }
};
