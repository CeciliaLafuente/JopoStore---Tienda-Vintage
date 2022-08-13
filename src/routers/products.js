const express = require ('express');
const path = require ('path');

const productsController = require (path.join (__dirname, '../controllers/productsController'));

const router = express.Router();

router.get ('/shoppingCart', productsController.shoppingCart);

router.get ('/productDetail/:id', productsController.productDetail);

// router.get ('/productsList', productsController.productsList);

router.post ('/productsList/filtro', productsController.filtroPorCategoria);

router.get ('/productsList', productsController.productsList );

router.post ('/search', productsController.search );

module.exports = router;