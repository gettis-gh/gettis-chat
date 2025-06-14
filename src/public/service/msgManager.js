import { createMessage } from "../../component/message.js";

// Helper: Construye el árbol jerárquico de mensajes a partir del listado plano
function buildMessageTree(messages) {
  const map = new Map();
  const roots = [];

  messages.forEach(msg => {
    // Asignamos un id para acceso más cómodo; asumo que está en metadata.id
    const id = msg.metadata.id;
    map.set(id, { ...msg, replies: [] });
  });

  messages.forEach(msg => {
    const parentId = msg.metadata.parentId;
    const id = msg.metadata.id;
    const mappedMsg = map.get(id);

    if (parentId && map.has(parentId)) {
      map.get(parentId).replies.push(mappedMsg);
    } else {
      roots.push(mappedMsg);
    }
  });

  return roots;
}

// Helper: Renderiza recursivamente el árbol de mensajes
function renderMessageTree(messageTree, container) {
  messageTree.forEach(msg => {
    const displayConfig = {
      author: 'highlight',
      time: 'dim',
      id: 'hide',
      parentId: 'hide'
    };

    const msgElement = createMessage(msg.message, msg.metadata, displayConfig);

    // Contenedor para las respuestas (hijos)
    const repliesContainer = document.createElement('div');
    repliesContainer.classList.add('replies-container');

    if (msg.replies.length > 0) {
      renderMessageTree(msg.replies, repliesContainer);
    }

    msgElement.appendChild(repliesContainer);
    container.appendChild(msgElement);
  });
}

// Función principal, llamada desde fuera
export function renderMessages(messagesList, messageContainer) {
  messageContainer.innerHTML = '';

  // Construimos el árbol jerárquico
  const tree = buildMessageTree(messagesList);

  // Renderizamos el árbol
  renderMessageTree(tree, messageContainer);
}
