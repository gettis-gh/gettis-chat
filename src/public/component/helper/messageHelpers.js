import { createMultimedia } from '../multimedia.js'

export function extractMetadataFromUrl(url) {
    const urlObj = new URL(url);
    const cleanPath = urlObj.pathname.split('/').filter(Boolean); // quita vacíos
    const filename = cleanPath.pop() || 'desconocido';
    const [name, extRaw] = filename.split('.');

    const extension = extRaw?.toLowerCase() || 'unknown';
    const mimeType = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
        mp4: 'video/mp4',
        webm: 'video/webm'
    }[extension] || 'desconocido';

    return {
        filename,
        name,
        extension,
        mimeType,
        host: urlObj.host,
        origin: urlObj.origin,
        path: urlObj.pathname,
        url
    };
}

export function renderMultimedia(url) {
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

export function renderMultimediaWrapper(url) {
    const mediaEl = renderMultimedia(url);
    if (!mediaEl) return null;

    const metadata = extractMetadataFromUrl(url);
    return createMultimedia(mediaEl, metadata);
}

import { createMessagePreview } from '../preview.js';

export const methodHandlers = {
    url: (arg) => {
        // reutiliza tu función renderMultimediaWrapper
        return renderMultimediaWrapper(arg);
    },

    // ejemplo para otro método (solo muestra el texto en negrita)
    bold: (arg) => {
        const span = document.createElement('span');
        span.style.fontWeight = 'bold';
        span.textContent = arg;
        return span;
    },

    quote: (arg) => {
        const messageId = arg;
        const originalMsg = window.messages?.[messageId];

        if (!originalMsg) {
            return document.createTextNode(`[Mensaje "${messageId}" no encontrado]`);
        }

        return createMessagePreview(originalMsg.message, originalMsg.metadata);
    }

    // agrega más métodos que quieras...
};

export function buildMessageFragment(fragment) {
    if (fragment.type === 'text') {
        return document.createTextNode(fragment.value);
    }

    if (fragment.type === 'method') {
        const handler = methodHandlers[fragment.method];
        if (handler) {
            return handler(fragment.arg) || document.createTextNode(`${fragment.method}(${fragment.arg})`);
        }
        // si no hay handler definido, dejarlo literal
        return document.createTextNode(`${fragment.method}(${fragment.arg})`);
    }

    return document.createTextNode('');
}

export function splitByMethod(content) {
    const methodRegex = /(\w+)\(([^)]+)\)/g;

    let match;
    let lastIndex = 0;
    const fragments = [];

    while ((match = methodRegex.exec(content)) !== null) {
        const method = match[1];
        const arg = match[2];

        // Texto antes del método
        if (match.index > lastIndex) {
            fragments.push({ type: 'text', value: content.slice(lastIndex, match.index) });
        }

        // Fragmento con método y argumento
        fragments.push({ type: 'method', method, arg });

        lastIndex = methodRegex.lastIndex;
    }

    // Texto restante
    if (lastIndex < content.length) {
        fragments.push({ type: 'text', value: content.slice(lastIndex) });
    }

    return fragments;
}