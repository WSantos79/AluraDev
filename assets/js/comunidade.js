const search = document.querySelector('.input-busca');

// verificar se  tem uma busca em andamento da pag index
function temBusca() { 

const texto = window.sessionStorage.getItem('busca'); // recuperando item de busca se houver
search.value = texto;
busca();

window.sessionStorage.removeItem('busca');

}

// Conectando ao indexedDB 
var connection;
var openRequest = window.indexedDB.open('aluradev', 1);

openRequest.onupgradeneeded = (e) => { /* Cria ou altera um banco já existente */
  let minhaConnection = e.target.result;

  minhaConnection.createObjectStore('codigos', { autoIncrement: true });
};

openRequest.onsuccess = (e) => { /* Conexão obtida com sucesso */
  connection = e.target.result;
  newCode();
};
openRequest.onerror = (e) => { /* Algum erro */
  console.log(e.target.error);
};
// quando clica em um projeto para edita-lo
function selecionarProjeto() {   
  const projetos = document.querySelectorAll('.titulo-projeto');

  for(let i = 0; i < projetos.length; i++) {
    projetos[i].onclick = () => {

      let transaction = connection.transaction(['codigos'], 'readwrite');
      let store = transaction.objectStore('codigos');

      let chave = projetos[i].parentNode.nextElementSibling.firstElementChild.lastElementChild.firstElementChild.textContent;
           
      let cursor = store.openCursor();

      cursor.onsuccess = (e) => {
      
        let atual = e.target.result;
        
        if (atual) {
          if(atual.key == chave){
                        
            const novoDado = {id: `${atual.key}`, nome: `${atual.value.nome}`, descricao: `${atual.value.descricao}`, linguagem: `${atual.value.linguagem}`, cor: `${atual.value.cor}`, codigo: `${atual.value.codigo}`};  

            store.add(novoDado);            
          }
          atual.continue();
        }
      }
      location.replace("index.html");
    }                        
  }
}


/* ==================================================  recuperando dados do IndexedDB=========================================================================================================================*/
var ling = [];

function newCode() {

  /// renderizar lista, limpando a lista depois do delete
  document.querySelector('.exibicao-projetos').innerHTML = '';

  //   - -  - - - -
  let transaction = connection.transaction(['codigos'], 'readonly');

  let store = transaction.objectStore('codigos');

  let cursor = store.openCursor();
  
  cursor.onsuccess = (e) => {

    let atual = e.target.result;
  
    if (atual) {
      let dado = atual.value;

      // comentario, like e user
      let numeroDeComentario = 0;
      let numeroDeLikes = 0;
      let nomeUsuario = '@WellSan';     

      // substituindo caracteres do codigo para o navegador nao interpretar o HTML 
      let newCode = dado.codigo.replace(/</g, "&lt;");
      newCode = newCode.replace(/>/g, "&gt;");

      // Criar o item da lista
      let filho = document.createElement('div');
      filho.classList.add('lista-projeto');
      const conteudo = `
      <div class="code" style="background: ${dado.cor};">    
          <div class="code_editor">                        
                <img class="ellipse" src="assets/img/mac_buttons.svg" alt="botão mac">                        
                <div class="my-code">
                      <code class="hljs" id="codigo" aria-autocomplete="none" spellcheck="false" role="presentation">${newCode}</code>                   
                </div>   
          </div>                     
      </div>
      <ul class="dados-projeto">
          <li class="titulo-projeto"><a class="linkProjeto" href="#">${dado.nome}</a></li>
          <li class="descricao-projeto">${dado.descricao}</li>    
      </ul>
      <ul class="dados-ordem">                  
                <li class="ups-ordem">   
                    <div class="coment-up-efeito">                   
                        <img src="assets/img/coment-icon.svg" alt="icone de comentario">
                        <span class="coment-up">${numeroDeComentario}</span>
                    </div>                        
                   <div class="love-up-efeito">
                          <img class="love-icon" src="assets/img/love-icon.svg" alt="icone de gostei">
                          <span class="love-up">${numeroDeLikes}</span>  
                    </div>     
                    <div class="div-trash">
                          <span class="key" hidden>${atual.key}</span>
                          <img class="trash-icon" src="assets/img/trash-icon.png" alt="icone para deletar">
                    </div>  
                </li>
                <li>
                    <div class="cod-profile">
                          <img class="img-user" src="assets/img/Photo24x.svg" alt="foto do usuario">
                          <p class="name-user">${nomeUsuario}</p>
                    </div>
                </li>               
          </ul>`          
     
      filho.innerHTML = conteudo;
        
      document.querySelector('.exibicao-projetos').appendChild(filho);

      ling.push(`${dado.linguagem}`);

      atual.continue();
    
      
    } else {
      // add todos codigos recuperados com sucesso          
      highlight();
      selecionarProjeto();
      deletarProjeto();
      btnAmei();
      temBusca();
    }
  }
  cursor.onerror = (e) => {
    console.log(e.target.error.name);
  }
  
}
// aplicando o high light ----------------------------------------------------------------------------------
function highlight() {

  const code = document.querySelectorAll('.hljs');
  const areaCodigo = document.querySelectorAll('.my-code');

  for (let i = 0; i < areaCodigo.length; i++) {

    const codigo = areaCodigo[i].innerText;

    code[i].classList = `hljs ${ling[i]}`;

    areaCodigo[i].querySelector('code').textContent = codigo;


    hljs.highlightElement(areaCodigo[i].querySelector('code'));

  }
}
// botao like --------- ----------------------------------------------------------------------------------
function btnAmei() {
  const btnLoveUp = document.querySelectorAll('.love-up-efeito');
  const up = document.querySelectorAll('.love-up');
  const img = document.querySelectorAll('.love-icon');

  for (let i = 0; i < btnLoveUp.length; i++) {
    let testeIF = 0;
    btnLoveUp[i].addEventListener('click', () => {

      if (testeIF == 1) {
        up[i].innerHTML = parseInt(up[i].innerHTML) - 1;
        img[i].setAttribute('src', 'assets/img/love-icon.svg');
        testeIF = 0;

      } else {
        up[i].innerHTML = parseInt(up[i].innerHTML) + 1;
        img[i].setAttribute('src', 'assets/img/love-icon-red.svg');
        testeIF = 1;
      }
    })
  }
}
/// menu efeito  -----------------------------------------------------------

