/*  -------------------- mudar a cor do code de projeto ------------------------------  */
const codeCor = document.querySelector('.code');
const mudarCor = () => {
  const valueCor = document.querySelector('.rectangle-color').value;
  const codeCor = document.querySelector('.code');

  codeCor.style.background = `${valueCor}`;
}

const btnCor = document.querySelector('.rectangle-color');

btnCor.addEventListener('input', mudarCor);

/*  --------------------Efeito  High Light ------------------------------  */
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

/* Abrindo conexão com o banco de dados indexdDB  */

var connection;

var openRequest = window.indexedDB.open('aluradev', 1);

openRequest.onupgradeneeded = (e) => { /* Cria ou altera um banco já existente */
  let minhaConnection = e.target.result;

  minhaConnection.createObjectStore('codigos', { autoIncrement: true });
};

openRequest.onsuccess = (e) => { /* Conexão obtida com sucesso */
  connection = e.target.result;
};

openRequest.onerror = (e) => { /* Algum erro */
  console.log(e.target.error);
};

/* Interagindo com o banco de dados indexdDB  */
// verificando se esta tudo preenchido --------------
const btnSalvar = document.querySelector('.input-salvar');

btnSalvar.onclick = (eventoSalvar) => {
  eventoSalvar.preventDefault();
  const nome = document.querySelector('[data-nomeProjeto]');
  const descricao = document.getElementById('descricao-projeto');
  if(nome.value != '' && descricao.value != '') {
    salvarDados();
  }else{
    alert(`Preencha todos os campos`);
  }
}
// --------------------------------------------------- Salvando projeto no indexedDB ------------------------------------------------------------
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
    alert(`Projeto salvo com sucesso, acesse no menu "comunidade"`);

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
}, false);*/