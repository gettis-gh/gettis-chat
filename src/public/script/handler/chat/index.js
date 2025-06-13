import {addMessage} from "../../../service/msgManager.js";

export function addMsgHandler(event) {
    event.preventDefault();
  
    const input = document.getElementById('message-input');
    const message = input.value.trim();
  
    if (message === '') return; // Evitar mensajes vacíos
  
    // Metadatos fijos
    const metadata = {
      author: "[Melooo]",
      time: `@${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
    };
  
    const displayConfig = {
      author: "highlight",
      time: "dim",
    };
  
    // Crear y agregar el mensaje usando addMessage
    addMessage(message, metadata, displayConfig);
  
    // Limpiar el input
    input.value = '';
  }