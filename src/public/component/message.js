function buildMetadataElement(metadata, displayConfig) {
    const container = document.createElement('div');
    container.classList.add('message-meta');

    for (const key in metadata) {
        if (displayConfig[key] === 'hide') continue;

        const span = document.createElement('span');
        span.classList.add(`meta-${key}`);

        const value = metadata[key];
        const style = displayConfig[key] || 'normal';

        applyDisplayStyle(span, style);
        span.textContent = value;

        container.appendChild(span);
    }

    return container;
}

function applyDisplayStyle(element, style) {
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
            // sin estilo extra
            break;
    }
}

function renderMultimedia(url) {
    const cleanUrl = url.split(/[?#]/)[0];
    const extension = cleanUrl.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Multimedia';
        img.classList.add('message-media');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '300px';
        return img;
    }

    if (extension === 'mp4') {
        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        video.classList.add('message-media');
        video.style.maxWidth = '100%';
        video.style.maxHeight = '300px';
        video.style.display = 'block';
        return video;
    }

    return null;
}

function splitByUrl(content) {
    const regex = /url\((https?:\/\/[^)]+)\)/g;
    let match;
    let lastIndex = 0;
    const fragments = [];

    while ((match = regex.exec(content)) !== null) {
        const url = match[1];

        // Texto antes de la URL
        if (match.index > lastIndex) {
            fragments.push({ type: 'text', value: content.slice(lastIndex, match.index) });
        }

        // URL detectada
        fragments.push({ type: 'media', value: url });

        lastIndex = regex.lastIndex;
    }

    // Texto restante
    if (lastIndex < content.length) {
        fragments.push({ type: 'text', value: content.slice(lastIndex) });
    }

    return fragments;
}

function buildMessageFragment(fragment) {
    if (fragment.type === 'text') {
        return document.createTextNode(fragment.value);
    }

    if (fragment.type === 'media') {
        const mediaElement = renderMultimedia(fragment.value);
        return mediaElement || document.createTextNode(`url(${fragment.value})`);
    }

    return document.createTextNode('');
}

function parseMessageContent(content) {
    const container = document.createElement('span');
    const fragments = splitByUrl(content);

    fragments.forEach(fragment => {
        container.appendChild(buildMessageFragment(fragment));
    });

    return container;
}

export function createMessage(content, metadata = {}, displayConfig = {}) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('message');

    if (metadata.id) {
        wrapper.dataset.id = metadata.id;
    }

    const metaContainer = buildMetadataElement(metadata, displayConfig);
    wrapper.appendChild(metaContainer);

    const messageBody = document.createElement('div');
    messageBody.classList.add('message-content');
    const prefix = document.createTextNode('> ');
    messageBody.appendChild(prefix);
    const parsed = parseMessageContent(content);
    messageBody.appendChild(parsed);
    wrapper.appendChild(messageBody);

    return wrapper;
}