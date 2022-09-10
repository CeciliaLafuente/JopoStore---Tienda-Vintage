const express= require('express');
let router= express.Router();


let usersController= require('../controllers/usersController');
let validationImage= require('../../middlewares/validationImage');
let validationRegister= require('../../middlewares/validationRegister');
let validationLogin= require('../../middlewares/validationLogin.js');


const userNotLoggedMiddleware = require ( '../../middlewares/userLoggedMiddleware' );
const userLoggedMiddleware = require ( '../../middlewares/userNotLoggedMiddleware' );

router.get('/login', userNotLoggedMiddleware, usersController.login);

router.post('/login', validationLogin, usersController.loginProcess);

router.get('/registro', userNotLoggedMiddleware, usersController.register);

router.post('/new/register',validationImage.single('image'),validationRegister,usersController.store);

router.get('/profile/:id', userLoggedMiddleware,usersController.profile);

router.get('/logout/',usersController.logout)


module.exports=router;