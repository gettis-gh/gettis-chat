import {
    buildMetadataElement
  } from './helper/metadata.js'; // supongamos que exportas esas funciones
  
  export function createMessagePreview(content, metadata = {}) {

    const wrapper = document.createElement('div');
    wrapper.classList.add('message-preview');
  
    if (metadata.id) {
      wrapper.dataset.id = metadata.id;
    }

    const displayConfig = {
        author: 'highlight',
        timestamp: 'dim',
        quote: 'dim',
        id: 'dim'
    };
  
    // Crear y añadir contenedor de metadata (estilos más ligeros si quieres)
    const metaContainer = buildMetadataElement(metadata, displayConfig);
    metaContainer.classList.remove('message-meta');
    metaContainer.classList.add('message-preview-meta');
  
    // Crear el cuerpo del mensaje
    const messageBody = document.createElement('div');
    messageBody.classList.add('message-preview-content');
  
    messageBody.appendChild(document.createTextNode(content));

    wrapper.appendChild(metaContainer);
    wrapper.appendChild(messageBody);
  
    return wrapper;
  }
  