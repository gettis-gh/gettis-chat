import { ChatSocket } from '../../../service/socketManager.js';

const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const host = window.location.host; // incluye host:puerto
const socketUrl = `${protocol}//${host}`;

const socket = new ChatSocket(socketUrl);

socket.onMessage = function (event) {
    const message = JSON.parse(event.data);
  
    switch (message.type) {
        case "alert":
        if (message.content === "new-message") {
            socket.send(JSON.stringify({
            type: "get-messages",
            content: { amount: 50 }
            }));
        }
        break;
  
      case "return-messages":
        renderMessages(message.content, document.getElementById("message-container"));
        break;
  
      default:
        console.warn("Unknown message type:", message);
    }
  };

  document.getElementById("send-button").addEventListener("click", (event) => {
    event.preventDefault();
  
    const input = document.getElementById("message-input");
    const content = input.value.trim();
  
    if (content === "") return;
  
    // Enviamos el mensaje al servidor
    socket.send({
      type: "new-message",
      content: { text: content }, // puedes ajustar estructura
    });
  
    input.value = "";
  });
  