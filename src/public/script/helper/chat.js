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
      const metadata = msg.metadata || {};
      console.log(JSON.stringify(metadata, null, 2));
  
      const localTime = new Date(metadata.timestamp || Date.now())
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        .replace(/\s/g, '');
  
      return {
        message: msg.content,
        metadata: {
          ...metadata,
          id: msg.id,
          author: metadata.author ? `[${metadata.author}]` : undefined,
          timestamp: `@${localTime}`,
          parentId: metadata.parentId || null,
        },
      };
    });
  }
  

export function handleReceivedMessages(rawMsgList) {
    const formattedMsgList = formatMessageList(rawMsgList);
    
    window.messages = window.messages || {};

    for (const msg of formattedMsgList) {
        window.messages[msg.metadata.id] = msg;
    }

    renderMessages(formattedMsgList, document.getElementById("message-container"));

    const container = document.getElementById("message-container");
    container.scrollTop = container.scrollHeight;
}

export const macroHandlers = {
    "@metadata": {
        apply: (args, metadata) => {
            try {
                const cleanArgs = JSON.stringify(JSON.parse(args));
                const obj = JSON.parse(cleanArgs);
                return { ...metadata, ...obj };
            } catch (e) {
                console.warn("Error parsing @metadata macro", e);
                return metadata;
            }
        }
    },
}

export function processMessage(messageText) {
    let content = messageText;
    let metadata = {type:"text"};

    const macroRegex = /@(\w+)\(([\s\S]*?)\)/g;
    let match;

    while ((match = macroRegex.exec(messageText)) !== null) {
        const [fullMatch, macroName, args] = match;
        const handler = macroHandlers[`@${macroName}`];
        if (handler) {
            metadata = handler.apply(args, metadata);
            content = content.replace(fullMatch, '').trim();
        }
    }

    return { content, metadata };
}

export function handleSendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById("message-input");
    const message = input.value.trim();
    if (message === "") return;

    const {content, metadata} = processMessage(message);

    if (window.replyTarget) {
        metadata.parentId = window.replyTarget;
    }

    console.log(content, JSON.stringify(metadata));

    socket.send({
        type: "new-message",
        content: { 
            message: {
                content,
                metadata
            }
        },
    });

    input.value = "";
}