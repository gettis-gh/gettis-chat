const messageContainer = document.getElementById('message-container');

export function handleClick(event) {
    const clickedMessage = event.target.closest('.message');

    messageContainer.querySelectorAll('.message.selected').forEach(el => {
        el.classList.remove('selected');
    });

    if (!clickedMessage) {
        window.replyTarget = undefined;
        return;
    }

    clickedMessage.classList.add('selected');
    const messageId = clickedMessage.dataset.id;
    if (messageId) {
        window.replyTarget = messageId;
    }
}

export function handleMousover(event) {
    const closestMessage = event.target.closest('.message');
    if (!closestMessage) return;
    if (closestMessage.classList.contains('hovered')) return;

    messageContainer.querySelectorAll('.message.hovered').forEach(el => {
        el.classList.remove('hovered');
    });

    closestMessage.classList.add('hovered');
}

export function handleMouseout(event) {
    const related = event.relatedTarget;
    const fromMessage = event.target.closest('.message');
    if (!fromMessage) return;
    if (!fromMessage.contains(related)) {
        fromMessage.classList.remove('hovered');
    }
}