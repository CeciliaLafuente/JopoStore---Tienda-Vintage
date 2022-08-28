const express= require('express');
let router= express.Router();

let usersController= require('../controllers/usersController');
let validationImage= require('../../middlewares/validationImage');
let validationRegister= require('../../middlewares/validationRegister');
const userNotLoggedMiddleware = require ( '../../middlewares/userNotLoggedMiddleware' );
const userLoggedMiddleware = require ( '../../middlewares/userLoggedMiddleware' );

router.get('/login', userNotLoggedMiddleware, usersController.login);

/**********************************************
     *****         AGREGUÉ LA FUNCIÓN logUser PARA PROBAR EL MIDDLEWARE QUE LIMITA LAS RUTAS
     *****         DE ACCESO A USUARIOS LOGONEADOS O NO LOGONEADOS
     ************************************************************/
router.post('/login', usersController.logUser);
/**********************************************
     *****        FIN DEL AGREGADO
     ************************************************************/

router.get('/registro', userNotLoggedMiddleware, usersController.register);

router.post('/new/register',validationImage.single('image'),validationRegister,usersController.store);

router.get('/profile/:id', userLoggedMiddleware,usersController.profile);

module.exports=router;