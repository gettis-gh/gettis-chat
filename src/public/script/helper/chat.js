import { renderMessages } from "../../service/msgManager.js";
import { ChatSocket } from "../../service/socketManager.js";

export function createSocket(userId) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const socketUrl = `${protocol}//${host}`;
    return new ChatSocket(`${socketUrl}?userId=${userId}`);
}

export function handleServerReady() {
    window.socket.send({ type: "get-messages", content: { amount: 50 } });
}

export function handleServerAlert(content) {
    switch (content) {
        case "updated-messages":
            window.socket.send({ type: "get-messages", content: { amount: 50 } });
            break;
        default:
            break;
    }
}

export function formatMessageList(rawMessages) {
    return rawMessages.map(msg => {
      const localTime = new Date(msg.timestamp)
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .replace(/\s/g, '');
  
      return {
        message: msg.content,
        metadata: {
          id: msg.id,
          author: `[${msg.author}]`,
          time: `@${localTime}`,
          parentId: msg.parentId || null,
        },
      };
    });
  }

export function handleReceivedMessages(rawMsgList) {
    const formattedMsgList = formatMessageList(rawMsgList);

    renderMessages(formattedMsgList, document.getElementById("message-container"));

    const container = document.getElementById("message-container");
    container.scrollTop = container.scrollHeight;
}

export function handleSendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById("message-input");
    const content = input.value.trim();
    if (content === "") return;

    socket.send({
        type: "new-message",
        content: { 
            message: {
                content,
                metadata: {
                    type: "text",
                    parentId: window.replyTarget
                }
            }
        },
    });

    input.value = "";
}