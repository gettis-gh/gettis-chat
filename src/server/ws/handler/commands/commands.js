import { deleteMessageTree, deleteMessage, deleteAllMessages, replaceMessage, createMessage } from "../../../../controller/message.controller.js";
import { broadcastAlert } from "./helper.js";

const helpTypes = {
    command: {
        summary: "Lista de comandos disponibles que puedes ejecutar como respuestas a mensajes.",
        full: () => Object.entries(commandHandlers)
            .map(([cmd, data]) => `${cmd} — ${data.description}`)
            .join("\n")
    },
    url: {
        summary: "Usa `url()` para mostrar imágenes o videos desde un enlace directo.",
        full: () => `
Puedes usar \`url()\` para incrustar multimedia directamente. Solo necesitas colocar una URL directa a una imagen o video.

Formatos soportados:
  Imágenes: .jpg, .jpeg, .png, .gif, .webp
  Videos: .mp4
`.trim()
    },
    default: {
        summary: "Resumen de modos de ayuda disponibles.",
        full: () => {
            return Object.entries(helpTypes)
                .filter(([key]) => key !== "default")
                .map(([key, data]) => `/help ${key} — ${data.summary}`)
                .join("\n");
        }
    }
};

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
        description: "Muestra la ayuda disponible. Usa '/help command' o '/help url'",
        handler: async ({ message, wss }) => {
            const contentRaw = message.content.trim();
            const parts = contentRaw.split(/\s+/); // ['/help', 'command']
            const type = parts[1]?.toLowerCase() || "default";

            const helpEntry = helpTypes[type] || helpTypes.default;

            const helpText = typeof helpEntry.full === "function" 
                ? helpEntry.full() 
                : String(helpEntry.full);

            const now = new Date();
            const timestamp = now.toISOString();

            const messageToCreate = {
                content: helpText,
                metadata: {
                    type: "text",
                    parentId: message.metadata.parentId,
                    author: "SYSTEM",
                    timestamp
                }
            };

            const result = await createMessage(messageToCreate);
            if (!result.error) broadcastAlert(wss, "updated-messages");
        }
    }
};