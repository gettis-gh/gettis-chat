import { renderMessages } from "./msgManager.js";

export class ChatSocket {
    constructor(url) {
      this.url = url;
      this.socket = new WebSocket(url);
  
      this.socket.addEventListener('open', this.onOpen.bind(this));
      this.socket.addEventListener('message', this.onMessage.bind(this));
      this.socket.addEventListener('close', this.onClose.bind(this));
      this.socket.addEventListener('error', this.onError.bind(this));
    }
  
    onOpen(event) {
      console.log('Socket conectado');
      this.send({ type: 'init', user: 'melooo' });
    }
  
    onMessage(event) {
        const message = JSON.parse(event.data);
  
        switch (message.type) {
            case "alert":
            if (message.content === "new-message") {
                this.socket.send(JSON.stringify({
                type: "get-messages",
                content: { amount: 50 }
                }));
            }
            break;
      
          case "return-messages":
            renderMessages(message.content, document.getElementById("message-container"));
            break;
      
          default:
            console.warn("Mensaje desconocido:", message);
        }
    }
  
    onClose(event) {
      console.log('Socket cerrado', event);
    }
  
    onError(event) {
      console.error('Error de socket', event);
    }
  
    send(data) {
      const str = JSON.stringify(data);
      this.socket.send(str);
    }
  }
  