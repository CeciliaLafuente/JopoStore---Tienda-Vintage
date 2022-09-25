let label=document.querySelector('.modify-img')
let input=document.querySelector('.input-img')
let button=document.querySelector('.button-img')

label.addEventListener('click', function(){
    console.log('hola')
    input.classList.remove('input-img');
    input.classList.add('input-img-block');
    button.classList.remove('button-img');
    button.classList.add('button-img-block');
})