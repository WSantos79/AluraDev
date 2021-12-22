const menu = document.querySelector('.icon-menu');
const iconBusca = document.querySelector('[data-search]');


/*  --------------------barra de search mobile ------------------------------  */
let x = 0;
const barraPesquisa = (evento) =>  {
  evento.preventDefault();    

  const logoAlura = document.querySelector('[data-logo-alura]');
  const input = document.querySelector('.input-busca');
  if(x == 0){
    iconBusca.setAttribute('src', 'img/close-icon.svg');
    iconBusca.style.margin = `0`;
    input.style.display = `block`;
    logoAlura.style.display = `none`;
    menu.style.display = `none`;
    x = 1;
  }else{
    iconBusca.setAttribute('src', 'img/search-icon.svg');
    iconBusca.style.margin = `0 1rem`;
    input.style.display = `none`;
    logoAlura.style.display = `block`;
    menu.style.display = `block`;
    x = 0;
  }
}

iconBusca.addEventListener('click', barraPesquisa);

/*  --------------------barra de menu smart mobile------------------------------  */
let i = 0;

const abriMenu = (evento) => {
  evento.preventDefault();

  const imgMenu = document.querySelector('[data-img-menu]');
  const menuTotal = document.querySelector('.menu-principal');
  const barraMenu = document.querySelector('.menu-smart');
  const usuario = document.querySelector('.profile');

  if (i == 0){ 
  menuTotal.style.display = `block`;
  barraMenu.style.display = `block`;
  usuario.style.display = `block`;
  imgMenu.setAttribute('src', 'img/close-icon.svg');
  i = 1;

  }else{
    menuTotal.style.display = `none`;
    barraMenu.style.display = `none`;
    usuario.style.display = `none`;
    imgMenu.setAttribute('src', 'img/menu-icon.svg');
    i = 0;
  }
}

menu.addEventListener('click', abriMenu);

/*  -------------------- TAB dentro do text area ------------------------------  */
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

/*  -------------------- mudar a cor do code de projeto ------------------------------  */
const mudarCor = () => {

  const valueCor = document.querySelector('.rectangle-color').value;
  const codeCor = document.querySelector('.code');
    
  codeCor.style.background = `${valueCor}`;
  }

  const btnCor = document.querySelector('.rectangle-color');
  
  btnCor.addEventListener('input', mudarCor);
 
/*  --------------------Eu tentando salvar projeto ------------------------------  */

const salvarProjeto = (eventoSalvar) => {
  eventoSalvar.preventDefault();

  const textArea = document.getElementById('codigo').value;
  const nome = document.querySelector('[data-nomeProjeto]').value;
  const descricao = document.getElementById('descricao-projeto').value;
  const linguagem = document.querySelector('.input-linguagem').value;
  const cor = document.querySelector('.rectangle-color').value;

}

const btnSalvar = document.querySelector('.input-salvar');

btnSalvar.addEventListener('click', salvarProjeto);



