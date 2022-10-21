window.addEventListener('load', () => {

    let form = document.querySelector('.form-producto');
    let email = document.querySelector('#email');
    let emailError = document.querySelector('.email-error');
    let password = document.querySelector('#password');
    let passwordError = document.querySelector('.password-error');

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let errors = {};

        if (email.value == '') {
            errors.email = 'Debe ingresar un email';
        } else if (validateEmail(email.value) === null) {
            errors.email = 'Debe ser un email válido';
        };

        if (password.value == '') {
            errors.password = 'Debe ingresar tu contraseña';
        };

        if (Object.keys(errors).length > 0) {
            emailError.innerText = errors.email ? errors.email : null;
            passwordError.innerText = errors.password ? errors.password : null;

        } else {
            form.submit();
        }
    })
})


