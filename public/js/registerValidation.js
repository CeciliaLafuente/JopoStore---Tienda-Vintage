let first_name= document.querySelector('#first_name')
let last_name= document.querySelector('#last_name')
let email= document.querySelector('#email')
let phone= document.querySelector('#phone')
let password= document.querySelector('#password')
let buttonCreate= document.querySelector('.create-account')
let form= document.querySelector('.form-registro')
let icons= document.querySelectorAll('.fa-circle-check')
let iconsCross= document.querySelectorAll('.fa-circle-xmark')

let nameError= document.querySelector('.name-error')
let lastNameError= document.querySelector('.lastName-error')
let emailError= document.querySelector('.email-error')
let phoneError= document.querySelector('.phone-error')
let passwordError= document.querySelector('.password-error')


form.addEventListener('submit', function(e){
    e.preventDefault();

    let errors={};
    if(first_name.value==''){
        errors.name= 'Debes ingresar un nombre';
        iconsCross[0].style.display='block'
    }else if (first_name.value.length<2){
        errors.name= 'El nombre debe contener al menos dos caracteres';
        iconsCross[0].style.display='block'
    } else{
        iconsCross[0].style.display='none'
        icons[0].style.display='block'
    }

   
    if(last_name.value==''){
        errors.lastName= 'Debes ingresar un apellido';
        iconsCross[1].style.display='block'
    }else if (last_name.value.length<2){
        errors.lastName= 'El nombre debe contener al menos dos caracteres';
        iconsCross[1].style.display='block'
    } else{
        iconsCross[1].style.display='none'
        icons[1].style.display='block'
    }
    

    if(email.value==''){
        errors.email= 'Debes ingresar un email';
        iconsCross[2].style.display='block'
    } else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)){
            errors.email= 'Ingresa un correo válido'
            iconsCross[2].style.display='block'
    } else{
        iconsCross[2].style.display='none'
        icons[2].style.display='block'
    }


    if(phone.value==''){
        errors.phone= 'Debes ingresar un número de teléfono';
        iconsCross[3].style.display='block'
    } else if(isNaN(phone.value)){
            errors.phone= 'Ingresa un número sin espacio ni signos';
            iconsCross[3].style.display='block'
    } else{
        iconsCross[3].style.display='none'
        icons[3].style.display='block'
    } 
    

    if(password.value==''){
        errors.password= 'Debes ingresar una contraseña';
        iconsCross[4].style.display='block'
    }else if(password.value.length<8){
            errors.password= 'La contraseña debe contener al menos 8 caracteres';
            iconsCross[4].style.display='block'
    } else{
        iconsCross[4].style.display='none'
        icons[4].style.display='block'
    }
    

    if(Object.keys(errors).length > 0){
        nameError.innerHTML= errors.name? errors.name : null;
        lastNameError.innerHTML= errors.lastName? errors.lastName :null;
        emailError.innerHTML= errors.email? errors.email :null;
        phoneError.innerHTML= errors.phone? errors.phone :null;
        passwordError.innerHTML= errors.password? errors.password :null;
    }else{
        form.submit();
    }

})



