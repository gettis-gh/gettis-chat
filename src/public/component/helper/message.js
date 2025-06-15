import {
    buildMessageFragment,
    splitByMethod
  } from './messageHelpers.js';

export function parseMessageContent(content) {
    const container = document.createElement('span');
    const fragments = splitByMethod(content);

    fragments.forEach(fragment => {
        container.appendChild(buildMessageFragment(fragment));
    });

    return container;
}