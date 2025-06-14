export function broadcastAlert(wss, content = "updated-messages") {
    const alert = JSON.stringify({
        type: "alert",
        content
    });

    wss.clients.forEach(client => {
        if (client.readyState === client.OPEN) {
            client.send(alert);
        }
    });
}
