
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


/* ==================================================  recuperando dados do IndexedDB=================================================*/
var ling = [];

function newCode() {

  let transaction = connection.transaction(['codigos'], 'readwrite');

  let store = transaction.objectStore('codigos');

  let cursor = store.openCursor();

  cursor.onsuccess = (e) => {

    let atual = e.target.result;

    if (atual) {
      let dado = atual.value;

      // comentario, like e user
      let numeroDeComentario = 0;
      let numeroDeLikes = 0;
      let nomeUsuario = '@Harry';

      // Criar o item da lista
      let filho = document.createElement('div');
      filho.classList.add('lista-projeto');
      const conteudo = `
      <div class="code" style="background: ${dado.cor};">    
          <div class="code_editor">                        
                <img class="ellipse" src="img/mac_buttons.svg" alt="botão mac">                        
                <div class="my-code">
                    <code class="hljs" id="codigo" aria-autocomplete="none" spellcheck="false" role="presentation">${dado.codigo}</code>                   
                </div>                                       
          </div>                     
      </div>

      <ul class="dados-projeto">
          <li class="titulo-projeto"><a class="linkProjeto" href="./">${dado.nome}</a></li>
          <li class="descricao-projeto">${dado.descricao}</li>    
      </ul>
      <ul class="dados-ordem">                  
                <li class="ups-ordem">   
                    <div class="coment-up-efeito">                   
                        <img src="img/coment-icon.svg" alt="icone de comentario">
                        <span class="coment-up">${numeroDeComentario}</span>
                    </div>                        

                    <div class="love-up-efeito">
                          <img class="love-icon" src="img/love-icon.svg" alt="icone de gostei">
                          <span class="love-up">${numeroDeLikes}</span>  
                    </div>                                 
                </li>
                <li>
                    <div class="cod-profile">
                          <img class="img-user" src="img/Photo24x.svg" alt="foto do usuario">
                          <p class="name-user">${nomeUsuario}</p>
                    </div>
                </li>               
          </ul>`          
      filho.innerHTML = conteudo;
      document.querySelector('.exibicao-projetos').appendChild(filho);
      atual.continue();

      ling.push(`${dado.linguagem}`);
    } else {
      // add todos codigos recuperados com sucesso           
      btnAmei();
      highlight();
      selecionarProjeto();
    }
  }
  cursor.onerror = (e) => {
    console.log(e.target.error.name);
  }
}
// aplicando o high light
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

function btnAmei() {
  const btnLoveUp = document.querySelectorAll('.love-up-efeito');
  const up = document.querySelectorAll('.love-up');
  const img = document.querySelectorAll('.love-icon');

  for (let i = 0; i < btnLoveUp.length; i++) {
    let testeIF = 0;
    btnLoveUp[i].addEventListener('click', () => {

      if (testeIF == 1) {
        up[i].innerHTML = parseInt(up[i].innerHTML) - 1;
        img[i].setAttribute('src', 'img/love-icon.svg');
        testeIF = 0;

      } else {
        up[i].innerHTML = parseInt(up[i].innerHTML) + 1;
        img[i].setAttribute('src', 'img/love-icon-red.svg');
        testeIF = 1;
      }
    })
  }
}
/// menu efeito

const imghome = document.querySelector('[data-homeImg]');
const home = document.querySelector('[data-home]');

home.onmouseover = () =>{
  imghome.style.background = `#5081FB`;
}
imghome.onclick = () => {
  location.replace("index.html")
}
imghome.onmouseover = () => {
  home.style.opacity = `0.72`;
}

function selecionarProjeto() { 
  const projetos = document.querySelectorAll('.titulo-projeto');
  for(let i = 0; i < projetos.length; i++) {
    projetos[i].onclick = () => {
     // window.location.href = "index.html";      
      

    
    }
  }
}
