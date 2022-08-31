const { body }= require('express-validator');

const validation = [
    
    body('email').isEmail().withMessage('El email no es válido').bail().notEmpty().withMessage('Debes colocar una dirección de correo válida'),
    body('password').notEmpty().withMessage('Debes colocar tu contraseña')
]

module.exports = validation;