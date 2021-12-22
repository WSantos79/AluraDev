/*  ------------------ botao amei ------------------------------------  */
const btnLoveUp = document.querySelectorAll('.love-up-efeito');
const  up = document.querySelectorAll('.love-up');
const img = document.querySelectorAll('.love-icon');

for (let i=0; i <= btnLoveUp.length; i++){
    let testeIF = 0;
    btnLoveUp[i].addEventListener('click', () => {         
        
        if (testeIF == 1){
            up[i].innerHTML = parseInt(up[i].innerHTML) - 1;
            img[i].setAttribute('src', 'img/love-icon.svg');
            testeIF = 0;
        
        }else {
            up[i].innerHTML = parseInt(up[i].innerHTML) + 1;
            img[i].setAttribute('src', 'img/love-icon-red.svg');
            testeIF = 1;
        }
    })
}