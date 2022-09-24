const express = require ('express');
const path = require ('path');
const upload= require('../../middlewares/multerAdmin');

const adminController = require (path.join (__dirname, '../controllers/adminController'));

const Category = require ('../models/Category');

const router = express.Router();



router.get ('/', adminController.productsList);

router.get ('/createProduct', adminController.createProduct);
router.post ('/createProduct', upload.single('img'), adminController.storeProduct);

router.get ('/productDetail/:id', adminController.productDetail);

router.get('/edit/:id', adminController.edit);
router.put('/:id', upload.single('img'), adminController.update);

router.delete('/delete/:id', adminController.destroy);

router.get('/productsList', adminController.productsList)
router.post ('/productsList/filtro', adminController.filtroPorCategoria);

module.exports = router;