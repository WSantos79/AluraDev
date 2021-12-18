



const border = document.getElementsByClassName('code');
const input = document.getElementsByClassName('rectangle-color');

setColor()
input.addEventListener('input', setColor)

function setColor() {
  border.style.background = input.value
}