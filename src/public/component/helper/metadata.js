export function applyDisplayStyle(element, style) {
    switch (style) {
        case 'highlight':
            element.style.color = 'lime';
            element.style.fontWeight = 'bold';
            break;
        case 'dim':
            element.style.opacity = 0.6;
            break;
        case 'normal':
        default:
            break;
    }
}

export function buildMetadataElement(metadata, displayConfig) {
    const container = document.createElement('div');
    container.classList.add('message-meta');

    for (const key in metadata) {
        if (!displayConfig[key]) continue;

        const span = document.createElement('span');
        span.classList.add(`meta-${key}`);

        const value = metadata[key];
        const style = displayConfig[key];

        applyDisplayStyle(span, style);
        span.textContent = value;

        container.appendChild(span);
    }

    return container;
}