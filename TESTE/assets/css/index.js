const criarTarefa = (evento) => {
    evento.preventDefault();

    const input = document.querySelector(".form-input");
    const inputValue = input.value;
    
    const lista = document.querySelector ('[data-list]');
    

    const tarefa = document.createElement('li');
    tarefa.classList.add('task');
    const conteudo = `<p class="content">${inputValue}</p>`;

    tarefa.innerHTML = conteudo;

    lista.appendChild(tarefa);

    input.value = " "
}

const novaTarefa = document.querySelector(".form-button");


novaTarefa.addEventListener('click', criarTarefa);


