// Helpers

function createElement(tag, options = {}) {
    const el = document.createElement(tag);

    if (options.className) el.className = options.className;
    if (options.text) el.textContent = options.text;
    if (options.placeholder) el.placeholder = options.placeholder;
    if (options.type) el.type = options.type;
    if (options.id) el.id = options.id;

    return el;
}

function getRandomPrompt() {
    const intros = [
        "Before you enter, ",
        "Just one step left, ",
        "To begin, ",
        "Almost there, ",
        "Hey there! "
    ];

    const endings = [
        "what should we call you?",
        "enter your name.",
        "tell us your username.",
        "pick an alias.",
        "how do you want to be known?"
    ];

    const intro = intros[Math.floor(Math.random() * intros.length)];
    const ending = endings[Math.floor(Math.random() * endings.length)];

    return `${intro}${ending}`;
}

// Main Component

export function createIdentifyForm(onSubmit) {
    const wrapper = createElement('div', { className: 'identify-wrapper' });

    const prompt = createElement('p', {
        className: 'identify-prompt',
        text: getRandomPrompt()
    });

    const input = createElement('input', {
        type: 'text',
        placeholder: 'your username',
        id: 'identify-input'
    });

    const button = createElement('button', {
        text: 'Enter',
        id: 'identify-button'
    });

    const form = createElement('div', { className: 'identify-form' });

    // Behavior
    button.addEventListener('click', async () => {
        const username = input.value.trim();
        if (username !== '') await onSubmit(username);
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') button.click();
    });

    // Assemble
    form.appendChild(input);
    form.appendChild(button);

    wrapper.appendChild(prompt);
    wrapper.appendChild(form);

    return wrapper;
}

export function createIdentifyDialog(onSubmit) {
    const dialog = document.createElement('dialog');
    dialog.classList.add('identify-dialog');

    const form = createIdentifyForm(async (username) => {
        await onSubmit(username);
        dialog.close();
    });

    dialog.appendChild(form);
    document.body.appendChild(dialog);

    // Abrir el modal después de agregarlo al DOM
    requestAnimationFrame(() => dialog.showModal());

    return dialog;
}