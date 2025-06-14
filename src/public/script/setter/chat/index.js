import { createIdentifyDialog } from '../../../component/identify.js';
import { renderMessages } from '../../../service/msgManager.js';
import { fetchGetin } from '../../fetcher/auth/getin.js';

import { ChatSocket } from '../../../service/socketManager.js';

function startChat(userId) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const socketUrl = `${protocol}//${host}`;

    const socket = new ChatSocket(`${socketUrl}?userId=${userId}`);
    
    socket.on('ready', () => {
        socket.send({ type: "get-messages", content: { amount: 50 } });
    });

    socket.on("alert", (content) => {
        if (content === "new-message") {
            socket.send({ type: "get-messages", content: { amount: 50 } });
        }
    });

    socket.on("return-messages", (rawMsgList) => {
        const formattedMsgList = rawMsgList.map(msg => {
            console.log(JSON.stringify(msg));
            const localTime = new Date(msg.timestamp)
                .toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                })
                .replace(/\s/g, '');
        
            return {
                message: msg.content,
                metadata: {
                    id: msg.id,
                    author: `[${msg.author}]`,
                    time: `@${localTime}`,
                    parentId: msg.parentId
                }
            };
        });

        renderMessages(formattedMsgList, document.getElementById("message-container"));
    });

    document.getElementById("send-button").addEventListener("click", (event) => {
        event.preventDefault();
    
        const input = document.getElementById("message-input");
        const content = input.value.trim();
    
        if (content === "") return;

        console.log(window.replyTarget)
    
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
    });
}

const getCookie = (name) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find(row => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : null;
  };

createIdentifyDialog(async (username) => {
    if (!username) {
        return alert("You must provide an username.");
    }
    const result = await fetchGetin(username);
    console.log(JSON.stringify(result));

    const userCookie = getCookie('user');
    const user = userCookie ? JSON.parse(userCookie) : null;
    const userId = user.userId;
    console.log(userId);

    startChat(userId);
});

const textarea = document.getElementById('message-input');

textarea.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Inserta un tab (4 espacios o '\t') en la posición del cursor
    const tabCharacter = '    '; // 4 espacios, o usa '\t' para tab real

    textarea.value = textarea.value.substring(0, start) + tabCharacter + textarea.value.substring(end);

    // Mueve el cursor después del tab insertado
    textarea.selectionStart = textarea.selectionEnd = start + tabCharacter.length;
  }
});

textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
  
      // Aquí llamas a la función que envía el mensaje
      document.getElementById('send-button').click();
    }
  });

  const messageContainer = document.getElementById('message-container');

  messageContainer.addEventListener('click', (event) => {
    // Buscamos el ancestro con clase 'message' desde donde se hizo click
    const messageDiv = event.target.closest('.message');
  
    if (!messageDiv) return; // Si no fue sobre un mensaje, ignorar
  
    // Obtenemos el id del mensaje (si lo hemos asignado con data-id)
    const messageId = messageDiv.dataset.id;
  
    if (messageId) {
      console.log('Mensaje clickeado con id:', messageId);
  
      // Aquí podemos llamar una función para poner ese mensaje como reply target, ejemplo:
      setReplyTarget(messageId);
    }
  });

function setReplyTarget(messageId) {
    window.replyTarget = messageId;
}

messageContainer.addEventListener('mouseover', (event) => {
  // Buscar el mensaje .message más cercano desde event.target
  const closestMessage = event.target.closest('.message');
  if (!closestMessage) return;

  // Evitar acción si ya está hovered
  if (closestMessage.classList.contains('hovered')) return;

  // Quitar hovered a todos los mensajes
  messageContainer.querySelectorAll('.message.hovered').forEach(el => {
    el.classList.remove('hovered');
  });

  // Añadir hovered solo al más cercano
  closestMessage.classList.add('hovered');
});

messageContainer.addEventListener('mouseout', (event) => {
  // Quitar hovered del mensaje al que se sale el mouse
  const related = event.relatedTarget;
  const fromMessage = event.target.closest('.message');

  if (!fromMessage) return;

  // Si el mouse sale a un elemento fuera del mensaje actual, quitar hovered
  if (!fromMessage.contains(related)) {
    fromMessage.classList.remove('hovered');
  }
});

messageContainer.addEventListener('click', (event) => {
    const clickedMessage = event.target.closest('.message');
    if (!clickedMessage) return;
  
    // Quitar selected a todos
    messageContainer.querySelectorAll('.message.selected').forEach(el => {
      el.classList.remove('selected');
    });
  
    // Añadir selected al clickeado
    clickedMessage.classList.add('selected');
  });