export function createMessage(content, metadata = {}, displayConfig = {}) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message');

    if (metadata.id) {
        wrapper.dataset.id = metadata.id;
    }

    // Contenedor de metadatos
    const metaContainer = document.createElement('div');
    metaContainer.classList.add('message-meta');

    for (const key in metadata) {
        if (displayConfig[key] == 'hide') {
            continue;
        }
        
        const span = document.createElement('span');
        span.classList.add(`meta-${key}`);

        const value = metadata[key];
        const style = displayConfig[key] || 'normal';

        switch (style) {
            case 'highlight':
                span.style.color = 'lime';
                span.style.fontWeight = 'bold';
                break;
            case 'dim':
                span.style.opacity = 0.6;
                break;
            case 'normal':
            default:
                // sin estilo extra
                break;
        }

        span.textContent = value;
        metaContainer.appendChild(span);
    }
    wrapper.appendChild(metaContainer);

    // Línea del mensaje
    const messageBody = document.createElement('div');
    messageBody.classList.add('message-content');
    messageBody.textContent = `> ${content}`;

    wrapper.appendChild(messageBody);

    return wrapper;
}