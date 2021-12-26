/*const criarTarefa = (evento) => {
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
*/

let i = 0

if( i == 0 ){
    console.log(`if ${i}`);
    i=2;
}else{
    console.log(`else ${i}`);
    i =  5;
}
console.log(i);