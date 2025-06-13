import { renderMessages } from "./msgManager.js";

  export class ChatSocket {
    constructor(url) {
      this.url = url;
      this.socket = new WebSocket(url);
  
      this.handlers = new Map(); // Manejadores por tipo
  
      this.socket.addEventListener('open', this.onOpen.bind(this));
      this.socket.addEventListener('message', this.onMessage.bind(this));
      this.socket.addEventListener('close', this.onClose.bind(this));
      this.socket.addEventListener('error', this.onError.bind(this));
    }
  
    // Registrar un handler para un tipo de mensaje
    on(type, handler) {
      this.handlers.set(type, handler);
    }
  
    onOpen() {
      console.log('Socket conectado');
    }
  
    onMessage(event) {
      try {
        const message = JSON.parse(event.data);
        const handler = this.handlers.get(message.type);
  
        if (handler) {
          handler(message.content, message);
        } else {
          console.warn('Sin handler para mensaje tipo:', message.type, message);
        }
      } catch (err) {
        console.error("Error parsing message", event.data, err);
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