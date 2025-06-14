const hotkeyCommands = {
    'Control+Enter': () => {
        console.log('Enviar mensaje');
    },
    'Alt+R': () => {
        console.log('Responder mensaje');
    },
    'Escape': () => {
        document.getElementById("message-input").blur();
        window.replyTarget=undefined;
        document.body.focus();

    },
    'Tab': () => {}
};


export function handleHotkey(pressedKeys) {
    const combination = Array.from(pressedKeys.keys()).sort().join('+');

    const command = hotkeyCommands[combination];
    if (command) {
        return command();
    }
    document.getElementById("message-input").focus();
}