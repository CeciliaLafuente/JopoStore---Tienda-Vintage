const express= require('express');
let router= express.Router();

let usersController= require('../controllers/usersController');
let validationImage= require('../../middlewares/validationImage');
let validationRegister= require('../../middlewares/validationRegister');

router.get('/login', usersController.login);

router.get('/registro', usersController.register);

router.post('/new/register',validationImage.single('image'),validationRegister,usersController.store);

router.get('/profile/:id', usersController.profile);

module.exports=router;