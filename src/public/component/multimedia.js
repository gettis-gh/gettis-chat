export function createMultimedia(multimedia, metadata = {}) {
    const wrapper = document.createElement('div');
    wrapper.classList.add('multimedia');
  
    const header = document.createElement('div');
    header.classList.add('multimedia-header');
  
    const body = document.createElement('div');
    body.classList.add('multimedia-body');
    body.appendChild(multimedia);
  
    const footer = document.createElement('div');
    footer.classList.add('multimedia-footer');
  
    header.innerHTML = ''; // Limpias el contenido antes

    const lines = [
        `${metadata.url || 'Url'}`
    ];

    lines.forEach(line => {
    const p = document.createElement('p');
    p.textContent = line;
    header.appendChild(p);
    });
  
    wrapper.appendChild(header);
    wrapper.appendChild(body);
    wrapper.appendChild(footer);
  
    return wrapper;
  }
  