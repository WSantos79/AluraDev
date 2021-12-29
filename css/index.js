/*  -------------------- mudar a cor do code de projeto ------------------------------------------  */
const codeCor = document.querySelector('.code');
const mudarCor = () => {
  const valueCor = document.querySelector('.rectangle-color').value;
  const codeCor = document.querySelector('.code');

  codeCor.style.background = `${valueCor}`;
}

const btnCor = document.querySelector('.rectangle-color');

btnCor.addEventListener('input', mudarCor);

/*  --------------------Efeito  High Light -----------------------------------------------------  */
const btnHighLight = document.querySelector('.btn');

btnHighLight.onclick = () => {
  const btnLinguagem = document.querySelector('.input-linguagem');
  const linguagem = btnLinguagem.options[btnLinguagem.selectedIndex].text;
  const code = document.getElementById('codigo');
  const areaCodigo = document.querySelector('.my-code');

  const codigo = areaCodigo.innerText;

  code.classList = `hljs ${linguagem}`;

  areaCodigo.querySelector('code').textContent = codigo;

  hljs.highlightElement(areaCodigo.querySelector('code'));
}

/* Abrindo conexão com o banco de dados indexdDB ----------------------------------------------------------------- */

var connection;

var openRequest = window.indexedDB.open('aluradev', 1);

openRequest.onupgradeneeded = (e) => { /* Cria ou altera um banco já existente */
  let minhaConnection = e.target.result;

  minhaConnection.createObjectStore('codigos', { autoIncrement: true });
};

openRequest.onsuccess = (e) => { /* Conexão obtida com sucesso */
  connection = e.target.result;
  editar();
};

openRequest.onerror = (e) => { /* Algum erro */
  console.log(e.target.error);
};

/* Interagindo com o banco de dados indexdDB  */
// verificando se esta tudo preenchido -------------------------------------------------------------------------
const btnSalvar = document.querySelector('.input-salvar');

btnSalvar.onclick = (eventoSalvar) => {
  eventoSalvar.preventDefault();
  const nome = document.querySelector('[data-nomeProjeto]');
  const descricao = document.getElementById('descricao-projeto');
  const codigo = document.getElementById('codigo');
  const code = document.querySelector('[data-code]');
  const bordaCod2 = document.querySelector('.code_editor');

  if(nome.value.length < 4) {
    nome.focus();
    nome.style.border = `solid 1px red`;
  }else if(descricao.value.length < 4 ){
    descricao.focus();
    descricao.style.border = `solid 1px red`;
    nome.style.border = `none`;
  }else if(codigo.innerText.length < 8){     
     codigo.focus();
     bordaCod2.style.border = `solid 1px red`
     code.style.border = `solid 1px red`;
     descricao.style.border = `none`;    
  }else{
    descricao.style.border = `none`;
    bordaCod2.style.border = `none`;
    code.style.border = `none`;
    nome.style.border = `none`;
    salvarDados();
  }
}
// --------------------------------------------------- Salvando projeto no indexedDB ---------------------------------------------------------------------------------------------------------------------------
function salvarDados (e) {
  //e.preventDefault();
  
  const btnLinguagem = document.querySelector('.input-linguagem');
  const linguagem = btnLinguagem.options[btnLinguagem.selectedIndex];

  const codigo = document.getElementById('codigo');
  const nome = document.querySelector('[data-nomeProjeto]');
  const descricao = document.getElementById('descricao-projeto');
  const cor = document.querySelector('.rectangle-color');
  
   

  const dados = { nome: `${nome.value}`, descricao: `${descricao.value}`, linguagem: `${linguagem.text}`, cor: `${cor.value}`, codigo: `${codigo.innerText}` }

  let transaction = connection.transaction(['codigos'], 'readwrite');

  let store = transaction.objectStore('codigos');

  let request = store.add(dados);
  
    
 
  request.onsuccess = (e) => {
    alert(`\n \n Projeto salvo com sucesso, acesse no menu "comunidade" \n`);

    // limpando os inputs
    nome.value = '';
    descricao.value = '';
    linguagem.text = 'JavaScript';
    cor.value = '#6BD1FF';
    codigo.innerText = '';
    codeCor.style.background = `#6BD1FF`;
 }

  request.onerror = (e) => {
    console.log(e.target.error);
  }
} 

/// menu efeito

const imgcomu = document.querySelector('[data-comuImg]');
const comu = document.querySelector('[data-comu]');
const imghome = document.querySelector('[data-homeImg]');
const home = document.querySelector('[data-home]');

comu.onmouseover = () =>{
  imgcomu.style.background = `#5081FB`;  
}
imgcomu.onclick = () => {
  location.replace("comunidade.html");
}
imgcomu.onmouseover = () => {
  comu.style.opacity = `0.72`;
}

function aumenta () {
  imghome.style.width = `50px`;
  imghome.style.height = `50px`;
  home.style.fontSize = `1.05rem`;
 
}
function diminui (){
	imghome.style.width = `48px`;
  imghome.style.height = `48px`;  
  home.style.fontSize = `1rem`; 
}

/* --------------------- Projeto para editar existente ou nao ------------------------------------  */

function editar (){
  
  let transaction = connection.transaction(['codigos'], 'readwrite');

  let store = transaction.objectStore('codigos');

  
  let cursor = store.openCursor();
  // abrindo conexao
  cursor.onsuccess = (e) => {

    let atual = e.target.result;
    
    if(atual) {    // iterando
      let dado = atual.value;
      
      if(dado.id){ // iterando

        const code = document.querySelector(".hljs");

        // substituindo caracteres do codigo para o navegador nao interpretar o HTML
        let newCode = dado.codigo.replace(/</g, "&lt;");
        newCode = newCode.replace(/>/g, "&gt;;");
        
        code.innerHTML = newCode;

        const name = document.querySelector("[data-nomeProjeto]");
        name.value = dado.nome;

        const desc = document.getElementById('descricao-projeto');
        desc.value = dado.descricao;       
        
        let ling = "";
        if(dado.linguagem == "JavaScript"){
          ling = 0;
        }else if(dado.linguagem == "Java"){
          ling = 1;
        }else if(dado.linguagem == "Python"){
          ling = 2;
        }else if(dado.linguagem == "HTML"){
          ling = 3;
        }else {
          ling = 4;
        }
        const linguagem = document.querySelector('.input-linguagem');
        linguagem.selectedIndex = ling;

      

        // cor nao ta funcionando do picker
         
        //const pickColor = document.querySelector('.rectangle-color');
        //pickColor.value = ConvertRGBtoHex(dado.cor);             
      
        const colorCode = document.querySelector('[data-code]');
        colorCode.style.background = dado.cor;        
       
        atual.delete(dado); // deletando o dado
      }else{
        atual.continue(); // continuar ate terminar a iteraçao
      } 
    }
  }
}


/*  -------------------- TAB dentro do text area ------------------------------  
document.getElementById('codigo').addEventListener('keydown', function (e) {
  if (e.keyCode === 9) { // TAB
    
    var posAnterior = this.selectionStart;
    var posPosterior = this.selectionEnd;

    e.target.value = e.target.value.substring(0, posAnterior)
      + '\t'
      + e.target.value.substring(posPosterior);

    this.selectionStart = posAnterior + 1;
    this.selectionEnd = posAnterior + 1;

    // não move pro próximo elemento
    e.preventDefault();
  }
}, false); 

*/