/*  --------------------Eu tentando barra de menu smart ------------------------------  */
let i = 0;
const abriMenu = (evento) => {
  evento.preventDefault();

  const imgMenu = document.querySelector('[data-img-menu]');
  const menu = document.querySelector('.menu-principal');
  const barraMenu = document.querySelector('.menu-smart');
  const usuario = document.querySelector('.profile');

  if (i == 0){ 
  menu.style.display = `block`;
  barraMenu.style.display = `block`;
  usuario.style.display = `block`;
  imgMenu.setAttribute('src', '../img/close-icon.svg');
  i = 1;

  }else{
    menu.style.display = `none`;
    barraMenu.style.display = `none`;
    usuario.style.display = `none`;
    imgMenu.setAttribute('src', '../img/menu-icon.svg');
    i = 0;
  }
}
const menu = document.querySelector('.icon-menu');
menu.addEventListener('click', abriMenu);

/*  ------------------ botao amei ------------------------------------  */
const btnLoveUp = document.querySelectorAll('.love-up-efeito');
const  up = document.querySelectorAll('.love-up');
const img = document.querySelectorAll('.love-icon');

for (let i=0; i <= btnLoveUp.length; i++){
    let testeIF = 0;
    btnLoveUp[i].addEventListener('click', () => {         
        
        if (testeIF == 1){
            up[i].innerHTML = parseInt(up[i].innerHTML) - 1;
            img[i].setAttribute('src', '../img/love-icon.svg');
            testeIF = 0;
        
        }else {
            up[i].innerHTML = parseInt(up[i].innerHTML) + 1;
            img[i].setAttribute('src', '../img/love-icon-red.svg');
            testeIF = 1;
        }
    })
}