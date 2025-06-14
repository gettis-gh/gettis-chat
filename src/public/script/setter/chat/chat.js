import { createIdentifyDialog } from "../../../component/identify.js";

import { fetchGetin } from "../../fetcher/auth/getin.js";

import { 
    getCookie, 
    startChat, 
    handleTextareaKeydown 
} from "../../helper/index.js";

import { handleClick, handleMouseout, handleMousover } from "../../handler/chat/messageEvents.js";
import { handleHotkey } from "../../handler/chat/hotkeys.js";

export function setupMessageEvents() {
    const messageContainer = document.getElementById('message-container');
    messageContainer.addEventListener('click', handleClick);
    messageContainer.addEventListener('mouseover', handleMousover);
    messageContainer.addEventListener('mouseout', handleMouseout);
}

export function setupTypingToolbox() {
    const textarea = document.getElementById('message-input');
    if (textarea) {
        textarea.addEventListener('keydown', handleTextareaKeydown);
    }
}

export function setupChatHotkeys() {
    const pressedKeys = new Map();

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        pressedKeys.set(key, true);
        handleHotkey(pressedKeys);
    });

    document.addEventListener('keyup', (event) => {
        const key = event.key;
        pressedKeys.delete(key);
    });
}

export async function initChat() {
    createIdentifyDialog(async (username) => {
        if (!username) {
            return console.error("You must provide an username.");
        }

        await fetchGetin(username);
    
        const userCookie = getCookie('user');
        const user = userCookie ? JSON.parse(userCookie) : null;
        const userId = user.userId;
        startChat(userId);
    });
}