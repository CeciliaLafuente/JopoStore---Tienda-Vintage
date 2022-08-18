const express = require ('express');

const productsController = require ('../controllers/productsController');

const router = express.Router();


router.get ('/shoppingCart', productsController.shoppingCart);
router.post ('/shoppingCart/add/:id', productsController.addToShoppingCart);
router.delete ('/shoppingCart/delete/:id', productsController.deleteFromShoppingCart);

router.get ('/productDetail/:id', productsController.productDetail);

// router.get ('/productsList', productsController.productsList);

router.post ('/productsList/filtro', productsController.filtroPorCategoria);

router.get ('/productsList', productsController.productsList );

router.post ('/search', productsController.search );

module.exports = router;