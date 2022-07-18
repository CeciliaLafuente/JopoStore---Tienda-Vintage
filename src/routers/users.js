const express= require('express');
let router= express.Router();

let usersController= require('../controllers/usersController')

router.get('/login', usersController.login);
router.get('/registro', usersController.register);

module.exports=router;