/*  --------------------------------------------------  */

 /*const border = document.querySelector('.code');
const input = document.querySelector('.rectangle-color');

input.addEventListener('input', setColor)

function setColor() {
  border.style.background = input.value
}*/


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