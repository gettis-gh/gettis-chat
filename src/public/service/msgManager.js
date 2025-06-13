import { createMessage } from "../../component/message.js";

export function addMessage(message, metadata, displayConfig) {
    const msgContainer = document.getElementById('message-container');
    const msgElement = createMessage(message, metadata, displayConfig);
    msgContainer.appendChild(msgElement);
}

export function renderMessages(messagesList, messageContainer) {
    messageContainer.innerHTML = ''; // Limpiar el contenedor
  
    messagesList.forEach(({ message, metadata }) => {
      const displayConfig = {
        author: 'highlight',
        time: 'dim',
      };
  
      addMessage(message, metadata, displayConfig, messageContainer);
    });
}