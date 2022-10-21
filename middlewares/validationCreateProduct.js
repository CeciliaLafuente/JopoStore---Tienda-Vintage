const { body }= require('express-validator');

const validation = [
    
    body('name').notEmpty().withMessage('Debes completar nombre del producto').bail()
    .isLength({min:3, max:20}).withMessage('Debe tener mínimo 3 caracteres y máximo 20'),
    body('description').notEmpty().withMessage('Debes agregar una descripción').bail()
    .isLength({max:100}).withMessage('Máximo 100 caracteres'),
    body('category_id').notEmpty().withMessage('Debes seleccionar una categoría').bail(),
    body('colors').notEmpty().withMessage('Debes seleccionar al menos un color').bail(),
    body('price').isNumeric().notEmpty().withMessage('Debes colocar el precio').bail()
  
]

module.exports = validation;