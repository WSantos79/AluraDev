const menu = document.querySelector('.icon-menu');
const iconBusca = document.querySelector('[data-search]');

/*  --------------------barra de search mobile ------------------------------  */
let x = 0;
iconBusca.onclick = (evento) => {
  evento.preventDefault();

  const logoAlura = document.querySelector('[data-logo-alura]');
  const input = document.querySelector('.input-busca');
  if (x == 0) {
    iconBusca.setAttribute('src', 'assets/img/close-icon.svg');
    iconBusca.style.margin = `0`;
    input.style.display = `block`;
    logoAlura.style.display = `none`;
    menu.style.display = `none`;
    x = 1;
  } else {
    iconBusca.setAttribute('src', 'assets/img/search-icon.svg');
    iconBusca.style.margin = `0 1rem`;
    input.style.display = `none`;
    logoAlura.style.display = `block`;
    menu.style.display = `block`;
    x = 0;
  }
}


/*  --------------------barra de menu smart mobile------------------------------  */
let i = 0;

const abriMenu = (evento) => {
  evento.preventDefault();

  const imgMenu = document.querySelector('[data-img-menu]');
  const menuTotal = document.querySelector('.menu-principal');
  const barraMenu = document.querySelector('.menu-smart');
  const usuario = document.querySelector('.profile');

  if (i == 0) {
    menuTotal.style.display = `flex`;   
    barraMenu.style.display = `block`;
    usuario.style.display = `block`;
    imgMenu.setAttribute('src', 'assets/img/close-icon.svg');
    i = 1;

  } else {
    menuTotal.style.display = `none`;
    barraMenu.style.display = `none`;
    usuario.style.display = `none`;
    imgMenu.setAttribute('src', 'assets/img/menu-icon.svg');
    i = 0;
  }
}

menu.addEventListener('click', abriMenu);