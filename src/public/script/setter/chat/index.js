import { createIdentifyDialog } from '../../../component/identify.js';
import { renderMessages } from '../../../service/msgManager.js';
import { fetchGetin } from '../../fetcher/auth/getin.js';

import { ChatSocket } from '../../../service/socketManager.js';

function startChat(userId) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const host = window.location.host;
    const socketUrl = `${protocol}//${host}`;

    const socket = new ChatSocket(`${socketUrl}?userId=${userId}`);

    socket.on("alert", (content) => {
    if (content === "new-message") {
        socket.send({ type: "get-messages", content: { amount: 50 } });
    }
    });

    socket.on("return-messages", (msgList) => {
    renderMessages(msgList, document.getElementById("message-container"));
    });

    document.getElementById("send-button").addEventListener("click", (event) => {
        event.preventDefault();
    
        const input = document.getElementById("message-input");
        const content = input.value.trim();
    
        if (content === "") return;
    
        socket.send({
            type: "new-message",
            content: { text: content },
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