const imghome = document.querySelector('[data-homeImg]');
const home = document.querySelector('[data-home]');
const imgcomu = document.querySelector('[data-comuImg]');
const comu = document.querySelector('[data-comu]'); // ajustar

home.onmouseover = () =>{
  imghome.style.background = `#5081FB`;
}
imghome.onclick = () => {
  location.replace("index.html")
}
imghome.onmouseover = () => {
  home.style.opacity = `0.72`;
}

function aumenta () {
  imgcomu.style.width = `49px`;
  imgcomu.style.height = `49px`;
  comu.style.fontSize = `1.01rem`;
}
function diminui (){
	imgcomu.style.width = `48px`;
  imgcomu.style.height = `48px`;  
  comu.style.fontSize = `1rem`; 
}
// --------------------- deletar projeto ---------------------------------------

function deletarProjeto() {   
  
  const trash = document.querySelectorAll('.div-trash');
  
  for(let i = 0; i < trash.length; i++) {
    trash[i].onclick = () => {

      let transaction = connection.transaction(['codigos'], 'readwrite');
      let store = transaction.objectStore('codigos');

      let chave = trash[i].firstElementChild.textContent;
           
      let cursor = store.openCursor();

      cursor.onsuccess = (e) => {
      
        let atual = e.target.result;
        
        if (atual) {
          if(atual.key == chave){
            alert("Projeto deletado !!!")
            atual.delete();
            newCode();
          }
          atual.continue();
        }
      }
    }                        
  }
}
//------------------------- busca -------------------------------------------

search.addEventListener('input', busca);

function busca() { 
  const projeto = document.querySelectorAll('.lista-projeto');
  const digitado = search.value.toLowerCase().trim();

  
  projeto.forEach(projeto => {
    const nome = projeto.querySelector('.linkProjeto').textContent.toLocaleLowerCase();
    const descricao = projeto.querySelector('.descricao-projeto').textContent.toLocaleLowerCase();
    const linguagem = projeto.querySelector('.hljs').classList.value.toLocaleLowerCase();

    if(nome.includes(digitado) || descricao.includes(digitado) || linguagem.includes(digitado)) {
      projeto.style.display = 'flex';
      return;
    }
    projeto.style.display = 'none';
  })
}