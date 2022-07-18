const express = require ('express');
const path = require ('path');

const productsController = require (path.join (__dirname, '../controllers/productsController'));

const router = express.Router();

router.get ('/shoppingCart', productsController.shoppingCart);

router.get ('/productDetail', productsController.productDetail);

router.get ('/createProduct', productsController.createProduct);

router.get ('/modifyProduct', productsController.modifyProduct);

module.exports = router;