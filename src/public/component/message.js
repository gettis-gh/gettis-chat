import { parseMessageContent } from "./helper/message.js";
import { buildMetadataElement } from "./helper/metadata.js";

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
    const parsed = parseMessageContent(content);
    messageBody.appendChild(prefix);
    messageBody.appendChild(parsed);

    wrapper.appendChild(messageBody);
    return wrapper;
}