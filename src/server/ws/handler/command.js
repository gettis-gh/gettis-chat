import { commandHandlers } from "./commands/commands.js";

export async function handleCommand({ message, wss }) {
    const commandName = message.content.split(" ")[0];

    const command = commandHandlers[commandName];
    if (!command) {
        console.error("Unknown command: ", message.content);
        return;
    }

    try {
        await command.handler({ message, wss });
    } catch (error) {
        console.error(`Error running command ${commandName}:`, error.message);
    }
}
