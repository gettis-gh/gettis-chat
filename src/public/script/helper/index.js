import { 
    createSocket, 
    handleReceivedMessages, 
    handleSendMessage, 
    handleServerAlert, 
    handleServerReady 
} from "./chat.js";

export const keydownHandler = {
    Tab: (e, textarea) => {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const tabCharacter = '\t';
        textarea.value = textarea.value.substring(0, start) + tabCharacter + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + tabCharacter.length;
    },
    Enter: (e, textarea) => {
        if (!e.shiftKey) {
            e.preventDefault();
            document.getElementById('send-button')?.click();
        }
    }  
};

export function startChat(userId) {
    const socket = createSocket(userId);
    window.socket = socket;
    socket.on("ready", handleServerReady);
    socket.on("alert", handleServerAlert);
    socket.on("return-messages", handleReceivedMessages);

    document.getElementById("send-button").addEventListener("click", handleSendMessage);
}

export function getCookie(name) {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
};

export function handleTextareaKeydown(event) {
    const textarea = event.target;
    const handler = keydownHandler[event.key];
    if (handler) {
        handler(event, textarea);
    }
}